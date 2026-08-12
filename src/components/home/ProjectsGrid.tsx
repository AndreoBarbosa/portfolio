import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import LiquidReveal from '../liquid/LiquidReveal'
import LiquidSectionHeading from '../liquid/LiquidSectionHeading'
import { projects, type Project } from '../../data/home'

function NeutralPattern() {
  return (
    <svg
      viewBox="0 0 460 345"
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="project-dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="#0C1A22" opacity="0.10" />
        </pattern>
      </defs>
      <rect width="460" height="345" fill="url(#project-dotgrid)" />
      <circle cx="370" cy="100" r="110" fill="none" stroke="#0C1A22" strokeWidth="0.5" opacity="0.10" />
      <circle cx="370" cy="100" r="75" fill="none" stroke="#0C1A22" strokeWidth="0.5" opacity="0.14" />
      <circle cx="370" cy="100" r="38" fill="none" stroke="#0C1A22" strokeWidth="0.5" opacity="0.18" />
    </svg>
  )
}

function CardBody({ project }: { project: Project }) {
  return (
    <div className="liquid-project-body">
      <div className="liquid-project-tags flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="liquid-project-tag uppercase px-3 py-1.5">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="liquid-project-title text-[18px] leading-[1.5]">
        {project.title}
      </h3>
      <p className="liquid-project-desc text-[14px] leading-[1.5]">
        {project.tese}
      </p>
      <div className="liquid-project-spacer" />
      <div className="liquid-project-footer flex items-center justify-between">
        <span className="liquid-project-category text-[12px] uppercase font-mono">
          {project.context}
        </span>
        <span className="liquid-project-cta">
          Ver case <ArrowUpRight size={12} />
        </span>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Vídeo só no desktop, sem reduced-motion — no mobile fica só a
  // estática (opção B do brief: mais seguro pra LCP/bateria, mesma
  // filosofia já usada no vídeo do hero).
  const canPlayVideo = isDesktop && !shouldReduceMotion && !!project.media

  const handleEnter = () => {
    if (!canPlayVideo) return
    setHovering(true)
    videoRef.current?.play()
  }
  const handleLeave = () => {
    if (!canPlayVideo) return
    setHovering(false)
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <Link
      to={project.caseRoute}
      className="liquid-project-card block h-full"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <div className="liquid-project-frame h-full">
        {/* Imagem/vídeo ocupam a largura total do card (margin negativo
            quebra o padding) — objeto de vidro sobre chão claro. */}
        <div className="liquid-project-media">
          {project.media ? (
            <>
              <img
                src={project.media.static}
                alt=""
                decoding="async"
                style={{ opacity: hovering ? 0 : 1 }}
              />
              {canPlayVideo && (
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={project.media.static}
                  style={{ opacity: hovering ? 1 : 0 }}
                  aria-hidden="true"
                >
                  {/* J2 (correção 13): não sobrou nenhum .mp4 em
                      media.hover (sona/sysmed/gabriel são todos .webm) —
                      simplificado de volta pro type fixo. */}
                  <source src={project.media.hover} type="video/webm" />
                </video>
              )}
            </>
          ) : (
            <NeutralPattern />
          )}

          {project.badge && (
            <span
              className="absolute top-4 right-4 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full z-10"
              style={{ background: '#0C1A22', color: '#F2EEEB' }}
            >
              {project.badge}
            </span>
          )}
        </div>

        <CardBody project={project} />
      </div>
    </Link>
  )
}

export default function ProjectsGrid() {
  const [sona, sysmed, gabriel] = projects

  return (
    <section id="projetos" className="py-20 md:py-32">
      {/* Node 133:374 (Figma): container 1199px (não max-w-6xl/7xl
          genérico) — os 3 cards (380px cada) com gap real de ~29.5px
          preenchem essa largura exata, sem sobra nas laterais. */}
      <div className="max-w-[1199px] mx-auto px-4 md:px-8">
        <LiquidReveal blur>
          <LiquidSectionHeading id="projetos-title" number="/01" label="Projetos" />
          <p className="mt-3 max-w-[60ch]" style={{ color: 'var(--text-muted)' }}>
            Uma seleção contida — qualidade sobre quantidade.
          </p>
        </LiquidReveal>

        {/* I4 (correção 12): sem blur nos cards — são grandes e têm
            vídeo/imagem de hover, exatamente o caso que o briefing pede
            pra tirar (filter animado é caro em GPU sobre imagem pesada).
            opacity+y continuam. */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-[30px] items-stretch">
          <LiquidReveal>
            <ProjectCard project={sona} />
          </LiquidReveal>
          <LiquidReveal delay={0.08}>
            <ProjectCard project={sysmed} />
          </LiquidReveal>
          <LiquidReveal delay={0.16}>
            <ProjectCard project={gabriel} />
          </LiquidReveal>
        </div>
      </div>
    </section>
  )
}
