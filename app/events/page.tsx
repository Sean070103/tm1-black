'use client'

import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink, MapPin, Search, Users } from 'lucide-react'
import { lumaEvents } from '@/lib/events-data'
import SiteHeaderNav from '@/components/site-header-nav'

const sortedEvents = [...lumaEvents]
  .filter((event) => event.status === 'past')
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('all')

  const cityOptions = useMemo(() => {
    const cities = new Set<string>()
    for (const event of sortedEvents) {
      if (!event.location) continue
      const city = event.location.split(',')[0]?.trim()
      if (city) cities.add(city)
    }
    return ['all', ...Array.from(cities).sort((a, b) => a.localeCompare(b))]
  }, [])

  const monthOptions = useMemo(() => {
    const months = new Set<string>()
    for (const event of sortedEvents) {
      const monthKey = typeof event.date === 'string' ? event.date.slice(0, 7) : ''
      if (!/^\d{4}-\d{2}$/.test(monthKey)) continue
      months.add(monthKey)
    }
    return ['all', ...Array.from(months).sort((a, b) => b.localeCompare(a))]
  }, [])

  const filteredEvents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    return sortedEvents.filter((event) => {
      const eventMonth = typeof event.date === 'string' ? event.date.slice(0, 7) : ''
      const eventCity = event.location?.split(',')[0]?.trim() || ''

      const matchesSearch =
        !term ||
        event.title.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      const matchesCity = selectedCity === 'all' || eventCity === selectedCity
      const matchesMonth = selectedMonth === 'all' || eventMonth === selectedMonth

      return matchesSearch && matchesCity && matchesMonth
    })
  }, [searchTerm, selectedCity, selectedMonth])

  const formatMonth = (value: string) => {
    if (value === 'all') return 'All Months'
    const [year, month] = value.split('-')
    const date = new Date(Number(year), Number(month) - 1, 1)
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  }

  return (
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SiteHeaderNav />

      <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
              <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-6">
                <ArrowLeft size={15} />
                Back to Home
              </a>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Team1 Events Archive</h1>
              <p className="text-muted-foreground mt-3 text-base md:text-lg">
                Past community events scraped from Luma with direct links and event covers.
              </p>
            </div>
            <a
              href="https://luma.com/Team1Philippines?period=past"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 hover:bg-muted transition"
            >
              View on Luma
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or location"
                className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring"
            >
              {cityOptions.map((city) => (
                <option key={city} value={city} className="bg-card text-foreground">
                  {city === 'all' ? 'All Cities' : city}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-ring focus:ring-1 focus:ring-ring"
            >
              {monthOptions.map((month) => (
                <option key={month} value={month} className="bg-card text-foreground">
                  {formatMonth(month)}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredEvents.length} of {sortedEvents.length} events
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-7">
            {filteredEvents.map((event) => (
              <article key={event.id} className="border border-border rounded-xl overflow-hidden bg-card/60 hover:border-muted-foreground/40 transition duration-300">
                <div className="w-full h-52 bg-muted overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-4">
                  <h2 className="text-lg font-bold leading-tight line-clamp-2">{event.title}</h2>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="inline-flex items-center gap-2">
                      <CalendarDays size={15} className="text-muted-foreground shrink-0" />
                      {event.date ? new Date(event.date).toLocaleDateString() : 'Date TBA'}
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <MapPin size={15} className="text-muted-foreground shrink-0" />
                      {event.location || 'Philippines'}
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <Users size={15} className="text-muted-foreground shrink-0" />
                      {event.attendees || 0} attendees
                    </p>
                  </div>

                  <a
                    href={event.link || 'https://luma.com/Team1Philippines'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-muted-foreground transition"
                  >
                    Open Event
                    <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
          {filteredEvents.length === 0 && (
            <div className="border border-border rounded-xl p-8 text-center text-muted-foreground mt-6 bg-muted/30">
              No events match your filters. Try a different search, city, or month.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
