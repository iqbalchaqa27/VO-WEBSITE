import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "IKAQ JABODETABEK",
  description: "Website resmi IKAQ JABODETABEK untuk informasi, publikasi kegiatan, dan komunikasi antar anggota.",
  generator: "v0.app",
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${poppins.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans bg-background text-foreground">
        <Suspense fallback={<div>Loading...</div>}>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
          <ScrollToTop />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
