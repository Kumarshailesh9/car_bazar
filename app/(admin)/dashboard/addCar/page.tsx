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
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  /* ---------------- IMAGE ---------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (images.length + files.length > 10) {
      toast.warn("Max 10 images allowed");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  /* ---------------- CLOUDINARY UPLOAD ---------------- */
  const uploadImages = async () => {
    const urls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const formData = new FormData();
      formData.append("file", images[i]);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) throw new Error("Upload failed");

      urls.push(data.secure_url);

      // ✅ update progress
      setProgress(Math.round(((i + 1) / images.length) * 100));
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
      !finalColor ||
      !city ||
      !owner ||
      images.length === 0
    ) {
      toast.warning("Fill all fields");
      return;
    }

    setLoading(true);
    setShowModal(true); // ✅ open modal

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

      // reset
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
      setProgress(0);

      // close modal after short delay
      setTimeout(() => setShowModal(false), 800);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setShowModal(false);
    }

    setLoading(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-3 pt-16">
      <div className="max-w-5xl mx-auto bg-white shadow rounded-xl p-4">

        <h1 className="text-xl font-semibold mb-4">Add Car</h1>

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} />
          <Input type="number" placeholder="Year" value={year}
            onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")} />

          <Select value={fuel} onValueChange={setFuel}>
            <SelectTrigger><SelectValue placeholder="Fuel" /></SelectTrigger>
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

          <Input type="number" placeholder="KM Driven" value={kilometers}
            onChange={(e) => setKilometers(e.target.value ? Number(e.target.value) : "")} />

          <Input type="number" placeholder="Price" value={price}
            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")} />

          <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <Input placeholder="Owner" value={owner} onChange={(e) => setOwner(e.target.value)} />

          <Select value={color} onValueChange={setColor}>
            <SelectTrigger><SelectValue placeholder="Color" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="White">White</SelectItem>
              <SelectItem value="Black">Black</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          {color === "Other" && (
            <Input
              placeholder="Custom Color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
            />
          )}
        </div>

        {/* IMAGE */}
        <div className="mt-4">
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img src={URL.createObjectURL(img)} className="h-20 w-full object-cover rounded" />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-0 right-0 bg-black text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
        >
          Add Car
        </button>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-lg">

            <h2 className="text-lg font-semibold mb-4">
              Uploading Images...
            </h2>

            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-3 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-sm text-gray-600">
              {progress}% completed
            </p>

            <div className="mt-4 animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>

          </div>
        </div>
      )}
    </div>
  );
}