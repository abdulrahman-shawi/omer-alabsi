import Section from "./Section";
import type { ExperienceData } from "@/lib/site-data";

const fallback: ExperienceData = {
  visible: true,
  title: "الخبرة الأكاديمية والتدريبية",
  subtitle: "مسيرتي المهنية",
  bgImage: "/experience-bg.jpg",
  academic: {
    role: "مدرس",
    field: "التعليم والتدريب المخبري",
    place: "جامعة حمص – سوريا",
    description:
      "المساهمة في العملية التعليمية والتدريب العملي ضمن البيئة الجامعية، من خلال العمل في المختبر وتطبيق المفاهيم العلمية بصورة عملية، ومتابعة الطلاب وتقديم الإرشاد والتوضيح أثناء الأنشطة المخبرية.",
    note: "تجربة مباشرة في التعامل مع الطلاب والعملية التعليمية الجامعية والجانب التطبيقي للمادة العلمية.",
  },
  training: [
    {
      role: "مدرب ريادة أعمال وإدارة المشاريع الصغيرة والمتوسطة",
      place: "برامج ومشاريع بالتعاون مع منظمات دولية",
      description:
        "تقديم التدريب في مجالات ريادة الأعمال وإدارة المشاريع الصغيرة والمتوسطة، بما يشمل تطوير الأفكار والمشاريع، التخطيط، الإدارة، دراسة الاحتياجات، وتنمية القدرات اللازمة لتأسيس وإدارة المشاريع.",
    },
    {
      role: "مدرب سبل العيش وإدارة المشاريع الصغيرة والمتوسطة",
      place: "مجموعة الإدارة العالمية (GM) بالتعاون مع IOM",
      description:
        "مدرب معتمد بشهادة تدريب في مجال إدارة المشاريع الصغيرة والمتوسطة وبرامج سبل العيش، والمشاركة في أنشطة التدريب وبناء القدرات ضمن البرامج الموجهة للمستفيدين.",
    },
    {
      role: "مدرب تنمية ومهارات حياتية",
      place: "ورشات عمل وتدريبات متخصصة",
      description:
        "تقديم تدريبات وورشات عمل في مجالات التنمية البشرية والمهارات الحياتية، مع التركيز على تطوير القدرات الشخصية والمهنية، ومهارات التواصل، حل المشكلات، القيادة، والعمل ضمن الفريق.",
    },
  ],
  organizations: [
    { abbr: "IOM", name: "المنظمة الدولية للهجرة" },
    { abbr: "UNDP", name: "برنامج الأمم المتحدة الإنمائي" },
    { abbr: "UNHCR", name: "المفوضية السامية للأمم المتحدة لشؤون اللاجئين" },
  ],
};

export default function Experience({ data }: { data?: ExperienceData }) {
  const { title, subtitle, bgImage, academic, training, organizations } =
    data ?? fallback;

  return (
    <Section
      id="experience"
      title={title}
      subtitle={subtitle || undefined}
      bgImage={bgImage || undefined}
    >
      {/* الخبرة الأكاديمية */}
      <div className="mb-14">
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/40 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-sky-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
          </span>
          الخبرة الأكاديمية
        </h3>

        <div className="bg-slate-900/80 backdrop-blur-sm border border-sky-500/30 rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h4 className="text-2xl font-bold text-white">{academic.role}</h4>
            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-400 text-xs font-medium">
              {academic.field}
            </span>
          </div>
          <p className="text-sky-300 font-medium mb-4">{academic.place}</p>
          <p className="text-slate-400 leading-loose mb-4">
            {academic.description}
          </p>
          <p className="text-slate-500 text-sm border-r-2 border-sky-500 pr-4 leading-relaxed">
            {academic.note}
          </p>
        </div>
      </div>

      {/* الخبرة التدريبية */}
      <div>
        <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/40 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-indigo-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
              />
            </svg>
          </span>
          الخبرة التدريبية والمؤسسية
        </h3>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {training.map((item) => (
            <div
              key={item.role}
              className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/60 transition-colors flex flex-col"
            >
              <h4 className="text-lg font-bold text-white mb-2 leading-relaxed">
                {item.role}
              </h4>
              <p className="text-indigo-300 text-sm font-medium mb-4">{item.place}</p>
              <p className="text-slate-400 text-sm leading-loose">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* المنظمات الدولية */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="text-slate-500 text-sm">التعاون مع:</span>
          {organizations.map((org) => (
            <div
              key={org.abbr}
              title={org.name}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 border border-slate-700 hover:border-sky-500 transition-colors"
            >
              <span className="font-bold text-white latin">{org.abbr}</span>
              <span className="text-slate-500 text-xs">{org.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
