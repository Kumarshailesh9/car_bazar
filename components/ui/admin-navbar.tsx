"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/_lib/firebase";
import { LogOut, ShieldUser } from "lucide-react";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  /* ---------- LOGOUT ---------- */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // prevents back navigation
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white border-b border-[#1F3A93]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-9 h-9" />
            <span className="text-[#1F3A93] font-bold flex items-center gap-1">
              <ShieldUser className="w-4 h-4" />
              Admin Panel
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-[#1F3A93] font-medium">
              Admin Home
            </Link>

            <Link
              href="/dashboard/addCar"
              className="hover:text-[#1F3A93] font-medium"
            >
              Add Car
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 rounded-lg bg-[#1F3A93] text-white text-xl"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-4 my-4 rounded-xl border bg-white shadow p-4 space-y-3">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 rounded hover:bg-gray-100"
          >
            Admin Home
          </Link>

          <Link
            href="/dashboard/addCar"
            onClick={() => setOpen(false)}
            className="block px-4 py-2 rounded hover:bg-gray-100"
          >
            Add Car
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded text-red-600 hover:bg-red-50 font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}



