import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import SiteHeaderNav from '@/components/site-header-nav'
import { createClient } from '@/lib/supabase/server'
import LoginForm from './login-form'

export const metadata: Metadata = {
  title: 'Log in | Team1 Philippines',
  description: 'Sign in to Team1 Philippines with email',
}

type Props = {
  searchParams: Promise<{ error?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/profile')
  }

  const params = await searchParams
  const callbackError = params.error

  return (
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <SiteHeaderNav />

      <section className="border-b border-border px-4 pb-10 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Log in</h1>
          <p className="mt-2 text-muted-foreground">Use your email—we’ll send you a magic link.</p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          {callbackError && (
            <div
              className="mb-6 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-700 dark:text-red-300"
              role="alert"
            >
              Sign-in didn’t complete. Try requesting a new link or check your Supabase redirect URLs.
            </div>
          )}
          <div className="rounded-2xl border border-border bg-card/40 p-6 shadow-sm md:p-8">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  )
}
