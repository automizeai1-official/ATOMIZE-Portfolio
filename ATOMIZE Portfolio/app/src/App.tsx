import { useThemeContext } from './context/ThemeContext'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import WhatsAppWidget from './components/WhatsAppWidget'
import ScrollProgressBar from './components/ScrollProgressBar'
import BackToTop from './components/BackToTop'
import StickyFloatingCTA from './components/StickyFloatingCTA'
import LeadCaptureModal from './components/LeadCaptureModal'
import Hero from './sections/Hero'
import TrustedBy from './sections/TrustedBy'
import Services from './sections/Services'
import Portfolio from './sections/Portfolio'
import TechStack from './sections/TechStack'
import HowItWorks from './sections/HowItWorks'
import WhyUs from './sections/WhyUs'
import Testimonials from './sections/Testimonials'
import Pricing from './sections/Pricing'
import CTA from './sections/CTA'
import Contact from './sections/Contact'
import FAQ from './sections/FAQ'
import Footer from './sections/Footer'

export default function App() {
  const { isRTL } = useThemeContext()
  useTranslation() // ensure re-render on lang change

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <ScrollProgressBar />
      <Header />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Portfolio />
        <TechStack />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <CTA />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppWidget />
      <BackToTop />
      <StickyFloatingCTA />
      <LeadCaptureModal />
    </div>
  )
}
