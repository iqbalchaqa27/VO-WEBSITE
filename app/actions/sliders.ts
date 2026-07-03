'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { sliders } from '@/lib/db/schema'
import { and, eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getSliders() {
  const userId = await getUserId()
  return db
    .select()
    .from(sliders)
    .where(eq(sliders.userId, userId))
    .orderBy(sliders.order)
}

export async function createSlider(data: {
  title: string
  description?: string
  imageUrl: string
  link?: string
  order: number
}) {
  const userId = await getUserId()
  const result = await db
    .insert(sliders)
    .values({
      ...data,
      userId,
    })
    .returning()
  revalidatePath('/admin/sliders')
  revalidatePath('/')
  return result[0]
}

export async function updateSlider(
  id: number,
  data: {
    title?: string
    description?: string
    imageUrl?: string
    link?: string
    order?: number
    active?: boolean
  }
) {
  const userId = await getUserId()
  const result = await db
    .update(sliders)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(sliders.id, id), eq(sliders.userId, userId)))
    .returning()
  revalidatePath('/admin/sliders')
  revalidatePath('/')
  return result[0]
}

export async function deleteSlider(id: number) {
  const userId = await getUserId()
  await db
    .delete(sliders)
    .where(and(eq(sliders.id, id), eq(sliders.userId, userId)))
  revalidatePath('/admin/sliders')
  revalidatePath('/')
}
