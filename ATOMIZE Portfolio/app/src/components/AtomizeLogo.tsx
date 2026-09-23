
interface LogoProps {
  className?: string
  showText?: boolean
  size?: number
}

// ─── 1. Primary Logomark: Atomic Precision & Neural Rings ─────────────────────
export function AtomizeMark({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:rotate-45"
    >
      <defs>
        {/* Brand Gradient: Electric Blue (#3580E6) to Lime Energy (#88E03F) */}
        <linearGradient id="atomize-orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3580E6" />
          <stop offset="50%" stopColor="#008084" />
          <stop offset="100%" stopColor="#88E03F" />
        </linearGradient>

        <linearGradient id="atomize-orbit-rev" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#88E03F" />
          <stop offset="60%" stopColor="#3580E6" />
          <stop offset="100%" stopColor="#008084" />
        </linearGradient>

        {/* Center Nucleus Glow */}
        <radialGradient id="atomize-nucleus-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#88E03F" stopOpacity="1" />
          <stop offset="60%" stopColor="#008084" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3580E6" stopOpacity="0" />
        </radialGradient>

        <filter id="core-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Atmospheric ambient glow behind atomic core */}
      <circle cx="50" cy="50" r="28" fill="url(#atomize-nucleus-glow)" opacity="0.35" />

      {/* Ring 1 - Horizontal Oval (0 deg) */}
      <ellipse
        cx="50"
        cy="50"
        rx="42"
        ry="15"
        stroke="url(#atomize-orbit-grad)"
        strokeWidth="3.2"
        fill="none"
        strokeDasharray="180 5"
      />

      {/* Ring 2 - Rotated 60 deg */}
      <g transform="rotate(60 50 50)">
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="15"
          stroke="url(#atomize-orbit-rev)"
          strokeWidth="3.2"
          fill="none"
        />
        {/* Electron node */}
        <circle cx="92" cy="50" r="3.5" fill="#88E03F" filter="url(#core-glow-filter)" />
      </g>

      {/* Ring 3 - Rotated 120 deg */}
      <g transform="rotate(120 50 50)">
        <ellipse
          cx="50"
          cy="50"
          rx="42"
          ry="15"
          stroke="url(#atomize-orbit-grad)"
          strokeWidth="3.2"
          fill="none"
        />
        {/* Electron node */}
        <circle cx="8" cy="50" r="3.5" fill="#3580E6" filter="url(#core-glow-filter)" />
      </g>

      {/* Center glowing nucleus */}
      <circle cx="50" cy="50" r="10" fill="url(#atomize-nucleus-glow)" filter="url(#core-glow-filter)" />
      <circle cx="50" cy="50" r="6" fill="#88E03F" />
    </svg>
  )
}

// ─── 2. Secondary Icon: Stylized Lettermark "A" ──────────────────────────────
export function AtomizeLettermark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="a-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3580E6" />
          <stop offset="50%" stopColor="#008084" />
          <stop offset="100%" stopColor="#88E03F" />
        </linearGradient>
      </defs>
      {/* Stylized geometric "A" with electric gradient fill */}
      <path
        d="M50 12 L15 88 H32 L41 68 H59 L68 88 H85 L50 12 Z M50 36 L56 52 H44 L50 36 Z"
        fill="url(#a-gradient)"
      />
    </svg>
  )
}

// ─── 3. Full Comprehensive Brand Logo (Mark + Official Wordmark) ──────────────
export default function AtomizeLogo({
  className = '',
  showText = true,
  size = 38,
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Atomic Mark */}
      <AtomizeMark size={size} />

      {/* Wordmark: "Atomize-AI" in Cyber Teal (#008084) geometric styling */}
      {showText && (
        <span
          className="text-[22px] font-black tracking-tight leading-none"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            color: '#008084',
          }}
        >
          Atomize<span style={{ color: '#3580E6' }}>-</span><span style={{ color: '#88E03F' }}>AI</span>
        </span>
      )}
    </div>
  )
}
