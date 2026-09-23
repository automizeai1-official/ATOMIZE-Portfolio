import { useThemeContext } from './context/ThemeContext'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import WhatsAppWidget from './components/WhatsAppWidget'
import Hero from './sections/Hero'
import TrustedBy from './sections/TrustedBy'
import Services from './sections/Services'
import Portfolio from './sections/Portfolio'
import TechStack from './sections/TechStack'
import HowItWorks from './sections/HowItWorks'
import WhyUs from './sections/WhyUs'
import Testimonials from './sections/Testimonials'
import Pricing from './sections/Pricing'
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
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}
