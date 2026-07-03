'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { news } from '@/lib/db/schema'
import { and, eq, desc } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getNews() {
  const userId = await getUserId()
  return db
    .select()
    .from(news)
    .where(eq(news.userId, userId))
    .orderBy(desc(news.createdAt))
}

export async function getPublishedNews() {
  return db
    .select()
    .from(news)
    .where(eq(news.published, true))
    .orderBy(desc(news.createdAt))
}

export async function getNewsBySlug(slug: string) {
  const result = await db
    .select()
    .from(news)
    .where(and(eq(news.slug, slug), eq(news.published, true)))
  return result[0]
}

export async function createNews(data: {
  title: string
  slug: string
  content: string
  imageUrl?: string
  excerpt?: string
  published?: boolean
}) {
  const userId = await getUserId()
  const result = await db
    .insert(news)
    .values({
      ...data,
      userId,
    })
    .returning()
  revalidatePath('/admin/news')
  revalidatePath('/berita')
  return result[0]
}

export async function updateNews(
  id: number,
  data: {
    title?: string
    slug?: string
    content?: string
    imageUrl?: string
    excerpt?: string
    published?: boolean
  }
) {
  const userId = await getUserId()
  const result = await db
    .update(news)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(news.id, id), eq(news.userId, userId)))
    .returning()
  revalidatePath('/admin/news')
  revalidatePath('/berita')
  return result[0]
}

export async function deleteNews(id: number) {
  const userId = await getUserId()
  await db
    .delete(news)
    .where(and(eq(news.id, id), eq(news.userId, userId)))
  revalidatePath('/admin/news')
  revalidatePath('/berita')
}
