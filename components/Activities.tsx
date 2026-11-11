import Section from "./Section";

const activities = [
  {
    title: "المجالس الدنماركية",
    description: "برامج تنمية بشرية وبناء قدرات ضمن أنشطة مجتمعية منظمة",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m-18.432 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253"
      />
    ),
  },
  {
    title: "جمعية البر والخدمات الاجتماعية",
    description: "عمل تطوعي وخدمة مجتمعية وتنظيم مبادرات اجتماعية",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.675 1.17-4.312 2.946-.637-1.776-2.377-2.946-4.312-2.946C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    ),
  },
  {
    title: "مركز السائر",
    description: "ورشات عمل وتدريبات متخصصة في التنمية البشرية",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    ),
  },
  {
    title: "فريق سند التنموي – دمشق",
    description: "برامج شبابية تنموية وأنشطة ميدانية هادفة",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
      />
    ),
  },
  {
    title: "برامج تدريبية عبر الإنترنت",
    description: "دورات وشهادات إلكترونية من منصات عربية عالمية",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    ),
  },
  {
    title: "ورشات وبرامج ميدانية",
    description: "تطبيق عملي مباشر مع المستفيدين من برامج سبل العيش",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
  },
];

export default function Activities() {
  return (
    <Section
      id="activities"
      title="الأنشطة المجتمعية"
      subtitle="المشاركة في برامج التنمية البشرية وورشات العمل عبر جهات ومبادرات متعددة"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="group bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-sky-500/60 hover:-translate-y-1 transition-all duration-300"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-4 group-hover:bg-sky-500/20 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                {activity.icon}
              </svg>
            </span>
            <h3 className="font-bold text-white mb-2 leading-relaxed">
              {activity.title}
            </h3>
            <p className="text-slate-400 text-sm leading-loose">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
