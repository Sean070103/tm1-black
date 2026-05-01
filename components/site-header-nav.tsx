'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import AuthNavCluster from '@/components/auth-nav-cluster'
import ThemeToggle from '@/components/theme-toggle'
import SiteLogoMark from '@/components/site-logo-mark'
import SiteMobileMenu from '@/components/site-mobile-menu'
import { siteNavGroups } from '@/lib/nav-config'

type SiteHeaderNavProps = {
  /** When false (home), logo is not wrapped in a link. */
  logoLinked?: boolean
}

export default function SiteHeaderNav({ logoLinked = true }: SiteHeaderNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const logoWrapClass =
    'inline-flex items-center shrink-0 border-r border-border pr-3 sm:pr-4 lg:pr-4'

  return (
    <nav className="fixed inset-x-0 top-0 z-50 pt-2 px-2 sm:px-4">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2">
        <div
          className={
            'flex h-11 w-full max-w-full items-center rounded-full border border-border ' +
            'bg-background/95 px-2 shadow-sm backdrop-blur-sm dark:bg-black/95 ' +
            'sm:px-2.5 lg:h-12 lg:w-fit lg:px-3 lg:shadow-md'
          }
        >
          {logoLinked ? (
            <a href="/" className={logoWrapClass}>
              <SiteLogoMark />
            </a>
          ) : (
            <span className={logoWrapClass}>
              <SiteLogoMark />
            </span>
          )}

          <div className="hidden items-center gap-0.5 pl-2 lg:flex lg:pl-3">
            {siteNavGroups.map((group) =>
              'href' in group ? (
                <a
                  key={group.label}
                  href={group.href}
                  className="whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-muted/80 hover:text-foreground lg:px-2.5 lg:py-2"
                >
                  {group.label}
                </a>
              ) : (
                <div key={group.label} className="group relative">
                  <button
                    type="button"
                    className="whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-muted/80 hover:text-foreground lg:px-2.5 lg:py-2"
                  >
                    {group.label}
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 mt-2 w-40 rounded-lg border border-border bg-popover p-2 text-popover-foreground opacity-0 transition group-hover:visible group-hover:opacity-100">
                    {group.items.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block rounded px-2 py-2 text-xs text-muted-foreground transition hover:bg-muted hover:text-foreground"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="hidden items-center gap-1 border-l border-border pl-3 lg:flex">
            <AuthNavCluster variant="desktop" />
            <ThemeToggle />
          </div>

          <div className="ml-auto flex items-center gap-0.5 lg:hidden">
            <ThemeToggle />
            <AuthNavCluster variant="mobile" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-md p-2 transition hover:bg-muted"
              aria-expanded={mobileMenuOpen}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="w-full">
            <SiteMobileMenu groups={siteNavGroups} onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  )
}
