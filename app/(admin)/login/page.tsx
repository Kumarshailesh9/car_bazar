"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/_lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* LEFT SIDE - ONLY LOGO */}
      <div className="hidden md:flex w-1/2 bg-white items-center justify-center">
        <div className="p-10">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-6xl mx-auto"
          />
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <form
          onSubmit={login}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">
            Admin Login
          </h1>

          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-medium transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}