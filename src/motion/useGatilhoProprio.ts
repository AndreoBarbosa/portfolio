import { useRef, useState } from 'react'
import { VIEWPORT } from './caseUxAiTokens'

const AINDA_NAO = Symbol('ainda-nao')

/**
 * Para um filho que troca de forma conforme o breakpoint (`modo`) dentro de
 * um pai com `whileInView` de uma vez só (VIEWPORT.once).
 *
 * O problema (28 set): depois que o pai revelou, trocar as variantes de um
 * filho faz o framer devolver os valores que saíram para o `initial`
 * (opacidade 0), e um filho que monta de novo herda um pai que não anima
 * mais. Nos dois casos o texto some, e some justamente ao redimensionar.
 *
 * Uso: `key={modo}` no filho, `aoRevelar` no `onViewportEnter` do pai e
 * `{...proprio}` no filho. Até a primeira troca de modo depois da revelação
 * nada muda (a coreografia original fica); a partir dela cada nova montagem
 * tem gatilho próprio e entra ao aparecer, como a figura da S08.
 */
export default function useGatilhoProprio(modo: unknown) {
  const [modoRevelado, setModoRevelado] = useState<unknown>(AINDA_NAO)
  const trocou = useRef(false)
  if (modoRevelado !== AINDA_NAO && modoRevelado !== modo) trocou.current = true
  return {
    aoRevelar: () => setModoRevelado((m: unknown) => (m === AINDA_NAO ? modo : m)),
    proprio: trocou.current ? ({ initial: 'hidden', whileInView: 'visible', viewport: VIEWPORT } as const) : {},
  }
}
