// ─── Portfolio Projects Data ─────────────────────────────────────────────────
export type ProjectCategory = 'web' | 'ecommerce' | 'edtech' | 'enterprise' | 'extension'

export interface Project {
  id: string
  titleAr: string
  titleEn: string
  typeAr: string
  typeEn: string
  descAr: string
  descEn: string
  categories: ProjectCategory[]
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  wip?: boolean
  gradient: string           // fallback CSS gradient
  accentColor: string        // border/glow tint
  emoji: string
  screenshotUrl: string      // actual local screenshot path in public/screenshots
  screenshotAlt: string
  screenshots?: string[]     // gallery of screenshots for drawer
}

export const projects: Project[] = [
  {
    id: 'dahab-sender',
    titleAr: 'داهاب سيندر — أداة إرسال وحملات واتساب',
    titleEn: 'Dahab Sender — WhatsApp Bulk Marketing Extension',
    typeAr: 'إضافة Chrome · حملات واتساب لمتاجر عطارة دهب الشيخ',
    typeEn: 'Chrome Extension · WhatsApp Campaign Tool for Attar Dahab',
    descAr: 'إضافة متطورة تتيح لمتاجر عطارة دهب الشيخ إرسال آلاف الرسائل والعروض الترويجية بنقرة واحدة — مجهزة بمعرف فريد (Anti-Spam)، تأخير عشوائي مخصص، استيراد العملاء من ملفات Excel، وإحصائيات تسليم فورية بنسبة 94-100٪.',
    descEn: 'A high-performance Chrome extension for Attar Dahab Sheikh stores to run smart WhatsApp marketing campaigns with Anti-Spam protection, batching, customizable random delays, Excel customer import, and real-time delivery logs.',
    categories: ['extension'],
    tags: ['Chrome Extension', 'WhatsApp Automation', 'Anti-Spam', 'Excel / CSV', 'عطارة دهب'],
    gradient: 'from-amber-900/60 via-yellow-900/40 to-emerald-900/60',
    accentColor: '#FFD700',
    emoji: '📲',
    screenshotUrl: '/screenshots/dahab-sender-reports.png',
    screenshotAlt: 'Dahab Sender - WhatsApp Campaign Dashboard & Reports',
    screenshots: [
      '/screenshots/dahab-sender-reports.png',
      '/screenshots/dahab-sender-send.png',
    ],
  },
  {
    id: 'auticare',
    titleAr: 'أوتيكير (AutiCare)',
    titleEn: 'AutiCare — Autism Care & Treatment Platform',
    typeAr: 'منصة طبية تخصصية · رعاية وعلاج التوحد',
    typeEn: 'Healthcare & Specialized Therapy Platform',
    descAr: 'منصة طبية متكاملة لإدارة جلسات وعلاج أطفال التوحد، حجز جلسات مع نخبة من الاستشاريين والأطباء (مخ وأعصاب، تخاطب، علاج سلوكي)، وتتبع تقدم الخطة العلاجية.',
    descEn: 'A comprehensive medical platform for managing autism therapy sessions, connecting families with specialized pediatric neurologists, speech therapists, and behavioral analysts with interactive booking.',
    categories: ['web', 'edtech'],
    tags: ['React', 'Healthcare', 'Doctor Booking', 'Teletherapy'],
    liveUrl: 'https://auticare-ruddy.vercel.app/',
    githubUrl: 'https://github.com/shahdyasser734-design/Auticare',
    gradient: 'from-blue-900/60 via-indigo-900/40 to-cyan-900/60',
    accentColor: '#38bdf8',
    emoji: '🧩',
    screenshotUrl: '/screenshots/auticare.png',
    screenshotAlt: 'AutiCare - Autism Care Specialists Platform',
    screenshots: ['/screenshots/auticare.png'],
  },
  {
    id: 'awlad-khedr',
    titleAr: 'مجموعة أولاد خضر للحديد والطوب الأحمر',
    titleEn: 'Awlad Khedr Group — Industrial Leader',
    typeAr: 'منصة مؤسسية صناعية كبرى',
    typeEn: 'Industrial Manufacturing Enterprise Platform',
    descAr: 'الموقع الرسمي لمجموعة أولاد خضر — رواد صناعة وتوريد الطوب والحديد لأكثر من 40 عاماً والمورد المعتمد لأكبر المشاريع القومية والعسكرية في مصر، مزود بحاسبة أسعار ومعاينة 3D.',
    descEn: 'Official enterprise platform for Awlad Khedr Group, brick and steel manufacturing leaders for 40+ years supplying major national and civil infrastructure projects across Egypt with 3D brick inspector.',
    categories: ['web', 'enterprise'],
    tags: ['Next.js', 'Enterprise', 'Industrial', '3D Inspection', 'Pricing Calculator'],
    liveUrl: 'https://awlad-khedr.vercel.app/',
    gradient: 'from-orange-900/60 via-amber-900/40 to-stone-900/60',
    accentColor: '#f97316',
    emoji: '🏗️',
    screenshotUrl: '/screenshots/awlad-khedr.png',
    screenshotAlt: 'Awlad Khedr Group - Industrial Brick & Steel Enterprise',
    screenshots: ['/screenshots/awlad-khedr.png'],
  },
  {
    id: 'elomran',
    titleAr: 'شركة العمران للمقاولات العامة',
    titleEn: 'El Omran General Contracting',
    typeAr: 'منصة مقاولات وبنية تحتية',
    typeEn: 'Civil & Infrastructure Contracting Platform',
    descAr: 'بوابة رقمية فاخرة لشركة العمران للمقاولات العامة — شريك استراتيجي في المشروعات الكبرى، البنية التحتية، الاستصلاح الزراعي، والأعمال المدنية والخرسانية.',
    descEn: 'A flagship corporate web platform for El Omran General Contracting, strategic partners in civil infrastructure, large-scale construction, and agricultural reclamation projects.',
    categories: ['web', 'enterprise'],
    tags: ['React', 'Tailwind CSS', 'Construction', 'Enterprise'],
    liveUrl: 'https://portfolio-elomran-s-projects.vercel.app',
    gradient: 'from-yellow-900/60 via-amber-900/40 to-orange-900/60',
    accentColor: '#eab308',
    emoji: '🏢',
    screenshotUrl: '/screenshots/elomran.png',
    screenshotAlt: 'El Omran Contracting - General Contracting & Infrastructure',
    screenshots: ['/screenshots/elomran.png'],
  },
  {
    id: 'mukth',
    titleAr: 'منصة مُكث لتحفيظ القرآن الكريم',
    titleEn: 'Mukth Platform — Quran Memorization',
    typeAr: 'منصة تعليمية إسلامية تفاعلية (EdTech)',
    typeEn: 'EdTech & Quran Memorization Platform',
    descAr: 'منصة تفاعلية متطورة لحفظ القرآن الكريم وتعلّم علومه على يد معلمين مجازين من الأزهر الشريف، تشمل فصولاً افتراضية مباشرة وجداول دراسية مرنة للطلاب حول العالم.',
    descEn: 'An interactive Islamic EdTech platform for memorizing the Holy Quran under certified Al-Azhar scholars with live virtual classes, flexible study schedules, and student progress metrics.',
    categories: ['web', 'edtech'],
    tags: ['React', 'EdTech', 'Live Classrooms', 'Arabic RTL'],
    liveUrl: 'https://mukth-green.vercel.app',
    wip: true,
    gradient: 'from-emerald-900/60 via-green-900/40 to-teal-900/60',
    accentColor: '#10b981',
    emoji: '📖',
    screenshotUrl: '/screenshots/mukth.png',
    screenshotAlt: 'Mukth Platform - Quran Memorization EdTech',
    screenshots: ['/screenshots/mukth.png'],
  },
  {
    id: 'hiswear',
    titleAr: 'متجر هيسوير للملابس (HISS)',
    titleEn: 'HISS / Hiswear — Premium Fashion Store',
    typeAr: 'متجر إلكتروني فاشون (Shopify)',
    typeEn: 'High-Converting Shopify Fashion Store',
    descAr: 'متجر أزياء إلكتروني متكامل عالي التحويل تم بناؤه وتخصيصه بالكامل على Shopify — يعرض تشكيلات البراند بتصميم فائق الأناقة وسرعة تحميل استثنائية مع بوابات دفع سريعة.',
    descEn: 'A high-converting, tailor-made Shopify e-commerce store for a premium fashion brand, engineered with sleek catalog presentation, instant checkout flow, and flawless mobile experience.',
    categories: ['ecommerce'],
    tags: ['Shopify', 'Liquid', 'E-Commerce', 'Fashion & Apparel'],
    liveUrl: 'https://hisswear.myshopify.com/',
    gradient: 'from-stone-900/60 via-pink-900/40 to-neutral-900/60',
    accentColor: '#f43f5e',
    emoji: '👕',
    screenshotUrl: '/screenshots/hiswear.png',
    screenshotAlt: 'HISS Fashion - Shopify E-Commerce Store',
    screenshots: ['/screenshots/hiswear.png'],
  },
]
