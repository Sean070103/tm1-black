'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ArrowRight, Loader2, Mail } from 'lucide-react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [now, setNow] = useState(Date.now())

  const cooldownSeconds = useMemo(() => {
    if (!cooldownUntil) return 0
    return Math.max(0, Math.ceil((cooldownUntil - now) / 1000))
  }, [cooldownUntil, now])

  useEffect(() => {
    if (!cooldownUntil) return

    const timer = window.setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [cooldownUntil])

  useEffect(() => {
    if (cooldownUntil && Date.now() >= cooldownUntil) {
      setCooldownUntil(null)
      if (status === 'error') {
        setStatus('idle')
        setMessage(null)
      }
    }
  }, [cooldownUntil, now, status])

  function mapAuthError(rawMessage: string) {
    const lower = rawMessage.toLowerCase()

    if (lower.includes('rate limit') || lower.includes('too many requests')) {
      const waitMs = 60_000
      setCooldownUntil(Date.now() + waitMs)
      return 'Too many attempts. Please wait about a minute, then try again.'
    }

    return rawMessage
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (cooldownSeconds > 0) {
      setStatus('error')
      setMessage(`Please wait ${cooldownSeconds}s before requesting another link.`)
      return
    }

    const trimmed = email.trim()
    if (!trimmed) {
      setStatus('error')
      setMessage('Enter your email address.')
      return
    }

    setStatus('loading')
    const supabase = createClient()
    const origin = window.location.origin
    const { error } = await supabase.auth.signInWithOtp({
      email: trimmed,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=/profile`,
      },
    })

    if (error) {
      setStatus('error')
      setMessage(mapAuthError(error.message))
      return
    }

    setStatus('sent')
    setMessage('Check your inbox for the sign-in link.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="login-email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'sent') setStatus('idle')
            }}
            disabled={status === 'loading' || status === 'sent'}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-60"
          />
        </div>
      </div>

      {message && (
        <p
          className={
            status === 'error'
              ? 'text-sm text-red-600 dark:text-red-400'
              : 'text-sm text-muted-foreground'
          }
          role={status === 'error' ? 'alert' : undefined}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || status === 'sent' || cooldownSeconds > 0}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Sending link…
          </>
        ) : cooldownSeconds > 0 ? (
          `Try again in ${cooldownSeconds}s`
        ) : status === 'sent' ? (
          'Link sent'
        ) : (
          <>
            Send magic link
            <ArrowRight className="h-4 w-4" aria-hidden />
          </>
        )}
      </button>

    </form>
  )
}
