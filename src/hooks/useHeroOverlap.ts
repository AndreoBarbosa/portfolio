import { useEffect, useState } from 'react'

/** True enquanto o elemento (hero) ainda ocupa a faixa logo abaixo do
   header fixo — usado pra saber quando o nav deve usar o estilo "sobre
   vídeo escuro" em vez do vidro claro padrão. */
export function useHeroOverlap(heroId: string) {
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    const el = document.getElementById(heroId)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: '-90px 0px 0px 0px', threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [heroId])

  return overHero
}
