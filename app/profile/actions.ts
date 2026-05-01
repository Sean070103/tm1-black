'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const PENGUIN_OPTIONS = ['classic', 'blue', 'mint', 'sunset', 'violet', 'ice'] as const

export async function updateAvatarAnimal(formData: FormData) {
  const selected = formData.get('avatarAnimal')
  if (
    typeof selected !== 'string' ||
    !PENGUIN_OPTIONS.includes(selected as (typeof PENGUIN_OPTIONS)[number])
  ) {
    return
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      avatar_animal: 'penguin',
      avatar_penguin: selected,
    },
  })

  revalidatePath('/profile')
  redirect('/profile')
}
