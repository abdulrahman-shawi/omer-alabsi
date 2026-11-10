import Section from "./Section";

const skillGroups = [
  {
    title: "أكاديمية وبحثية",
    color: "sky",
    skills: [
      "البحث العلمي",
      "إعداد الدراسات",
      "التحليل العلمي",
      "تحليل البيانات والنتائج",
      "إعداد وتقديم المحاضرات",
      "التدريب العملي والمخبري",
      "إعداد المحتوى التعليمي",
    ],
  },
  {
    title: "إدارية",
    color: "indigo",
    skills: [
      "الإدارة الاستراتيجية",
      "إدارة المشاريع",
      "التخطيط والتنظيم",
      "تطوير الأعمال",
      "إدارة العمليات",
      "إدارة الفرق",
      "صناعة القرار",
      "تطوير الأداء المؤسسي",
      "ريادة الأعمال",
      "إدارة المشاريع الصغيرة والمتوسطة",
    ],
  },
  {
    title: "تقنية",
    color: "emerald",
    skills: [
      "Microsoft Office",
      "Excel",
      "أنظمة CRM",
      "أنظمة ERP",
      "أدوات الذكاء الاصطناعي",
      "الأدوات الرقمية للإدارة والتحليل",
    ],
  },
];

const languages = [
  { name: "العربية", code: null, level: "ممتاز", percent: 100 },
  { name: "التركية", code: "C1", level: "ممتاز", percent: 88 },
  { name: "الإنجليزية", code: "B1", level: "متوسط", percent: 55 },
];

const colorStyles: Record<string, { border: string; title: string; chip: string }> = {
  sky: {
    border: "hover:border-sky-500/60",
    title: "text-sky-400",
    chip: "bg-sky-500/10 border-sky-500/30 text-sky-300",
  },
  indigo: {
    border: "hover:border-indigo-500/60",
    title: "text-indigo-400",
    chip: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
  },
  emerald: {
    border: "hover:border-emerald-500/60",
    title: "text-emerald-400",
    chip: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  },
};

export default function Skills() {
  return (
    <Section id="skills" title="المهارات واللغات" subtitle="ماذا أستطيع أن أقدم؟">
      {/* المهارات */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        {skillGroups.map((group) => {
          const styles = colorStyles[group.color];
          return (
            <div
              key={group.title}
              className={`bg-slate-900/60 border border-slate-800 rounded-2xl p-6 transition-colors ${styles.border}`}
            >
              <h3 className={`font-bold text-lg mb-5 ${styles.title}`}>
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-lg border text-sm ${styles.chip}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* اللغات */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8">
        <h3 className="font-bold text-lg text-white mb-6">اللغات</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {languages.map((lang) => (
            <div key={lang.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-slate-200">{lang.name}</span>
                <span className="text-sm text-slate-500">
                  {lang.code && (
                    <span className="latin text-sky-400 font-bold ml-1">
                      {lang.code}
                    </span>
                  )}
                  {lang.level}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-sky-500 to-indigo-500"
                  style={{ width: `${lang.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
