import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

const tierKeys = ['quickLaunch', 'fullBuild', 'enterprise'] as const

export default function Pricing() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  return (
    <section id="pricing" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('pricing.label')}
          </p>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] mb-4" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('pricing.title')}
          </h2>
          <p className="text-[16px] leading-[1.7] max-w-[480px] mx-auto" style={{ color: 'var(--text-sub)', fontFamily: font }}>
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tierKeys.map((key, i) => {
            const isMiddle = i === 1
            const features = t(`pricing.tiers.${key}.features`, { returnObjects: true }) as string[]

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02] ${isMiddle ? 'md:-mt-4 md:mb-4' : ''}`}
                style={{
                  backgroundColor: isMiddle ? 'var(--surface)' : 'var(--bg)',
                  borderColor: isMiddle ? 'var(--accent)' : 'var(--border)',
                  boxShadow: isMiddle ? '0 0 40px var(--glow)' : 'none',
                }}
                onMouseEnter={e => {
                  if (!isMiddle) {
                    e.currentTarget.style.borderColor = 'var(--border-h)'
                    e.currentTarget.style.boxShadow = '0 0 25px var(--glow)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isMiddle) {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                {/* Popular badge */}
                {isMiddle && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                  >
                    {t('pricing.mostPopular')}
                  </div>
                )}

                <h3 className="text-[22px] font-black mb-2" style={{ fontFamily: font, color: 'var(--text)' }}>
                  {isRTL ? t(`pricing.tiers.${key}.nameAr`) : t(`pricing.tiers.${key}.name`)}
                </h3>
                <p className="text-[14px] leading-[1.65] mb-8" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                  {t(`pricing.tiers.${key}.desc`)}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-10">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[14px]" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                      <Check size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="block text-center py-3.5 rounded-xl text-[14px] font-bold transition-all duration-200 hover:scale-[1.02]"
                  style={
                    isMiddle
                      ? { backgroundColor: 'var(--accent)', color: 'var(--bg)' }
                      : { border: '1px solid var(--border)', color: 'var(--text)' }
                  }
                  onMouseEnter={e => {
                    if (!isMiddle) {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.color = 'var(--accent)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isMiddle) {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text)'
                    }
                  }}
                >
                  {t('pricing.contactUs')}
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
