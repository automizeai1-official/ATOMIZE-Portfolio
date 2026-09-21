import { motion } from 'framer-motion'

const clients = [
  'Real Estate',
  'Agencies',
  'Clinics',
  'Service Firms',
  'Founders',
  'Sales Teams',
]

export default function TrustedBy() {
  return (
    <section className="relative bg-[#050505] border-y border-[rgba(243,243,243,0.08)] py-10">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-12"
        >
          <p className="font-['JetBrains_Mono'] text-[11px] text-[#666666] uppercase tracking-[0.05em] whitespace-nowrap">
            Trusted by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {clients.map((client) => (
              <span
                key={client}
                className="font-['Plus_Jakarta_Sans'] text-[14px] font-semibold text-[#555555] hover:text-[#999999] transition-colors duration-200"
              >
                {client}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
