import { ReactNode } from "react";

export function AdminPage({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-slate-400">{desc}</p>
      </div>
      {children}
    </div>
  );
}

export function DbDown() {
  return (
    <div className="max-w-3xl border border-amber-500/40 bg-amber-500/10 rounded-2xl p-8 text-center space-y-4">
      <h1 className="text-xl font-bold text-amber-300">
        لا يمكن الاتصال بقاعدة البيانات
      </h1>
      <p className="text-slate-300 leading-relaxed">
        تأكد من أن خادم PostgreSQL يعمل وأن الرابط في ملف{" "}
        <code className="latin text-sky-400">.env</code> صحيح، ثم حدّث الصفحة.
      </p>
      <p className="text-slate-500 text-sm" dir="ltr">
        npx prisma migrate dev
      </p>
    </div>
  );
}
