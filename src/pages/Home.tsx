import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import Projects from '../components/sections/Projects'
import Skills from '../components/sections/Skills'
import Timeline from '../components/sections/Timeline'
import About from '../components/sections/About'
import Contact from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Gradient blobs — dão substância ao backdrop-blur das seções */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[15%] left-[8%]  w-[520px] h-[520px] rounded-full bg-amber/[0.045] blur-[130px]" />
          <div className="absolute top-[55%] right-[4%] w-[420px] h-[420px] rounded-full bg-amber/[0.03]  blur-[110px]" />
          <div className="absolute top-[80%] left-[35%] w-[480px] h-[480px] rounded-full bg-slate/80       blur-[120px]" />
        </div>
        <Hero />
        <Projects />
        <Skills />
        <Timeline />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
