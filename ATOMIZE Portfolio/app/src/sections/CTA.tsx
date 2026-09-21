import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MessageCircle } from 'lucide-react'

export default function CTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <section
      id="cta"
      className="relative bg-[#111111] py-[120px] md:py-[160px] border-y border-[rgba(243,243,243,0.08)]"
    >
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
        >
          <h2
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(32px,5vw,64px)] leading-[1.1] tracking-[-0.01em] text-[#F3F3F3] mb-6 inline-block"
            style={{
              background: hovered
                ? 'linear-gradient(90deg, #F3F3F3, #FF5A00, #F3F3F3)'
                : 'none',
              backgroundSize: hovered ? '200%' : 'auto',
              WebkitBackgroundClip: hovered ? 'text' : 'unset',
              WebkitTextFillColor: hovered ? 'transparent' : '#F3F3F3',
              animation: hovered ? 'shimmer 3s linear infinite' : 'none',
            }}
          >
            Turn your workflow into an asset.
          </h2>

          <p className="font-['Inter'] text-[16px] md:text-[18px] leading-[1.6] text-[#999999] max-w-[480px] mx-auto mb-10">
            Book a free strategy call. No pitch. No pressure. Just a clear plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-[12px] font-semibold tracking-[0.05em] uppercase bg-[#FF5A00] text-[#050505] px-8 py-4 rounded-full hover:bg-[#F3F3F3] hover:scale-[1.02] transition-all duration-300"
              style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
            >
              Book a Strategy Call
              <ArrowRight size={16} />
            </a>
            <a
              href="mailto:hello@atomize.io"
              className="inline-flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-[12px] font-semibold tracking-[0.05em] uppercase text-[#F3F3F3] px-8 py-4 rounded-full border border-[rgba(243,243,243,0.15)] hover:border-[#FF5A00]/50 hover:text-[#FF5A00] transition-all duration-300"
            >
              <Mail size={14} />
              Email us instead
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-['Inter'] text-[14px] text-[#999999] hover:text-[#FF5A00] transition-colors duration-200"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <span className="text-[#444444]">·</span>
            <a
              href="mailto:hello@atomize.io"
              className="font-['Inter'] text-[14px] text-[#999999] hover:text-[#FF5A00] transition-colors duration-200"
            >
              hello@atomize.io
            </a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  )
}
