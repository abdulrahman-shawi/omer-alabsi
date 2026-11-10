import Section from "./Section";

const researchInterests = [
  "الذكاء الاصطناعي في الإدارة",
  "الذكاء الاصطناعي ودعم القرار",
  "التحول الرقمي للمؤسسات",
  "الإدارة الاستراتيجية",
  "تطوير الأداء المؤسسي",
  "إدارة المشاريع",
  "ريادة الأعمال",
  "الابتكار الإداري",
  "العلوم التطبيقية والكيمياء التحليلية",
  "الربط بين العلوم التطبيقية والعلوم الإدارية",
];

export default function Objective() {
  return (
    <section id="objective" className="py-20 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* الهدف الأكاديمي */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-sky-600/20 via-indigo-600/10 to-transparent border border-sky-500/30 p-8 md:p-14 mb-12">
          <span className="absolute top-6 right-8 text-7xl text-sky-500/20 font-serif leading-none select-none">
            ❝
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            الهدف الأكاديمي
          </h2>
          <p className="text-lg md:text-xl text-slate-200 leading-loose mb-5 max-w-4xl">
            أسعى إلى توظيف خبرتي الأكاديمية والعلمية والمهنية ضمن البيئة
            الجامعية السورية، والمساهمة في تطوير العملية التعليمية والبحثية
            من خلال الجمع بين المعرفة النظرية والخبرة التطبيقية.
          </p>
          <p className="text-slate-400 leading-loose max-w-4xl">
            كما أطمح إلى المساهمة في إعداد كوادر علمية وإدارية قادرة على
            التعامل مع متطلبات المؤسسات الحديثة، والاستفادة من تقنيات الذكاء
            الاصطناعي والتحول الرقمي في تطوير الإدارة وصناعة القرار، مع
            الحفاظ على المنهجية العلمية والانضباط الأكاديمي.
          </p>
        </div>

        {/* الاهتمامات البحثية */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            الاهتمامات البحثية
          </h3>
          <span className="inline-block w-12 h-1 bg-sky-500 rounded-full mb-8" />
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {researchInterests.map((interest) => (
              <span
                key={interest}
                className="px-4 py-2 rounded-full bg-slate-900/60 border border-slate-700 text-slate-300 text-sm hover:border-indigo-500 hover:text-indigo-300 transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
