import { posts } from "@/lib/data"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export default function BeritaDetailPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) return notFound()

  return (
    <article className="section">
      <div className="container max-w-3xl">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg border"
        />
        <h1 className="mt-6 text-3xl font-semibold">{post.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {new Date(post.date).toLocaleDateString("id-ID")} • {post.author}
        </p>
        <div className="mt-6 leading-relaxed whitespace-pre-line">{post.content}</div>
      </div>
    </article>
  )
}
