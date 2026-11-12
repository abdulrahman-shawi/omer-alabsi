import Link from "next/link";
import { dbAvailable, prisma } from "@/lib/prisma";
import { DbDown } from "@/components/admin/page";

const cards = [
  { href: "/admin/site", title: "القائمة والإعدادات العامة", desc: "روابط القائمة العلوية ونص الفوتر" },
  { href: "/admin/hero", title: "الترحيب", desc: "الاسم، المسمى الوظيفي، التخصصات والأزرار" },
  { href: "/admin/about", title: "نبذة عني", desc: "الفقرات التعريفية وبطاقات الإحصائيات" },
  { href: "/admin/education", title: "المؤهلات العلمية", desc: "الدرجات العلمية مع النقاط البارزة" },
  { href: "/admin/experience", title: "الخبرة", desc: "الخبرة الأكاديمية والتدريبية والمنظمات" },
  { href: "/admin/teaching", title: "مجالات التدريس", desc: "المجالات والمقررات مع الألوان والأيقونات" },
  { href: "/admin/certifications", title: "الشهادات والمعايير", desc: "معايير الجودة والشهادات المهنية" },
  { href: "/admin/gallery", title: "معرض الصور", desc: "صور الورشات والبرامج" },
  { href: "/admin/activities", title: "الأنشطة المجتمعية", desc: "الجهات والمبادرات المشارك بها" },
  { href: "/admin/skills", title: "المهارات واللغات", desc: "مجموعات المهارات ومستويات اللغات" },
  { href: "/admin/objective", title: "الهدف والاهتمامات", desc: "الهدف الأكاديمي والاهتمامات البحثية" },
  { href: "/admin/contact", title: "التواصل", desc: "بطاقات التواصل وسطر المعلومات" },
];

async function getStatuses() {
  try {
    const [
      hero, about, education, experience, teaching,
      certifications, gallery, activities, skills, objective, contact,
    ] = await Promise.all([
      prisma.hero.findUnique({ where: { id: 1 } }),
      prisma.about.findUnique({ where: { id: 1 } }),
      prisma.educationSection.findUnique({ where: { id: 1 } }),
      prisma.experienceSection.findUnique({ where: { id: 1 } }),
      prisma.teachingSection.findUnique({ where: { id: 1 } }),
      prisma.certificationsSection.findUnique({ where: { id: 1 } }),
      prisma.gallerySection.findUnique({ where: { id: 1 } }),
      prisma.activitiesSection.findUnique({ where: { id: 1 } }),
      prisma.skillsSection.findUnique({ where: { id: 1 } }),
      prisma.objectiveSection.findUnique({ where: { id: 1 } }),
      prisma.contactSection.findUnique({ where: { id: 1 } }),
    ]);
    const map: Record<string, boolean | null> = {
      "/admin/hero": hero?.visible ?? null,
      "/admin/about": about?.visible ?? null,
      "/admin/education": education?.visible ?? null,
      "/admin/experience": experience?.visible ?? null,
      "/admin/teaching": teaching?.visible ?? null,
      "/admin/certifications": certifications?.visible ?? null,
      "/admin/gallery": gallery?.visible ?? null,
      "/admin/activities": activities?.visible ?? null,
      "/admin/skills": skills?.visible ?? null,
      "/admin/objective": objective?.visible ?? null,
      "/admin/contact": contact?.visible ?? null,
    };
    return map;
  } catch {
    return null;
  }
}

export default async function AdminHome() {
  if (!(await dbAvailable())) return <DbDown />;
  const statuses = await getStatuses();

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
        لوحة المعلومات
      </h1>
      <p className="text-slate-400 mb-8">
        اختر القسم الذي تريد التحكم بمحتواه وإعداداته.
      </p>

      {statuses === null && (
        <p className="mb-6 text-sm text-amber-400 border border-amber-500/40 bg-amber-500/10 rounded-lg px-4 py-3">
          تعذر قراءة حالة الأقسام، تأكد من تشغيل الهجرات: prisma migrate dev
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => {
          const v = statuses?.[c.href];
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group border border-slate-800 rounded-2xl p-5 bg-slate-900/40 hover:border-sky-500/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-white group-hover:text-sky-400 transition-colors">
                  {c.title}
                </h2>
                <span className="text-slate-600 group-hover:text-sky-400 group-hover:-translate-x-1 transition-all">
                  ←
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-3">{c.desc}</p>
              {v !== undefined && (
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    v === true
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : v === false
                        ? "bg-red-500/10 text-red-400 border-red-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {v === true ? "ظاهر" : v === false ? "مخفي" : "جديد (لم يُحفظ بعد)"}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
