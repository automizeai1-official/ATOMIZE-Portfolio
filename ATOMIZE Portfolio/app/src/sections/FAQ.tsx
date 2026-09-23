import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

export default function FAQ() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const items = t('faq.items', { returnObjects: true }) as { q: string; a: string }[]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-[900px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('faq.label')}
          </p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black leading-[1.1]" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('faq.title')}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-xl border overflow-hidden"
              style={{
                borderColor: open === i ? 'var(--border-h)' : 'var(--border)',
                backgroundColor: 'var(--surface)',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-start transition-colors"
                style={{ color: 'var(--text)' }}
              >
                <span className="text-[15px] font-semibold" style={{ fontFamily: font }}>
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 transition-transform duration-300"
                  style={{
                    color: 'var(--text-sub)',
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-6 pb-6 text-[14px] leading-[1.75]"
                      style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}
                    >
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
