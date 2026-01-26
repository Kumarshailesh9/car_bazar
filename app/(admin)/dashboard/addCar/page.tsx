"use client";

import { useState } from "react";
import { db } from "@/_lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddCar() {
  const [title, setTitle] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [kilometers, setKilometers] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [city, setCity] = useState("");
  const [owner, setOwner] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    if (images.length + files.length > 10) {
      alert("Maximum 10 images allowed");
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

  const handleSubmit = async () => {
    if (!title || !model || !year || !fuel || !transmission || !kilometers || !price) {
      alert("Please fill all required fields");
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
        city,
        owner,
        images: imageUrls,
        status: "available",
        createdAt: serverTimestamp(),
      });

      alert("Car added successfully ✅");

      setTitle("");
      setModel("");
      setYear("");
      setFuel("");
      setTransmission("");
      setKilometers("");
      setPrice("");
      setCity("");
      setOwner("");
      setImages([]);
    } catch (err: any) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin • Add New Car</h1>

      {/* CAR DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

        <Input placeholder="Kilometers Driven" type="number" value={kilometers} onChange={(e) => setKilometers(Number(e.target.value))} />
      </div>

      {/* PRICE & LOCATION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input placeholder="Price (₹)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Input placeholder="Owner (1st / 2nd)" value={owner} onChange={(e) => setOwner(e.target.value)} />
      </div>

      {/* IMAGES */}
      <Input type="file" multiple accept="image/*" onChange={handleImageChange} />

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
        {images.map((img, i) => (
          <div key={i} className="relative">
            <img src={URL.createObjectURL(img)} className="h-24 w-full object-cover rounded" />
            <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded">✕</button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full bg-[#1F3A93] hover:bg-[#162c6f] text-white py-3 rounded-lg font-semibold"
      >
        {loading ? "Uploading..." : "Add Car"}
      </button>
    </div>
  );
}
