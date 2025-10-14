import Link from "next/link"
import { posts } from "@/lib/data"
import { FadeIn } from "@/components/fade-in"

export default function BeritaPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Berita & Artikel</h1>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <FadeIn key={p.slug}>
              <Link href={`/berita/${p.slug}`} className="block subtle-card overflow-hidden hover:bg-accent transition">
                <img src={p.image || "/placeholder.svg"} alt={p.title} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(p.date).toLocaleDateString("id-ID")} • {p.author}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
