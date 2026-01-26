'use client'

import { Search, PhoneCall, CheckCircle } from 'lucide-react'

const steps = [
  {
    step: 'Step 1',
    title: 'Choose Your Car',
    desc: 'Browse our collection of verified used cars and find your perfect match.',
    icon: Search
  },
  {
    step: 'Step 2',
    title: 'Contact Us',
    desc: 'Call or WhatsApp us for more details, schedule a visit, or arrange a test drive.',
    icon: PhoneCall
  },
  {
    step: 'Step 3',
    title: 'Visit Showroom & Buy',
    desc: 'Visit our showroom in Gorakhpur, inspect the car, and complete the purchase hassle-free.',
    icon: CheckCircle
  }
]

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-gray-600">
            Simple and transparent process to buy your dream car
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {steps.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index}>
                {/* Icon */}
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-50 mb-6">
                  <Icon className="text-[#1F3A93]" size={28} />
                </div>

                {/* Step */}
                <p className="text-[#1F3A93] font-semibold mb-2">
                  {item.step}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
