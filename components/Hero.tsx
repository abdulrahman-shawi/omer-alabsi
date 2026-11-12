import Typewriter from "./Typewriter";
import type { HeroData } from "@/lib/site-data";

const fallback: HeroData = {
  visible: true,
  greeting: "مرحباً، أنا",
  name: "عمر مفيد العبسي",
  title: "باحث وأكاديمي في الإدارة والعلوم التطبيقية",
  qualifications: "دكتوراه إدارة أعمال (قيد الدراسة) · ماجستير كيمياء تحليلية · MINI MBA",
  avatarLetter: "ع",
  bgImage: "/hero-bg.jpg",
  specialties: [
    "إدارة الأعمال",
    "الذكاء الاصطناعي في الإدارة",
    "الكيمياء التحليلية",
    "إدارة المشاريع",
    "التحول الرقمي",
    "صناعة القرار",
  ],
  buttons: [
    { label: "تواصل معي", href: "#contact", style: "primary" },
    { label: "تعرّف عليّ أكثر", href: "#about", style: "outline" },
  ],
};

const buttonStyles: Record<string, string> = {
  primary:
    "px-8 py-3 rounded-full bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/30",
  outline:
    "px-8 py-3 rounded-full border border-slate-600 text-slate-200 font-bold hover:border-sky-500 hover:text-sky-400 transition-colors",
};

export default function Hero({ data }: { data?: HeroData }) {
  const hero = data ?? fallback;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* صورة الخلفية */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.bgImage})` }}
      />
      {/* طبقة تعتيم لإبراز النص */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/75 to-slate-950/90" />

      {/* توهجات خلفية */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">
        {/* الصورة الرمزية */}
        <div className="mb-8 inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-5xl font-bold text-white shadow-2xl shadow-sky-500/30">
          {hero.avatarLetter}
        </div>

        {/* الترحيب */}
        <p className="text-sky-400 font-medium text-lg mb-4">{hero.greeting}</p>

        {/* الاسم */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-glow mb-6 leading-tight">
          {hero.name}
        </h1>

        {/* المسمى مع أنيميشن الكتابة */}
        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed min-h-[3.5rem] md:min-h-[4rem]">
          <Typewriter text={hero.title} />
          <span className="block mt-2 text-base text-slate-400">
            {hero.qualifications}
          </span>
        </p>

        {/* التخصصات */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {hero.specialties.map((item) => (
            <span
              key={item}
              className="px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700 text-slate-300 text-sm hover:border-sky-500 hover:text-sky-400 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>

        {/* الأزرار */}
        <div className="flex flex-wrap justify-center gap-4">
          {hero.buttons.map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              className={buttonStyles[btn.style] ?? buttonStyles.outline}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>

      {/* مؤشر التمرير */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-sky-400 transition-colors animate-bounce"
        aria-label="مرر للأسفل"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </a>
    </section>
  );
}
