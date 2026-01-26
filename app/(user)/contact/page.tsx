"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="text-gray-600 mt-2">
            We’re here to help you find your perfect car
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Address */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <MapPin className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Address
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              Main Road, Daudpur, <br />
              Near Beeaar Hyundai, <br />
              Uttar Pradesh 273001
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <Phone className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Call Us
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              <a
                href="tel:+919918476777"
                className="hover:text-green-600 font-medium"
              >
                +91 9918476777
              </a>
            </p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <div className="flex justify-center mb-4">
              <Mail className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Email Us
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              <a
                href="mailto:info@alambazar.com"
                className="hover:text-blue-600 font-medium"
              >
                info@alambazar.com
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
