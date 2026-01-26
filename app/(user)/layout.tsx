import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// app/(user)/layout.tsx
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
     <Navbar/>

      <main>{children}</main>
      <Footer/>
    </div>
  );
}
