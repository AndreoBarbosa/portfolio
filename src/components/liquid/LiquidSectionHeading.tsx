import ScrollAccent from './ScrollAccent'

type Props = {
  id: string
  number: string
  label: string
}

export default function LiquidSectionHeading({ id, number, label }: Props) {
  return (
    <div>
      <ScrollAccent className="block font-mono text-xs uppercase tracking-widest mb-2">
        {number}
      </ScrollAccent>
      <h2 id={id} className="scroll-mt-24">
        <ScrollAccent className="font-hanken font-semibold">
          <span style={{ fontSize: '32px', letterSpacing: '-0.64px' }}>{label}</span>
        </ScrollAccent>
      </h2>
    </div>
  )
}
