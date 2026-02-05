"use client";

import { useState } from "react";
import { Car, Phone } from "lucide-react";

/* ✅ Type for form state */
type FormState = {
  name: string;
  phone: string;
  carName: string;
  year: string;
  km: string;
  color: string;
  location: string;
  expectedPrice: string;
};

export default function SellYourCarForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    carName: "",
    year: "",
    km: "",
    color: "",
    location: "",
    expectedPrice: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `
🚗 *Sell My Old Car Request*

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🚘 Car Name: ${form.carName}
📅 Year: ${form.year}
🛣 KM Driven: ${form.km}
🎨 Color: ${form.color}
📍 Location: ${form.location}
💰 Expected Price: ${form.expectedPrice}
    `;

    const whatsappUrl = `https://wa.me/919936069962?text=${encodeURIComponent(
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
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              required
              onChange={handleChange}
              className="input-style"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              required
              onChange={handleChange}
              className="input-style"
            />

            <input
              type="text"
              name="carName"
              placeholder="Car Name (e.g. Swift, City)"
              value={form.carName}
              required
              onChange={handleChange}
              className="input-style"
            />

            <input
              type="number"
              name="year"
              placeholder="Model Year"
              value={form.year}
              required
              onChange={handleChange}
              className="input-style"
            />

            <input
              type="number"
              name="km"
              placeholder="KM Driven"
              value={form.km}
              required
              onChange={handleChange}
              className="input-style"
            />

            <input
              type="text"
              name="color"
              placeholder="Car Color (e.g. White)"
              value={form.color}
              required
              onChange={handleChange}
              className="input-style"
            />

            {/* ✅ LOCATION + PRICE IN ONE ROW */}
            <input
              type="text"
              name="location"
              placeholder="Car Location"
              value={form.location}
              required
              onChange={handleChange}
              className="input-style"
            />

            <input
              type="text"
              name="expectedPrice"
              placeholder="Expected Price"
              value={form.expectedPrice}
              onChange={handleChange}
              className="input-style"
            />

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

      {/* Styles */}
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
