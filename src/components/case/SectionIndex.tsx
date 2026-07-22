import { useEffect, useState } from 'react'
import { sectionIndex } from '../../data/sysmed'

export default function SectionIndex() {
  const [active, setActive] = useState(sectionIndex[0].id)

  useEffect(() => {
    const elements = sectionIndex
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Índice do case"
      className="hidden xl:block fixed top-1/2 -translate-y-1/2 right-8 z-40 max-w-[180px]"
    >
      <ul className="space-y-3" role="list">
        {sectionIndex.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block font-mono text-[11px] tracking-wide transition-colors duration-200 leading-tight ${
                active === s.id ? 'text-amber' : 'text-muted/50 hover:text-muted'
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
