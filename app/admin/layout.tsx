import Link from "next/link";
import AdminNav from "@/components/admin/nav";
import LogoutButton from "@/components/admin/logout-button";

// الصفحات تُقرأ من قاعدة البيانات عند كل طلب ولا تُولّد مسبقاً
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      <aside className="md:fixed md:top-0 md:bottom-0 md:right-0 md:w-64 md:overflow-y-auto border-b md:border-b-0 md:border-l border-slate-800 bg-slate-950 z-40">
        <div className="p-5 border-b border-slate-800">
          <Link href="/admin" className="text-xl font-bold text-white">
            لوحة التحكم
          </Link>
          <Link
            href="/"
            className="block text-xs text-sky-400 mt-1.5 hover:underline"
          >
            عرض الموقع ←
          </Link>
          <div className="mt-2">
            <LogoutButton />
          </div>
        </div>
        <AdminNav />
      </aside>
      <main className="md:mr-64 p-6 md:p-10">{children}</main>
    </div>
  );
}
