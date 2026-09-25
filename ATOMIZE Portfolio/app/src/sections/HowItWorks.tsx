import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, Layers, Code2, CheckCircle2, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

const stepKeys = ['discovery', 'design', 'development', 'testing', 'launch'] as const
const stepIcons = [Search, Layers, Code2, CheckCircle2, Rocket]

export default function HowItWorks() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const lineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(lineRef, { once: true, margin: '-100px' })

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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4 relative" ref={lineRef}>
          {/* Animated connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-[27px] left-[10%] right-[10%] h-[2px] overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            <motion.div
              className="h-full"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.8, ease: [0.2, 0, 0, 1], delay: 0.3 }}
              style={{
                transformOrigin: isRTL ? 'right' : 'left',
                background: 'linear-gradient(90deg, #008084 0%, #3580E6 50%, #88E03F 100%)',
              }}
            />
          </div>

          {/* Mobile vertical line */}
          <div
            className="md:hidden absolute start-[27px] top-[56px] bottom-[56px] w-[2px] overflow-hidden"
            style={{ backgroundColor: 'var(--border)' }}
          >
            <motion.div
              className="w-full"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2, ease: [0.2, 0, 0, 1], delay: 0.3 }}
              style={{
                transformOrigin: 'top',
                height: '100%',
                background: 'linear-gradient(180deg, #008084 0%, #3580E6 50%, #88E03F 100%)',
              }}
            />
          </div>

          {stepKeys.map((key, i) => {
            const Icon = stepIcons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.2, 0, 0, 1] }}
                className="relative flex md:flex-col items-start md:items-center md:text-center gap-5 md:gap-0 group ps-14 md:ps-0"
              >
                {/* Step node */}
                <motion.div
                  className="relative z-10 w-[54px] h-[54px] rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shrink-0 absolute start-0 md:static md:mb-5"
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
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
                </motion.div>

                <div className="pt-1 md:pt-0">
                  <h3 className="text-[16px] font-bold mb-2" style={{ fontFamily: font, color: 'var(--text)' }}>
                    {t(`process.steps.${key}.title`)}
                  </h3>
                  <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                    {t(`process.steps.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
