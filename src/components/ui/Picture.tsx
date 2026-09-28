import type { ImgHTMLAttributes } from 'react'
import { IMAGENS } from '../../data/imagens.gerado'

/**
 * Imagens leves: AVIF e WebP em várias larguras, gerados por
 * scripts/otimizar-imagens.py a partir do original em public/. O navegador
 * escolhe o formato e a largura pela tela; o original pesado nunca é baixado.
 * Imagem fora da tabela passa direto, com o src original.
 */

/* Com o <picture> em display: contents, o navegador trataria cada <source>
   como item de grid ou flex (ocupando célula e somando gap). Escondidas, elas
   saem do layout e continuam valendo para a escolha da imagem. */
const SEM_CAIXA = { display: 'none' } as const

/** As duas <source> de uma imagem da tabela. Para usar dentro de um
 *  <picture> que já existe (ex.: com motion.img). */
export function Fontes({ src, sizes }: { src: string; sizes: string }) {
  const e = IMAGENS[src]
  if (!e) return null
  const set = (ext: 'avif' | 'webp') => e.larguras.map((w) => `${e.base}-${w}.${ext} ${w}w`).join(', ')
  return (
    <>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} style={SEM_CAIXA} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} style={SEM_CAIXA} />
    </>
  )
}

/** Um arquivo único otimizado (WebP), para `poster` de vídeo ou reserva do
 *  <img>: a menor largura da tabela que cobre `largura`. */
export function srcOtimizado(src: string, largura?: number) {
  const e = IMAGENS[src]
  if (!e) return src
  const maior = e.larguras[e.larguras.length - 1]
  const w = largura === undefined ? maior : e.larguras.find((l) => l >= largura) ?? maior
  return `${e.base}-${w}.webp`
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> & { src: string; sizes: string }

/** <img> com fontes responsivas. O <picture> usa display: contents: o
 *  layout e os seletores de CSS que miram o <img> continuam iguais. */
export default function Picture({ src, sizes, alt = '', ...img }: Props) {
  return (
    <picture style={{ display: 'contents' }}>
      <Fontes src={src} sizes={sizes} />
      <img src={srcOtimizado(src)} alt={alt} {...img} />
    </picture>
  )
}
