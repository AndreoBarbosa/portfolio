import { Mail, Linkedin, Phone, ArrowUpRight } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import AnimateOnScroll from '../ui/AnimateOnScroll'

const primaryContacts = [
  {
    icon: Mail,
    label: 'E-mail',
    display: 'andreosnsd@gmail.com',
    href: 'mailto:andreosnsd@gmail.com',
    external: false,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    display: '/in/andreo-barbosa',
    href: 'https://linkedin.com/in/andreo-barbosa/',
    external: true,
  },
]

export default function Contact() {
  return (
    <section id="contato" className="py-16 md:py-24 lg:py-32 border-t border-cream/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/05" label="Contato" />
        </AnimateOnScroll>

        <div className="max-w-2xl">
          <AnimateOnScroll>
            <h2
              className="font-satoshi font-semibold text-cream text-4xl lg:text-5xl leading-tight mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Vamos conversar?
            </h2>
            <p className="text-muted leading-relaxed mb-10 lg:mb-12">
              Aberto a oportunidades, freelas e boas conversas sobre design.
              Escolha o canal que preferir.
            </p>
          </AnimateOnScroll>

          {/* Cards de contato principais */}
          <AnimateOnScroll delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {primaryContacts.map(({ icon: Icon, label, display, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex flex-col gap-5 glass rounded-card p-6 hover:border-amber/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      size={20}
                      className="text-amber/60 group-hover:text-amber transition-colors duration-200"
                    />
                    <ArrowUpRight
                      size={14}
                      className="text-muted/30 group-hover:text-amber group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted/50 tracking-widest uppercase mb-1.5">
                      {label}
                    </p>
                    <p className="text-cream text-sm">{display}</p>
                  </div>
                </a>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Contato secundário — WhatsApp */}
          <AnimateOnScroll delay={0.2}>
            <a
              href="https://wa.me/5524999661851"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs text-muted/60 hover:text-cream transition-colors duration-200"
            >
              <Phone size={12} className="shrink-0" />
              <span>(24) 99966-1851 · WhatsApp</span>
              <ArrowUpRight
                size={10}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
