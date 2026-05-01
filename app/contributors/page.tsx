import { ArrowLeft, ArrowRight } from 'lucide-react'
import { contributors } from '@/lib/events-data'
import { profilePicturesByUrl } from '@/lib/profile-pictures.generated'
import SiteHeaderNav from '@/components/site-header-nav'

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
  return (
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SiteHeaderNav />

      <section className="pt-24 pb-14 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-6">
            <ArrowLeft size={15} />
            Back to Home
          </a>
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Contributors</h1>
            <p className="text-muted-foreground mt-3 text-base md:text-lg">
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
                className="border border-border rounded-xl px-4 py-3 bg-card/60 hover:border-muted-foreground/40 hover:bg-muted/50 transition duration-300 inline-flex items-center gap-3"
              >
                <span className="p-[1px] rounded-full border border-border bg-card">
                  <img
                    src={profilePicturesByUrl[member.profileUrl] || '/icon-dark-32x32.png'}
                    alt={member.profileUrl}
                    className="w-11 h-11 rounded-full object-cover bg-muted flex-shrink-0"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-foreground font-medium truncate">{getProfileLabel(member.profileUrl)}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{member.role}</p>
                </div>
                <ArrowRight size={14} className="ml-auto text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
