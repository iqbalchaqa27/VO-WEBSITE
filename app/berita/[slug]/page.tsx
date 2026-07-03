import { db } from "@/lib/db"
import { news } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Link from "next/link"

export async function generateStaticParams() {
  try {
    if (!process.env.DATABASE_URL) return []
    const newsList = await db
      .select({ slug: news.slug })
      .from(news)
      .where(eq(news.published, true))
    return newsList.map((item) => ({ slug: item.slug }))
  } catch (error) {
    console.error('[v0] Failed to generate static params:', error)
    return []
  }
}

export default async function BeritaDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  let newsItem = null
  try {
    if (process.env.DATABASE_URL) {
      const items = await db
        .select()
        .from(news)
        .where(eq(news.slug, params.slug))
      newsItem = items[0] || null
    }
  } catch (error) {
    console.error('[v0] Failed to fetch news item:', error)
  }

  if (!newsItem || !newsItem.published) {
    return notFound()
  }

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <Link href="/berita" className="text-sm text-primary hover:underline">
          ← Kembali ke Berita
        </Link>
        {newsItem.imageUrl && (
          <img
            src={newsItem.imageUrl}
            alt={newsItem.title}
            className="w-full h-64 object-cover rounded-lg border mt-4"
          />
        )}
        <h1 className="mt-6 text-3xl font-semibold">{newsItem.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {new Date(newsItem.createdAt).toLocaleDateString("id-ID")}
        </p>
        <div className="mt-6 leading-relaxed prose prose-sm max-w-none">
          {newsItem.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
