'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Slider {
  id: number
  title: string
  description?: string
  imageUrl: string
  link?: string
  active: boolean
}

export function SliderCarousel({ sliders }: { sliders: Slider[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay || sliders.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, sliders.length])

  if (sliders.length === 0) {
    return null
  }

  const activeSliders = sliders.filter((s) => s.active)
  if (activeSliders.length === 0) return null

  const current = activeSliders[currentIndex]

  const goToPrevious = () => {
    setAutoPlay(false)
    setCurrentIndex(
      (prev) => (prev - 1 + activeSliders.length) % activeSliders.length
    )
  }

  const goToNext = () => {
    setAutoPlay(false)
    setCurrentIndex((prev) => (prev + 1) % activeSliders.length)
  }

  return (
    <section className="relative w-full overflow-hidden rounded-lg subtle-card">
      {/* Carousel */}
      <div className="relative aspect-video">
        <img
          src={current.imageUrl}
          alt={current.title}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
          <h2 className="text-white text-2xl md:text-4xl font-bold text-balance">
            {current.title}
          </h2>
          {current.description && (
            <p className="text-white/90 text-sm md:text-base mt-2 max-w-lg">
              {current.description}
            </p>
          )}
          {current.link && (
            <a href={current.link} className="btn-primary mt-4 w-fit">
              Pelajari Lebih Lanjut
            </a>
          )}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Indicators */}
      {activeSliders.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {activeSliders.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoPlay(false)
                setCurrentIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
