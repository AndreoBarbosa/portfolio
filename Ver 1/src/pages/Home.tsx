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
