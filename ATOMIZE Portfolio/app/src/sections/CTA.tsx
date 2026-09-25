import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'
import { useThemeContext } from '../context/ThemeContext'

export default function CTA() {
  const [hovered, setHovered] = useState(false)
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  return (
    <section
      id="cta"
      className="relative py-[120px] md:py-[160px] border-y"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0,128,132,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(53,128,230,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <h2
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="font-black text-[clamp(32px,5vw,64px)] leading-[1.1] tracking-[-0.01em] mb-6 inline-block transition-all duration-300"
            style={{
              fontFamily: font,
              color: 'var(--text)',
              ...(hovered ? {
                background: 'linear-gradient(135deg, var(--cyber-teal), var(--electric-blue), var(--lime-energy))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              } : {}),
            }}
          >
            {isRTL ? 'لنبدأ في بناء مستقبلك الرقمي اليوم.' : 'Turn your project into a high-value digital asset.'}
          </h2>

          <p
            className="text-[16px] md:text-[18px] leading-[1.6] max-w-[520px] mx-auto mb-10"
            style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}
          >
            {isRTL
              ? 'احجز جلسة استشارية متخصصة لمناقشة أهدافك وخيارات التطوير الأنسب لمشروعك.'
              : 'Book a free strategy consultation to discuss your vision and development roadmap.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase px-8 py-4 rounded-full btn-primary-lime transition-all duration-300"
              style={{ fontFamily: font }}
            >
              {isRTL ? 'تواصل معنا الآن' : 'Get in Touch'}
              <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
            </a>
            <a
              href="mailto:automizeai1@gmail.com"
              className="inline-flex items-center gap-2 text-[13px] font-bold uppercase px-8 py-4 rounded-full border transition-all duration-300"
              style={{
                fontFamily: font,
                color: 'var(--text)',
                borderColor: 'var(--border)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-h)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text)'
              }}
            >
              <Mail size={14} />
              {isRTL ? 'راسلنا عبر البريد' : 'Email us instead'}
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://wa.me/201112550714"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#25D366')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <span style={{ color: 'var(--border-h)' }}>·</span>
            <a
              href="mailto:automizeai1@gmail.com"
              className="text-[14px] font-mono transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              automizeai1@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
