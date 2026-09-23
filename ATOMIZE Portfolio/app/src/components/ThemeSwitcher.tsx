import { Palette } from 'lucide-react'
import { useThemeContext, type Theme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'

const themes: { id: Theme; labelKey: string; dot: string }[] = [
  { id: 'cyberpunk', labelKey: 'theme.cyberpunk', dot: '#88E03F' },
  { id: 'navy-emerald', labelKey: 'theme.navy', dot: '#008084' },
  { id: 'neon-purple', labelKey: 'theme.neon', dot: '#3580E6' },
]

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeContext()
  const { t } = useTranslation()
  const current = themes.find(t => t.id === theme)!

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-semibold transition-all"
        style={{ borderColor: 'var(--border)', color: 'var(--text-sub)', backgroundColor: 'var(--surface)' }}
      >
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: current.dot, boxShadow: `0 0 6px ${current.dot}` }}
        />
        <Palette size={12} />
      </button>

      {/* Dropdown */}
      <div
        className="absolute top-full mt-2 end-0 rounded-xl border p-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 min-w-[160px]"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {themes.map((th) => (
          <button
            key={th.id}
            onClick={() => setTheme(th.id)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors text-start"
            style={{
              color: theme === th.id ? 'var(--text)' : 'var(--text-sub)',
              backgroundColor: theme === th.id ? 'var(--surface2)' : 'transparent',
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: th.dot, boxShadow: theme === th.id ? `0 0 8px ${th.dot}` : 'none' }}
            />
            {t(th.labelKey)}
          </button>
        ))}
      </div>
    </div>
  )
}
