const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#cta' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#111111] py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <a
              href="#"
              className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] tracking-tight text-[#F3F3F3]"
            >
              ATOMIZE
            </a>
            <p className="font-['Inter'] text-[13px] text-[#666666] mt-2 max-w-[280px]">
              Building intelligent systems that scale without the bloat.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-6 md:gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-['Inter'] text-[14px] text-[#999999] hover:text-[#F3F3F3] transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-1/2 w-0 h-[1px] bg-[#FF5A00] group-hover:w-full group-hover:left-0 transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 border-t border-[rgba(243,243,243,0.08)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['JetBrains_Mono'] text-[11px] text-[#555555]">
            © {new Date().getFullYear()} ATOMIZE. All rights reserved.
          </p>
          <p className="font-['JetBrains_Mono'] text-[11px] text-[#555555]">
            Precision-built. Business-first.
          </p>
        </div>
      </div>
    </footer>
  )
}
