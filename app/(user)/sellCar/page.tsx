"use client";

import { useState } from "react";
import { Car, Phone } from "lucide-react";

export default function SellYourCarForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    carName: "",
    year: "",
    km: "",
    location: "",
    expectedPrice: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
🚗 *Sell My Old Car Request*

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🚘 Car Name: ${form.carName}
📅 Year: ${form.year}
🛣 KM Driven: ${form.km}
📍 Location: ${form.location}
💰 Expected Price: ${form.expectedPrice}
    `;

    const whatsappUrl = `https://wa.me/919918476777?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-[#0b1220] via-[#0c1a2f] to-[#3a0d22] p-8 md:p-12 text-white">

          {/* Header */}
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-medium mb-4">
              <Car className="w-4 h-4" />
              Sell Your Old Car
            </span>

            <h2 className="text-3xl md:text-4xl font-bold">
              Get the <span className="text-red-400">Best Value</span> for Your Car
            </h2>

            <p className="text-gray-300 mt-3 max-w-2xl">
              Fill in the details below and send them directly to Alam Car Bazar
              via WhatsApp for instant evaluation.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/10"
          >
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              onChange={handleChange}
              className="input-style"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              onChange={handleChange}
              className="input-style"
            />

            {/* Car Name */}
            <input
              type="text"
              name="carName"
              placeholder="Car Name (e.g. Swift, City)"
              required
              onChange={handleChange}
              className="input-style"
            />

            {/* Year */}
            <input
              type="number"
              name="year"
              placeholder="Model Year"
              required
              onChange={handleChange}
              className="input-style"
            />

            {/* KM Driven */}
            <input
              type="number"
              name="km"
              placeholder="KM Driven"
              required
              onChange={handleChange}
              className="input-style"
            />

            {/* Location */}
            <input
              type="text"
              name="location"
              placeholder="Car Location"
              required
              onChange={handleChange}
              className="input-style"
            />

            {/* Expected Price */}
            <input
              type="text"
              name="expectedPrice"
              placeholder="Expected Price"
              onChange={handleChange}
              className="input-style md:col-span-2"
            />

            {/* Submit */}
            <button
              type="submit"
              className="md:col-span-2 flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md bg-[#25D366] text-white font-semibold hover:opacity-90 transition"
            >
              <Phone className="w-4 h-4" />
              Send Details on WhatsApp
            </button>
          </form>

        </div>
      </div>

      {/* Tailwind input utility */}
      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          outline: none;
        }
        .input-style::placeholder {
          color: #cbd5e1;
        }
        .input-style:focus {
          border-color: #ef4444;
          background: rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </section>
  );
}
