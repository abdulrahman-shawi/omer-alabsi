import Section from "./Section";

const qualityStandards = [
  { code: "ISO 9001:2015", name: "نظام إدارة الجودة" },
  { code: "ISO 9001:2008", name: "نظام إدارة الجودة" },
  { code: "GMP", name: "ممارسات التصنيع الجيد" },
  { code: "ISO 22000", name: "نظام إدارة سلامة الغذاء" },
  { code: "ISO/IEC 17025:2005", name: "المتطلبات العامة لكفاءة مختبرات الفحص والمعايرة" },
];

const professionalCerts = [
  {
    field: "إدارة المشاريع",
    items: [
      "شهادة في إدارة المشاريع – جامعة حمص",
      "شهادة في إدارة المشاريع كمهارة حياتية – منصة إدراك",
      "دورة كتابة مقترح مشروع – لجنة العمل التطوعي / جمعية البر",
    ],
  },
  {
    field: "إدارة الموارد البشرية",
    items: [
      "شهادة في إدارة الموارد البشرية – أ. عمار العموري",
      "شهادة في إدارة الموارد البشرية – منصة إدراك",
      "دورة في إدارة الموارد البشرية – أ. أحمد نبيل فرحات",
    ],
  },
  {
    field: "إدارة الاجتماعات",
    items: ["شهادة في إدارة الاجتماعات – جامعة حمص – 2015"],
  },
  {
    field: "مهارات القيادة",
    items: [
      "دورة متخصصة في مهارات القيادة والتطوير القيادي بإشراف محمد السيد، خبير دولي في الموارد البشرية والتدريب القيادي",
    ],
  },
];

const developmentPrograms = [
  "المجالس الدنماركية",
  "جمعية البر والخدمات الاجتماعية",
  "مركز السائر",
  "فريق سند التنموي – دمشق",
  "برامج تدريبية عبر الإنترنت",
];

export default function Certifications() {
  return (
    <Section
      id="certifications"
      title="الشهادات والمعايير الدولية"
      subtitle="مؤهلاتي في الجودة والإدارة"
    >
      {/* أنظمة الجودة */}
      <div className="mb-14">
        <h3 className="text-xl font-bold text-white mb-3">
          أنظمة إدارة الجودة والمعايير الدولية
        </h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          معرفة بمبادئ أنظمة الجودة، توثيق العمليات، ضبط الإجراءات، إدارة
          المخاطر، والتحسين المستمر للأداء المؤسسي والمخبري.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {qualityStandards.map((standard) => (
            <div
              key={standard.code}
              className="flex items-center gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/60 transition-colors"
            >
              <span className="shrink-0 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 font-bold text-emerald-400 latin text-sm">
                {standard.code}
              </span>
              <span className="text-slate-300 text-sm leading-relaxed">
                {standard.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* الشهادات المهنية */}
      <div className="mb-12">
        <h3 className="text-xl font-bold text-white mb-6">
          الشهادات المهنية في الإدارة
        </h3>

        <div className="grid md:grid-cols-2 gap-5">
          {professionalCerts.map((cert) => (
            <div
              key={cert.field}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-sky-500/60 transition-colors"
            >
              <h4 className="font-bold text-sky-400 mb-4">{cert.field}</h4>
              <ul className="space-y-3">
                {cert.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400 text-sm leading-relaxed">
                    <span className="text-sky-500 mt-1">◂</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* برامج التنمية البشرية */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6">
          برامج التنمية البشرية وورشات العمل
        </h3>
        <p className="text-slate-400 text-sm mb-5">
          المشاركة في دورات وورشات عمل متخصصة عبر جهات ومبادرات متعددة:
        </p>
        <div className="flex flex-wrap gap-3">
          {developmentPrograms.map((program) => (
            <span
              key={program}
              className="px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700 text-slate-300 text-sm hover:border-amber-500/60 hover:text-amber-300 transition-colors"
            >
              {program}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
