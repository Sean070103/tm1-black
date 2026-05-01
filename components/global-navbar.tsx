'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import SiteLogoMark from '@/components/site-logo-mark'

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'PROGRAMS', href: '/#programs' },
  { label: 'EVENTS', href: '/events' },
  { label: 'CONTRIBUTORS', href: '/contributors' },
  { label: 'MEDIA KIT', href: '/#media-kit' },
  { label: 'MEMBERS', href: '/#members' },
  { label: 'PARTNERS', href: '/#partners' },
  { label: 'RESOURCES', href: '/#resources' }
]

export default function GlobalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a href="/" className="inline-flex items-center">
            <SiteLogoMark className="text-base text-white md:text-lg" />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.href === pathname
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-medium transition px-3 py-2 ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  {item.label}
                </a>
              )
            })}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-neutral-900 rounded transition">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-neutral-900 pt-4 space-y-2 bg-neutral-950">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-xs font-medium text-neutral-400 hover:text-white px-2 py-2 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
