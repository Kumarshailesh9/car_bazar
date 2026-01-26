import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1F3A93] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Alam Car Bazaar
            </h3>
            <p className="text-sm leading-relaxed">
              Redefining the used car buying experience with trust,
              transparency, and quality vehicles.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              <li>Buy Used Cars</li>
              <li>Sell Your Car</li>
              <li>Car Exchange</li>
              <li>RC Transfer Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Address: Main Road, Daudpur, near Beeaar Hyundai, Uttar Pradesh 273001</li>
              <li>📞 +91 9918476777</li>
              <li>✉️ info@alambazar.com</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Alam Car Bazar. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
