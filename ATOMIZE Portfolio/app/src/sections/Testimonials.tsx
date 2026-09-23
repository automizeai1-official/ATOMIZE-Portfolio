import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'

const testimonials = [
  {
    nameAr: 'أحمد محمد', nameEn: 'Ahmed Mohamed',
    roleAr: 'مؤسس شركة ناشئة', roleEn: 'Startup Founder',
    projectAr: 'تطبيق ويب', projectEn: 'Web App',
    textAr: 'ATOMIZE حولت فكرتي إلى منتج حقيقي في وقت قياسي. الفريق محترف جداً، الكود نظيف، والتسليم كان في الموعد تماماً.',
    textEn: 'ATOMIZE turned my idea into a real product in record time. The team is very professional, the code is clean, and delivery was exactly on time.',
    avatar: '👨‍💼',
    accentColor: '#FF5A00',
  },
  {
    nameAr: 'سارة عبدالله', nameEn: 'Sara Abdullah',
    roleAr: 'مديرة تسويق', roleEn: 'Marketing Manager',
    projectAr: 'متجر Shopify', projectEn: 'Shopify Store',
    textAr: 'المتجر الذي بنوه لنا يعمل بشكل ممتاز. ارتفعت معدلات التحويل بشكل ملحوظ بعد الإطلاق. أنصح الجميع بالتعامل مع ATOMIZE.',
    textEn: 'The store they built for us works excellently. Conversion rates increased noticeably after launch. I recommend everyone to work with ATOMIZE.',
    avatar: '👩‍💼',
    accentColor: '#00D68F',
  },
  {
    nameAr: 'خالد إبراهيم', nameEn: 'Khaled Ibrahim',
    roleAr: 'مدير عمليات', roleEn: 'Operations Manager',
    projectAr: 'أتمتة وذكاء اصطناعي', projectEn: 'AI Automation',
    textAr: 'نظام الأتمتة الذي بنوه وفّر علينا ساعات عمل يومية. التكامل مع WhatsApp كان رائعاً والدعم بعد التسليم ممتاز.',
    textEn: 'The automation system they built saves us daily work hours. The WhatsApp integration was amazing and post-launch support is excellent.',
    avatar: '👨‍💻',
    accentColor: '#B347FF',
  },
]

export default function Testimonials() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((tm, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative p-7 rounded-2xl border transition-all duration-300 hover:scale-[1.015]"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = tm.accentColor + '50'
                e.currentTarget.style.boxShadow = `0 0 30px ${tm.accentColor}15`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Quote icon */}
              <Quote size={28} className="mb-4 opacity-40" style={{ color: tm.accentColor }} />

              <p className="text-[14px] leading-[1.75] mb-6 italic" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
                "{isRTL ? tm.textAr : tm.textEn}"
              </p>

              {/* Author */}
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
      </div>
    </section>
  )
}
