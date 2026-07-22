import { motion, useScroll, useSpring } from 'framer-motion'

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-amber origin-left z-[60]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
