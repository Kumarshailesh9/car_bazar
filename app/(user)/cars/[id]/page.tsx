'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
  Phone,
  MapPin,
  Calendar,
  Fuel,
  Settings,
  Gauge,
  IndianRupee,
} from 'lucide-react'
import { db } from '@/_lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import LoadingSpinnerCar from '../../components/LoadingCar'

type Car = {
  title: string
  model: string
  year: number
  fuel: string
  transmission: string
  kilometers: number
  price?: number | string
  images: string[]
}

export default function CarDetailsPage() {
  const { id } = useParams()
  const [car, setCar] = useState<Car | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  /* ---------------- FETCH CAR ---------------- */
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const ref = doc(db, 'cars', id as string)
        const snap = await getDoc(ref)
        if (snap.exists()) {
          setCar(snap.data() as Car)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchCar()
  }, [id])

  /* ---------------- AUTO SLIDER ---------------- */
  useEffect(() => {
    if (!car?.images?.length) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % car.images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [car?.images])

  if (loading) return <LoadingSpinnerCar />
  if (!car) return <p className="p-6 text-center">Car not found</p>

  /* ---------------- WHATSAPP MESSAGE ---------------- */
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in the car below:\n\n` +
      `🚗 Car: ${car.title}\n` +
      `🏷 Model: ${car.model}\n` +
      `📅 Year: ${car.year}\n\n` +
      `Please share more details.`
  )

  const whatsappLink = `https://wa.me/919918476777?text=${whatsappMessage}`

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: IMAGE */}
        <div>
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden bg-gray-100">
            {car.images?.length ? (
              <Image
                src={car.images[activeIndex]}
                alt={car.title}
                fill
                priority
                className="object-cover object-bottom"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* PRICE BADGE */}
            {car.price && (
              <div className="absolute bottom-4 right-4 bg-[#1F3A93] text-white px-4 py-2 rounded-xl text-lg font-bold flex items-center gap-1">
                <IndianRupee className="w-5 h-5" />
                {Number(car.price).toLocaleString()}
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {car.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative min-w-[96px] h-[64px] rounded-lg overflow-hidden border-2 ${
                    activeIndex === i
                      ? 'border-[#1F3A93]'
                      : 'border-gray-200'
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS */}
        <div>
          <h1 className="text-3xl font-extrabold">
            {car.title}
            <span className="text-gray-500 text-lg ml-2">
              ({car.model})
            </span>
          </h1>

          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <MapPin className="w-4 h-4 text-[#1F3A93]" />
            <span>Alam Car Bazaar, Daudpur</span>
          </div>

          {/* SPECS */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border rounded-2xl p-6">
            <Spec icon={<Calendar />} label="Year" value={car.year} />
            <Spec icon={<Fuel />} label="Fuel" value={car.fuel} />
            <Spec
              icon={<Settings />}
              label="Transmission"
              value={car.transmission}
            />
            <Spec
              icon={<Gauge />}
              label="Kilometers"
              value={`${car.kilometers.toLocaleString()} km`}
            />
          </div>

          {/* CTA BUTTONS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CALL */}
            <a
              href="tel:+919918476777"
              className="flex items-center justify-center gap-3 bg-[#1F3A93] hover:bg-[#162C6B] text-white text-lg font-semibold py-4 rounded-2xl transition"
            >
              <Phone />
              Call Now
            </a>

            {/* WHATSAPP */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-4 rounded-2xl transition"
            >
              <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
                <path d="M16 0C7.2 0 0 7.1 0 15.9c0 2.8.7 5.4 2.1 7.7L0 32l8.6-2.1c2.2 1.2 4.8 1.9 7.4 1.9 8.8 0 16-7.1 16-15.9S24.8 0 16 0z" />
              </svg>
              WhatsApp Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- SPEC COMPONENT ---------------- */
function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1">
      <div className="text-[#1F3A93]">{icon}</div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}
