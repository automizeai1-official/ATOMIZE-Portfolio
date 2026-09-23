import type { ComponentType } from 'react'
import { Facebook, Instagram } from 'lucide-react'

export interface IconProps {
  size?: number
  className?: string
}

export const TikTokIcon = ({ size = 18, className = '' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.22 8.22 0 004.79 1.53V6.79a4.85 4.85 0 01-1.02-.1z" />
  </svg>
)

export interface SocialLink {
  icon: ComponentType<IconProps>
  href: string
  label: string
}

export const socialLinks: SocialLink[] = [
  {
    icon: Facebook,
    href: 'https://www.facebook.com/profile.php?id=61594413912609',
    label: 'Facebook',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/atomize_ai?stkn=MWRraXptdGRmazN2bA%3D%3D&utm_source=qr',
    label: 'Instagram',
  },
  {
    icon: TikTokIcon,
    href: 'https://www.tiktok.com/@atomizeai?is_from_webapp=1&sender_device=pc',
    label: 'TikTok',
  },
]
