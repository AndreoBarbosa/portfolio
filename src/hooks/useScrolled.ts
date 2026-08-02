import { useEffect, useState } from 'react'

/** True depois que a página passa de `threshold` px de scroll — dispara
   a transição da navbar do Estado A (transparente, sobre o Hero) pro
   Estado B (vidro translúcido, ver .liquid-navbar.is-scrolled). 32px é
   o gatilho exato do Figma (Node 133:382). */
export function useScrolled(threshold = 32) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
