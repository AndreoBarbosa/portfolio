import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

let ultimoPageView = ''

/** page_view do GA4 numa SPA. O gtag do index.html está com
 *  `send_page_view: false` de propósito: quem mede é sempre este ponto,
 *  logo depois de o título trocar, para o evento chegar com o título da
 *  página certa (o page_view automático dispara antes do React renderizar e
 *  levaria o título anterior).
 *
 *  A trava por título + URL evita contar duas vezes: o efeito abaixo
 *  reexecuta a cada render das páginas que passam `jsonLd`, que é um objeto
 *  novo toda vez.
 *
 *  Depende, no GA4, de Admin › Fluxos de dados › Medição aprimorada com
 *  "Alterações de página com base em eventos do histórico do navegador"
 *  DESLIGADA. Ligada, cada troca de rota conta duas vezes.
 *
 *  Em localhost `window.gtag` não existe (ver `__medir` no index.html) e a
 *  chamada opcional não faz nada. */
function medirPageView(titulo: string) {
  const chave = titulo + ' | ' + window.location.href
  if (chave === ultimoPageView) return
  ultimoPageView = chave
  window.gtag?.('event', 'page_view', {
    page_title: titulo,
    page_location: window.location.href,
  })
}

type PageMeta = {
  title: string
  description: string
  ogImage?: string
  canonical?: string
  ogType?: string
  jsonLd?: object
}

function setMetaContent(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute('content', content)
}

export default function usePageMeta({ title, description, ogImage, canonical, ogType, jsonLd }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title
    const descriptionEl = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
    const prevDescription = descriptionEl?.getAttribute('content') ?? ''
    const ogImageEl = document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]')
    const prevOgImage = ogImageEl?.getAttribute('content') ?? ''

    document.title = title
    medirPageView(title)
    setMetaContent('meta[name="description"]', description)
    if (ogImage) setMetaContent('meta[property="og:image"]', ogImage)

    let canonicalEl: HTMLLinkElement | null = null
    if (canonical) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      canonicalEl.setAttribute('href', canonical)
      document.head.appendChild(canonicalEl)
    }

    let ogTypeEl: HTMLMetaElement | null = null
    if (ogType) {
      ogTypeEl = document.createElement('meta')
      ogTypeEl.setAttribute('property', 'og:type')
      ogTypeEl.setAttribute('content', ogType)
      document.head.appendChild(ogTypeEl)
    }

    let jsonLdEl: HTMLScriptElement | null = null
    if (jsonLd) {
      jsonLdEl = document.createElement('script')
      jsonLdEl.type = 'application/ld+json'
      jsonLdEl.text = JSON.stringify(jsonLd)
      document.head.appendChild(jsonLdEl)
    }

    return () => {
      document.title = prevTitle
      setMetaContent('meta[name="description"]', prevDescription)
      if (ogImage) setMetaContent('meta[property="og:image"]', prevOgImage)
      canonicalEl?.remove()
      ogTypeEl?.remove()
      jsonLdEl?.remove()
    }
  }, [title, description, ogImage, canonical, ogType, jsonLd])
}
