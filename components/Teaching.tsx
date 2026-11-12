import Section from "./Section";
import type { TeachingData } from "@/lib/site-data";

const fallback: TeachingData = {
  visible: true,
  title: "مجالات التدريس",
  subtitle: "المسارات الأكاديمية والمقررات التي يمكنني تدريسها",
  domains: [
    {
      title: "الإدارة والعلوم الإدارية",
      description: "تأهيل أكاديمي شامل في النظريات والتطبيقات الإدارية الحديثة",
      color: "sky",
      icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
      courses: [
        "مبادئ إدارة الأعمال",
        "الإدارة الحديثة",
        "الإدارة الاستراتيجية",
        "إدارة المشاريع",
        "ريادة الأعمال",
        "إدارة المشاريع الصغيرة والمتوسطة",
        "إدارة العمليات",
        "القيادة وصناعة القرار",
        "إدارة الموارد البشرية",
        "إدارة وتطوير المؤسسات",
        "إدارة الجودة",
        "التخطيط الإداري",
      ],
    },
    {
      title: "الذكاء الاصطناعي والإدارة",
      description: "مواكبة أحدث التقنيات وتوظيفها في التحول الرقمي المؤسسي",
      color: "indigo",
      icon: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
      courses: [
        "تطبيقات الذكاء الاصطناعي في الإدارة",
        "الذكاء الاصطناعي وصناعة القرار",
        "التحول الرقمي في المؤسسات",
        "أتمتة العمليات الإدارية",
        "استخدام البيانات والتقنيات الحديثة في الإدارة",
      ],
    },
    {
      title: "العلوم التطبيقية",
      description: "تأسيس علمي رصين في المنهجية المخبرية والتحليل العلمي",
      color: "emerald",
      icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
      courses: [
        "الكيمياء التحليلية",
        "أسس العمل المخبري",
        "المنهجية العلمية",
        "التحليل العلمي وتفسير النتائج",
        "التطبيقات العملية للكيمياء التحليلية",
      ],
    },
    {
      title: "التدريب وبناء القدرات",
      description: "تطوير المهارات الشخصية والمهنية لمواجهة تحديات سوق العمل",
      color: "amber",
      icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
      courses: [
        "ريادة الأعمال",
        "إدارة المشاريع الصغيرة والمتوسطة",
        "سبل العيش",
        "المهارات الحياتية",
        "مهارات التواصل",
        "حل المشكلات",
        "القيادة والعمل ضمن الفريق",
      ],
    },
  ],
};

const colorStyles: Record<
  string,
  { border: string; iconBox: string; title: string; count: string; chip: string }
> = {
  sky: {
    border: "hover:border-sky-500/60",
    iconBox: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    title: "text-sky-400",
    count: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    chip: "bg-sky-500/[0.07] border-slate-700/80 text-slate-300 hover:border-sky-500/50 hover:text-sky-300",
  },
  indigo: {
    border: "hover:border-indigo-500/60",
    iconBox: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
    title: "text-indigo-400",
    count: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    chip: "bg-indigo-500/[0.07] border-slate-700/80 text-slate-300 hover:border-indigo-500/50 hover:text-indigo-300",
  },
  emerald: {
    border: "hover:border-emerald-500/60",
    iconBox: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    title: "text-emerald-400",
    count: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    chip: "bg-emerald-500/[0.07] border-slate-700/80 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-300",
  },
  amber: {
    border: "hover:border-amber-500/60",
    iconBox: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    title: "text-amber-400",
    count: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    chip: "bg-amber-500/[0.07] border-slate-700/80 text-slate-300 hover:border-amber-500/50 hover:text-amber-300",
  },
};

export default function Teaching({ data }: { data?: TeachingData }) {
  const { title, subtitle, domains } = data ?? fallback;

  return (
    <Section id="teaching" title={title} subtitle={subtitle || undefined}>
      <div className="grid md:grid-cols-2 gap-6">
        {domains.map((domain) => {
          const styles = colorStyles[domain.color] ?? colorStyles.sky;
          return (
            <div
              key={domain.title}
              className={`group bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-950 ${styles.border}`}
            >
              {/* رأس البطاقة */}
              <div className="flex items-start gap-4 mb-5">
                <span
                  className={`shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center ${styles.iconBox}`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={domain.icon}
                    />
                  </svg>
                </span>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-1 ${styles.title}`}>
                    {domain.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {domain.description}
                  </p>
                </div>
                <span
                  className={`shrink-0 px-2.5 py-1 rounded-full border text-xs font-bold ${styles.count}`}
                >
                  {domain.courses.length} مقرر
                </span>
              </div>

              {/* المقررات */}
              <div className="flex flex-wrap gap-2">
                {domain.courses.map((course) => (
                  <span
                    key={course}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${styles.chip}`}
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
