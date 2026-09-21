import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
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
          scrolled ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[rgba(243,243,243,0.08)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] h-[72px] flex items-center justify-between">
          <a href="#" className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] tracking-tight text-[#F3F3F3]">
            ATOMIZE
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-['Plus_Jakarta_Sans'] text-[14px] font-semibold text-[#999999] hover:text-[#F3F3F3] transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-[#FF5A00] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
              </a>
            ))}
            <a
              href="#cta"
              className="font-['Plus_Jakarta_Sans'] text-[12px] font-semibold tracking-[0.05em] uppercase bg-[#FF5A00] text-[#050505] px-6 py-2.5 rounded-full hover:bg-[#F3F3F3] hover:scale-[1.02] transition-all duration-300"
              style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
            >
              Get Started
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#F3F3F3] p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-[#050505] flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-5 right-5 text-[#F3F3F3] p-2"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.2, 0, 0, 1] }}
                onClick={() => setMenuOpen(false)}
                className="font-['Plus_Jakarta_Sans'] text-[32px] font-bold text-[#F3F3F3] hover:text-[#FF5A00] transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4, ease: [0.2, 0, 0, 1] }}
              onClick={() => setMenuOpen(false)}
              className="mt-4 font-['Plus_Jakarta_Sans'] text-[14px] font-semibold tracking-[0.05em] uppercase bg-[#FF5A00] text-[#050505] px-8 py-3 rounded-full"
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
