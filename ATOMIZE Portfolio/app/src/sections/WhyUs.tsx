import { motion } from 'framer-motion'
import { Zap, Layers, Target, Eye } from 'lucide-react'

const reasons = [
  {
    icon: Zap,
    title: 'Built for speed',
    description:
      'No six-month timelines. We design, build, and ship systems in weeks, not quarters.',
  },
  {
    icon: Layers,
    title: 'Systems, not scripts',
    description:
      "We don't write one-off code. We build infrastructure that scales, adapts, and compounds.",
  },
  {
    icon: Target,
    title: 'Business-first',
    description:
      'We speak revenue, conversion, and operations — not just technical jargon.',
  },
  {
    icon: Eye,
    title: 'Invisible reliability',
    description:
      'The best automation is the kind you never have to think about. We make it invisible.',
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" className="relative bg-[#111111] py-[120px] md:py-[160px] border-y border-[rgba(243,243,243,0.08)]">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(32px,3.5vw,48px)] leading-[1.1] tracking-[-0.01em] text-[#F3F3F3] mb-16 md:mb-24"
        >
          Why ATOMIZE?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.2, 0, 0, 1],
                }}
                className="group p-6 md:p-8 bg-[#0a0a0a] border border-[rgba(243,243,243,0.08)] rounded-[12px] hover:border-[rgba(255,90,0,0.3)] hover:scale-[1.02] transition-all duration-300"
                style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(255,90,0,0.1)] mb-5 group-hover:bg-[rgba(255,90,0,0.2)] transition-colors duration-300">
                  <Icon size={18} className="text-[#FF5A00]" />
                </div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[18px] text-[#F3F3F3] mb-3">
                  {reason.title}
                </h3>
                <p className="font-['Inter'] text-[14px] leading-[1.6] text-[#999999]">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
