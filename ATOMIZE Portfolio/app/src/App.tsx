import Header from './components/Header'
import Hero from './sections/Hero'
import TrustedBy from './sections/TrustedBy'
import HowItWorks from './sections/HowItWorks'
import Services from './sections/Services'
import WhyUs from './sections/WhyUs'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Header />
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <Services />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
