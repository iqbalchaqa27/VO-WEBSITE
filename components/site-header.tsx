"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="border-b bg-card">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2" aria-label="Halaman Utama IKAQ JABODETABEK">
          <img src="/images/ikaq-logo.png" alt="Logo IKAQ JABODETABEK" className="h-7 w-7" />
          <span className="font-semibold tracking-wide">IKAQ JABODETABEK</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="/tentang">Tentang</NavLink>
          <NavLink href="/struktur">Struktur</NavLink>
          <NavLink href="/berita">Berita</NavLink>
          <NavLink href="/jadwal-sholat">Jadwal Sholat</NavLink>
          <NavLink href="/kontak">Kontak</NavLink>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Buka navigasi"
        >
          <span className="sr-only">Menu</span>
          <div className="h-4 w-4 border-t-2 border-foreground" />
        </button>
      </div>

      <div id="mobile-nav" className={cn("md:hidden border-t bg-card", open ? "block" : "hidden")}>
        <div className="container py-3 flex flex-col gap-2">
          <NavLink href="/">Beranda</NavLink>
          <NavLink href="/tentang">Tentang</NavLink>
          <NavLink href="/struktur">Struktur</NavLink>
          <NavLink href="/berita">Berita</NavLink>
          <NavLink href="/jadwal-sholat">Jadwal Sholat</NavLink>
          <NavLink href="/kontak">Kontak</NavLink>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-foreground/80 hover:text-foreground transition">
      {children}
    </Link>
  )
}
