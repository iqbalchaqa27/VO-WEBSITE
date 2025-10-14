import { FadeIn } from "@/components/fade-in"

export default function TentangPage() {
  return (
    <section className="section">
      <div className="container space-y-8">
        <FadeIn>
          <h1 className="section-title">Visi</h1>
          <p className="mt-3 leading-relaxed">
            Mewujudkan komunitas alumni yang berkontribusi positif bagi masyarakat melalui kegiatan sosial, edukasi, dan
            spiritual.
          </p>
        </FadeIn>
        <FadeIn>
          <h2 className="section-title">Misi</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed">
            <li>Menjalin silaturahmi antar alumni IKAQ wilayah JABODETABEK.</li>
            <li>Menggerakkan kegiatan sosial dan keagamaan.</li>
            <li>Meningkatkan peran anggota dalam pembangunan umat.</li>
            <li>Mengembangkan potensi anggota melalui kolaborasi dan edukasi.</li>
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}
