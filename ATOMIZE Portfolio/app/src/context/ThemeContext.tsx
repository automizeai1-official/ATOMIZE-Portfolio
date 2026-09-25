import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export type Theme = 'dark' | 'light'
export type Lang = 'ar' | 'en'

interface ThemeContextType {
  theme: Theme
  setTheme: (t: Theme) => void
  toggleTheme: () => void
  lang: Lang
  toggleLang: () => void
  isRTL: boolean
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('atomize-theme')
    return saved === 'light' ? 'light' : 'dark'
  })
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('atomize-lang') as Lang) || 'ar'
  })

  const isRTL = lang === 'ar'

  const setTheme = (t: Theme) => {
    setThemeState(t)
    localStorage.setItem('atomize-theme', t)
  }

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }

  const toggleLang = () => {
    const next: Lang = lang === 'ar' ? 'en' : 'ar'
    setLang(next)
    localStorage.setItem('atomize-lang', next)
  }

  // Apply theme and lang to <html>
  useEffect(() => {
    const html = document.documentElement
    html.setAttribute('data-theme', theme)
    html.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
    html.setAttribute('lang', lang)
    i18n.changeLanguage(lang)
  }, [theme, lang, isRTL, i18n])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, lang, toggleLang, isRTL }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeContext must be used inside ThemeProvider')
  return ctx
}
