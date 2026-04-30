'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react'
import { contributors } from '@/lib/events-data'
import { profilePicturesByUrl } from '@/lib/profile-pictures.generated'

const navigationItems = [
  { label: 'HOME', href: '/' },
  { label: 'PROGRAMS', href: '/#programs' },
  { label: 'EVENTS', href: '/events' },
  { label: 'CONTRIBUTORS', href: '/contributors' },
  { label: 'MEDIA KIT', href: '/#media-kit' },
  { label: 'MEMBERS', href: '/#members' },
  { label: 'PARTNERS', href: '/#partners' },
  { label: 'RESOURCES', href: '/#resources' }
]

function getProfileLabel(url: string) {
  try {
    const parsed = new URL(url)
    const cleanPath = parsed.pathname.replace(/^\/+|\/+$/g, '')
    return cleanPath || parsed.hostname
  } catch {
    return url
  }
}

export default function ContributorsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <a href="/" className="font-bold text-base md:text-lg tracking-tight">team1 ph</a>

            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs font-medium text-neutral-400 hover:text-white transition px-3 py-2"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-neutral-900 rounded transition">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 border-t border-neutral-900 pt-4 space-y-2 bg-neutral-950">
              {navigationItems.map((item) => (
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

      <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition mb-6">
            <ArrowLeft size={15} />
            Back to Home
          </a>
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Contributors</h1>
            <p className="text-neutral-300 mt-3 text-base md:text-lg">
              Team1 contributors across Ops, Tech, Media, and Events.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {contributors.map((member) => (
              <a
                key={member.profileUrl}
                href={member.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-700 rounded-xl px-4 py-3 bg-neutral-900/60 hover:border-neutral-500 hover:bg-neutral-900 transition duration-300 inline-flex items-center gap-3"
              >
                <span className="p-[1px] rounded-full border border-neutral-600 bg-neutral-950">
                  <img
                    src={profilePicturesByUrl[member.profileUrl] || '/icon-dark-32x32.png'}
                    alt={member.profileUrl}
                    className="w-11 h-11 rounded-full object-cover bg-neutral-800 flex-shrink-0"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-neutral-100 font-medium truncate">{getProfileLabel(member.profileUrl)}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-400 mt-1">{member.role}</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-neutral-500" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
