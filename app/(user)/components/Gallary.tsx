'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

const galleryItems = [
  {
    id: 1,
    title: 'Certified Pre-Owned Cars',
    category: 'Quality Assured',
    image: '/1.webp'
  },
  {
    id: 2,
    title: 'Wide Range of Used Cars',
    category: 'Best Deals',
    image: '/2.webp'
  },
  {
    id: 3,
    title: 'Trusted by 1000+ Customers',
    category: 'Alam Car Bazar Pvt Ltd',
    image: '/3.webp'
  }
]

export default function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const next = () => emblaApi?.scrollNext()
  const prev = () => emblaApi?.scrollPrev()

  return (
    <section
      id="gallery"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* FULL SCREEN CAROUSEL */}
      <div ref={emblaRef} className="overflow-hidden w-full h-full">
        <div className="flex h-full">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="flex-[0_0_100%] relative w-full h-screen"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="p-6 md:p-12 text-white max-w-3xl">
                  <p className="text-sm md:text-base text-primary uppercase font-semibold">
                    {item.category}
                  </p>
                  <h1 className="text-3xl md:text-5xl font-bold mt-2">
                    {item.title}
                  </h1>
                  <p className="mt-4 text-white/90">
                    Buy reliable second-hand cars with full transparency,
                    verified documents, and best market prices.
                  </p>

                  <div className="mt-6 flex gap-4">
                    <button className="px-6 py-3 bg-primary rounded-lg font-semibold hover:bg-primary/90">
                      View Cars
                    </button>
                    <button className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto p-3 bg-white/80 hover:bg-white rounded-full shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="pointer-events-auto p-3 bg-white/80 hover:bg-white rounded-full shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  )
}
