"use client";

import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="w-full py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="text-gray-600 mt-1">
            We’re here to help you find your perfect car
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-6 items-start">

          {/* LEFT – MAP */}
          <div className="w-full h-[380px] rounded-lg overflow-hidden">
            <iframe
              title="Alam Car Bazar Location"
              src="https://www.google.com/maps?q=4%20Wheeler%20Alam%20Car%20Bazar%20Pvt%20Ltd,%20Main%20Road,%20Daudpur,%20near%20Beeaar%20Hyundai,%20Uttar%20Pradesh%20273001&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          {/* RIGHT – DETAILS */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Address
                </h3>
                <p className="text-gray-600 text-sm leading-snug">
                  4 Wheeler Alam Car Bazar Pvt Ltd <br />
                  Main Road, Daudpur <br />
                  Near Beeaar Hyundai <br />
                  Uttar Pradesh 273001
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Call
                </h3>
                <a
                  href="tel:+919918476777"
                  className="text-gray-600 text-sm hover:text-green-600 font-medium"
                >
                  +91 9918476777
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Email
                </h3>
                <a
                  href="mailto:info@alambazar.com"
                  className="text-gray-600 text-sm hover:text-blue-600 font-medium"
                >
                  info@alambazar.com
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Working Hours
                </h3>
                <p className="text-gray-600 text-sm">
                  Open 7 Days <br />
                  <span className="font-medium">
                    7:00 AM – 9:00 PM
                  </span>
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-4 space-y-3">

              {/* Get Directions – Full Width */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=4+Wheeler+Alam+Car+Bazar+Pvt+Ltd,+Daudpur"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-700 transition"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>

              {/* Call + WhatsApp – Half Width */}
              <div className="grid grid-cols-2 gap-3">

                {/* Call Me */}
                <a
                  href="tel:+919918476777"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition"
                >
                  <Phone className="w-4 h-4" />
                  Call Me
                </a>

                {/* WhatsApp Me */}
                <a
                  href="https://wa.me/919918476777"
                  target="_blank"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#25D366] text-white text-sm font-medium hover:opacity-90 transition"
                >
                  <Phone className="w-4 h-4" />
                  WhatsApp Me
                </a>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
