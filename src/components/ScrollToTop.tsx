import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  // O restauro automático do navegador (scrollRestoration: 'auto') briga
  // com o Lenis e com o scroll-to-top de troca de rota — o browser tenta
  // restaurar um offset de uma visita anterior à mesma entrada de
  // histórico, o app tenta zerar. Deixa o app ser a única fonte de verdade.
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  // I3 (correção 12): "Ver todos os projetos" (Sona/Gabriel) usa
  // ctaHref="/#projetos" — como é um <a> comum (não <Link>), sair de
  // /case/* pra lá é navegação de página cheia. O app é CSR: no HTML
  // inicial #projetos ainda não existe, então o auto-scroll nativo do
  // navegador pro fragmento falha antes do React montar, e sem isso aqui
  // o scrollTo(0,0) abaixo venceria a corrida e travaria no topo. Com
  // hash, rolamos pro elemento (após o commit do React) em vez de zerar;
  // sem hash, mantém o comportamento de sempre.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      el?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
