"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/_lib/firebase";

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
import DownloadCarsPDF from "@/components/ui/downloadcarpdf";

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

  /* ---------- FETCH CARS ---------- */
  useEffect(() => {
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

        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        alert("Missing or insufficient permissions");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  /* ---------- DELETE ---------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this car?")) return;

    try {
      await deleteDoc(doc(db, "cars", id));
      setCars((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed");
    }
  };

  if (loading) return <LoadingSpinnerCar />;

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <DownloadCarsPDF cars={cars} />
      </div>

      {cars.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No cars found. Add your first car 🚗
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
                <div className="flex h-full items-center justify-center text-gray-400">
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
                  className="bg-green-600 p-1.5 rounded-full text-white"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red-600 p-1.5 rounded-full text-white"
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

              <div className="grid grid-cols-2 gap-2 text-xs">
                <Spec icon={<Calendar />} value={car.year} />
                <Spec icon={<Fuel />} value={car.fuel} />
                <Spec icon={<Settings />} value={car.transmission} />
                <Spec
                  icon={<Gauge />}
                  value={
                    car.kilometers
                      ? `${car.kilometers.toLocaleString()} km`
                      : "—"
                  }
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <p className="text-lg font-bold text-[#1F3A93]">
                  {car.price
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

/* ---------- SMALL SPEC COMPONENT ---------- */
function Spec({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value?: string | number;
}) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span>{value || "—"}</span>
    </div>
  );
}
