import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Audit & Strategy',
    description:
      'We map your current chaos — every lead leak, manual task, and bottleneck — then blueprint a system that actually fits your business.',
  },
  {
    number: '02',
    title: 'Build & Connect',
    description:
      'We assemble AI agents, dashboards, and automation flows with clean architecture. No duct tape. No bloat.',
  },
  {
    number: '03',
    title: 'Launch & Scale',
    description:
      'You launch. We monitor, tune, and optimize. Your system gets sharper the longer it runs.',
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.2, 0, 0, 1],
      }}
      className="py-12 md:py-20"
    >
      <div className="flex items-start gap-6 md:gap-8">
        <span className="font-['JetBrains_Mono'] text-[13px] text-[#FF5A00] mt-1 shrink-0">
          {step.number}
        </span>
        <div>
          <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(20px,2.5vw,28px)] text-[#F3F3F3] mb-3">
            {step.title}
          </h3>
          <p className="font-['Inter'] text-[16px] leading-[1.6] text-[#999999] max-w-[480px]">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="process" className="relative bg-[#050505] py-[120px] md:py-[160px]">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(32px,3.5vw,48px)] leading-[1.1] tracking-[-0.01em] text-[#F3F3F3] mb-16 md:mb-24"
        >
          Systems over chaos.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left: Steps */}
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>

          {/* Right: Sticky Visual */}
          <div className="hidden md:block relative">
            <div className="sticky top-[140px]">
              <div className="aspect-square bg-[#111111] border border-[rgba(243,243,243,0.08)] rounded-[12px] flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  {/* Abstract geometric shapes */}
                  <svg
                    viewBox="0 0 400 400"
                    className="absolute inset-0 w-full h-full p-12"
                    fill="none"
                  >
                    <circle
                      cx="200"
                      cy="200"
                      r="140"
                      stroke="rgba(243,243,243,0.08)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="100"
                      stroke="rgba(255,90,0,0.15)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="60"
                      stroke="rgba(243,243,243,0.12)"
                      strokeWidth="1"
                    />
                    {/* Orbiting dots */}
                    {[0, 90, 180, 270].map((angle, i) => {
                      const rad = (angle * Math.PI) / 180
                      const r = 140
                      const x = 200 + r * Math.cos(rad)
                      const y = 200 + r * Math.sin(rad)
                      return (
                        <motion.circle
                          key={i}
                          cx={x}
                          cy={y}
                          r="4"
                          fill={i === 0 ? '#FF5A00' : 'rgba(243,243,243,0.3)'}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            repeat: Infinity,
                            duration: 3,
                            delay: i * 0.5,
                            ease: 'easeInOut',
                          }}
                        />
                      )
                    })}
                    {/* Cross lines */}
                    <line
                      x1="80"
                      y1="200"
                      x2="320"
                      y2="200"
                      stroke="rgba(243,243,243,0.06)"
                      strokeWidth="1"
                    />
                    <line
                      x1="200"
                      y1="80"
                      x2="200"
                      y2="320"
                      stroke="rgba(243,243,243,0.06)"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
