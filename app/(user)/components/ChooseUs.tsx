'use client'

import {
  ShieldCheck,
  Car,
  IndianRupee,
  FileCheck,
  Users,
  Wrench
} from 'lucide-react'

const reasons = [
  {
    title: 'Certified Used Cars',
    desc: 'Every car is inspected and quality-checked before sale.',
    icon: ShieldCheck
  },
  {
    title: 'Wide Range of Cars',
    desc: 'Hatchbacks, sedans, SUVs, and premium used cars available.',
    icon: Car
  },
  {
    title: 'Best Price Guarantee',
    desc: 'Fair pricing with complete transparency. No hidden charges.',
    icon: IndianRupee
  },
  {
    title: 'Hassle-Free Documentation',
    desc: 'RC transfer, insurance, and paperwork handled by our team.',
    icon: FileCheck
  },
  {
    title: 'Trusted by 1000+ Customers',
    desc: 'Years of trust and satisfied customers across the region.',
    icon: Users
  },
  {
    title: 'After-Sales Support',
    desc: 'We support you even after the car purchase.',
    icon: Wrench
  }
]

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-[#1F3A93]">Alam Car Bazaar</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We help you buy quality second-hand cars with confidence and peace of mind.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition border border-gray-100"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-red-50 mb-6">
                  <Icon className="text-[#1F3A93]" size={28} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
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
