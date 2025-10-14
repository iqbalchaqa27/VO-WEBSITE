"use client"

import useSWR from "swr"

type Times = {
  Fajr: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function PrayerTimesWidget({ className }: { className?: string }) {
  const { data, error, isLoading } = useSWR<{ times: Times; city: string; date: string }>("/api/prayer-times", fetcher)

  return (
    <div className={`subtle-card p-5 ${className || ""}`}>
      <h3 className="text-lg font-semibold">Jadwal Sholat (Jabodetabek)</h3>
      {isLoading && <p className="mt-2 text-sm text-muted-foreground">Memuat...</p>}
      {error && <p className="mt-2 text-sm text-destructive">Gagal memuat jadwal</p>}
      {!isLoading && !error && data && (
        <div className="mt-3">
          <p className="text-sm text-muted-foreground">
            {data.city} — {data.date}
          </p>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <TimeItem name="Subuh" value={data.times.Fajr} />
            <TimeItem name="Dzuhur" value={data.times.Dhuhr} />
            <TimeItem name="Ashar" value={data.times.Asr} />
            <TimeItem name="Maghrib" value={data.times.Maghrib} />
            <TimeItem name="Isya" value={data.times.Isha} />
          </div>
        </div>
      )}
    </div>
  )
}

function TimeItem({ name, value }: { name: string; value: string }) {
  return (
    <div className="rounded-md border bg-secondary p-3 text-center">
      <div className="text-xs text-muted-foreground">{name}</div>
      <div className="font-medium">{value}</div>
    </div>
  )
}
