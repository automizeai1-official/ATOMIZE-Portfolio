import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'
import ThemeSwitcher from './ThemeSwitcher'
import LanguageToggle from './LanguageToggle'
import AtomizeLogo from './AtomizeLogo'
import { socialLinks } from '../data/socials'

const navLinks = [
  { key: 'services', href: '#services' },
  { key: 'portfolio', href: '#portfolio' },
  { key: 'techStack', href: '#tech-stack' },
  { key: 'process', href: '#process' },
  { key: 'whyUs', href: '#why-us' },
  { key: 'contact', href: '#contact' },
]

export default function Header() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md border-b'
            : 'bg-transparent'
        }`}
        style={scrolled ? {
          backgroundColor: 'rgba(var(--bg-rgb, 5,5,5), 0.92)',
          borderBottomColor: 'var(--border)',
          backdropFilter: 'blur(16px)',
          background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
        } : {}}
      >
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] h-[72px] flex items-center justify-between gap-4">
          {/* Official Atomize-AI Brand Logo */}
          <a href="#" className="shrink-0 group">
            <AtomizeLogo size={36} />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-[13px] font-semibold transition-colors duration-200 relative group"
                style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif" }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}
              >
                {t(`nav.${link.key}`)}
                <span
                  className="absolute -bottom-1 left-1/2 w-0 h-[2px] group-hover:w-full group-hover:left-0 transition-all duration-300"
                  style={{ backgroundColor: 'var(--accent)' }}
                />
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Social Icons */}
            <div className="flex items-center gap-2 me-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-200 hover:scale-110 p-1.5 rounded-lg border flex items-center justify-center"
                  style={{ color: 'var(--text-sub)', borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.borderColor = 'var(--border-h)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-sub)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <LanguageToggle />
            <ThemeSwitcher />

            <a
              href="#contact"
              className="text-[13px] font-extrabold tracking-wide uppercase px-6 py-2.5 rounded-full transition-all duration-300 btn-primary-lime shrink-0 shadow-lg"
              style={{
                fontFamily: isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {t('nav.getStarted')}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 transition-colors"
            style={{ color: 'var(--text)' }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: 'var(--bg)' }}
          >
            <button
              className="absolute top-5 right-5 p-2"
              style={{ color: 'var(--text)' }}
              onClick={() => setMenuOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Mobile Social Row */}
            <div className="flex items-center gap-4 mb-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-110"
                  style={{ color: 'var(--text-sub)' }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.2, 0, 0, 1] }}
                onClick={() => setMenuOpen(false)}
                className="text-[28px] font-bold transition-colors duration-200"
                style={{
                  fontFamily: isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif",
                  color: 'var(--text)',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}
              >
                {t(`nav.${link.key}`)}
              </motion.a>
            ))}

            <div className="flex items-center gap-3 mt-4">
              <LanguageToggle />
              <ThemeSwitcher />
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              className="mt-2 text-[14px] font-bold tracking-[0.05em] uppercase px-8 py-3.5 rounded-full"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
            >
              {t('nav.getStarted')}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
