import { useEffect, useRef, useState } from 'react'

export default function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    const start = performance.now()
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    let frame: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(ease(progress) * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return value
}
