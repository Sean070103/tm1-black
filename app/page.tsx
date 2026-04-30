'use client'

import { useState } from 'react'
import { Menu, X, ArrowRight, Facebook, Instagram, Send } from 'lucide-react'
import { lumaEvents, teamOverview, activeMembers } from '@/lib/events-data'
import { profilePicturesByUrl } from '@/lib/profile-pictures.generated'

const navigationItems = [
  { label: 'HOME', href: '#home' },
  { label: 'PROGRAMS', href: '#programs' },
  { label: 'EVENTS', href: '/events' },
  { label: 'CONTRIBUTORS', href: '/contributors' },
  { label: 'MEDIA KIT', href: '#media-kit' },
  { label: 'MEMBERS', href: '#members' },
  { label: 'PARTNERS', href: '#partners' },
  { label: 'RESOURCES', href: '#resources' }
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const featuredEvents = lumaEvents
    .filter((event) => event.status === 'past')
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <span className="font-bold text-base md:text-lg tracking-tight">team1 ph</span>

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

            <div className="hidden md:flex items-center gap-3">
              <button className="px-6 py-2 text-xs font-medium text-neutral-300 border border-neutral-800 rounded-lg hover:border-neutral-700 hover:text-white transition duration-200">Login</button>
              <button className="px-6 py-2 text-xs font-medium text-black bg-white rounded-lg hover:bg-neutral-100 transition duration-200">Browse</button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-neutral-900 rounded transition">
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

      {/* Hero Section */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border border-neutral-800 rounded-2xl p-8 md:p-16 bg-gradient-to-b from-neutral-950 to-black hover:border-neutral-700 transition duration-300">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
              <div className="flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight leading-tight">Welcome to Team1</h1>
                <p className="text-base md:text-lg text-neutral-400 font-light">Community hub • Resources, bounties, and events</p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto md:flex-shrink-0">
                <button className="w-full md:w-auto px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-100 transition duration-200 font-semibold">Login</button>
                <button className="w-full md:w-auto px-6 py-3 border border-neutral-700 text-white rounded-lg text-sm font-medium hover:border-neutral-600 hover:bg-neutral-950 transition duration-200">Browse</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'TOTAL EVENTS ORGANIZED', value: String(teamOverview.totalEventsOrganized) },
              { label: 'LUMA SUBSCRIBERS', value: teamOverview.lumaSubscribers.toLocaleString() },
              { label: 'ACTIVE MEMBERS (VERIFIED)', value: String(teamOverview.activeMembersVerified) },
              { label: 'FLOATING MEMBERS', value: String(teamOverview.floatingMembers) }
            ].map((stat, i) => (
              <div key={i} className="border border-neutral-800 rounded-xl p-6 md:p-8 hover:border-neutral-700 hover:bg-neutral-950/50 transition duration-300 group">
                <p className="text-neutral-500 text-xs font-semibold uppercase mb-4 tracking-wider group-hover:text-neutral-400 transition">{stat.label}</p>
                <p className="text-3xl md:text-4xl font-bold tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Events</h2>
              <p className="text-base md:text-lg text-neutral-400 font-light">All events now live on a dedicated page</p>
            </div>
            <a href="/events" className="text-neutral-400 hover:text-white text-sm font-medium transition inline-flex items-center gap-2 hover:gap-3 duration-200">Open Events Page <ArrowRight size={16} /></a>
          </div>

          <div className="mb-8 border border-neutral-800 rounded-xl p-6 md:p-8 bg-neutral-950/50">
            <p className="text-neutral-300 text-sm md:text-base">
              We moved the full event archive to keep the homepage clean and focused.
              Browse all scraped Luma events with improved card layout and direct event links.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <a key={event.id} href="/events" className="block border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition duration-300">
                <div className="w-full h-44 overflow-hidden bg-neutral-800">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-5 space-y-2 bg-black">
                  <p className="text-xs text-neutral-500">{event.date ? new Date(event.date).toLocaleDateString() : 'Date TBA'}</p>
                  <h3 className="text-base md:text-lg font-bold text-white line-clamp-2">{event.title}</h3>
                  <p className="text-sm text-neutral-400 line-clamp-1">{event.location || 'Philippines'}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Programs</h2>
              <p className="text-base md:text-lg text-neutral-400 font-light">Initiatives to accelerate your growth</p>
            </div>
            <a href="#" className="text-neutral-400 hover:text-white text-sm font-medium transition inline-flex items-center gap-2 hover:gap-3 duration-200">View All <ArrowRight size={16} /></a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: '[Apptly] Campus Connect',
                description: 'Campus Connect is a curated university engagement program powered by Team1, designed to identify, mentor, and accelerate student builders.'
              },
              {
                title: 'Campus Builders',
                description: 'The Campus Builders Program is for students who want to grow Web3 and Avalanche adoption. Includes mentorship, workshops, and funding.'
              },
              {
                title: 'Developer Fellowship',
                description: 'A comprehensive program for developers looking to build on Avalanche. Get access to tools, documentation, and direct support.'
              },
              {
                title: 'Creator Collective',
                description: 'For content creators and community builders. Share your knowledge and grow your audience with exclusive resources and events.'
              }
            ].map((program, i) => (
              <div key={i} className="border border-neutral-800 rounded-xl p-7 md:p-8 hover:border-neutral-700 hover:bg-neutral-950/50 transition duration-300 group">
                <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-neutral-100 transition">{program.title}</h3>
                <p className="text-sm md:text-base text-neutral-400 mb-6 line-clamp-3 group-hover:text-neutral-300 transition">{program.description}</p>
                <a href="#" className="text-neutral-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition inline-flex items-center gap-2 hover:gap-3 duration-200">View Program <ArrowRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-44 opacity-70 pointer-events-none">
          <div className="absolute bottom-0 left-[-8%] w-[45%] h-36 bg-gradient-to-t from-neutral-800/70 to-transparent [clip-path:polygon(0_100%,50%_20%,100%_100%)]" />
          <div className="absolute bottom-0 left-[22%] w-[46%] h-44 bg-gradient-to-t from-neutral-700/80 via-neutral-500/40 to-transparent [clip-path:polygon(0_100%,50%_8%,100%_100%)]" />
          <div className="absolute bottom-0 right-[-8%] w-[44%] h-32 bg-gradient-to-t from-neutral-800/70 to-transparent [clip-path:polygon(0_100%,52%_28%,100%_100%)]" />
          <div className="absolute bottom-0 left-[44%] w-[28%] h-24 bg-gradient-to-t from-white/30 to-transparent [clip-path:polygon(0_100%,50%_12%,100%_100%)]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(185,227,255,0.12),transparent_42%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Active Members</h2>
              <p className="text-base md:text-lg text-neutral-300 font-light">Shaped by the mountain spirit of Avalanche</p>
            </div>
            <a href="/contributors" className="text-neutral-300 hover:text-white text-sm font-medium transition inline-flex items-center gap-2">
              View Contributors <ArrowRight size={15} />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="border border-neutral-700 rounded-xl p-5 md:p-6 bg-neutral-950/70 transition duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold text-white">Active Members</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {activeMembers.map((member, idx) => (
                  <article
                    key={member.handle}
                    className="min-w-[240px] border border-neutral-700 bg-neutral-900/60 p-3 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <span className="p-0.5 border border-neutral-600 bg-black w-fit rounded-full">
                        <img
                          src={profilePicturesByUrl[member.profileUrl] || '/icon-dark-32x32.png'}
                          alt={member.handle}
                          className="w-12 h-12 object-cover bg-neutral-800 rounded-full"
                        />
                      </span>
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-neutral-700 bg-neutral-950 mb-1.5 rounded">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 font-semibold">
                            T1-PH-{String(idx + 1).padStart(3, '0')}
                          </span>
                        </div>
                        <p className="text-sm font-semibold tracking-tight text-white uppercase truncate">{member.handle}</p>
                      </div>
                    </div>
                    <a
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-[11px] text-neutral-200 bg-neutral-800 border border-neutral-700 px-2 py-1 rounded hover:bg-neutral-700 transition"
                    >
                      Open Profile <ArrowRight size={12} />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Partners</h2>
            <p className="text-base md:text-lg text-neutral-400 font-light mt-2">This section is currently on progress.</p>
          </div>

          <div className="border border-neutral-800 rounded-xl p-7 md:p-8 bg-neutral-950/50">
            <p className="text-neutral-300 text-sm md:text-base">
              We are currently curating official partner information and will publish it soon.
            </p>
          </div>
        </div>
      </section>

      {/* Media Kit Section */}
      <section id="media-kit" className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 md:mb-14">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">Media Kit</h2>
              <p className="text-base md:text-lg text-neutral-400 font-light">Download official logos, brand guidelines, and assets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: 'Brand Guidelines',
                description: 'Complete brand guidelines including color palette, typography, and usage rules.'
              },
              {
                title: 'Logos & Assets',
                description: 'High-resolution logos in various formats, icons, and other brand assets.'
              },
              {
                title: 'Social Media Kit',
                description: 'Pre-designed social media templates and graphics for Team1 Philippines.'
              },
              {
                title: 'Presentation Templates',
                description: 'Ready-to-use presentation templates for events and announcements.'
              }
            ].map((item, i) => (
              <div key={i} className="border border-neutral-800 rounded-xl p-7 md:p-8 hover:border-neutral-700 hover:bg-neutral-950/50 transition duration-300 group">
                <h3 className="text-lg md:text-xl font-bold mb-3 group-hover:text-neutral-100 transition">{item.title}</h3>
                <p className="text-sm md:text-base text-neutral-400 mb-6 group-hover:text-neutral-300 transition">{item.description}</p>
                <a href="#" className="text-neutral-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition inline-flex items-center gap-2 hover:gap-3 duration-200">Download <ArrowRight size={14} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Resources</h2>
            <p className="text-base md:text-lg text-neutral-400 font-light mt-2">Essential links and resources</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Avalanche Documentation',
                link: 'https://docs.avax.network',
                description: 'Official Avalanche blockchain documentation'
              },
              {
                title: 'Luma Events Calendar',
                link: 'https://luma.com/Team1Philippines',
                description: 'View all Team1 Philippines events'
              },
              {
                title: 'Web3 Learning Hub',
                link: '#',
                description: 'Educational resources for Web3 development'
              },
              {
                title: 'Developer Tools',
                link: '#',
                description: 'Essential tools for building on Avalanche'
              },
              {
                title: 'Community Discord',
                link: '#',
                description: 'Join our vibrant community on Discord'
              },
              {
                title: 'Newsletter',
                link: '#',
                description: 'Subscribe to Team1 Philippines updates'
              }
            ].map((resource, i) => (
              <a
                key={i}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-800 rounded-xl p-7 md:p-8 hover:border-neutral-700 hover:bg-neutral-950/50 transition duration-300 group"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-neutral-100 transition">{resource.title}</h3>
                <p className="text-sm text-neutral-400 group-hover:text-neutral-300 transition">{resource.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Verify Member Section */}
      <section className="pb-20 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 tracking-tight">Verify Member</h2>

          <form className="space-y-8 mb-14 md:mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-3 tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-800 transition duration-200" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-3 tracking-wider">X Handle</label>
                <div className="flex">
                  <span className="bg-neutral-950 border border-r-0 border-neutral-800 px-4 py-3 text-sm text-neutral-600 rounded-l-lg">@</span>
                  <input 
                    type="text" 
                    placeholder="username" 
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-r-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-800 transition duration-200" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-3 tracking-wider">Telegram Handle</label>
                <div className="flex">
                  <span className="bg-neutral-950 border border-r-0 border-neutral-800 px-4 py-3 text-sm text-neutral-600 rounded-l-lg">@</span>
                  <input 
                    type="text" 
                    placeholder="username" 
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-r-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-800 transition duration-200" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-3 tracking-wider">Discord ID</label>
                <div className="flex">
                  <span className="bg-neutral-950 border border-r-0 border-neutral-800 px-4 py-3 text-sm text-neutral-600 rounded-l-lg">@</span>
                  <input 
                    type="text" 
                    placeholder="username" 
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-r-lg px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-800 transition duration-200" 
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button 
                type="submit" 
                className="px-8 py-3 border border-neutral-700 rounded-lg text-neutral-400 hover:text-white hover:border-neutral-600 hover:bg-neutral-950 transition duration-200 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 group"
              >
                Check Status <ArrowRight size={14} className="group-hover:translate-x-1 transition duration-200" />
              </button>
            </div>
          </form>

          {/* Contact & Media Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="border border-neutral-800 rounded-xl p-7 md:p-8 hover:border-neutral-700 hover:bg-neutral-950/50 transition duration-300 group">
              <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-neutral-100 transition">Contact Us</h3>
              <p className="text-sm md:text-base text-neutral-400 mb-6 group-hover:text-neutral-300 transition">Reach out for partnerships, events, and press inquiries.</p>
              <a href="#" className="text-neutral-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition inline-flex items-center gap-2 hover:gap-3 duration-200">View Options <ArrowRight size={14} /></a>
            </div>
            <div className="border border-neutral-800 rounded-xl p-7 md:p-8 hover:border-neutral-700 hover:bg-neutral-950/50 transition duration-300 group">
              <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-neutral-100 transition">Media Kit</h3>
              <p className="text-sm md:text-base text-neutral-400 mb-6 group-hover:text-neutral-300 transition">Download official logos, brand guidelines, and assets.</p>
              <a href="#" className="text-neutral-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition inline-flex items-center gap-2 hover:gap-3 duration-200">Open Kit <ArrowRight size={14} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            <div>
              <h3 className="font-bold text-base mb-3">Team1 Philippines</h3>
              <p className="text-neutral-500 text-sm font-light leading-relaxed">Building the Avalanche community in the Philippines</p>
            </div>
            <div>
              <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-neutral-400">Links</h4>
              <ul className="space-y-3">
                <li><a href="https://go.team1.network/philippines" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition text-sm duration-200">Team1</a></li>
                <li><a href="https://go.team1.network/philippines-cascade" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition text-sm duration-200">Cascade</a></li>
                <li><a href="https://go.team1.network/philippines-builder" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition text-sm duration-200">Builder</a></li>
                <li><a href="https://go.team1.network/philippines-core" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition text-sm duration-200">Core</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-neutral-400">Team1 Socials</h4>
              <ul className="space-y-3">
                <li><a href="https://www.facebook.com/avalancheteam1philippines/" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition text-sm duration-200 inline-flex items-center gap-2"><Facebook size={14} /> Facebook</a></li>
                <li><a href="https://www.instagram.com/team1philippines" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition text-sm duration-200 inline-flex items-center gap-2"><Instagram size={14} /> Instagram</a></li>
                <li><a href="https://t.me/team1philippines" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition text-sm duration-200 inline-flex items-center gap-2"><Send size={14} /> Telegram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-xs mb-4 uppercase tracking-wider text-neutral-400">Contact</h4>
              <ul className="space-y-3">
                <li><a href="mailto:hello@team1ph.com" className="text-neutral-500 hover:text-white transition text-sm duration-200">Email</a></li>
                <li><a href="#" className="text-neutral-500 hover:text-white transition text-sm duration-200">Partnerships</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-900 pt-8 md:pt-10 text-center">
            <p className="text-neutral-500 text-xs md:text-sm font-light">© 2024 Team1 Philippines. All rights reserved. Built for impact. Designed for builders.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
