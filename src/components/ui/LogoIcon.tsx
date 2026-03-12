import { cn } from '@/lib/utils'

interface LogoIconProps {
  className?: string
}

export default function LogoIcon({ className }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 48 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-hidden="true"
    >
      {/* Top chevron */}
      <path
        d="M24 2L6 18h10l8-8 8 8h10L24 2z"
        fill="url(#grad-top)"
        stroke="url(#grad-stroke)"
        strokeWidth="0.5"
      />
      {/* Bottom chevron */}
      <path
        d="M24 16L6 32h10l8-8 8 8h10L24 16z"
        fill="url(#grad-bottom)"
        stroke="url(#grad-stroke)"
        strokeWidth="0.5"
      />
      <defs>
        <linearGradient id="grad-top" x1="6" y1="2" x2="42" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5CE0D8" />
          <stop offset="1" stopColor="#00B8CC" />
        </linearGradient>
        <linearGradient id="grad-bottom" x1="6" y1="16" x2="42" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00B8CC" />
          <stop offset="1" stopColor="#008A99" />
        </linearGradient>
        <linearGradient id="grad-stroke" x1="6" y1="2" x2="42" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5CE0D8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#008A99" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  )
}
