'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

export default function SignOutButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition hover:bg-muted disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
          Signing out...
        </>
      ) : (
        'Sign out'
      )}
    </button>
  )
}
