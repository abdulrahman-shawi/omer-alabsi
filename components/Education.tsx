import Section from "./Section";
import type { EducationData } from "@/lib/site-data";

const fallback: EducationData = {
  visible: true,
  title: "المؤهلات العلمية",
  subtitle: "المسار الأكاديمي",
  degrees: [
    {
      title: "دكتوراه في إدارة الأعمال",
      status: "قيد الدراسة",
      university: "جامعة إسطنبول نيشان تاشي – تركيا",
      year: "2026",
      description:
        "دراسة دكتوراه في مجال إدارة الأعمال، مع اهتمام بحثي بتطبيقات الذكاء الاصطناعي في الإدارة وصناعة القرار.",
      highlights: [
        "الحالة الأكاديمية: مسجل في برنامج الدكتوراه، مع تجميد مؤقت للدراسة بسبب العودة إلى سوريا",
        "يشمل المقررات، حلقة البحث، الامتحان التأهيلي، إعداد مقترح الأطروحة ومتابعة البحث حتى المناقشة",
      ],
    },
    {
      title: "ماجستير إدارة الأعمال المهني – MINI MBA",
      status: "",
      university: "معهد الإدارة – إسطنبول، تركيا",
      year: "2024",
      description:
        "تأهيل متقدم في مجالات الإدارة والتخطيط واتخاذ القرار وتطوير الأعمال.",
      highlights: [
        "الجهة المانحة للشهادة: كلية Harvard",
        "المشرف الأكاديمي: البروفيسور عبد الرحمن عمر",
      ],
    },
    {
      title: "ماجستير في الكيمياء التحليلية",
      status: "",
      university: "جامعة نيغدة عمر خالص دمير الحكومية – تركيا",
      year: "2022",
      description:
        "دراسة عليا متخصصة في الكيمياء التحليلية ضمن جامعة حكومية تركية، مع تركيز على المنهجية العلمية والتحليل المخبري والبحث العلمي وتحليل وتفسير النتائج.",
      highlights: [
        "جامعة حكومية واسعة تشمل كليات العلوم والهندسة والاقتصاد والعلوم الإدارية والحاسوب",
        "تتبنى توجهات مرتبطة بإنتاج المعرفة والتكنولوجيا وفق المعايير الدولية",
      ],
    },
  ],
};

export default function Education({ data }: { data?: EducationData }) {
  const { title, subtitle, degrees } = data ?? fallback;
  const isOdd = degrees.length % 2 !== 0;

  return (
    <Section id="education" title={title} subtitle={subtitle || undefined}>
      <div className="grid md:grid-cols-2 gap-6">
        {degrees.map((degree, index) => {
          const isLast = index === degrees.length - 1;
          const fullWidth = isOdd && isLast;

          return (
            <div
              key={degree.title}
              className={`bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-sky-500/60 transition-colors ${
                fullWidth ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {degree.title}
                </h3>
                {degree.status && (
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 text-xs font-medium">
                    {degree.status}
                  </span>
                )}
                <span className="mr-auto px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-400 text-sm font-bold latin">
                  {degree.year}
                </span>
              </div>

              <p className="text-sky-300 font-medium mb-4">{degree.university}</p>
              <p className="text-slate-400 leading-loose mb-4">
                {degree.description}
              </p>

              <ul className="space-y-2">
                {degree.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-500 text-sm">
                    <span className="text-sky-500 mt-1">◂</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
