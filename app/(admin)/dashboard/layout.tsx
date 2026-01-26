import AdminNavbar from "@/components/ui/admin-navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
     <AdminNavbar/>

      <main>{children}</main>
    </div>
  );
}
