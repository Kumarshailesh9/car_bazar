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

  const [color, setColor] = useState("");
  const [customColor, setCustomColor] = useState("");

  const [images, setImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchCar = async () => {
      const ref = doc(db, "cars", id as string);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        toast.error("Car not found");
        router.push("/dashboard");
        return;
      }

      const data = snap.data();

      setTitle(data.title || "");
      setModel(data.model || "");
      setYear(data.year ?? "");
      setFuel(data.fuel || "");
      setTransmission(data.transmission || "");
      setKilometers(data.kilometers ?? "");
      setPrice(data.price ?? "");
      setCity(data.city || "");
      setOwner(data.owner || "");
      setStatus(data.status || "available");
      setImages(data.images || []);

      const predefinedColors = ["White", "Black", "Silver", "Grey", "Red", "Blue"];

      if (predefinedColors.includes(data.color)) {
        setColor(data.color);
      } else {
        setColor("Other");
        setCustomColor(data.color || "");
      }

      setLoading(false);
    };

    fetchCar();
  }, [id, router]);

  /* ---------------- IMAGE ---------------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (images.length + newImages.length + files.length > 10) {
      toast.warning("Max 10 images allowed");
      return;
    }

    setNewImages((prev) => [...prev, ...files]);
  };

  const removeOldImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  /* ---------------- CLOUDINARY UPLOAD ---------------- */
  const uploadImages = async () => {
    if (newImages.length === 0) return [];

    const urls: string[] = [];

    for (const image of newImages) {
      try {
        const formData = new FormData();
        formData.append("file", image);
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

        if (!res.ok || !data.secure_url) {
          throw new Error("Upload failed");
        }

        urls.push(data.secure_url);
      } catch (err) {
        console.error(err);
        toast.error("Image upload failed");
      }
    }

    return urls;
  };

  /* ---------------- UPDATE ---------------- */
  const handleUpdate = async () => {
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
      toast.warning("All fields are required");
      return;
    }

    setUploading(true);

    try {
      const uploadedUrls = await uploadImages();
      const finalImages = [...images, ...uploadedUrls];

      await updateDoc(doc(db, "cars", id as string), {
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
        status,
        images: finalImages,
        updatedAt: serverTimestamp(),
      });

      toast.success("Car updated successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }

    setUploading(false);
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mt-12 lg:max-w-5xl mx-auto p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-2xl p-5 sm:p-6 space-y-6">

        <h1 className="text-2xl font-bold text-gray-800">🚗 Edit Car</h1>

        {/* BASIC */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Model *" value={model} onChange={(e) => setModel(e.target.value)} />
          <Input type="number" placeholder="Year *" value={year}
            onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")} />
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input type="number" placeholder="Price *" value={price}
            onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")} />
          <Input placeholder="City *" value={city} onChange={(e) => setCity(e.target.value)} />
          <Input placeholder="Owner *" value={owner} onChange={(e) => setOwner(e.target.value)} />
          <Input type="number" placeholder="KM Driven *" value={kilometers}
            onChange={(e) => setKilometers(e.target.value ? Number(e.target.value) : "")} />

          <Select value={fuel} onValueChange={setFuel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Fuel *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="CNG">CNG</SelectItem>
            </SelectContent>
          </Select>

          <Select value={transmission} onValueChange={setTransmission}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Transmission *" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automatic">Automatic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* COLOR */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Color *" />
            </SelectTrigger>
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

        {/* STATUS */}
        <div className="max-w-xs">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* IMAGE UPLOAD */}
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        {/* IMAGE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {[...images, ...newImages.map((f) => URL.createObjectURL(f))].map((img, i) => (
            <div key={i} className="relative group">
              <img src={img} className="h-28 w-full object-cover rounded-lg" />
              <button
                onClick={() =>
                  i < images.length
                    ? removeOldImage(i)
                    : removeNewImage(i - images.length)
                }
                className="absolute top-1 right-1 bg-black/70 text-white px-2 text-xs rounded opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {uploading ? "Updating..." : "Update Car"}
        </button>

      </div>
    </div>
  );
}