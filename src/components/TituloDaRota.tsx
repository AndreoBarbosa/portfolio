import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const PADRAO = 'Andreo Barbosa · Product/UX Designer'

/** Título por rota. Serve pra aba do navegador, pro favorito e pro relatório
 *  do GA4: sem isso todo case chega ao GA com o mesmo título e só o caminho
 *  diferencia. Rota que não estiver aqui cai no título padrão. */
const TITULOS: Record<string, string> = {
  '/': PADRAO,
  '/case/sona': 'Sona · Case · Andreo Barbosa',
  '/case/ia-hospitalar': 'IA na avaliação hospitalar · Case · Andreo Barbosa',
  '/case/sysmed': 'IA na avaliação hospitalar · Case · Andreo Barbosa',
  '/case/gabriel': 'Landing page para psicólogo clínico · Case · Andreo Barbosa',
  '/design-system': 'Design System · Andreo Barbosa',
  '/dev/case-ux-ai': 'IA na avaliação hospitalar (revisão) · Andreo Barbosa',
}

/** O site é uma SPA: o GA4 não recarrega a página entre as rotas. O
 *  page_view automático do gtag está desligado (`send_page_view: false` no
 *  index.html) e quem dispara é este componente, logo depois de trocar o
 *  título. A ordem importa: disparado antes, o evento levaria o título da
 *  página anterior.
 *
 *  Exige, no GA4: Admin › Fluxos de dados › Medição aprimorada com
 *  "Alterações de página com base em eventos do histórico do navegador"
 *  DESLIGADO. Ligado, cada troca de rota conta duas vezes.
 *
 *  Em localhost `window.gtag` não existe (ver `__medir` no index.html) e a
 *  chamada opcional não faz nada. */
export default function TituloDaRota() {
  const { pathname } = useLocation()

  useEffect(() => {
    const titulo = TITULOS[pathname] ?? PADRAO
    document.title = titulo
    window.gtag?.('event', 'page_view', {
      page_title: titulo,
      page_location: window.location.href,
    })
  }, [pathname])

  return null
}
