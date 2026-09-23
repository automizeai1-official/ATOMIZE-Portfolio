import { motion } from 'framer-motion'
import { useThemeContext } from '../context/ThemeContext'

export default function LanguageToggle() {
  const { lang, toggleLang } = useThemeContext()

  return (
    <button
      onClick={toggleLang}
      className="relative flex items-center gap-0 rounded-full border overflow-hidden text-[12px] font-bold tracking-wider"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
      aria-label="Toggle language"
    >
      {(['ar', 'en'] as const).map((l) => (
        <span
          key={l}
          className="relative px-3 py-1.5 transition-all duration-300 z-10"
          style={{
            color: lang === l ? 'var(--bg)' : 'var(--text-sub)',
            fontFamily: l === 'ar' ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {l === 'ar' ? 'ع' : 'EN'}
          {lang === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full z-[-1]"
              style={{ backgroundColor: 'var(--accent)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            />
          )}
        </span>
      ))}
    </button>
  )
}
