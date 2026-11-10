"use client";

import { useEffect, useRef, ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  filled?: boolean; // خلفية لونية مميزة للقسم
  bgImage?: string; // مسار صورة خلفية للقسم
  children: ReactNode;
};

export default function Section({ id, title, subtitle, filled, bgImage, children }: SectionProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative overflow-hidden py-20 scroll-mt-16 ${
        filled ? "bg-slate-900/40 border-y border-slate-800/60" : ""
      }`}
    >
      {/* صورة الخلفية مع طبقة تعتيم */}
      {bgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center blur-[3px] scale-105"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/85" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <span className="inline-block w-12 h-1 bg-sky-500 rounded-full mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {title}
          </h2>
          {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
