"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";

type Car = {
  title?: string;
  model?: string;
  year?: number;
  fuel?: string;
  transmission?: string;
  kilometers?: number;
  price?: number | string;
  status?: "available" | "sold";
};

export default function DownloadCarsPDF({ cars }: { cars: Car[] }) {
  const downloadPDF = () => {
    if (!cars || cars.length === 0) {
      alert("No data available");
      return;
    }

    const pdf = new jsPDF("landscape");

    pdf.setFontSize(16);
    pdf.text("Cars Data Report", 14, 15);

    const rows = cars.map((car, index) => [
      index + 1,
      car.title || "—",
      car.model || "—",
      car.year || "—",
      car.fuel || "—",
      car.transmission || "—",
      car.kilometers ? `${car.kilometers} km` : "—",
      car.price ? `₹ ${car.price}` : "—",
      car.status || "available",
    ]);

    autoTable(pdf, {
      startY: 25,
      head: [[
        "#",
        "Title",
        "Model",
        "Year",
        "Fuel",
        "Transmission",
        "Kilometers",
        "Price",
        "Status",
      ]],
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [31, 58, 147] },
    });

    pdf.save("cars-data.pdf");
  };

  return (
    <Button variant="outline" onClick={downloadPDF}>
      Download PDF
    </Button>
  );
}
