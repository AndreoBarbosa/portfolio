import type { ReactNode } from 'react'
import { gabrielAccent } from '../../data/gabriel'

type Props = {
  children: ReactNode
  /** 'blue' = pergunta de design/nota (bg #E4ECF3); 'white' = nota de
      fechamento sobre fundo branco com borda sutil. */
  variant?: 'blue' | 'white'
  textColor?: string
  fontSize?: string
  className?: string
}

// Caixa de nota/pergunta — padrão repetido em várias seções com
// tamanhos e cores de texto ligeiramente diferentes por instância (a
// mesma bg #E4ECF3 aparece com 3 tons de azul de texto distintos ao
// longo do case — tokens reais e diferentes no Figma, não confundir).
// Aqui só a casca: quem usa passa a cor/tamanho exatos do nó de origem.
export default function NoteBox({ children, variant = 'blue', textColor, fontSize = '18px', className = '' }: Props) {
  const isBlue = variant === 'blue'
  return (
    <div
      className={`rounded-xl px-6 py-5 w-full ${className}`}
      style={{
        background: isBlue ? gabrielAccent.noteBg : '#FFFFFF',
        border: isBlue ? undefined : `1px solid ${gabrielAccent.divider}`,
      }}
    >
      <p
        className="font-outfit font-semibold leading-[1.5]"
        style={{ color: textColor ?? (isBlue ? gabrielAccent.noteBlue : gabrielAccent.textSubtle), fontSize }}
      >
        {children}
      </p>
    </div>
  )
}
