import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'
import { socialLinks } from '../data/socials'

type Tab = 'consultation' | 'estimation'

function InputField({ label, placeholder, name, type = 'text', isRTL }: {
  label: string; placeholder: string; name: string; type?: string; isRTL: boolean
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-sub)' }}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-all"
        style={{
          backgroundColor: 'var(--surface2)',
          borderColor: 'var(--border)',
          color: 'var(--text)',
          fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--accent)'
          e.target.style.boxShadow = '0 0 0 3px var(--glow)'
        }}
        onBlur={e => {
          e.target.style.borderColor = 'var(--border)'
          e.target.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

function SelectField({ label, options, isRTL }: { label: string; options: string[]; isRTL: boolean }) {
  return (
    <div>
      <label className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-sub)' }}>{label}</label>
      <select
        className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-all"
        style={{
          backgroundColor: 'var(--surface2)',
          borderColor: 'var(--border)',
          color: 'var(--text)',
          fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif',
        }}
        onFocus={e => { e.target.style.borderColor = 'var(--accent)' }}
        onBlur={e => { e.target.style.borderColor = 'var(--border)' }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const [activeTab, setActiveTab] = useState<Tab>('consultation')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const serviceOptions = t('contact.form.services', { returnObjects: true }) as string[]
  const budgetOptions = t('contact.form.budgets', { returnObjects: true }) as string[]
  const timelineOptions = t('contact.form.timelines', { returnObjects: true }) as string[]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || '-'}\nMessage: ${data.get('message') || data.get('brief')}`
    window.location.href = `mailto:automizeai1@gmail.com?subject=ATOMIZE - ${activeTab === 'consultation' ? 'Free Consultation' : 'Project Estimation'}&body=${encodeURIComponent(body)}`
    setTimeout(() => { setSending(false); setSent(true) }, 800)
  }

  return (
    <section id="contact" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('contact.label')}
          </p>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] mb-4" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('contact.title')}
          </h2>
          <p className="text-[16px] leading-[1.7] max-w-[480px]" style={{ color: 'var(--text-sub)', fontFamily: font }}>
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 rounded-2xl border p-8"
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            {/* Tabs */}
            <div className="flex rounded-xl border mb-8 p-1" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
              {(['consultation', 'estimation'] as Tab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSent(false) }}
                  className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold transition-all"
                  style={{
                    fontFamily: font,
                    backgroundColor: activeTab === tab ? 'var(--accent)' : 'transparent',
                    color: activeTab === tab ? 'var(--bg)' : 'var(--text-sub)',
                  }}
                >
                  {t(`contact.tabs.${tab}`)}
                </button>
              ))}
            </div>

            {sent ? (
              <div className="text-center py-12">
                <div className="text-[48px] mb-4">✅</div>
                <p className="text-[16px] font-semibold" style={{ color: 'var(--text)', fontFamily: font }}>
                  {t('contact.form.success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label={t('contact.form.name')} placeholder={t('contact.form.placeholders.name')} name="name" isRTL={isRTL} />
                  <InputField label={t('contact.form.email')} placeholder={t('contact.form.placeholders.email')} name="email" type="email" isRTL={isRTL} />
                </div>
                <InputField label={t('contact.form.phone')} placeholder={t('contact.form.placeholders.phone')} name="phone" type="tel" isRTL={isRTL} />

                {activeTab === 'estimation' && (
                  <>
                    <SelectField label={t('contact.form.service')} options={[t('contact.form.placeholders.service'), ...serviceOptions]} isRTL={isRTL} />
                    <SelectField label={t('contact.form.budget')} options={[t('contact.form.placeholders.budget'), ...budgetOptions]} isRTL={isRTL} />
                    <SelectField label={t('contact.form.timeline')} options={[t('contact.form.placeholders.timeline'), ...timelineOptions]} isRTL={isRTL} />
                    <div>
                      <label className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-sub)' }}>{t('contact.form.brief')}</label>
                      <textarea
                        name="brief"
                        placeholder={t('contact.form.placeholders.brief')}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-all resize-none"
                        style={{ backgroundColor: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}
                        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)' }}
                        onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                      />
                    </div>
                  </>
                )}

                {activeTab === 'consultation' && (
                  <div>
                    <label className="block text-[13px] font-semibold mb-2" style={{ color: 'var(--text-sub)' }}>{t('contact.form.message')}</label>
                    <textarea
                      name="message"
                      placeholder={t('contact.form.placeholders.message')}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-all resize-none"
                      style={{ backgroundColor: 'var(--surface2)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}
                      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--glow)' }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.01] disabled:opacity-70"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)', fontFamily: font }}
                >
                  {sending ? t('contact.form.submitting') : t('contact.form.submit')}
                  {!sending && <Send size={15} />}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info panel — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* WhatsApp */}
            <a
              href="https://wa.me/201112550714"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 hover:scale-[1.02] group"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#25D36650'; e.currentTarget.style.boxShadow = '0 0 25px #25D36620' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#25D36620', color: '#25D366' }}>
                <MessageCircle size={22} />
              </div>
              <div>
                <div className="text-[13px] font-bold" style={{ color: 'var(--text)', fontFamily: font }}>{t('contact.info.whatsapp')}</div>
                <div className="text-[13px] font-mono" style={{ color: '#25D366' }}>+20 111 255 0714</div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:automizeai1@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-h)'; e.currentTarget.style.boxShadow = '0 0 25px var(--glow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--surface2)', color: 'var(--accent)' }}>
                <Mail size={22} />
              </div>
              <div>
                <div className="text-[13px] font-bold" style={{ color: 'var(--text)', fontFamily: font }}>{t('contact.info.email')}</div>
                <div className="text-[13px] font-mono" style={{ color: 'var(--accent)' }}>automizeai1@gmail.com</div>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+201112550714"
              className="flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-h)'; e.currentTarget.style.boxShadow = '0 0 25px var(--glow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'var(--surface2)', color: 'var(--accent)' }}>
                <Phone size={22} />
              </div>
              <div>
                <div className="text-[13px] font-bold" style={{ color: 'var(--text)', fontFamily: font }}>{t('contact.info.call')}</div>
                <div className="text-[13px] font-mono" style={{ color: 'var(--accent)' }}>+201112550714</div>
              </div>
            </a>

            {/* Response time badge */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: '#00D68F' }} />
              <span className="text-[13px]" style={{ color: 'var(--text-sub)', fontFamily: font }}>
                {t('contact.info.responseTime')}
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:scale-110"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-sub)', backgroundColor: 'var(--surface)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-h)'; e.currentTarget.style.color = 'var(--accent)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-sub)' }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
