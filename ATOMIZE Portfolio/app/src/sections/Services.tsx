import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    icon: '/service-agent.png',
    title: 'The Autonomous Agent',
    description:
      'AI lead qualification that runs 24/7. Captures, qualifies, books, and hands off — without you lifting a finger.',
    features: [
      '24/7 lead capture & response',
      'Smart qualification routing',
      'Calendar booking integration',
      'Human handoff when needed',
    ],
    cta: 'Build this system',
  },
  {
    icon: '/service-dashboard.png',
    title: 'The Command Center',
    description:
      'A custom multi-tenant dashboard. Your entire business brain in one place. Real-time. Role-based. Secure.',
    features: [
      'Centralized business brain',
      'Role-based access control',
      'Real-time analytics',
      'Replaces spreadsheets',
    ],
    cta: 'Build this system',
  },
  {
    icon: '/service-outbound.png',
    title: 'The Outbound Engine',
    description:
      'Mass outreach infrastructure built for scale and safety. Human-like delivery, workflow control, and measurable output.',
    features: [
      'Human-like message delivery',
      'Workflow control & safety',
      'Message distribution logic',
      'Scalable output architecture',
    ],
    cta: 'Build this system',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-[#050505] py-[120px] md:py-[160px]">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(32px,3.5vw,48px)] leading-[1.1] tracking-[-0.01em] text-[#F3F3F3]">
            Core Systems
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.2, 0, 0, 1],
              }}
              className="group relative bg-[#111111] border border-[rgba(243,243,243,0.08)] rounded-[12px] overflow-hidden hover:border-[rgba(255,90,0,0.3)] hover:scale-[1.02] transition-all duration-300"
              style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
            >
              {/* Icon Area */}
              <div className="relative h-[200px] md:h-[220px] flex items-center justify-center bg-[#0a0a0a] border-b border-[rgba(243,243,243,0.06)]">
                <img
                  src={service.icon}
                  alt=""
                  className="w-[140px] h-[140px] object-contain opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-[22px] text-[#F3F3F3] mb-3">
                  {service.title}
                </h3>
                <p className="font-['Inter'] text-[14px] leading-[1.6] text-[#999999] mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="font-['Inter'] text-[13px] text-[#777777] flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#FF5A00] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#cta"
                  className="inline-flex items-center gap-1.5 font-['Plus_Jakarta_Sans'] text-[13px] font-semibold text-[#F3F3F3] group-hover:text-[#FF5A00] transition-colors duration-200"
                >
                  {service.cta}
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
