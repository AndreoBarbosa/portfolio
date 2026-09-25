import ScrubSequence from './ScrubSequence'
import MaskReveal from './MaskReveal'

/* Os 48 quadros foram extraídos do próprio hero-bg.webm, um a cada ~0,21s,
   a 1600px. Total de 2 MB, menos que os 3,5 MB do webm que o hero carrega
   hoje. Ver o comentário do ScrubSequence sobre por que o vídeo não serve.

   Fora do componente de propósito: se o array fosse criado no render, mudaria
   de identidade a cada ciclo e o efeito de pré-carregamento reiniciaria. */
const FRAMES = Array.from(
  { length: 48 },
  (_, i) => `/hero-seq/hero-${String(i + 1).padStart(2, '0')}.webp`,
)

const TITLE = 'Transformo complexidade em clareza'

/**
 * Variante do hero em que a imagem é conduzida pelo scroll.
 *
 * Não substitui o LiquidHero automaticamente. Para testar, troque o import em
 * pages/Home.tsx. Duas coisas mudam de verdade e pedem a sua leitura antes de
 * virar padrão:
 *
 * 1. A seção passa a ocupar 2,5 viewports em vez de uma, e todo o resto da
 *    página desce. O título continua visível desde o primeiro quadro, então
 *    ninguém precisa rolar para achar o H1, mas o caminho até "Projetos" fica
 *    mais longo.
 * 2. O título entra por máscara de palavra em vez de fade.
 *
 * No mobile e com prefers-reduced-motion a seção volta a ter uma viewport,
 * com o poster estático e o texto em fluxo normal abaixo dele. Nada de
 * canvas, nada de rAF, nada de quadro baixado.
 */
export default function LiquidHeroScrub() {
  return (
    <section id="hero" className="relative" style={{ background: '#FFFFFF' }}>
      <ScrubSequence
        frames={FRAMES}
        poster="/hero-poster.webp"
        alt="Composição abstrata de vidro em movimento"
        viewports={2.5}
        fit="contain"
        background="#FFFFFF"
      >
        {(active) => (
          <div className={active ? 'absolute inset-x-0 bottom-0' : ''}>
            {/* Faixa de leitura, só quando o texto está sobre a cena. O
                degradê é da própria cor de fundo e termina sólido: garante o
                contraste do título sem colocar vidro sobre texto de leitura,
                o que o master proíbe na seção 4.3. */}
            {active && (
              <div
                className="h-40"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0), #FFFFFF)' }}
                aria-hidden="true"
              />
            )}

            <div className="bg-white">
              <div className="max-w-[1198px] mx-auto px-4 pt-10 pb-12 md:pb-16 flex flex-col items-center gap-10">
                <div className="flex flex-col gap-6 items-center text-center w-full">
                  <h1 className="liquid-type-hero-title text-balance" style={{ color: '#0C1A22' }}>
                    <MaskReveal text={TITLE} onLoad delay={0.1} />
                  </h1>

                  <p className="liquid-type-hero-sub" style={{ color: '#625F5D' }}>
                    Product Designer com base em UX Research. Transformo pesquisa em decisões de produto{' '}
                    <br className="hidden md:block" />
                    que reduzem esforço e simplificam experiências complexas.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                  <a
                    href="#projetos"
                    className="liquid-hero-btn-primary liquid-type-btn inline-flex items-center justify-center w-full sm:w-[186px] px-8 py-3"
                  >
                    Ver projetos
                  </a>
                  <a
                    href="#trajetoria"
                    className="liquid-hero-btn-secondary liquid-type-btn inline-flex items-center justify-center w-full sm:w-auto whitespace-nowrap px-6 sm:px-8 py-3"
                  >
                    Conhecer minha trajetória
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </ScrubSequence>
    </section>
  )
}
