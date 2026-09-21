import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What kinds of businesses do you work with?',
    answer:
      'We primarily work with real estate companies, agencies, clinics, service businesses, and sales teams — essentially any business that deals with leads, clients, or repetitive operational tasks. If you have processes that can be automated, we can build a system for you.',
  },
  {
    question: 'How long does a project usually take?',
    answer:
      'Most systems ship in 2–6 weeks depending on complexity. A single autonomous agent might take 2–3 weeks. A full command center with multi-tenant access could take 4–6 weeks. We never quote months for what should take weeks.',
  },
  {
    question: 'Do you build custom systems from scratch?',
    answer:
      "Yes. Every system we build is tailored to your business logic, your data, and your workflows. We don't resell templates or white-label existing products. You get clean, purpose-built infrastructure.",
  },
  {
    question: 'Can you integrate with WhatsApp, email, CRM, dashboards, and automation tools?',
    answer:
      'Absolutely. We integrate with WhatsApp Business API, email providers, CRMs like HubSpot and Salesforce, and automation platforms like Make and n8n. If it has an API, we can connect it.',
  },
  {
    question: 'Is this only for real estate?',
    answer:
      'No. While we have deep experience in real estate automation, our systems work across any industry that relies on lead generation, client communication, and operational workflows.',
  },
  {
    question: 'What does the onboarding process look like?',
    answer:
      'It starts with a free strategy call. We audit your current operations, identify automation opportunities, and propose a system architecture. Once approved, we build, test, and deploy — with training included.',
  },
]

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: typeof faqs[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.2, 0, 0, 1],
      }}
      className="border-b border-[rgba(243,243,243,0.08)]"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] md:text-[18px] text-[#F3F3F3] group-hover:text-[#FF5A00] transition-colors duration-200 pr-4">
          {faq.question}
        </span>
        <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(243,243,243,0.15)] group-hover:border-[#FF5A00]/50 transition-colors duration-200">
          {isOpen ? (
            <Minus size={14} className="text-[#FF5A00]" />
          ) : (
            <Plus size={14} className="text-[#999999] group-hover:text-[#FF5A00] transition-colors duration-200" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="font-['Inter'] text-[14px] md:text-[16px] leading-[1.6] text-[#999999] pb-6 max-w-[680px]">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="relative bg-[#050505] py-[120px] md:py-[160px]">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
          className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(32px,3.5vw,48px)] leading-[1.1] tracking-[-0.01em] text-[#F3F3F3] mb-16 md:mb-24"
        >
          Common questions.
        </motion.h2>

        <div className="max-w-[800px]">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
