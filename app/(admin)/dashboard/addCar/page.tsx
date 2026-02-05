"use client";

import { useState } from "react";
import { db } from "@/_lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

export default function AddCar() {
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [kilometers, setKilometers] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [color, setColor] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [city, setCity] = useState("");
  const [owner, setOwner] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- IMAGE HANDLERS ---------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      toast.warn("Maximum 10 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const urls: string[] = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();
      urls.push(data.secure_url);
    }

    return urls;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const finalColor = color === "Other" ? customColor : color;

    if (
      !title ||
      !model ||
      !year ||
      !fuel ||
      !transmission ||
      !kilometers ||
      !price ||
      !finalColor
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const imageUrls = await uploadImages();

      await addDoc(collection(db, "cars"), {
        title,
        model,
        year,
        fuel,
        transmission,
        kilometers,
        price,
        color: finalColor,
        city,
        owner,
        images: imageUrls,
        status: "available",
        createdAt: serverTimestamp(),
      });

      toast.success("Car added successfully");

      setTitle("");
      setModel("");
      setYear("");
      setFuel("");
      setTransmission("");
      setKilometers("");
      setPrice("");
      setColor("");
      setCustomColor("");
      setCity("");
      setOwner("");
      setImages([]);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            🚗 Admin • Add New Car
          </h1>
          <p className="text-gray-500 mt-1">
            Enter complete car details before publishing
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* CAR DETAILS */}
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Car Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
            <Input placeholder="Year" type="number" value={year} onChange={(e) => setYear(Number(e.target.value))} />

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
              placeholder="Kilometers Driven"
              type="number"
              value={kilometers}
              onChange={(e) => setKilometers(Number(e.target.value))}
            />

            {/* COLOR */}
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
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Pricing & Ownership
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Input placeholder="Price (₹)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <Input placeholder="Owner (1st / 2nd)" value={owner} onChange={(e) => setOwner(e.target.value)} />
          </div>

          {/* IMAGES */}
          <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
            Car Images (Max 10)
          </h2>

          <Input type="file" multiple accept="image/*" onChange={handleImageChange} />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
            {images.map((img, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden border">
                <img src={URL.createObjectURL(img)} className="h-24 w-full object-cover" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-black/70 text-white px-2 py-0.5 rounded text-xs opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* ACTION */}
          <div className="mt-10">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full md:w-auto px-10 py-3 rounded-xl bg-gradient-to-r from-[#1F3A93] to-[#16307d] text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              {loading ? "Uploading..." : "Add Car"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
