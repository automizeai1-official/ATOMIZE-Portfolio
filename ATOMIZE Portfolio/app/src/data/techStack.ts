// ─── Tech Stack Data ──────────────────────────────────────────────────────────
export interface Tech {
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'ai' | 'ecommerce' | 'devops'
  color: string   // badge accent color
  icon: string    // emoji fallback
}

export const techStack: Tech[] = [
  // Frontend
  { name: 'React', category: 'frontend', color: '#61DAFB', icon: '⚛️' },
  { name: 'Next.js', category: 'frontend', color: '#ffffff', icon: '▲' },
  { name: 'TypeScript', category: 'frontend', color: '#3178C6', icon: '📘' },
  { name: 'Tailwind CSS', category: 'frontend', color: '#38BDF8', icon: '🎨' },
  { name: 'Framer Motion', category: 'frontend', color: '#BB4DD8', icon: '🎬' },
  { name: 'Vite', category: 'frontend', color: '#646CFF', icon: '⚡' },
  // Backend
  { name: 'Node.js', category: 'backend', color: '#68A063', icon: '🟢' },
  { name: 'Python', category: 'backend', color: '#FFD43B', icon: '🐍' },
  { name: 'Express.js', category: 'backend', color: '#888888', icon: '🚂' },
  { name: 'FastAPI', category: 'backend', color: '#009688', icon: '⚡' },
  { name: 'PostgreSQL', category: 'backend', color: '#336791', icon: '🐘' },
  { name: 'Firebase', category: 'backend', color: '#FFCA28', icon: '🔥' },
  // Mobile
  { name: 'Flutter', category: 'mobile', color: '#54C5F8', icon: '📱' },
  { name: 'React Native', category: 'mobile', color: '#61DAFB', icon: '📱' },
  // AI & Automation
  { name: 'n8n', category: 'ai', color: '#EA4B71', icon: '🔄' },
  { name: 'OpenAI API', category: 'ai', color: '#74AA9C', icon: '🤖' },
  { name: 'LangChain', category: 'ai', color: '#1C3C3C', icon: '🦜' },
  { name: 'WhatsApp API', category: 'ai', color: '#25D366', icon: '💬' },
  // E-Commerce
  { name: 'Shopify', category: 'ecommerce', color: '#96BF48', icon: '🛒' },
  { name: 'Liquid', category: 'ecommerce', color: '#7AB55C', icon: '💧' },
  // DevOps
  { name: 'Vercel', category: 'devops', color: '#ffffff', icon: '▲' },
  { name: 'Docker', category: 'devops', color: '#2496ED', icon: '🐳' },
  { name: 'GitHub Actions', category: 'devops', color: '#2088FF', icon: '⚙️' },
  { name: 'Cloudflare', category: 'devops', color: '#F6821F', icon: '☁️' },
]
