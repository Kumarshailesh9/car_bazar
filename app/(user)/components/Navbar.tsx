"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneCall, ShieldUser } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b-2 border-red-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <p className="text-red-600 font-extrabold tracking-wide">
              ALAM CAR BAZAR
            </p>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/about" className="hover:text-red-600 transition">
              About
            </Link>
            <Link href="/cars" className="hover:text-red-600 transition">
              Used Cars
            </Link>
             <Link href="/sellCar" className="hover:text-red-600 transition">
              Sell Car
            </Link>
            <Link href="/contact" className="flex items-center gap-1 hover:text-red-600 transition">
              Contact <PhoneCall size={18} />
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              <ShieldUser size={18} /> Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded bg-red-600 text-white"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mx-4 mt-2 rounded-xl border bg-white shadow p-4 space-y-2">
          {["/", "/about", "/cars", "/sellCar", "/contact"].map((path, i) => (
            <Link
              key={i}
              href={path}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded hover:bg-red-50"
            >
              {path === "/" ? "Home" : path.replace("/", "").toUpperCase()}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block text-center bg-red-600 text-white py-3 rounded-lg font-medium"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
