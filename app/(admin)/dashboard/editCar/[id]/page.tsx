"use client";

import { useEffect, useState } from "react";
import { db } from "@/_lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-toastify";

export default function EditCar() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [kilometers, setKilometers] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [city, setCity] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("available");

  // ✅ COLOR STATES
  const [color, setColor] = useState("");
  const [customColor, setCustomColor] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH CAR ---------------- */
  useEffect(() => {
    const fetchCar = async () => {
      const ref = doc(db, "cars", id as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        toast.warning("Car not found");
        router.push("/dashboard");
        return;
      }

      const data = snap.data();

      setTitle(data.title || "");
      setModel(data.model || "");
      setYear(data.year || "");
      setFuel(data.fuel || "");
      setTransmission(data.transmission || "");
      setKilometers(data.kilometers || "");
      setPrice(data.price || "");
      setCity(data.city || "");
      setOwner(data.owner || "");
      setStatus(data.status || "available");
      setImages(data.images || []);

      // ✅ HANDLE COLOR
      const predefinedColors = [
        "White",
        "Black",
        "Silver",
        "Grey",
        "Red",
        "Blue",
      ];

      if (predefinedColors.includes(data.color)) {
        setColor(data.color);
        setCustomColor("");
      } else {
        setColor("Other");
        setCustomColor(data.color || "");
      }

      setLoading(false);
    };

    fetchCar();
  }, [id, router]);

  /* ---------------- IMAGE REMOVE ---------------- */
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
    const finalColor = color === "Other" ? customColor : color;

    if (!title || !model || !year || !fuel || !price || !finalColor) {
      toast.warning("Please fill all required fields");
      return;
    }

    try {
      await updateDoc(doc(db, "cars", id as string), {
        title,
        model,
        year,
        fuel,
        transmission,
        kilometers,
        price,
        color: finalColor, // ✅ UPDATED
        city,
        owner,
        status,
        images,
        updatedAt: serverTimestamp(),
      });

      toast.success("Car updated successfully");
      router.push("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🚗 Admin • Edit Car</h1>

      {/* BASIC DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
        <Input type="number" placeholder="Year" value={year} onChange={(e) => setYear(Number(e.target.value))} />

        <Select value={fuel} onValueChange={setFuel}>
          <SelectTrigger><SelectValue placeholder="Fuel Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Petrol">Petrol</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="CNG">CNG</SelectItem>
          </SelectContent>
        </Select>

        <Select value={transmission} onValueChange={setTransmission}>
          <SelectTrigger><SelectValue placeholder="Transmission" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Manual">Manual</SelectItem>
            <SelectItem value="Automatic">Automatic</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Kilometers Driven"
          value={kilometers}
          onChange={(e) => setKilometers(Number(e.target.value))}
        />
      </div>

      {/* COLOR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select
          value={color}
          onValueChange={(val) => {
            setColor(val);
            if (val !== "Other") setCustomColor("");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Car Color" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="White">White</SelectItem>
            <SelectItem value="Black">Black</SelectItem>
            <SelectItem value="Silver">Silver</SelectItem>
            <SelectItem value="Grey">Grey</SelectItem>
            <SelectItem value="Red">Red</SelectItem>
            <SelectItem value="Blue">Blue</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>

        {color === "Other" && (
          <Input
            placeholder="Enter custom color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
          />
        )}
      </div>

      {/* PRICE & LOCATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input type="number" placeholder="Price (₹)" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input placeholder="Owner (1st / 2nd)" value={owner} onChange={(e) => setOwner(e.target.value)} />
      </div>

      {/* STATUS */}
      <div className="max-w-xs mb-6">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* IMAGES */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-6">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img src={img} className="h-24 w-full object-cover rounded" />
            <button
              onClick={() => removeImage(i)}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-[#1F3A93] hover:bg-[#162c6f] text-white py-3 rounded-lg font-semibold"
      >
        Update Car
      </button>
    </div>
  );
}
