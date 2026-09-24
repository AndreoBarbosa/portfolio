import type { ElementType, ReactNode, HTMLAttributes } from 'react'

type Level = 'leve' | 'medio' | 'forte'

type Props = {
  as?: ElementType
  level?: Level
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLElement>

/**
 * Vidro real — blueprint §8.2. Uso restrito: nav ao rolar, pílula do
 * briefing, tooltips, painel "Etapa ativa". No máximo 1 `forte` por
 * viewport, e forte é o único nível permitido sobre imagem.
 *
 * A maioria dos cards do frame (briefing, matriz, fatores) tem fill sólido
 * com efeito GLASS por cima — esses são `--superficie-card` sólida, não
 * este componente (ver blueprint: "vidro onde o fundo já é controlado é
 * desonesto e mais lento").
 */
export default function GlassSurface({
  as: Tag = 'div',
  level = 'medio',
  children,
  className = '',
  ...props
}: Props) {
  return (
    <Tag className={`glass-${level} ${className}`} {...props}>
      {children}
    </Tag>
  )
}
