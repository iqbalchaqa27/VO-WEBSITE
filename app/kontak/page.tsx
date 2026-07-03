import { ContactForm } from "@/components/contact-form"

export default function KontakPage() {
  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="section-title">Kontak Kami</h1>
          <div className="mt-4 subtle-card p-5 space-y-2">
            <p>
              <strong>Telepon:</strong> 089507221355
            </p>
            <p>
              <strong>Email:</strong> ikaqjabodetabek@gmail.com
            </p>
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">Ikuti kami di media sosial (jika ada).</p>
            </div>
          </div>
        </div>

        <div className="subtle-card p-5">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
