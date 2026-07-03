import { notFound } from "next/navigation"
import Link from "next/link"

export async function generateStaticParams() {
  return []
}

export default function BeritaDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  return notFound()
}
