"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type AdminSection = { href: string; label: string };

export const adminSections: AdminSection[] = [
  { href: "/admin", label: "لوحة المعلومات" },
  { href: "/admin/site", label: "القائمة والإعدادات" },
  { href: "/admin/hero", label: "الترحيب" },
  { href: "/admin/about", label: "نبذة عني" },
  { href: "/admin/education", label: "المؤهلات العلمية" },
  { href: "/admin/experience", label: "الخبرة" },
  { href: "/admin/teaching", label: "مجالات التدريس" },
  { href: "/admin/certifications", label: "الشهادات والمعايير" },
  { href: "/admin/gallery", label: "معرض الصور" },
  { href: "/admin/activities", label: "الأنشطة المجتمعية" },
  { href: "/admin/skills", label: "المهارات واللغات" },
  { href: "/admin/objective", label: "الهدف والاهتمامات" },
  { href: "/admin/contact", label: "التواصل" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="p-3 flex md:flex-col gap-1 overflow-x-auto">
      {adminSections.map((s) => {
        const active =
          s.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(s.href);
        return (
          <Link
            key={s.href}
            href={s.href}
            className={`shrink-0 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active
                ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent"
            }`}
          >
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
