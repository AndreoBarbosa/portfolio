import { useState, type FormEvent } from 'react'
import { Mail, Linkedin, Phone, ArrowUpRight } from 'lucide-react'
import SectionLabel from '../ui/SectionLabel'
import Button from '../ui/Button'
import AnimateOnScroll from '../ui/AnimateOnScroll'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contato via portfólio — ${form.name}`)
    const body = encodeURIComponent(
      `Nome: ${form.name}\nE-mail: ${form.email}\n\nMensagem:\n${form.message}`
    )
    window.location.href = `mailto:andreosnsd@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contato" className="py-24 lg:py-32 border-t border-cream/5">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionLabel index="/05" label="Contato" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: headline + links */}
          <AnimateOnScroll>
            <div className="space-y-8">
              <div>
                <h2
                  className="font-satoshi font-semibold text-cream text-4xl lg:text-5xl leading-tight mb-4"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Vamos conversar?
                </h2>
                <p className="text-muted leading-relaxed">
                  Aberto a oportunidades, freelas e boas conversas sobre design.
                  Escolha o canal que preferir.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:andreosnsd@gmail.com"
                  className="group flex items-center gap-3 text-cream/70 hover:text-cream transition-colors duration-200"
                >
                  <span className="w-8 h-8 flex items-center justify-center border border-cream/10 rounded-sm group-hover:border-amber/30 transition-colors duration-200">
                    <Mail size={14} />
                  </span>
                  <span className="text-sm">andreosnsd@gmail.com</span>
                  <ArrowUpRight size={12} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>

                <a
                  href="https://linkedin.com/in/andreo-barbosa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-cream/70 hover:text-cream transition-colors duration-200"
                >
                  <span className="w-8 h-8 flex items-center justify-center border border-cream/10 rounded-sm group-hover:border-amber/30 transition-colors duration-200">
                    <Linkedin size={14} />
                  </span>
                  <span className="text-sm">linkedin.com/in/andreo-barbosa/</span>
                  <ArrowUpRight size={12} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>

                <a
                  href="https://wa.me/5524999661851"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-cream/70 hover:text-cream transition-colors duration-200"
                >
                  <span className="w-8 h-8 flex items-center justify-center border border-cream/10 rounded-sm group-hover:border-amber/30 transition-colors duration-200">
                    <Phone size={14} />
                  </span>
                  <span className="text-sm">(24) 99966-1851</span>
                  <ArrowUpRight size={12} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: form */}
          <AnimateOnScroll delay={0.15}>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-muted tracking-wider uppercase mb-2">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-cream/[0.04] border border-cream/10 rounded-sm px-4 py-3 text-sm text-cream placeholder:text-muted/40 focus:outline-none focus:border-amber/40 transition-colors duration-200"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-xs text-muted tracking-wider uppercase mb-2">
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-cream/[0.04] border border-cream/10 rounded-sm px-4 py-3 text-sm text-cream placeholder:text-muted/40 focus:outline-none focus:border-amber/40 transition-colors duration-200"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-mono text-xs text-muted tracking-wider uppercase mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full bg-cream/[0.04] border border-cream/10 rounded-sm px-4 py-3 text-sm text-cream placeholder:text-muted/40 focus:outline-none focus:border-amber/40 transition-colors duration-200 resize-none"
                  placeholder="Conta um pouco sobre o projeto ou oportunidade…"
                />
              </div>

              <Button variant="primary" type="submit" className="w-full justify-center">
                Enviar mensagem
                <ArrowUpRight size={14} />
              </Button>
            </form>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
