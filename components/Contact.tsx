import Section from "./Section";

const contacts = [
  {
    title: "الهاتف التركي (واتساب)",
    value: "+90 531 434 51 11",
    href: "https://wa.me/905314345111",
    action: "مراسلة عبر واتساب",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
      />
    ),
  },
  {
    title: "الهاتف السوري (اتصال)",
    value: "0936 329 059",
    href: "tel:+963936329059",
    action: "اتصال مباشر",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
      />
    ),
  },
];

export default function Contact() {
  return (
    <>
      <Section
        id="contact"
        title="تواصل معي"
        subtitle="يسعدني تواصلكم في أي وقت"
        bgImage="/contact-bg.jpg"
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {contacts.map((contact) => (
            <a
              key={contact.title}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center hover:border-sky-500/60 transition-colors"
            >
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/30 mb-4 group-hover:bg-sky-500/20 transition-colors">
                <svg
                  className="w-6 h-6 text-sky-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  {contact.icon}
                </svg>
              </span>
              <h3 className="font-bold text-white mb-1">{contact.title}</h3>
              <p className="text-sky-400 text-lg font-bold latin mb-2">
                {contact.value}
              </p>
              <p className="text-slate-500 text-sm group-hover:text-sky-400 transition-colors">
                {contact.action} ←
              </p>
            </a>
          ))}
        </div>

        <p className="text-center text-slate-500 text-md font-bold">
          الجنسية: سورية / تركية · الإقامة: سوريا · المراجع: تقدم عند الطلب
        </p>
      </Section>

      {/* الفوتر */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            عمر مفيد العبسي — باحث وأكاديمي في الإدارة والعلوم التطبيقية
          </p>
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </p>
        </div>
      </footer>
    </>
  );
}
