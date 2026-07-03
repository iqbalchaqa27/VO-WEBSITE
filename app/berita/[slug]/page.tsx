import { db } from "@/lib/db"
import { news } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import Link from "next/link"

export async function generateStaticParams() {
  const newsList = await db
    .select({ slug: news.slug })
    .from(news)
    .where(eq(news.published, true))
    .catch(() => [])

  return newsList.map((item) => ({ slug: item.slug }))
}

export default async function BeritaDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const newsItem = await db
    .select()
    .from(news)
    .where(eq(news.slug, params.slug))
    .then((items) => items[0])
    .catch(() => null)

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
