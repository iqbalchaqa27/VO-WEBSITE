import { structure } from "@/lib/data"
import { FadeIn } from "@/components/fade-in"

export default function StrukturPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Struktur Organisasi</h1>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {structure.map((m) => (
            <FadeIn key={m.name}>
              <div className="subtle-card p-4 text-center">
                <img
                  src={m.photo || "/placeholder.svg"}
                  alt={`Foto ${m.name}`}
                  className="mx-auto h-28 w-28 rounded-full object-cover"
                />
                <div className="mt-3 font-medium">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.role}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
