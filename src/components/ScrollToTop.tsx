import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  // O restauro automático do navegador (scrollRestoration: 'auto') briga
  // com o Lenis e com o scroll-to-top de troca de rota — o browser tenta
  // restaurar um offset de uma visita anterior à mesma entrada de
  // histórico, o app tenta zerar. Deixa o app ser a única fonte de verdade.
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
