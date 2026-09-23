import { motion } from 'framer-motion'
import { Search, Layers, Code2, CheckCircle2, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

const stepKeys = ['discovery', 'design', 'development', 'testing', 'launch'] as const
const stepIcons = [Search, Layers, Code2, CheckCircle2, Rocket]

export default function HowItWorks() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  return (
    <section id="process" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('process.label')}
          </p>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] mb-4" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('process.title')}
          </h2>
          <p className="text-[16px] leading-[1.7] max-w-[500px] mx-auto" style={{ color: 'var(--text-sub)', fontFamily: font }}>
            {t('process.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[1px]"
            style={{ backgroundColor: 'var(--border)' }}
          />

          {stepKeys.map((key, i) => {
            const Icon = stepIcons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.2, 0, 0, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step number badge */}
                <div
                  className="relative z-10 w-[56px] h-[56px] rounded-full border-2 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--accent)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.boxShadow = '0 0 20px var(--glow)'
                    e.currentTarget.style.backgroundColor = 'var(--surface2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.backgroundColor = 'var(--surface)'
                  }}
                >
                  <Icon size={22} />
                  <span
                    className="absolute -top-2 -end-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
                  >
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold mb-2" style={{ fontFamily: font, color: 'var(--text)' }}>
                  {t(`process.steps.${key}.title`)}
                </h3>
                <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                  {t(`process.steps.${key}.desc`)}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
