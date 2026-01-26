"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

import { db, auth } from "@/_lib/firebase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Calendar,
  Fuel,
  Settings,
  Edit2,
  Trash2,
  Gauge,
  CheckCircle,
  XCircle,
} from "lucide-react";

import LoadingSpinnerCar from "@/app/(user)/components/LoadingCar";

type Car = {
  id: string;
  title?: string;
  model?: string;
  year?: number;
  fuel?: string;
  transmission?: string;
  kilometers?: number;
  price?: number | string;
  status?: "available" | "sold";
  images?: string[];
};

export default function Dashboard() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* ---------------- FETCH CARS ---------------- */
  useEffect(() => {
    let mounted = true;

    const fetchCars = async () => {
      try {
        const q = query(
          collection(db, "cars"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);

        const data: Car[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Car, "id">),
        }));

        if (mounted) setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        alert("Failed to load cars");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCars();
    return () => {
      mounted = false;
    };
  }, []);

  /* ---------------- DELETE CAR ---------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      await deleteDoc(doc(db, "cars", id));
      setCars((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete car");
    }
  };

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // prevents back arrow issue
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    }
  };

  if (loading) return <LoadingSpinnerCar />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="flex gap-2">
          <Button onClick={() => router.push("/dashboard/addCar")}>
            + Add Car
          </Button>

          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {cars.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No cars available. Add your first car 🚗
        </p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cars.map((car) => (
          <Card
            key={car.id}
            className="relative overflow-hidden rounded-xl border bg-white shadow hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <div className="h-44 bg-gray-100 relative">
              {car.images?.[0] ? (
                <img
                  src={car.images[0]}
                  alt={car.title || "Car"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}

              {/* STATUS */}
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
                  car.status === "sold"
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {car.status || "available"}
              </span>

              {/* ACTIONS */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() =>
                    router.push(`/dashboard/editCar/${car.id}`)
                  }
                  className="bg-green-600 p-1.5 rounded-full text-white hover:bg-green-700"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-600 p-1.5 rounded-full text-white hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase">
                  {car.model || "—"}
                </p>
                <h2 className="font-semibold">
                  {car.title || "Untitled"}
                </h2>
              </div>

              {/* SPECS */}
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {car.year || "—"}
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  {car.fuel || "—"}
                </div>
                <div className="flex items-center gap-1">
                  <Settings className="w-4 h-4" />
                  {car.transmission || "—"}
                </div>
                <div className="flex items-center gap-1">
                  <Gauge className="w-4 h-4" />
                  {car.kilometers
                    ? `${car.kilometers.toLocaleString()} km`
                    : "—"}
                </div>
              </div>

              {/* PRICE */}
              <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-lg font-bold text-[#1F3A93]">
                  {car.price && !isNaN(Number(car.price))
                    ? `₹ ${Number(car.price).toLocaleString()}`
                    : "Call for Price"}
                </p>

                {car.status === "sold" ? (
                  <XCircle className="w-5 h-5 text-red-600" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
