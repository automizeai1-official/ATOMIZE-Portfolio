import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

const items = [
  { emoji: '📲', nameAr: 'عطارة دهب الشيخ (Dahab Sender)', nameEn: 'Dahab Sender (Attar Dahab)' },
  { emoji: '🧩', nameAr: 'أوتيكير', nameEn: 'Auticare' },
  { emoji: '🏗️', nameAr: 'أولاد خضر', nameEn: 'Awlad Khedr' },
  { emoji: '🏢', nameAr: 'العمران للمقاولات', nameEn: 'El-Omran' },
  { emoji: '📖', nameAr: 'منصة مكث', nameEn: 'Mukth Green' },
  { emoji: '👕', nameAr: 'هيسوير', nameEn: 'Hiswear' },
  { emoji: '⚛️', nameAr: 'React', nameEn: 'React' },
  { emoji: '▲', nameAr: 'Next.js', nameEn: 'Next.js' },
  { emoji: '🔄', nameAr: 'n8n', nameEn: 'n8n' },
  { emoji: '📱', nameAr: 'Flutter', nameEn: 'Flutter' },
  { emoji: '🛒', nameAr: 'Shopify', nameEn: 'Shopify' },
]

function MarqueeItem({ emoji, name }: { emoji: string; name: string }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border mx-3 shrink-0 transition-all duration-300 hover:scale-105 cursor-default"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--surface)',
        color: 'var(--text-sub)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-h)'
        e.currentTarget.style.color = 'var(--accent)'
        e.currentTarget.style.boxShadow = '0 0 16px var(--glow-teal)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--text-sub)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span className="text-[18px]">{emoji}</span>
      <span className="text-[13px] font-semibold whitespace-nowrap">{name}</span>
    </div>
  )
}

export default function TrustedBy() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  // Double items for seamless marquee
  const doubled = [...items, ...items]

  return (
    <section className="py-14 border-y overflow-hidden" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] mb-6">
        <p
          className="text-center text-[11px] font-bold tracking-[0.15em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: font }}
        >
          {t('trustedBy.label')}
        </p>
      </div>

      <div
        className="pause-on-hover relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex animate-marquee">
          {doubled.map((item, i) => (
            <MarqueeItem
              key={i}
              emoji={item.emoji}
              name={isRTL ? item.nameAr : item.nameEn}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
