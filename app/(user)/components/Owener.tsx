"use client";

import { BadgeCheck, Star } from "lucide-react";
import Image from "next/image";

export default function FounderCard() {
  return (
    <section className="w-full px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1220] via-[#0c1a2f] to-[#3a0d22] p-8 md:p-12">

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10 items-center">

            {/* LEFT – LOGO */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-64 h-64 rounded-full border-4 border-red-600 shadow-xl overflow-hidden">
                <Image
                  src="/logo.png" // put logo in public folder
                  alt="Alam Car Bazar Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* RIGHT – DETAILS */}
            <div className="text-white">

              {/* Verified Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium mb-4">
                <BadgeCheck className="w-4 h-4" />
                Verified Owner
              </div>

              {/* Name */}
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
                ALAM
              </h2>

              {/* Role */}
              <p className="text-gray-300 mt-1 text-lg">
                Founder, Alam Car Bazar
              </p>

              {/* Quote */}
              <div className="relative mt-6 pl-6 border-l-4 border-red-600 text-gray-200 italic leading-relaxed max-w-3xl">
                "I don't just sell cars; I deliver trust. Every vehicle in our
                showroom at Alam Car Bazar is personally verified by me to
                ensure customers get nothing but the best."
              </div>

              {/* Divider */}
              <div className="my-8 h-px bg-white/10" />

              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                {/* Experience */}
                <div>
                  <h3 className="text-3xl font-bold">20+</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Years Experience
                  </p>
                </div>

                {/* Customers */}
                <div>
                  <h3 className="text-3xl font-bold">1000+</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Happy Customers
                  </p>
                </div>

                {/* Rating */}
                <div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    Top Rated Dealer
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
