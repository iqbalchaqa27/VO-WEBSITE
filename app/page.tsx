import Link from "next/link"
import { FadeIn } from "@/components/fade-in"
import { PrayerTimesWidget } from "@/components/prayer-times-widget"
import { SliderCarousel } from "@/components/slider-carousel"
import { db } from "@/lib/db"
import { sliders as slidersTable } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default async function HomePage() {
  // Fetch active sliders from database
  let sliders: any[] = []
  try {
    if (db && process.env.DATABASE_URL) {
      sliders = await db
        .select()
        .from(slidersTable)
        .where(eq(slidersTable.active, true))
        .orderBy(slidersTable.order)
    }
  } catch (error) {
    console.error('[v0] Failed to fetch sliders:', error)
    // Silently fail and show empty carousel
  }

  return (
    <>
      {/* Slider Carousel */}
      <section className="section">
        <div className="container">
          <SliderCarousel sliders={sliders} />
        </div>
      </section>

      <section className="section bg-secondary">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          <FadeIn className="order-2 md:order-1">
            <h1 className="text-balance text-3xl md:text-4xl font-semibold">IKAQ JABODETABEK</h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Wadah silaturahmi dan pengabdian sosial alumni IKAQ wilayah JABODETABEK.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/tentang" className="btn-primary">
                Visi & Misi
              </Link>
              <Link href="/struktur" className="btn-secondary">
                Struktur
              </Link>
              <Link href="/berita" className="btn-secondary">
                Berita Terbaru
              </Link>
            </div>

            <div className="mt-8 subtle-card p-5">
              <h3 className="font-medium">Infaq/Sedekah</h3>
              <p className="mt-2 text-sm">
                BRI 042001001334309
                <br />
                a.n IKAQ JABODETABEK
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Hanya tampilkan teks, tanpa fitur transaksi.</p>
            </div>
          </FadeIn>

          <FadeIn className="order-1 md:order-2">
            <div className="relative aspect-[4/3] subtle-card overflow-hidden">
              <img
                src="/images/kegiatan-ikaq.png"
                alt="Kolase foto kegiatan IKAQ JABODETABEK"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container grid md:grid-cols-3 gap-6">
          <FadeIn className="md:col-span-2">
            <h2 className="section-title">Tentang IKAQ</h2>
            <p className="mt-3 leading-relaxed text-pretty">
              IKAQ JABODETABEK berkomitmen untuk membangun jaringan kekeluargaan, mendorong kegiatan sosial, dan
              meningkatkan kualitas spiritual anggota melalui program-program bermanfaat bagi umat.
            </p>
          </FadeIn>
          <FadeIn>
            <PrayerTimesWidget />
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container grid md:grid-cols-3 gap-6 items-center">
          <FadeIn className="md:col-span-1">
            <div className="relative subtle-card overflow-hidden">
              <img
                src="/images/ketua-ikaq.png"
                alt="Foto Ketua IKAQ JABODETABEK"
                className="w-full h-auto object-contain"
              />
            </div>
          </FadeIn>
          <FadeIn className="md:col-span-2">
            <h2 className="section-title">Ketua IKAQ JABODETABEK</h2>
            <p className="mt-3 leading-relaxed text-pretty">
              Profil singkat dan peran Ketua IKAQ JABODETABEK sebagai penggerak kolaborasi alumni, teladan akhlak, serta
              penguat silaturahmi dan pengabdian sosial. Konten detail dapat diperbarui kemudian sesuai kebutuhan.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
