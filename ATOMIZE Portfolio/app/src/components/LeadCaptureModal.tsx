import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShieldCheck, Mail, Phone, User, ArrowRight, RefreshCw, CheckCircle2, Lock } from 'lucide-react'
import { useThemeContext } from '../context/ThemeContext'

// Webhook URL configuration (reads from .env or uses active Make.com webhook)
const DEFAULT_WEBHOOK_URL = import.meta.env.VITE_OTP_WEBHOOK_URL || 'https://hook.eu1.make.com/k7u5vph1qv3xmr13hzxv57ooou96u183'

interface LeadData {
  name: string
  email: string
  phone: string
}

export default function LeadCaptureModal() {
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"

  const [isVerified, setIsVerified] = useState(() => {
    try {
      return !!localStorage.getItem('atomize_lead_verified')
    } catch {
      return false
    }
  })
  // Open immediately on load unless already verified
  const [isOpen, setIsOpen] = useState(() => !isVerified)
  const [step, setStep] = useState<'form' | 'otp' | 'success'>('form')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Form State
  const [formData, setFormData] = useState<LeadData>({ name: '', email: '', phone: '' })

  // OTP State (4 digits)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([])

  // Close modal
  const handleClose = () => {
    setIsOpen(false)
  }

  // OTP Countdown timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setCanResend(true)
    }
    return () => clearInterval(interval)
  }, [step, timer])

// Helper: Convert Arabic/Eastern digits to standard English digits
const toEnglishDigits = (str: string) => {
  return str.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString())
}

// Normalize phone number (auto prepends +20 if Egyptian 01x format is used)
const normalizePhone = (rawPhone: string) => {
  const digits = toEnglishDigits(rawPhone).trim().replace(/[^\d+]/g, '')
  if (digits.startsWith('01') && digits.length === 11) {
    return '+2' + digits
  }
  return digits
}

  // Submit Lead & Request OTP via Webhook
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    const name = formData.name.trim()
    const email = formData.email.trim()
    const formattedPhone = normalizePhone(formData.phone)

    if (!name || !email || !formattedPhone) {
      setErrorMessage(isRTL ? 'يرجى إكمال جميع الحقول المطلوبة' : 'Please fill in all fields')
      return
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setErrorMessage(isRTL ? 'يرجى إدخال بريد إلكتروني صالح' : 'Please enter a valid email address')
      return
    }

    setLoading(true)

    try {
      // Send payload to Make / Antigravity / n8n Webhook
      await fetch(DEFAULT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_otp',
          name,
          email,
          phone: formattedPhone,
          timestamp: new Date().toISOString(),
          language: isRTL ? 'ar' : 'en',
        }),
      }).catch(() => null)

      // Update phone in state to formatted version
      setFormData(prev => ({ ...prev, phone: formattedPhone }))

      // Advance to OTP step
      setStep('otp')
      setTimer(60)
      setCanResend(false)
      setTimeout(() => otpInputsRef.current[0]?.focus(), 200)
    } catch (err) {
      setErrorMessage(isRTL ? 'تعذر إرسال الرمز، يرجى المحاولة لاحقاً' : 'Failed to send code, please try again')
    } finally {
      setLoading(false)
    }
  }

  // Handle OTP digit changes
  const handleOtpChange = (index: number, rawValue: string) => {
    const value = toEnglishDigits(rawValue)
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 3) {
      otpInputsRef.current[index + 1]?.focus()
    }
  }

  // Handle OTP paste (e.g. copied from WhatsApp or Email)
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = toEnglishDigits(e.clipboardData.getData('text')).replace(/\D/g, '').slice(0, 4)
    if (pasted.length > 0) {
      const newOtp = [...otp]
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pasted[i] || ''
      }
      setOtp(newOtp)
      const focusIndex = Math.min(pasted.length, 3)
      otpInputsRef.current[focusIndex]?.focus()
    }
  }

  // Handle OTP backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus()
    }
  }

  // Verify OTP via Webhook
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    const enteredCode = otp.join('')

    if (enteredCode.length < 4) {
      setErrorMessage(isRTL ? 'يرجى إدخال رمز التحقق كاملاً (4 أرقام)' : 'Please enter the 4-digit code')
      return
    }

    setLoading(true)

    try {
      // Verification call to webhook
      const response = await fetch(DEFAULT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify_otp',
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          code: enteredCode,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null)

      // If webhook returned an explicit 400 error
      if (response && !response.ok && response.status === 400) {
        const resData = await response.json().catch(() => null)
        setErrorMessage((resData && resData.message) || (isRTL ? 'رمز التحقق غير صحيح، يرجى إعادة المحاولة' : 'Invalid code, please try again'))
        setLoading(false)
        return
      }

      // Save persistent verification in localStorage
      localStorage.setItem('atomize_lead_verified', 'true')
      localStorage.setItem('atomize_lead_user', JSON.stringify(formData))
      setIsVerified(true)

      setStep('success')
      setTimeout(() => {
        setIsOpen(false)
      }, 2200)
    } catch (err) {
      setErrorMessage(isRTL ? 'رمز التحقق غير صحيح، يرجى إعادة المحاولة' : 'Invalid code, please try again')
    } finally {
      setLoading(false)
    }
  }

  // Resend OTP
  const handleResend = async () => {
    if (!canResend) return
    setCanResend(false)
    setTimer(60)
    setErrorMessage('')

    try {
      await fetch(DEFAULT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resend_otp',
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          name: formData.name.trim(),
        }),
      }).catch(() => null)
    } catch (err) {
      // Silent error on resend
    }
  }

  return (
    <>
      {/* Floating Mini Launcher Badge when modal is closed/minimized */}
      <AnimatePresence>
        {!isOpen && !isVerified && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.5, y: -20, x: isRTL ? -30 : 30 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280, delay: 0.15 }}
            className="fixed top-24 end-4 md:end-6 z-40 group flex items-center gap-2.5 px-4 py-2.5 rounded-full border glass-card shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border-h)',
              boxShadow: '0 8px 30px var(--glow-teal)',
            }}
            aria-label="Open Registration"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: 'var(--accent)' }}
              />
            </span>
            <ShieldCheck size={16} style={{ color: 'var(--accent)' }} className="transition-transform group-hover:scale-110" />
            <span
              className="text-[12px] font-extrabold tracking-wide"
              style={{ color: 'var(--text)', fontFamily: font }}
            >
              {isRTL ? 'تسجيل وتوثيق الحساب' : 'Register & Verify'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Lead Capture Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Container: smoothly slides towards top corner on close */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{
                opacity: 0,
                scale: 0.15,
                x: isRTL ? '-44vw' : '44vw',
                y: '-40vh',
              }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative w-full max-w-[480px] rounded-3xl border overflow-hidden p-6 sm:p-8 z-10 glass-card shadow-2xl"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border-h)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 40px var(--glow-teal)',
              }}
            >
            {/* Top decorative gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: 'linear-gradient(90deg, var(--cyber-teal), var(--electric-blue), var(--accent))',
              }}
            />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 end-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:scale-110"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Content Switcher */}
            {step === 'form' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--surface2)', color: 'var(--accent)' }}
                  >
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-[20px] font-black" style={{ fontFamily: font, color: 'var(--text)' }}>
                      {isRTL ? 'توثيق الحساب والدخول' : 'Access Verification'}
                    </h3>
                    <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                      {isRTL ? 'سجّل بياناتك لتصلك استشارتك التقنية ورمز الدخول' : 'Verify your details for instant access'}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-3.5 mt-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-[12px] font-bold mb-1.5" style={{ color: 'var(--text-sub)' }}>
                      {isRTL ? 'الاسم الكامل' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--text-muted)', [isRTL ? 'right' : 'left']: '14px' }}
                      />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isRTL ? 'مثال: محمد أحمد' : 'e.g. John Doe'}
                        className="w-full rounded-xl border text-[14px] outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--surface2)',
                          borderColor: 'var(--border)',
                          color: 'var(--text)',
                          padding: isRTL ? '11px 40px 11px 14px' : '11px 14px 11px 40px',
                          fontFamily: font,
                        }}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-[12px] font-bold mb-1.5" style={{ color: 'var(--text-sub)' }}>
                      {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--text-muted)', [isRTL ? 'right' : 'left']: '14px' }}
                      />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full rounded-xl border text-[14px] outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--surface2)',
                          borderColor: 'var(--border)',
                          color: 'var(--text)',
                          padding: isRTL ? '11px 40px 11px 14px' : '11px 14px 11px 40px',
                          fontFamily: font,
                        }}
                      />
                    </div>
                  </div>

                  {/* WhatsApp Phone Input */}
                  <div>
                    <label className="block text-[12px] font-bold mb-1.5" style={{ color: 'var(--text-sub)' }}>
                      {isRTL ? 'رقم الواتساب (لتصلك رسالة الرمز)' : 'WhatsApp Phone Number'}
                    </label>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--text-muted)', [isRTL ? 'right' : 'left']: '14px' }}
                      />
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+20 10 1234 5678"
                        className="w-full rounded-xl border text-[14px] outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--surface2)',
                          borderColor: 'var(--border)',
                          color: 'var(--text)',
                          padding: isRTL ? '11px 40px 11px 14px' : '11px 14px 11px 40px',
                          fontFamily: font,
                        }}
                      />
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <p className="text-[12px] text-red-500 font-semibold pt-1 text-center">
                      {errorMessage}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-3 py-3.5 rounded-xl text-[14px] font-extrabold flex items-center justify-center gap-2 btn-primary-lime transition-all"
                    style={{ fontFamily: font }}
                  >
                    {loading ? (
                      <RefreshCw size={17} className="animate-spin" />
                    ) : (
                      <>
                        <span>{isRTL ? 'إرسال رمز التوثيق (OTP)' : 'Send Verification Code'}</span>
                        <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: OTP Verification */}
            {step === 'otp' && (
              <div>
                <div className="text-center mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-3"
                    style={{ backgroundColor: 'var(--surface2)', color: 'var(--accent)' }}
                  >
                    <Lock size={22} />
                  </div>
                  <h3 className="text-[20px] font-black mb-1" style={{ fontFamily: font, color: 'var(--text)' }}>
                    {isRTL ? 'أدخل رمز التحقق' : 'Enter OTP Code'}
                  </h3>
                  <p className="text-[13px]" style={{ color: 'var(--text-sub)' }}>
                    {isRTL
                      ? `تم إرسال رمز مكون من 4 أرقام إلى واتساب وبريدك: `
                      : `A 4-digit code was sent to your WhatsApp & Email: `}
                    <span className="font-bold text-[var(--accent)] block dir-ltr mt-0.5">
                      {formData.phone || formData.email}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  {/* 4-Boxes OTP Input */}
                  <div className="flex justify-center items-center gap-3 dir-ltr">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={el => { otpInputsRef.current[idx] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(idx, e.target.value)}
                        onKeyDown={e => handleOtpKeyDown(idx, e)}
                        onPaste={handleOtpPaste}
                        className="w-14 h-14 rounded-2xl border text-center text-[22px] font-black outline-none transition-all"
                        style={{
                          backgroundColor: 'var(--surface2)',
                          borderColor: digit ? 'var(--accent)' : 'var(--border)',
                          color: 'var(--text)',
                          boxShadow: digit ? '0 0 16px var(--glow)' : 'none',
                        }}
                      />
                    ))}
                  </div>

                  {errorMessage && (
                    <p className="text-[12px] text-red-500 font-semibold text-center">
                      {errorMessage}
                    </p>
                  )}

                  {/* Verify Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-[14px] font-extrabold flex items-center justify-center gap-2 btn-primary-lime transition-all"
                    style={{ fontFamily: font }}
                  >
                    {loading ? (
                      <RefreshCw size={17} className="animate-spin" />
                    ) : (
                      <span>{isRTL ? 'تأكيد ودخول' : 'Confirm & Access'}</span>
                    )}
                  </button>

                  {/* Resend & Timer */}
                  <div className="flex items-center justify-between text-[12px] pt-1" style={{ color: 'var(--text-muted)' }}>
                    <button
                      type="button"
                      onClick={() => setStep('form')}
                      className="hover:underline"
                      style={{ color: 'var(--text-sub)' }}
                    >
                      {isRTL ? 'تعديل البيانات؟' : 'Change details?'}
                    </button>

                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleResend}
                        className="font-bold hover:underline"
                        style={{ color: 'var(--accent)' }}
                      >
                        {isRTL ? 'إعادة إرسال الرمز' : 'Resend Code'}
                      </button>
                    ) : (
                      <span>
                        {isRTL ? `إعادة الإرسال بعد ${timer} ثانية` : `Resend in ${timer}s`}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Success State */}
            {step === 'success' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-8 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-[#88E03F]"
                  style={{ backgroundColor: 'rgba(136, 224, 63, 0.15)' }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-[22px] font-black mb-2" style={{ fontFamily: font, color: 'var(--text)' }}>
                  {isRTL ? 'تم التوثيق بنجاح! مرحباً بك' : 'Verified Successfully!'}
                </h3>
                <p className="text-[14px]" style={{ color: 'var(--text-sub)' }}>
                  {isRTL
                    ? 'شكراً لك، تم حفظ بياناتك وسيقوم فريقنا بالتواصل معك فوراً.'
                    : 'Your information is verified. Enjoy full access to Atomize-AI.'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  )
}
