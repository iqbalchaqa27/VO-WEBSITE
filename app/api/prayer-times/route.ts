import { NextResponse } from "next/server"

export const revalidate = 3600 // revalidate hourly

export async function GET() {
  try {
    // Aladhan API for Jakarta, Indonesia
    const url = "https://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=20"
    const r = await fetch(url, { next: { revalidate } })
    const j = await r.json()

    const data = j?.data
    const times = data?.timings

    const payload = {
      city: "Jabodetabek (Jakarta)",
      date: data?.date?.readable ?? "",
      times: {
        Fajr: times?.Fajr ?? "04:30",
        Dhuhr: times?.Dhuhr ?? "12:00",
        Asr: times?.Asr ?? "15:15",
        Maghrib: times?.Maghrib ?? "17:50",
        Isha: times?.Isha ?? "19:00",
      },
    }

    return NextResponse.json(payload, { headers: { "Cache-Control": "public, s-maxage=3600" } })
  } catch {
    return NextResponse.json(
      {
        city: "Jabodetabek (Jakarta)",
        date: new Date().toLocaleDateString("id-ID"),
        times: { Fajr: "04:30", Dhuhr: "12:00", Asr: "15:15", Maghrib: "17:50", Isha: "19:00" },
      },
      { headers: { "Cache-Control": "no-store" } },
    )
  }
}
