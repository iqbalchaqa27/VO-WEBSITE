'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { visitors } from '@/lib/db/schema'
import { and, eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getVisitors() {
  const userId = await getUserId()
  return db
    .select()
    .from(visitors)
    .where(eq(visitors.userId, userId))
    .orderBy(desc(visitors.createdAt))
}

export async function createVisitor(data: {
  name: string
  email: string
  phone?: string
  message?: string
  type: string
}) {
  // This can be called without auth - it's from the public contact form
  // But we need to associate it with an admin user. For now, use the first user
  const allUsers = await db.query.user.findMany({ limit: 1 })
  const userId = allUsers[0]?.id || 'system'

  const result = await db
    .insert(visitors)
    .values({
      ...data,
      userId,
    })
    .returning()
  revalidatePath('/admin/visitors')
  return result[0]
}

export async function deleteVisitor(id: number) {
  const userId = await getUserId()
  await db
    .delete(visitors)
    .where(and(eq(visitors.id, id), eq(visitors.userId, userId)))
  revalidatePath('/admin/visitors')
}
