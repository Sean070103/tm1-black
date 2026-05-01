'use client'

import type { User as SupabaseUser } from '@supabase/supabase-js'
import { LogIn, User } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type Variant = 'desktop' | 'mobile'

const desktopClass =
  'rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground'
const mobileClass =
  'rounded-md p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground'

export default function AuthNavCluster({ variant = 'desktop' }: { variant?: Variant }) {
  const [user, setUser] = useState<SupabaseUser | null | undefined>(undefined)
  const linkClass = variant === 'mobile' ? mobileClass : desktopClass

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (user === undefined) {
    return <span className={variant === 'mobile' ? 'inline-block w-10' : 'inline-block w-9'} aria-hidden />
  }

  if (user) {
    return (
      <Link href="/profile" className={linkClass} aria-label="Profile">
        <User size={18} />
      </Link>
    )
  }

  return (
    <Link href="/login" className={linkClass} aria-label="Log in">
      <LogIn size={18} />
    </Link>
  )
}
