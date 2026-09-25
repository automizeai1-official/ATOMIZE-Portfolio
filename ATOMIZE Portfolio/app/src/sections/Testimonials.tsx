import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

const testimonials = [
  {
    nameAr: 'أحمد محمد', nameEn: 'Ahmed Mohamed',
    roleAr: 'مؤسس شركة ناشئة', roleEn: 'Startup Founder',
    projectAr: 'منصة ويب متكاملة', projectEn: 'Full Web Platform',
    textAr: 'نجح فريق ATOMIZE في تحويل رؤيتنا إلى منصة رقمية متكاملة تفوق التوقعات. تميزوا بالدقة الهندسية العالية والالتزام الصارم بجدول التسليم.',
    textEn: 'ATOMIZE turned our vision into a world-class digital platform that exceeded expectations. Exceptional engineering and strict adherence to timelines.',
    avatar: '👨‍💼',
    accentColor: '#008084',
    stars: 5,
  },
  {
    nameAr: 'سارة عبدالله', nameEn: 'Sara Abdullah',
    roleAr: 'مديرة تجارة إلكترونية', roleEn: 'E-Commerce Manager',
    projectAr: 'متجر Shopify مخصص', projectEn: 'Custom Shopify Store',
    textAr: 'تطوير متجرنا مع ATOMIZE أحدث نقلة نوعية في تجربة الشراء ومعدلات التحويل. فريق استشاري خبير يفهم أدق تفاصيل التجارة الإلكترونية.',
    textEn: 'Building our store with ATOMIZE created a measurable leap in user experience and conversion rates. A true technical partner we rely on.',
    avatar: '👩‍💼',
    accentColor: '#1D63BD',
    stars: 5,
  },
  {
    nameAr: 'خالد إبراهيم', nameEn: 'Khaled Ibrahim',
    roleAr: 'مدير العمليات والتشغيل', roleEn: 'Operations Director',
    projectAr: 'أتمتة وذكاء اصطناعي', projectEn: 'AI & Workflow Automation',
    textAr: 'حلول أتمتة العمليات والذكاء الاصطناعي التي طوروها لنا وفرت مئات الساعات التشغيلية شهرياً، مع دعم فني مستمر واستجابة فورية بأعلى احترافية.',
    textEn: 'The workflow automation and AI systems they built save us hundreds of operational hours monthly, backed by responsive post-launch engineering support.',
    avatar: '👨‍💻',
    accentColor: '#008084',
    stars: 5,
  },
]

function StarRating({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex items-center gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill={color} color={color} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 4500)
    return () => clearInterval(timer)
  }, [next, paused])

  return (
    <section id="testimonials" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('testimonials.label')}
          </p>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1]" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('testimonials.title')}
          </h2>
        </motion.div>

        {/* Desktop: 3 cards visible — active one highlighted */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.map((tm, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative p-7 rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col"
              style={{
                backgroundColor: i === current ? 'var(--surface2)' : 'var(--bg)',
                borderColor: i === current ? tm.accentColor + '60' : 'var(--border)',
                boxShadow: i === current ? `0 0 30px ${tm.accentColor}18` : 'none',
                transform: i === current ? 'translateY(-4px)' : 'none',
              }}
              onClick={() => setCurrent(i)}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <Quote size={24} className="mb-3 opacity-50" style={{ color: tm.accentColor }} />
              <StarRating count={tm.stars} color={tm.accentColor} />
              <p className="text-[14px] leading-[1.75] mb-6 flex-1 italic" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                "{isRTL ? tm.textAr : tm.textEn}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[20px]"
                  style={{ backgroundColor: tm.accentColor + '20' }}
                >
                  {tm.avatar}
                </div>
                <div>
                  <div className="text-[14px] font-bold" style={{ color: 'var(--text)', fontFamily: font }}>
                    {isRTL ? tm.nameAr : tm.nameEn}
                  </div>
                  <div className="text-[12px]" style={{ color: 'var(--text-sub)' }}>
                    {isRTL ? tm.roleAr : tm.roleEn} · {isRTL ? tm.projectAr : tm.projectEn}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRTL ? 40 : -40 }}
              transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
              className="p-7 rounded-2xl border flex flex-col"
              style={{
                backgroundColor: 'var(--bg)',
                borderColor: testimonials[current].accentColor + '50',
                boxShadow: `0 0 30px ${testimonials[current].accentColor}15`,
              }}
            >
              <Quote size={24} className="mb-3 opacity-50" style={{ color: testimonials[current].accentColor }} />
              <StarRating count={testimonials[current].stars} color={testimonials[current].accentColor} />
              <p className="text-[14px] leading-[1.75] mb-6 italic" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                "{isRTL ? testimonials[current].textAr : testimonials[current].textEn}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-[20px]"
                  style={{ backgroundColor: testimonials[current].accentColor + '20' }}
                >
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div className="text-[14px] font-bold" style={{ color: 'var(--text)', fontFamily: font }}>
                    {isRTL ? testimonials[current].nameAr : testimonials[current].nameEn}
                  </div>
                  <div className="text-[12px]" style={{ color: 'var(--text-sub)' }}>
                    {isRTL ? testimonials[current].roleAr : testimonials[current].roleEn}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-4">
            <button onClick={prev} className="w-9 h-9 rounded-full glass-card flex items-center justify-center transition-all hover:scale-110" style={{ color: 'var(--text-sub)', borderColor: 'var(--border)' }}>
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '22px' : '8px',
                    backgroundColor: i === current ? 'var(--accent)' : 'var(--border)',
                  }}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 rounded-full glass-card flex items-center justify-center transition-all hover:scale-110" style={{ color: 'var(--text-sub)', borderColor: 'var(--border)' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Dot nav (desktop) */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === current ? '22px' : '8px',
                backgroundColor: i === current ? 'var(--accent)' : 'var(--border)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
