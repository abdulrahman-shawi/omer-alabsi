import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import ActivitiesForm from "@/components/admin/activities-form";

const defaults = {
  title: "الأنشطة المجتمعية",
  subtitle:
    "المشاركة في برامج التنمية البشرية وورشات العمل عبر جهات ومبادرات متعددة",
  visible: true,
  items: [] as { title: string; description: string; icon: string }[],
};

export default async function ActivitiesAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.activitiesSection.findUnique({
    where: { id: 1 },
    include: { items: { orderBy: { order: "asc" } } },
  });

  const initial = section
    ? {
        title: section.title,
        subtitle: section.subtitle ?? "",
        visible: section.visible,
        items: section.items.map((item) => ({
          title: item.title,
          description: item.description,
          icon: item.icon,
        })),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم الأنشطة المجتمعية"
      desc="الجهات والمبادرات المشارك بها"
    >
      <ActivitiesForm initial={initial} />
    </AdminPage>
  );
}
