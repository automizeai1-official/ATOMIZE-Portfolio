import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'
import AtomizeLogo from '../components/AtomizeLogo'
import { socialLinks } from '../data/socials'

export default function Footer() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  const navLinks = [
    { key: 'services', href: '#services' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'process', href: '#process' },
    { key: 'contact', href: '#contact' },
    { key: 'faq', href: '#faq' },
  ]

  return (
    <footer className="border-t glass-card" style={{ backgroundColor: 'var(--surface-solid)', borderColor: 'var(--border)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <a href="#" className="mb-4 inline-block">
              <AtomizeLogo size={36} />
            </a>
            <p className="text-[14px] leading-[1.7] mb-5 max-w-[340px]" style={{ color: 'var(--text-sub)', fontFamily: font }}>
              {t('footer.tagline')}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all hover:scale-110"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-sub)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-h)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-sub)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--text-muted)', fontFamily: font }}>
              {isRTL ? 'التنقل' : 'Navigation'}
            </h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-[14px] transition-colors"
                    style={{ color: 'var(--text-sub)', fontFamily: font }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}
                  >
                    {t(`footer.links.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-wider mb-5" style={{ color: 'var(--text-muted)', fontFamily: font }}>
              {isRTL ? 'تواصل' : 'Contact'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:automizeai1@gmail.com" className="text-[13px] font-mono transition-colors" style={{ color: 'var(--text-sub)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}>
                  automizeai1@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/201112550714" target="_blank" rel="noopener noreferrer" className="text-[13px] font-mono transition-colors" style={{ color: 'var(--text-sub)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}>
                  WhatsApp: +201112550714
                </a>
              </li>
              <li>
                <a href="tel:+201112550714" className="text-[13px] font-mono transition-colors" style={{ color: 'var(--text-sub)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}>
                  +201112550714
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-[12px] font-mono" style={{ color: 'var(--text-sub)' }}>
            © {new Date().getFullYear()} Atomize-AI. {t('footer.copyright')}
          </p>
          <p className="text-[12px] font-mono" style={{ color: 'var(--text-muted)' }}>
            {t('footer.legalNote')}
          </p>
        </div>
      </div>
    </footer>
  )
}
