import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

export default function StickyFloatingCTA() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  useEffect(() => {
    if (dismissed) return
    const handleScroll = () => {
      const heroEl = document.getElementById('hero')
      const threshold = heroEl ? heroEl.offsetHeight * 0.85 : 600
      setVisible(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pointer-events-none"
        >
          <div
            className="max-w-[680px] mx-auto glass-card rounded-2xl px-5 py-3.5 flex items-center justify-between gap-3 shadow-2xl pointer-events-auto"
            style={{
              borderColor: 'var(--border-h)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18), 0 0 30px var(--glow-teal)',
            }}
          >
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <p
                className="text-[14px] font-bold truncate"
                style={{ color: 'var(--text)', fontFamily: font }}
              >
                {t('sticky.text')}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="#contact"
                onClick={() => setDismissed(true)}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-extrabold btn-primary-lime whitespace-nowrap"
                style={{ fontFamily: font }}
              >
                {t('sticky.cta')}
                <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
              </a>
              <button
                onClick={() => setDismissed(true)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:opacity-60"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
