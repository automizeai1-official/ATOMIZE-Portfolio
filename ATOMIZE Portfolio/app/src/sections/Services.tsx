import { motion } from 'framer-motion'
import { ArrowUpRight, Globe, Bot, ShoppingCart, Lightbulb, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

const serviceKeys = ['web', 'ai', 'ecommerce', 'consulting', 'maintenance'] as const
const serviceIcons = {
  web: Globe,
  ai: Bot,
  ecommerce: ShoppingCart,
  consulting: Lightbulb,
  maintenance: Wrench,
}

export default function Services() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  return (
    <section id="services" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
          className="mb-16 md:mb-20"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('services.label')}
          </p>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] tracking-tight mb-4 max-w-[600px]" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('services.title')}
          </h2>
          <p className="text-[16px] leading-[1.7] max-w-[540px]" style={{ color: 'var(--text-sub)', fontFamily: font }}>
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid — 2 large top + 3 smaller bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceKeys.map((key, i) => {
            const Icon = serviceIcons[key]
            const features = t(`services.items.${key}.features`, { returnObjects: true }) as string[]
            const isLarge = i < 2

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.015] ${
                  isLarge && i === 0 ? 'lg:col-span-1 md:row-span-1' : ''
                }`}
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--border-h)'
                  e.currentTarget.style.boxShadow = '0 0 40px var(--glow)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Top accent bar */}
                <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--surface2)' }}>
                  <div
                    className="h-full w-0 group-hover:w-full transition-all duration-500"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                </div>

                <div className="p-7 md:p-8">
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--surface2)', color: 'var(--accent)' }}
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="text-[20px] font-bold mb-3" style={{ fontFamily: font, color: 'var(--text)' }}>
                    {t(`services.items.${key}.title`)}
                  </h3>
                  <p className="text-[14px] leading-[1.65] mb-6" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                    {t(`services.items.${key}.desc`)}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-7">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13px]" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: 'var(--accent)' }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200"
                    style={{ color: 'var(--text-sub)', fontFamily: font }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}
                  >
                    {t('services.cta')}
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
