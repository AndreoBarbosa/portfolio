import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  src: string
  title: string
  externalHref: string
  fallbackImage: string
  fallbackAlt: string
  caption?: string
}

// onLoad on a cross-origin iframe fires even when the remote route 404s — the browser only
// knows *something* answered, not that it's the intended app. We can't inspect cross-origin
// iframe content to tell the two apart, so the embedded page must confirm itself explicitly:
// window.parent.postMessage({ type: 'sona-embed-ready' }, '*') once it has mounted for real.
// Until that message arrives, the static fallback stays up — no flash, no timeout.
const READY_MESSAGE = 'sona-embed-ready'

export default function IframeDemo({ src, title, externalHref, fallbackImage, fallbackAlt, caption }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const expectedOrigin = new URL(src).origin

    function handleMessage(event: MessageEvent) {
      if (event.origin !== expectedOrigin) return
      if (event.data?.type === READY_MESSAGE) setLoaded(true)
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [src])

  return (
    <div className="max-w-[393px] mx-auto">
      <div className="relative rounded-[2.5rem] border-4 border-muted/20 bg-slate/60 shadow-[0_40px_80px_rgba(0,0,0,0.45)] overflow-hidden aspect-[393/852]">
        {/* Estática, visível de imediato — nunca há estado vazio */}
        <img src={fallbackImage} alt={fallbackAlt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
        {/* Iframe carrega por trás; só assume quando o embed confirma via postMessage */}
        <iframe
          src={src}
          title={title}
          loading="lazy"
          aria-hidden={!loaded}
          tabIndex={loaded ? 0 : -1}
          className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-[240ms] ${
            loaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      </div>
      {caption && <p className="font-mono text-xs text-muted text-center mt-4">{caption}</p>}
      <p className="text-center mt-3">
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[11px] text-muted hover:text-cream transition-colors duration-200"
        >
          Abrir em nova aba
          <ArrowUpRight size={10} />
        </a>
      </p>
    </div>
  )
}
