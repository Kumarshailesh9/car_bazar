import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">

      {/* Accent Line */}
      <div className="h-1 bg-red-600" />

      <div className="max-w-7xl mx-auto px-4 py-12 text-gray-700">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-3">
              Alam Car Bazar
            </h3>
            <p className="text-sm leading-relaxed">
              Trusted destination for quality used cars with transparent deals,
              complete RC transfer, and finance support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-red-600">Home</Link></li>
              <li><Link href="/about" className="hover:text-red-600">About</Link></li>
              <li><Link href="/cars" className="hover:text-red-600">Used Cars</Link></li>
              <li><Link href="/contact" className="hover:text-red-600">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-3">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Buy Used Cars</li>
              <li>Sell Your Car</li>
              <li>Car Exchange</li>
              <li>RC Transfer & Finance</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900 mb-3">
              Contact
            </h4>
            <p className="text-sm leading-relaxed">
              4 Wheeler Alam Car Bazar Pvt Ltd <br />
              Main Road, Daudpur <br />
              Near Beeaar Hyundai <br />
              Uttar Pradesh 273001 <br />
              <span className="block mt-2">📞 +91 9918476777</span>
              <span>✉️ info@alambazar.com</span>
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 pt-4 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Alam Car Bazar Pvt. Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
