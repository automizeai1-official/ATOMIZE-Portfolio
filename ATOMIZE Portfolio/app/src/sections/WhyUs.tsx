import { motion } from 'framer-motion'
import { Zap, Award, HeartHandshake, DollarSign } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'
import { useCounter } from '../hooks/useCounter'

const cardKeys = ['speed', 'quality', 'support', 'price'] as const
const cardIcons = { speed: Zap, quality: Award, support: HeartHandshake, price: DollarSign }
const cardColors = ['var(--cyber-teal)', 'var(--electric-blue)', 'var(--accent)', 'var(--cyber-teal)']

function AnimatedStat({ value, suffix = '+', labelKey }: { value: number; suffix?: string; labelKey: string }) {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const { count, ref } = useCounter(value, 2200)
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  return (
    <div ref={ref} className="text-center">
      <div className="text-[48px] sm:text-[56px] font-black leading-none mb-2" style={{ color: 'var(--accent)', fontFamily: font }}>
        {count}{suffix}
      </div>
      <div className="text-[13px] font-semibold" style={{ color: 'var(--text-sub)', fontFamily: font }}>
        {t(labelKey)}
      </div>
    </div>
  )
}

export default function WhyUs() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  return (
    <section id="why-us" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('whyUs.label')}
          </p>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] mb-4" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('whyUs.title')}
          </h2>
          <p className="text-[16px] leading-[1.7] max-w-[480px]" style={{ color: 'var(--text-sub)', fontFamily: font }}>
            {t('whyUs.subtitle')}
          </p>
        </motion.div>

        {/* Stats panel — glassmorphic with gradient background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 p-10 rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Gradient background accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, rgba(0,128,132,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(53,128,230,0.06) 0%, transparent 60%)',
            }}
          />
          <AnimatedStat value={17} labelKey="whyUs.stats.projects" />
          <AnimatedStat value={8} labelKey="whyUs.stats.clients" />
          <AnimatedStat value={24} labelKey="whyUs.stats.tech" />
          <AnimatedStat value={3} labelKey="whyUs.stats.years" />
        </motion.div>

        {/* Differentiator cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardKeys.map((key, i) => {
            const Icon = cardIcons[key]
            const color = cardColors[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-h)'
                  e.currentTarget.style.boxShadow = '0 0 30px var(--glow)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Colored top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ backgroundColor: color }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                  style={{ backgroundColor: 'var(--surface2)', color: color }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="text-[17px] font-bold mb-2" style={{ fontFamily: font, color: 'var(--text)' }}>
                  {t(`whyUs.cards.${key}.title`)}
                </h3>
                <p className="text-[13px] leading-[1.6]" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                  {t(`whyUs.cards.${key}.desc`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
