import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      'We reduced manual lead processing by 90%. The agent books meetings while we sleep.',
    name: 'Client — Real Estate Group',
    metric: '90%',
    metricLabel: 'reduction',
  },
  {
    quote:
      'The Command Center replaced five tools we were paying for. One dashboard. Total clarity.',
    name: 'Client — Service Agency',
    metric: '5',
    metricLabel: 'tools replaced',
  },
  {
    quote:
      'Outbound output tripled without any deliverability issues. The infrastructure just works.',
    name: 'Client — Sales Team',
    metric: '3x',
    metricLabel: 'output',
  },
]

export default function Testimonials() {
  return (
    <section className="relative bg-[#050505] py-[120px] md:py-[160px]">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(32px,3.5vw,48px)] leading-[1.1] tracking-[-0.01em] text-[#F3F3F3] mb-16 md:mb-24"
        >
          Proof over promises.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.2, 0, 0, 1],
              }}
              className="group p-8 md:p-10 bg-[#111111] border border-[rgba(243,243,243,0.08)] rounded-[12px] flex flex-col hover:border-[rgba(255,90,0,0.3)] hover:scale-[1.02] transition-all duration-300"
              style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
            >
              <div className="mb-auto">
                <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#cccccc] mb-8">
                  "{t.quote}"
                </p>
              </div>
              <div>
                <p className="font-['JetBrains_Mono'] text-[12px] text-[#666666] uppercase tracking-[0.05em] mb-4">
                  {t.name}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] text-[#FF5A00]">
                    {t.metric}
                  </span>
                  <span className="font-['Inter'] text-[14px] text-[#999999]">
                    {t.metricLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
