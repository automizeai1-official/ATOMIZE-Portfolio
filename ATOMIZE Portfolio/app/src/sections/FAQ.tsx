import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

const categoryColors: Record<string, string> = {
  process: '#008084',
  pricing: '#88E03F',
  technical: '#3580E6',
  support: '#B347FF',
}

export default function FAQ() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const items = t('faq.items', { returnObjects: true }) as { q: string; a: string; category: string }[]
  const [open, setOpen] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categoryKeys = ['process', 'pricing', 'technical', 'support']

  const filtered = useMemo(() => {
    return items.filter(item => {
      const matchesQuery = !query || item.q.toLowerCase().includes(query.toLowerCase()) || item.a.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !activeCategory || item.category === activeCategory
      return matchesQuery && matchesCategory
    })
  }, [items, query, activeCategory])

  return (
    <section id="faq" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-[900px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('faq.label')}
          </p>
          <h2 className="text-[clamp(28px,4vw,48px)] font-black leading-[1.1] mb-8" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('faq.title')}
          </h2>

          {/* Search box */}
          <div className="relative max-w-[460px] mx-auto mb-6">
            <Search
              size={16}
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'var(--text-muted)', [isRTL ? 'right' : 'left']: '16px' }}
            />
            <input
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(null) }}
              placeholder={t('faq.searchPlaceholder')}
              className="w-full rounded-xl border text-[14px] outline-none transition-all"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
                fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif',
                padding: isRTL ? '12px 44px 12px 16px' : '12px 16px 12px 44px',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => { setActiveCategory(null); setOpen(null) }}
              className="px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all"
              style={{
                fontFamily: font,
                backgroundColor: !activeCategory ? 'var(--accent)' : 'transparent',
                color: !activeCategory ? 'var(--bg)' : 'var(--text-sub)',
                borderColor: !activeCategory ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {isRTL ? 'الكل' : 'All'}
            </button>
            {categoryKeys.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setOpen(null) }}
                className="px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all"
                style={{
                  fontFamily: font,
                  backgroundColor: activeCategory === cat ? categoryColors[cat] + '20' : 'transparent',
                  color: activeCategory === cat ? categoryColors[cat] : 'var(--text-sub)',
                  borderColor: activeCategory === cat ? categoryColors[cat] + '60' : 'var(--border)',
                }}
              >
                {t(`faq.categories.${cat}`)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Items */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-[15px]"
                style={{ color: 'var(--text-muted)', fontFamily: font }}
              >
                {t('faq.noResults')}
              </motion.p>
            ) : (
              filtered.map((item, i) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
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
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {item.category && (
                        <span
                          className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: (categoryColors[item.category] || 'var(--accent)') + '18',
                            color: categoryColors[item.category] || 'var(--accent)',
                          }}
                        >
                          {t(`faq.categories.${item.category}`)}
                        </span>
                      )}
                      <span className="text-[15px] font-semibold" style={{ fontFamily: font }}>
                        {item.q}
                      </span>
                    </div>
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
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-[15px] font-semibold" style={{ color: 'var(--text-sub)', fontFamily: font }}>
            {t('faq.stillHaveQuestions')}
          </p>
          <a
            href="https://wa.me/201112550714"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-bold transition-all hover:scale-105"
            style={{
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              boxShadow: '0 0 20px rgba(37, 211, 102, 0.30)',
              fontFamily: font,
            }}
          >
            <MessageCircle size={16} />
            {t('faq.askOnWhatsapp')}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
