import { useEffect } from 'react'

type PageMeta = {
  title: string
  description: string
  ogImage?: string
}

function setMetaContent(selector: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector)
  if (el) el.setAttribute('content', content)
}

export default function usePageMeta({ title, description, ogImage }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title
    const descriptionEl = document.head.querySelector<HTMLMetaElement>('meta[name="description"]')
    const prevDescription = descriptionEl?.getAttribute('content') ?? ''
    const ogImageEl = document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]')
    const prevOgImage = ogImageEl?.getAttribute('content') ?? ''

    document.title = title
    setMetaContent('meta[name="description"]', description)
    if (ogImage) setMetaContent('meta[property="og:image"]', ogImage)

    return () => {
      document.title = prevTitle
      setMetaContent('meta[name="description"]', prevDescription)
      if (ogImage) setMetaContent('meta[property="og:image"]', prevOgImage)
    }
  }, [title, description, ogImage])
}
