import { PrayerTimesWidget } from "@/components/prayer-times-widget"

export default function JadwalSholatPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title">Jadwal Sholat</h1>
        <p className="mt-2 text-muted-foreground">
          Otomatis berdasarkan wilayah Jabodetabek (mengacu titik kota Jakarta).
        </p>
        <div className="mt-6">
          <PrayerTimesWidget />
        </div>
      </div>
    </section>
  )
}
