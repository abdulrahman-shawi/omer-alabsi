import Section from "./Section";
import type { AboutData } from "@/lib/site-data";

const fallback: AboutData = {
  visible: true,
  title: "الملف الأكاديمي",
  subtitle: "من أنا؟",
  paragraphs: [
    "باحث وأكاديمي متعدد التخصصات يجمع بين الخلفية العلمية في الكيمياء التحليلية والتأهيل المتقدم في إدارة الأعمال والإدارة الحديثة، مع دراسة دكتوراه في إدارة الأعمال واهتمام بحثي بتطبيقات الذكاء الاصطناعي في الإدارة وصناعة القرار.",
    "أمتلك خبرة أكاديمية في البيئة الجامعية من خلال العمل في جامعة حمص في المجال المخبري والتدريسي، إلى جانب خبرة مهنية وعملية في الإدارة وإدارة المشاريع وتطوير الأعمال.",
    "يتميز المسار الأكاديمي بالجمع بين العلوم التطبيقية والمنهجية البحثية من جهة، والعلوم الإدارية والتطبيق العملي من جهة أخرى، بما يتيح توظيف المعرفة العلمية في معالجة المشكلات الإدارية والتنظيمية وتطوير الأداء المؤسسي.",
    "كما أمتلك خبرة في مجال التدريب وريادة الأعمال وإدارة المشاريع الصغيرة والمتوسطة وبرامج سبل العيش، من خلال التعاون مع منظمات ومؤسسات دولية بما فيها IOM وUNDP وUNHCR، إضافة إلى خبرات تدريبية في التنمية والمهارات الحياتية وبناء القدرات.",
  ],
  stats: [
    { value: "3", label: "مؤهلات علمية" },
    { value: "3", label: "منظمات دولية" },
    { value: "4", label: "مجالات تدريس" },
    { value: "5", label: "شهادات جودة ومعايير" },
  ],
};

export default function About({ data }: { data?: AboutData }) {
  const about = data ?? fallback;

  return (
    <Section
      id="about"
      title={about.title}
      subtitle={about.subtitle || undefined}
    >
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* النص التعريفي */}
        <div className="space-y-5">
          {about.paragraphs.map((text, i) => (
            <p
              key={i}
              className={`leading-loose ${
                i === 0 ? "text-slate-200 text-lg" : "text-slate-400"
              }`}
            >
              {text}
            </p>
          ))}
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-2 gap-4">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center hover:border-sky-500 transition-colors"
            >
              <div className="text-4xl font-bold text-sky-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
