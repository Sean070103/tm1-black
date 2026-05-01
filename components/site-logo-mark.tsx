import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

const interLogo = Inter({
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
})

type SiteLogoMarkProps = {
  className?: string
}

/** Minimal wordmark: team + red superscript 1 + philippines (Inter Semibold, tight tracking). */
export default function SiteLogoMark({ className }: SiteLogoMarkProps) {
  return (
    <span
      aria-label="Team1 Philippines"
      className={cn(
        interLogo.className,
        'inline-flex items-baseline font-semibold lowercase',
        'text-[0.9375rem] sm:text-base tracking-[-0.05em] text-black dark:text-white',
        className
      )}
    >
      <span aria-hidden>team</span>
      <span
        className="relative top-[-0.18em] ml-[0.06em] text-[0.72em] font-bold leading-none text-red-600"
        aria-hidden
      >
        1
      </span>
      <span aria-hidden className="tracking-[-0.05em]">
        {' '}
        philippines
      </span>
    </span>
  )
}
