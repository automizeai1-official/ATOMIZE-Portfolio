import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#050505]">
      {/* Background Network Graphic */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/hero-network.png"
          alt=""
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[60vw] max-w-[700px] opacity-[0.15] object-contain"
        />
        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)] w-full pt-[72px]">
        <div className="max-w-[680px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="font-['Plus_Jakarta_Sans'] text-[12px] font-semibold tracking-[0.05em] uppercase text-[#999999] mb-6"
          >
            THE AUTOMATION AGENCY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(36px,6vw,72px)] leading-[1.0] tracking-[-0.02em] text-[#F3F3F3] mb-8"
          >
            Precision-built AI automation for elite brands.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0, 0, 1] }}
            className="font-['Inter'] text-[16px] leading-[1.6] text-[#999999] max-w-[480px] mb-10"
          >
            We design intelligent systems — from lead capture to command centers — so your business scales without the bloat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0, 0, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#cta"
              className="inline-flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-[12px] font-semibold tracking-[0.05em] uppercase bg-[#FF5A00] text-[#050505] px-7 py-3.5 rounded-full hover:bg-[#F3F3F3] hover:scale-[1.02] transition-all duration-300"
              style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
            >
              Book a Strategy Call
              <ArrowRight size={16} />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-[12px] font-semibold tracking-[0.05em] uppercase text-[#F3F3F3] px-7 py-3.5 rounded-full border border-[rgba(243,243,243,0.15)] hover:border-[#FF5A00]/50 hover:text-[#FF5A00] transition-all duration-300"
            >
              View Services
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 font-['Inter'] text-[13px] text-[#666666]"
          >
            Built for founders, agencies, and teams ready to scale.
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-[#999999]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
