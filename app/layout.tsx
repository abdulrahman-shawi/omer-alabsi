import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "عمر مفيد العبسي | باحث وأكاديمي في الإدارة والعلوم التطبيقية",
  description:
    "الموقع الشخصي لعمر مفيد العبسي - باحث وأكاديمي في الإدارة والعلوم التطبيقية، دكتوراه إدارة أعمال (قيد الدراسة)، خبرة في الكيمياء التحليلية وإدارة المشاريع والتدريب.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body
        className={`${plex.variable} ${inter.variable} font-sans antialiased bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
