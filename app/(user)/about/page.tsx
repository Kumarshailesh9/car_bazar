"use client";

import { CheckCircle } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            About Alam Car Bazaar
          </h1>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto">
            Your trusted destination for quality pre-owned cars at the best prices
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Alam Car Bazaar</strong> is a trusted used car dealership located
              in Daudpur, Uttar Pradesh. We specialize in buying and selling
              high-quality pre-owned cars that meet strict quality standards.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our goal is to make the used car buying process simple, transparent,
              and stress-free. Every vehicle in our inventory is carefully inspected
              so that our customers get complete peace of mind.
            </p>
          </div>

          {/* Right Content */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Why Choose Alam Car Bazaar?
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 w-5 h-5 mt-1" />
                <span className="text-gray-600">
                  Wide range of quality-checked used cars
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 w-5 h-5 mt-1" />
                <span className="text-gray-600">
                  Transparent pricing with no hidden charges
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 w-5 h-5 mt-1" />
                <span className="text-gray-600">
                  Assistance with documentation and ownership transfer
                </span>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-600 w-5 h-5 mt-1" />
                <span className="text-gray-600">
                  Customer-first approach and honest deals
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Mission Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our mission is to redefine the used car buying experience by offering
            reliable vehicles, honest pricing, and excellent customer service.
            We aim to build long-term relationships with our customers based on
            trust and satisfaction.
          </p>
        </div>

      </div>
    </section>
  );
}
