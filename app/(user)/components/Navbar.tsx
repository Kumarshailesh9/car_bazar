"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneCall, ShieldUser } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white backdrop-blur-md border-b border-[#1F3A93] rounded">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <p className="text-[#1F3A93] font-bold">ALAM CAR BAZAR</p>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="  hover:text-[#1F3A93] hover:font-bold transition">
              About
            </Link>
            <Link href="/cars" className="  hover:text-[#1F3A93] hover:font-bold transition">
              Used Cars
            </Link>
            <Link href="/contact" className="flex  hover:text-[#1F3A93] hover:font-bold transition">
               Contact Us <PhoneCall size={20}/>
            </Link>
            <Link
              href="/login"
              className="flex px-4 py-2 rounded-xl shadow hover:bg-[#1F3A93] hover:text-white transition"
            >
              <ShieldUser/> Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg  bg-[#1F3A93] transition text-white"
          >
            <span className="text-2xl">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 mb-4  rounded-2xl shadow-lg border  p-4 space-y-3">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-[#1F3A93]"
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-lg  hover:bg-[#1F3A93]"
          >
            About
          </Link>

          <Link
            href="/cars"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-lg  hover:bg-[#1F3A93]"
          >
          Used Cars
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 rounded-lg hover:bg-[#1F3A93]"
          >
            Contact
          </Link>

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="block text-center bg-[#1F3A93]  py-3 rounded-xl font-medium shadow "
          >
           Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
