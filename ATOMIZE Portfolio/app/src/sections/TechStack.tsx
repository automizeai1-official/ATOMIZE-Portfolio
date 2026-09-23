import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'
import { techStack, type Tech } from '../data/techStack'

type Category = Tech['category']

const categoryKeys: Category[] = ['frontend', 'backend', 'mobile', 'ai', 'ecommerce', 'devops']

export default function TechStack() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')

  const filtered = activeCategory === 'all' ? techStack : techStack.filter(t => t.category === activeCategory)

  return (
    <section id="tech-stack" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('techStack.label')}
          </p>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] mb-4" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('techStack.title')}
          </h2>
          <p className="text-[16px] leading-[1.7] max-w-[480px] mx-auto" style={{ color: 'var(--text-sub)', fontFamily: font }}>
            {t('techStack.subtitle')}
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory('all')}
            className="px-4 py-2 rounded-full text-[12px] font-semibold border transition-all"
            style={{
              fontFamily: font,
              backgroundColor: activeCategory === 'all' ? 'var(--accent)' : 'transparent',
              color: activeCategory === 'all' ? 'var(--bg)' : 'var(--text-sub)',
              borderColor: activeCategory === 'all' ? 'var(--accent)' : 'var(--border)',
            }}
          >
            {isRTL ? 'الكل' : 'All'}
          </button>
          {categoryKeys.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-[12px] font-semibold border transition-all"
              style={{
                fontFamily: font,
                backgroundColor: activeCategory === cat ? 'var(--accent)' : 'transparent',
                color: activeCategory === cat ? 'var(--bg)' : 'var(--text-sub)',
                borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {t(`techStack.categories.${cat}`)}
            </button>
          ))}
        </motion.div>

        {/* Tech badges grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {filtered.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.2, 0, 0, 1] }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="group flex items-center gap-2.5 px-4 py-3 rounded-xl border text-[13px] font-semibold cursor-default transition-all duration-200"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text-sub)',
                fontFamily: 'JetBrains Mono, monospace',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = tech.color + '60'
                e.currentTarget.style.color = tech.color
                e.currentTarget.style.boxShadow = `0 0 20px ${tech.color}25`
                e.currentTarget.style.backgroundColor = tech.color + '10'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-sub)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.backgroundColor = 'var(--surface)'
              }}
            >
              <span className="text-[18px]">{tech.icon}</span>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
