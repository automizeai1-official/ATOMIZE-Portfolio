import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useThemeContext } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeContext()
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        borderColor: 'var(--border)',
        color: 'var(--text)',
        backgroundColor: 'var(--surface)',
        boxShadow: isDark ? '0 0 12px rgba(136, 224, 63, 0.12)' : '0 0 12px rgba(0, 128, 132, 0.12)',
      }}
      title={isDark ? t('theme.light') : t('theme.dark')}
      aria-label="Toggle Night/Light Mode"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center justify-center text-[14px]"
      >
        {isDark ? (
          <Sun size={15} className="text-[#88E03F]" />
        ) : (
          <Moon size={15} className="text-[#008084]" />
        )}
      </motion.div>
      <span className="hidden sm:inline text-[11px] font-bold" style={{ color: 'var(--text)' }}>
        {isDark ? t('theme.light') : t('theme.dark')}
      </span>
    </button>
  )
}
