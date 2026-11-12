import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import AboutForm from "@/components/admin/about-form";

const defaults = {
  title: "الملف الأكاديمي",
  subtitle: "من أنا؟",
  visible: true,
  paragraphs: [] as { text: string }[],
  stats: [] as { value: string; label: string }[],
};

export default async function AboutAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const about = await prisma.about.findUnique({
    where: { id: 1 },
    include: {
      paragraphs: { orderBy: { order: "asc" } },
      stats: { orderBy: { order: "asc" } },
    },
  });

  const initial = about
    ? {
        title: about.title,
        subtitle: about.subtitle ?? "",
        visible: about.visible,
        paragraphs: about.paragraphs.map((p) => ({ text: p.text })),
        stats: about.stats.map((s) => ({ value: s.value, label: s.label })),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم نبذة عني"
      desc="الفقرات التعريفية وبطاقات الإحصائيات"
    >
      <AboutForm initial={initial} />
    </AdminPage>
  );
}
