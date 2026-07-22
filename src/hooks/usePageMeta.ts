import { useEffect } from 'react'

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
