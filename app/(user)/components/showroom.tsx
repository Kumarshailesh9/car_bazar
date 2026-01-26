'use client'

export default function ShowroomGallery() {
  return (
    <section className="bg-[#070b14] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Showroom & <span className="text-[#1F3A93]">Car Gallery</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real Cars. Real Showroom. Real Trust. Visit us today to experience quality.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Large Left Image */}
          <div className="md:col-span-2 md:row-span-2">
            <img
              src="/1.webp"
              alt="Alam Car Bazar Showroom"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Top Right Images */}
          <div>
            <img
              src="/2.webp"
              alt="Used Cars"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <div>
            <img
              src="/3.webp"
              alt="Second Hand Cars"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Bottom Left Small */}
          <div>
            <img
              src="/4.webp"
              alt="Car Stock"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Bottom Center Small */}
          <div>
            <img
              src="/6.webp"
              alt="Parking Area"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
