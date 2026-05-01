import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { signOut } from '@/app/auth/actions'
import { updateAvatarAnimal } from '@/app/profile/actions'
import SignOutButton from '@/app/profile/signout-button'
import SiteHeaderNav from '@/components/site-header-nav'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Profile | Team1 Philippines',
  description: 'Your Team1 Philippines account profile',
}

function displayName(user: {
  id?: string
  email?: string | null
  user_metadata?: Record<string, unknown>
}) {
  const meta = user.user_metadata
  const fromMeta =
    (typeof meta?.full_name === 'string' && meta.full_name) ||
    (typeof meta?.name === 'string' && meta.name) ||
    (typeof meta?.display_name === 'string' && meta.display_name)
  if (fromMeta) return fromMeta
  if (user.email) return user.email.split('@')[0] ?? 'Member'
  return 'Member'
}

const PENGUIN_OPTIONS = ['classic', 'blue', 'mint', 'sunset', 'violet', 'ice'] as const

function getSelectedPenguin(user: { user_metadata?: Record<string, unknown> } | null) {
  const selected = user?.user_metadata?.avatar_penguin
  if (typeof selected !== 'string') return null
  return PENGUIN_OPTIONS.includes(selected as (typeof PENGUIN_OPTIONS)[number]) ? selected : null
}

function getAvatarSrc(user: { id?: string; email?: string | null; user_metadata?: Record<string, unknown> } | null) {
  const meta = user?.user_metadata
  const selectedPenguin = getSelectedPenguin(user)
  const seed = user?.email ?? user?.id ?? 'guest'

  if (selectedPenguin) {
    return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(`penguin-${selectedPenguin}-${seed}`)}&backgroundColor=b6e3f4,c0aede,d1d4f9`
  }

  const fromMeta =
    (typeof meta?.avatar_url === 'string' && meta.avatar_url) ||
    (typeof meta?.picture === 'string' && meta.picture)

  if (fromMeta) return fromMeta

  const fallbackPenguin = PENGUIN_OPTIONS[seed.length % PENGUIN_OPTIONS.length]

  return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(`penguin-${fallbackPenguin}-${seed}`)}&backgroundColor=b6e3f4,c0aede,d1d4f9`
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const selectedPenguin = getSelectedPenguin(user)

  return (
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SiteHeaderNav />

      <section className="border-b border-border px-4 pb-14 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Profile</h1>
          {!user ? (
            <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
              Sign in to link your email and manage your account.
            </p>
          ) : null}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-8">
          {!user && (
            <div className="rounded-2xl border border-border bg-muted/30 px-4 py-6 text-center md:px-8">
              <p className="text-sm text-muted-foreground">
                You’re not signed in. Use a magic link from the log in page—no password required.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Go to log in
              </Link>
            </div>
          )}

          <div className="overflow-hidden rounded-2xl border border-border bg-card/40 shadow-sm">
            <div className="border-b border-border bg-muted/40 px-6 py-8 md:px-8">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                  <img
                    src={getAvatarSrc(user)}
                    alt={user ? `${displayName(user)} avatar` : 'Guest avatar'}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <p className="text-xl font-semibold tracking-tight md:text-2xl">
                    {user ? displayName(user) : 'Guest'}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {user ? user.email : 'Sign in to show your email'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 px-6 py-8 md:px-8">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </label>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
                  <Mail size={16} className="shrink-0 opacity-70" aria-hidden />
                  <span>{user?.email ?? '—'}</span>
                </div>
              </div>

              {user ? (
                <div>
                  <form action={updateAvatarAnimal} className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                    {PENGUIN_OPTIONS.map((variant) => {
                      const previewSrc = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${encodeURIComponent(`penguin-${variant}-${user.email ?? user.id ?? 'guest'}`)}&backgroundColor=b6e3f4,c0aede,d1d4f9`
                      const isSelected = selectedPenguin ? selectedPenguin === variant : variant === 'classic'

                      return (
                        <button
                          key={variant}
                          type="submit"
                          name="avatarAnimal"
                          value={variant}
                          className={`group rounded-xl border p-2 transition ${
                            isSelected ? 'border-primary bg-primary/10' : 'border-border bg-muted/30 hover:bg-muted/50'
                          }`}
                          aria-label={`Use ${variant} penguin avatar`}
                          title={`Use ${variant} penguin avatar`}
                        >
                          <img
                            src={previewSrc}
                            alt={`${variant} penguin avatar option`}
                            className="h-14 w-14 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      )
                    })}
                  </form>
                </div>
              ) : null}

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Bio <span className="font-normal normal-case text-muted-foreground/80">(optional)</span>
                </label>
                <textarea
                  readOnly
                  rows={4}
                  placeholder={
                    user ? 'Profile fields can be saved to Supabase later.' : 'Sign in to edit your profile…'
                  }
                  className="w-full resize-none rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm text-muted-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Last sign-in:{' '}
                  {user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : user
                      ? '—'
                      : '—'}
                </p>
                {user ? (
                  <form action={signOut}>
                    <SignOutButton />
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
