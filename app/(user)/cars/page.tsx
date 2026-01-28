"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/_lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { Calendar, Fuel, Settings, IndianRupee } from "lucide-react";
import LoadingSpinnerCar from "../components/LoadingCar";

type Car = {
  id: string;
  title?: string;
  model?: string;
  year?: number;
  fuel?: string;
  transmission?: string;
  price?: number | string;
  images?: string[];
};

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <LoadingSpinnerCar />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">
        Available Cars
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <Link key={car.id} href={`/cars/${car.id}`}>
            <Card className="group overflow-hidden rounded-lg border bg-white hover:shadow-xl transition cursor-pointer">

              {/* IMAGE */}
              <div className="h-44 bg-gray-100 relative">
                {car.images?.[0] ? (
                  <img
                    src={car.images[0]}
                    alt={car.title || "Car"}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No Image Available
                  </div>
                )}

                {/* PRICE */}
                {car.price && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1 shadow">
                    <IndianRupee className="w-3 h-3" />
                    {Number(car.price).toLocaleString()}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <p className="text-xs font-semibold text-red-600 uppercase">
                  {car.model || "Brand"}
                </p>

                <h2 className="text-sm font-bold leading-tight line-clamp-2 text-gray-900">
                  {car.title || "Car Name"}
                </h2>

                {/* SPECS */}
                <div className="grid grid-cols-3 border-t pt-3 text-[11px] text-gray-600">
                  <div className="flex flex-col items-center gap-1 border-r">
                    <Calendar className="w-4 h-4" />
                    <span>{car.year || "—"}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 border-r">
                    <Fuel className="w-4 h-4" />
                    <span>{car.fuel || "—"}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <Settings className="w-4 h-4" />
                    <span>{car.transmission || "—"}</span>
                  </div>
                </div>

                {/* CTA */}
                <button className="mt-3 w-full text-sm font-medium text-white bg-red-600 hover:bg-red-700 py-2 rounded transition">
                  View Details
                </button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
