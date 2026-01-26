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
        const q = query(collection(db, "cars"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const data: Car[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Car, "id">),
        }));

        setCars(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <LoadingSpinnerCar />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Available Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {cars.map((car) => (
          <Link
            key={car.id}
            href={`/cars/${car.id}`}
            className="w-full max-w-[280px]"
          >
            <Card className="overflow-hidden rounded-xl border bg-white shadow-sm hover:shadow-lg transition cursor-pointer">
              
              {/* IMAGE */}
              <div className="h-44 bg-gray-100 relative">
                {car.images?.[0] ? (
                  <img
                    src={car.images[0]}
                    alt={car.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No Image Available
                  </div>
                )}

                {/* PRICE BADGE */}
                {car.price && (
                  <div className="absolute bottom-2 right-2 bg-[#1F3A93] text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <IndianRupee className="w-3 h-3" />
                    {Number(car.price).toLocaleString()}
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <p className="text-xs font-semibold text-[#1F3A93] uppercase">
                  {car.model || "Brand"}
                </p>

                <h2 className="text-sm font-bold leading-tight line-clamp-2">
                  {car.title || "Car Name"}
                </h2>

                {/* SPECS */}
                <div className="grid grid-cols-3 border-t pt-3 text-[11px] text-gray-600">
                  <div className="flex flex-col items-center gap-1 border-r">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{car.year || "—"}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 border-r">
                    <Fuel className="w-4 h-4 text-gray-500" />
                    <span>{car.fuel || "—"}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span>{car.transmission || "—"}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <button className="w-full text-sm font-medium text-white bg-[#1F3A93] hover:bg-[#162C6B] py-2 rounded-md transition">
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
