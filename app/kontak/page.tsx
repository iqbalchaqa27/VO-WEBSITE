"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function KontakPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Gagal mengirim")
      toast({ title: "Terkirim", description: "Pesan Anda telah dikirim." })
      setForm({ name: "", email: "", message: "" })
    } catch (err: any) {
      toast({ title: "Gagal", description: "Terjadi kesalahan. Coba lagi.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

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

        <form onSubmit={onSubmit} className="subtle-card p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input
              required
              className="mt-1 w-full rounded-md border bg-background px-3 py-2"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              placeholder="Nama lengkap"
              aria-label="Nama"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              required
              type="email"
              className="mt-1 w-full rounded-md border bg-background px-3 py-2"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              placeholder="email@contoh.com"
              aria-label="Email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Pesan</label>
            <textarea
              required
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 min-h-28"
              value={form.message}
              onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
              placeholder="Tulis pesan Anda..."
              aria-label="Pesan"
            />
          </div>
          <button className="btn-primary" disabled={loading} aria-busy={loading}>
            {loading ? "Mengirim..." : "Kirim Pesan"}
          </button>
        </form>
      </div>
    </section>
  )
}
