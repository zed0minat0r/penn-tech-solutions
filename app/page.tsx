import Hero from '@/components/Hero'
import Services from '@/components/Services'
import About from '@/components/About'
import AI from '@/components/AI'
import AIAssessment from '@/components/AIAssessment'
import ITAssessment from '@/components/ITAssessment'
// import Pricing from '@/components/Pricing'
import WhyChooseUs from '@/components/WhyChooseUs'
import Process from '@/components/Process'
// import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import GlobalParticles from '@/components/GlobalParticles'
import FloatingCTA from '@/components/FloatingCTA'
import NoiseOverlay from '@/components/NoiseOverlay'

export default function Home() {
  return (
    <div className="relative">
      {/* Noise texture overlay for visual depth */}
      <NoiseOverlay />

      {/* Global flowing particles */}
      <GlobalParticles />

      {/* Floating contact CTA button */}
      <FloatingCTA />

      {/* Page content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Services />
        <AI />
        <WhyChooseUs />
        <Process />
        {/* <Testimonials /> */}
        <AIAssessment />
        <ITAssessment />
        <Contact />
      </div>
    </div>
  )
}
