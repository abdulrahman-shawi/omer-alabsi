import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import TeachingForm from "@/components/admin/teaching-form";
import type { TeachingDomainInput } from "@/app/admin/teaching/actions";

const defaults = {
  title: "مجالات التدريس",
  subtitle: "المسارات الأكاديمية والمقررات التي يمكنني تدريسها",
  visible: true,
  domains: [] as TeachingDomainInput[],
};

export default async function TeachingAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.teachingSection.findUnique({
    where: { id: 1 },
    include: {
      domains: {
        orderBy: { order: "asc" },
        include: { courses: { orderBy: { order: "asc" } } },
      },
    },
  });

  const initial = section
    ? {
        title: section.title,
        subtitle: section.subtitle ?? "",
        visible: section.visible,
        domains: section.domains.map((d) => ({
          title: d.title,
          description: d.description,
          color: d.color,
          icon: d.icon,
          courses: d.courses.map((c) => c.name),
        })),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم مجالات التدريس"
      desc="المجالات والمقررات مع الألوان والأيقونات"
    >
      <TeachingForm initial={initial} />
    </AdminPage>
  );
}
