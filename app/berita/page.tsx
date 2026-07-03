import Link from "next/link"
import { FadeIn } from "@/components/fade-in"
import { db } from "@/lib/db"
import { news } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export default async function BeritaPage() {
  let newsList: any[] = []
  try {
    if (db && process.env.DATABASE_URL) {
      newsList = await db
        .select()
        .from(news)
        .where(eq(news.published, true))
        .orderBy(desc(news.createdAt))
    }
  } catch (error) {
    console.error('[v0] Failed to fetch news:', error)
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Berita & Artikel</h1>
        {newsList.length === 0 ? (
          <p className="mt-6 text-muted-foreground text-center py-8">
            Belum ada berita yang dipublikasikan
          </p>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map((item) => (
              <FadeIn key={item.slug}>
                <Link
                  href={`/berita/${item.slug}`}
                  className="block subtle-card overflow-hidden hover:bg-accent transition"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </p>
                    {item.excerpt && (
                      <p className="mt-2 text-sm text-foreground line-clamp-2">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
