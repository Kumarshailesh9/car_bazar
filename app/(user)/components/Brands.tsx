import Image from "next/image";

const brands = [
  { name: "Maruti", logo: "/brands/maruti.webp" },
  { name: "Hyundai", logo: "/brands/hyundai.webp" },
  { name: "Honda", logo: "/brands/honda.webp" },
  { name: "Tata Motors", logo: "/brands/tata.webp" },
  { name: "Mahindra", logo: "/brands/mahindra.webp" },
  { name: "Toyota", logo: "/brands/toyota.webp" },
  { name: "Ford", logo: "/brands/ford.webp" },
  { name: "Renault", logo: "/brands/renault.webp" },
];

export default function PopularBrands() {
  return (
    <section className="py-16 bg-white">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          Popular <span className="font-black">Brands</span>
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          Trusted brands we deal in
        </p>
      </div>

      {/* Brand Logos */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={80}
                height={80}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
