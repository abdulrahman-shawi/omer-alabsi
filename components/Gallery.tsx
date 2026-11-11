import Section from "./Section";

const activities = [
  {
    src: "/gallery/activity-1.jpg",
    title: "ورشة عمل تدريبية",
    category: "بناء القدرات",
  },
  {
    src: "/gallery/activity-2.jpg",
    title: "عمل تطوعي مجتمعي",
    category: "الخدمات الاجتماعية",
  },
  {
    src: "/gallery/activity-3.jpg",
    title: "تدريب ريادة الأعمال",
    category: "سبل العيش",
  },
  {
    src: "/gallery/activity-4.jpg",
    title: "لقاء تنموي شبابي",
    category: "المهارات الحياتية",
  },
  {
    src: "/gallery/activity-5.jpg",
    title: "محاضرة وورشة علمية",
    category: "البيئة الجامعية",
  },
  {
    src: "/gallery/activity-6.jpg",
    title: "مشاركة في مؤتمر",
    category: "برامج مجتمعية",
  },
];

export default function Gallery() {
  return (
    <Section
      id="gallery"
      title="الصور والأنشطة المجتمعية"
      subtitle="لقطات من الورشات والبرامج التدريبية والعمل المجتمعي"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {activities.map((activity) => (
          <figure
            key={activity.src}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 hover:border-sky-500/60 transition-colors"
          >
            {/* الصورة */}
            <img
              src={activity.src}
              alt={activity.title}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* التدريج والتسمية */}
            <figcaption className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent">
              <span className="text-sky-400 text-xs font-medium mb-1">
                {activity.category}
              </span>
              <span className="text-white font-bold text-lg">
                {activity.title}
              </span>
            </figcaption>

            {/* إطار عند التمرير */}
            <span className="absolute inset-0 rounded-2xl ring-2 ring-sky-500/0 group-hover:ring-sky-500/50 transition-all duration-300 pointer-events-none" />
          </figure>
        ))}
      </div>

      <p className="text-center text-slate-600 text-sm mt-8">
        * صور توضيحية — يمكن استبدالها بالصور الحقيقية من الأنشطة
      </p>
    </Section>
  );
}
