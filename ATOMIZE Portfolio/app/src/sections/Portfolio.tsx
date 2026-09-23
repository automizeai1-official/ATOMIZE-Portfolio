import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Maximize2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../context/ThemeContext'
import { projects, type Project, type ProjectCategory } from '../data/portfolio'

const filterKeys: { key: 'all' | ProjectCategory; i18nKey: string }[] = [
  { key: 'all', i18nKey: 'portfolio.filters.all' },
  { key: 'web', i18nKey: 'portfolio.filters.web' },
  { key: 'extension', i18nKey: 'portfolio.filters.extension' },
  { key: 'ecommerce', i18nKey: 'portfolio.filters.ecommerce' },
  { key: 'edtech', i18nKey: 'portfolio.filters.edtech' },
  { key: 'enterprise', i18nKey: 'portfolio.filters.enterprise' },
]

// ─── Browser Frame & Screenshot Component ─────────────────────────────────────
function ProjectScreenshot({
  project,
  onOpenDrawer,
}: {
  project: Project
  onOpenDrawer: () => void
}) {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const [imageError, setImageError] = useState(false)

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
    } else {
      onOpenDrawer()
    }
  }

  const hostname = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : 'dahab-sender.internal'

  return (
    <div
      onClick={handleImageClick}
      className="relative w-full h-[220px] bg-black/40 overflow-hidden cursor-pointer group/img flex flex-col"
      title={project.liveUrl ? (isRTL ? 'اضغط لفتح الموقع مباشرة' : 'Click to open live site') : (isRTL ? 'اضغط لمعاينة المشروع' : 'Click to preview project')}
    >
      {/* Mockup browser top-bar */}
      <div
        className="h-7 px-3 flex items-center justify-between border-b shrink-0 z-10 transition-colors"
        style={{
          backgroundColor: 'rgba(15, 15, 20, 0.95)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" />
        </div>
        <span
          className="text-[10px] font-mono truncate max-w-[170px] px-2 py-0.5 rounded opacity-60"
          style={{ backgroundColor: 'var(--surface2)', color: 'var(--text-sub)' }}
        >
          {hostname}
        </span>
        <ExternalLink size={11} className="opacity-40 group-hover/img:opacity-100 group-hover/img:text-[var(--accent)] transition-all" />
      </div>

      {/* Screenshot Container */}
      <div className="relative w-full flex-1 overflow-hidden bg-black/60">
        {!imageError && project.screenshotUrl ? (
          <img
            src={project.screenshotUrl}
            alt={project.screenshotAlt}
            loading="eager"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
            <span className="text-[64px] opacity-70">{project.emoji}</span>
          </div>
        )}

        {/* Hover Action Overlay */}
        <div
          className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-3 text-center"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold shadow-lg transition-transform duration-200 group-hover/img:scale-105"
            style={{
              backgroundColor: project.accentColor,
              color: '#000',
            }}
          >
            {project.liveUrl ? (
              <>
                <ExternalLink size={14} />
                <span>{t('portfolio.viewLive')}</span>
              </>
            ) : (
              <>
                <Maximize2 size={14} />
                <span>{isRTL ? 'معاينة شاشات الإضافة' : 'Preview Extension Screens'}</span>
              </>
            )}
          </div>
          <span className="text-[11px] font-medium text-white/80">
            {project.liveUrl
              ? (isRTL ? 'فتح الموقع في نافذة جديدة' : 'Open in new tab')
              : (isRTL ? 'اضغط لعرض تفاصيل وشاشات الأداة' : 'Click to view full tool screens')}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const isExtension = project.categories.includes('extension')

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.015] flex flex-col"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = project.accentColor + '80'
        e.currentTarget.style.boxShadow = `0 0 40px ${project.accentColor}25`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Visual Screenshot Area */}
      <ProjectScreenshot project={project} onOpenDrawer={onClick} />

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: project.accentColor, fontFamily: font }}>
            {isRTL ? project.typeAr : project.typeEn}
          </p>
          {isExtension && (
            <span
              className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border flex items-center gap-1"
              style={{ borderColor: '#25D36660', color: '#25D366', backgroundColor: '#25D36615' }}
            >
              <MessageCircle size={10} /> WhatsApp
            </span>
          )}
          {project.wip && (
            <span
              className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border"
              style={{ borderColor: project.accentColor + '60', color: project.accentColor, backgroundColor: project.accentColor + '15' }}
            >
              {t('portfolio.wip')}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-bold mb-2 leading-snug" style={{ fontFamily: font, color: 'var(--text)' }}>
          {isRTL ? project.titleAr : project.titleEn}
        </h3>

        {/* Description */}
        <p className="text-[13px] leading-[1.65] mb-5 flex-1" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
          {isRTL ? project.descAr : project.descEn}
        </p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg border"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text-sub)',
                backgroundColor: 'var(--surface2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions Row */}
        <div className="pt-4 border-t flex items-center justify-between gap-3" style={{ borderColor: 'var(--border)' }}>
          {/* View Details / Case study */}
          <button
            onClick={onClick}
            className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
            style={{ color: 'var(--text-sub)', fontFamily: font }}
            onMouseEnter={e => (e.currentTarget.style.color = project.accentColor)}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}
          >
            <span>{t('portfolio.viewCaseStudy')}</span>
            <ArrowRight size={13} className={isRTL ? 'rotate-180' : ''} />
          </button>

          {/* Quick External Link */}
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                title="View GitHub Repository"
                className="p-2 rounded-lg border transition-all hover:scale-105"
                style={{ borderColor: 'var(--border)', color: 'var(--text-sub)', backgroundColor: 'var(--surface2)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-sub)')}
              >
                <Github size={14} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all hover:scale-105"
                style={{ backgroundColor: project.accentColor, color: '#000' }}
              >
                <ExternalLink size={12} />
                <span>{t('portfolio.viewLive')}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Screenshot Gallery in Drawer ─────────────────────────────────────────────
function ScreenshotGallery({ screenshots, alt }: { screenshots: string[]; alt?: string }) {
  const [idx, setIdx] = useState(0)
  if (!screenshots || screenshots.length === 0) return null

  return (
    <div className="relative rounded-2xl overflow-hidden border bg-black/80" style={{ borderColor: 'var(--border)' }}>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          key={screenshots[idx]}
          src={screenshots[idx]}
          alt={`${alt} ${idx + 1}`}
          className="w-full h-full object-cover object-top cursor-pointer"
          onClick={() => window.open(screenshots[idx], '_blank')}
          title="اضغط لفتح الصورة بحجمها الأصلي الكامل"
        />

        {screenshots.length > 1 && (
          <>
            <button
              onClick={() => setIdx(i => (i - 1 + screenshots.length) % screenshots.length)}
              className="absolute start-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIdx(i => (i + 1) % screenshots.length)}
              className="absolute end-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 p-1 rounded-full backdrop-blur-md bg-black/50">
              {screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: i === idx ? 'var(--accent)' : 'rgba(255,255,255,0.4)',
                    width: i === idx ? '22px' : '8px',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="px-3 py-1.5 text-center text-[10px] text-white/60 bg-black/60 border-t border-white/10">
        💡 اضغط على الصورة لفتحها بالحجم الطبيعي الكامل
      </div>
    </div>
  )
}

// ─── Project Drawer ───────────────────────────────────────────────────────────
function ProjectDrawer({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const isExtension = project.categories.includes('extension')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:justify-end p-2 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: isRTL ? '-100%' : '100%' }}
        animate={{ x: 0 }}
        exit={{ x: isRTL ? '-100%' : '100%' }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="relative h-[94vh] w-full sm:w-[560px] rounded-3xl overflow-y-auto shadow-2xl"
        style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
        >
          <X size={18} />
        </button>

        {/* Gallery / Screenshot Area */}
        <div className="p-6 pb-2">
          {project.screenshots && project.screenshots.length > 0 ? (
            <ScreenshotGallery screenshots={project.screenshots} alt={project.screenshotAlt} />
          ) : (
            <div className={`h-[220px] rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
              <span className="text-[80px]">{project.emoji}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-7 pt-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <p className="text-[12px] font-bold uppercase tracking-wider" style={{ color: project.accentColor, fontFamily: font }}>
              {isRTL ? project.typeAr : project.typeEn}
            </p>
            {isExtension && (
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border flex items-center gap-1" style={{ borderColor: '#25D36650', color: '#25D366', backgroundColor: '#25D36615' }}>
                <MessageCircle size={10} /> WhatsApp Extension
              </span>
            )}
            {project.wip && (
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full" style={{ backgroundColor: project.accentColor + '25', color: project.accentColor, border: `1px solid ${project.accentColor}50` }}>
                {t('portfolio.wip')}
              </span>
            )}
          </div>

          <h2 className="text-[26px] font-black mb-3 leading-tight" style={{ fontFamily: font, color: 'var(--text)' }}>
            {isRTL ? project.titleAr : project.titleEn}
          </h2>

          <p className="text-[14px] leading-[1.75] mb-6" style={{ color: 'var(--text-sub)', fontFamily: isRTL ? "'Cairo', sans-serif" : 'Inter, sans-serif' }}>
            {isRTL ? project.descAr : project.descEn}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-[12px] px-3 py-1.5 rounded-xl border font-semibold"
                style={{ borderColor: project.accentColor + '40', color: project.accentColor, backgroundColor: project.accentColor + '10' }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Live Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-bold transition-all hover:scale-[1.02] shadow-lg"
                style={{ backgroundColor: project.accentColor, color: '#000' }}
              >
                <ExternalLink size={16} />
                <span>{t('portfolio.viewLive')}</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-[14px] font-bold border transition-all hover:scale-[1.02]"
                style={{ borderColor: 'var(--border)', color: 'var(--text)', backgroundColor: 'var(--surface)' }}
              >
                <Github size={16} />
                <span>{t('portfolio.viewGithub')}</span>
              </a>
            )}
          </div>

          {/* CTA */}
          <div className="pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <a
              href="#contact"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl text-[14px] font-bold border transition-all hover:scale-[1.01]"
              style={{ borderColor: 'var(--border-h)', color: 'var(--accent)', backgroundColor: 'var(--surface)' }}
            >
              <span>{t('portfolio.startSimilar')}</span>
              <ArrowRight size={15} className={isRTL ? 'rotate-180' : ''} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Portfolio Section ───────────────────────────────────────────────────
export default function Portfolio() {
  const { t } = useTranslation()
  const { isRTL } = useThemeContext()
  const font = isRTL ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.categories.includes(activeFilter as ProjectCategory))

  return (
    <section id="portfolio" className="py-[120px] md:py-[160px]" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,48px)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--accent)', fontFamily: font }}>
            {t('portfolio.label')}
          </p>
          <h2 className="text-[clamp(30px,4vw,52px)] font-black leading-[1.1] mb-4" style={{ fontFamily: font, color: 'var(--text)' }}>
            {t('portfolio.title')}
          </h2>
          <p className="text-[16px] leading-[1.7] max-w-[480px]" style={{ color: 'var(--text-sub)', fontFamily: font }}>
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {filterKeys.map(({ key, i18nKey }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className="px-4 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 flex items-center gap-1.5"
              style={{
                fontFamily: font,
                backgroundColor: activeFilter === key ? 'var(--accent)' : 'var(--bg)',
                color: activeFilter === key ? 'var(--bg)' : 'var(--text-sub)',
                borderColor: activeFilter === key ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {key === 'extension' && <MessageCircle size={12} />}
              {t(i18nKey)}
            </button>
          ))}
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelected(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Click indicator banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 py-3 px-6 rounded-2xl border text-center flex items-center justify-center gap-2 text-[13px] mx-auto max-w-lg"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg)',
            color: 'var(--text-sub)',
            fontFamily: font,
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          <span>
            {isRTL
              ? 'اضغط على شاشة أي موقع للمعاينة والانتقال المباشر للمشروع لايف 🚀'
              : 'Click on any project screen to launch the live demo directly 🚀'}
          </span>
        </motion.div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {selected && (
          <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
