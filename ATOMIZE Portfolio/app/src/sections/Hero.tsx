import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'
import { useCounter } from '../hooks/useCounter'
import { AtomizeMark } from '../components/AtomizeLogo'

const techPills = ['React & Next.js', 'AI Agents & n8n', 'Flutter Mobile', 'Shopify E-Commerce', 'Node.js & Python', 'WhatsApp API']

function StatBadge({ value, suffix = '+', labelKey }: { value: number; suffix?: string; labelKey: string }) {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const { count, ref } = useCounter(value)
  return (
    <div
      ref={ref}
      className="text-center px-5 py-3.5 rounded-2xl glass-card transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      <div
        className="text-[30px] font-black leading-none mb-1 text-glow-lime"
        style={{ color: '#88E03F', fontFamily: isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif" }}
      >
        {count}{suffix}
      </div>
      <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-sub)' }}>
        {t(labelKey)}
      </div>
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Background Orbital Grid */}
      <div className="absolute inset-0 bg-grid opacity-70 pointer-events-none" />

      {/* Atmospheric Atomic Gradient Mesh: Cyber Teal (#008084) to Electric Blue (#3580E6) */}
      <div
        className="absolute top-1/4 -start-40 w-[600px] h-[600px] rounded-full pointer-events-none filter blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 128, 132, 0.35) 0%, rgba(53, 128, 230, 0.15) 60%, transparent 80%)',
        }}
      />
      <div
        className="absolute -bottom-20 -end-40 w-[550px] h-[550px] rounded-full pointer-events-none filter blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(53, 128, 230, 0.28) 0%, rgba(136, 224, 63, 0.12) 60%, transparent 80%)',
        }}
      />

      {/* Floating orbital tech badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {techPills.map((pill, i) => (
          <motion.div
            key={pill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
            className="absolute text-[11px] font-mono font-semibold px-3 py-1.5 rounded-full border glass-card shadow-lg"
            style={{
              borderColor: 'rgba(0, 128, 132, 0.35)',
              color: '#88E03F',
              backgroundColor: 'rgba(7, 24, 34, 0.8)',
              top: `${14 + ((i * 35) % 65)}%`,
              right: isRTL ? undefined : `${4 + ((i * 12) % 26)}%`,
              left: isRTL ? `${4 + ((i * 12) % 26)}%` : undefined,
              animation: `float ${3.5 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#88E03F] inline-block me-1.5 animate-pulse" />
            {pill}
          </motion.div>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] w-full pt-[110px] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-8 max-w-[760px]">
            {/* Badge Highlighted in Lime Energy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border mb-8 glass-card"
              style={{
                borderColor: 'rgba(136, 224, 63, 0.45)',
                backgroundColor: 'rgba(7, 24, 34, 0.85)',
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: '#88E03F' }} />
              <span
                className="text-[12px] font-bold tracking-wide flex items-center gap-1.5"
                style={{ color: '#88E03F', fontFamily: font }}
              >
                <Sparkles size={13} className="text-[#88E03F]" />
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Headlines in Cyber Teal & White */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0, 0, 1] }}
              className="text-[clamp(38px,6vw,76px)] font-black leading-[1.05] tracking-[-0.02em] mb-6 text-white"
              style={{ fontFamily: font }}
            >
              {t('hero.headline1')}{' '}
              <span
                className="text-glow-teal block sm:inline"
                style={{
                  color: '#008084',
                  backgroundImage: 'linear-gradient(135deg, #008084 0%, #3580E6 50%, #88E03F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('hero.headline2')}
              </span>
            </motion.h1>

            {/* Subtitle with Lime Energy highlights */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0, 0, 1] }}
              className="text-[17px] sm:text-[18px] leading-[1.8] max-w-[620px] mb-10 text-slate-300"
              style={{ fontFamily: font }}
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* High-Converting CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0, 0, 1] }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              {/* Primary High-Converting CTA: Lime Energy (#88E03F) glow */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 text-[14px] font-extrabold tracking-wide uppercase px-8 py-4 rounded-full btn-primary-lime"
                style={{ fontFamily: font }}
              >
                <span>{t('hero.cta1')}</span>
                <ArrowRight size={17} className={isRTL ? 'rotate-180' : ''} />
              </a>

              {/* Secondary CTA: Electric Blue (#3580E6) */}
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2.5 text-[14px] font-bold tracking-wide uppercase px-8 py-4 rounded-full btn-secondary-blue glass-card"
                style={{ fontFamily: font }}
              >
                {t('hero.cta2')}
              </a>
            </motion.div>

            {/* Stats Counter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.2, 0, 0, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3.5"
            >
              <StatBadge value={47} labelKey="hero.stat1Label" />
              <StatBadge value={35} labelKey="hero.stat2Label" />
              <StatBadge value={24} suffix="+" labelKey="hero.stat3Label" />
              <StatBadge value={3} suffix="+" labelKey="hero.stat4Label" />
            </motion.div>
          </div>

          {/* Right Column: Atomic Precision & Neural Rings Visual Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0, 0, 1] }}
            className="hidden lg:flex lg:col-span-4 items-center justify-center relative"
          >
            {/* Frosted Glass Atomic Orbit Hub */}
            <div
              className="relative w-[340px] h-[340px] rounded-3xl glass-card flex flex-col items-center justify-center p-8 text-center"
              style={{
                boxShadow: '0 0 60px rgba(0, 128, 132, 0.25), inset 0 0 30px rgba(53, 128, 230, 0.1)',
                borderColor: 'rgba(0, 128, 132, 0.4)',
              }}
            >
              {/* Outer pulsing ring */}
              <div
                className="absolute inset-0 rounded-3xl border border-dashed animate-orbit opacity-30 pointer-events-none"
                style={{ borderColor: '#3580E6' }}
              />

              {/* Big Atomic Mark */}
              <div className="relative mb-5 animate-pulse">
                <AtomizeMark size={140} />
              </div>

              {/* Brand Label */}
              <div className="text-[20px] font-black tracking-tight mb-1" style={{ color: '#008084' }}>
                Atomize<span style={{ color: '#3580E6' }}>-</span><span style={{ color: '#88E03F' }}>AI</span>
              </div>
              <p className="text-[12px] font-semibold text-slate-400">
                Foundational Connectivity & Intelligent Systems
              </p>

              {/* Bottom connection status */}
              <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border" style={{ borderColor: 'rgba(136, 224, 63, 0.3)', backgroundColor: 'rgba(136, 224, 63, 0.1)', color: '#88E03F' }}>
                <span className="w-2 h-2 rounded-full bg-[#88E03F] animate-ping" />
                SYSTEM ONLINE
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown size={22} style={{ color: 'var(--cyber-teal)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
