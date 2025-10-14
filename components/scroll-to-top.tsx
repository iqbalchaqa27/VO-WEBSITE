"use client"

import { useEffect, useState } from "react"

export function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-primary text-primary-foreground px-4 py-3 shadow-lg hover:opacity-95"
      aria-label="Kembali ke atas"
    >
      ↑
    </button>
  )
}
