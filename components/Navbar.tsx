"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#about", label: "نبذة" },
  { href: "#education", label: "المؤهلات" },
  { href: "#experience", label: "الخبرة" },
  { href: "#teaching", label: "مجالات التدريس" },
  { href: "#photos", label: "الصور" },
  { href: "#activities", label: "الأنشطة" },
  { href: "#skills", label: "المهارات" },
  { href: "#contact", label: "تواصل" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold text-white">
          عمر <span className="text-sky-400">العبسي</span>
        </a>

        {/* روابط سطح المكتب */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-300 hover:text-sky-400 transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* زر القائمة للجوال */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-slate-300 hover:text-white p-2"
          aria-label="القائمة"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* قائمة الجوال */}
      {open && (
        <ul className="md:hidden bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-slate-300 hover:text-sky-400 transition-colors font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
