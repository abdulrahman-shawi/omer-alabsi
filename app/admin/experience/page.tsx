import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import ExperienceForm from "@/components/admin/experience-form";

const defaults = {
  title: "الخبرة الأكاديمية والتدريبية",
  subtitle: "مسيرتي المهنية",
  bgImage: "/experience-bg.jpg",
  visible: true,
  academicRole: "",
  academicField: "",
  academicPlace: "",
  academicDescription: "",
  academicNote: "",
  trainingItems: [] as { role: string; place: string; description: string }[],
  organizations: [] as { abbr: string; name: string }[],
};

export default async function ExperienceAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.experienceSection.findUnique({
    where: { id: 1 },
    include: {
      trainingItems: { orderBy: { order: "asc" } },
      organizations: { orderBy: { order: "asc" } },
    },
  });

  const initial = section
    ? {
        title: section.title,
        subtitle: section.subtitle ?? "",
        bgImage: section.bgImage ?? "",
        visible: section.visible,
        academicRole: section.academicRole,
        academicField: section.academicField,
        academicPlace: section.academicPlace,
        academicDescription: section.academicDescription,
        academicNote: section.academicNote,
        trainingItems: section.trainingItems.map((t) => ({
          role: t.role,
          place: t.place,
          description: t.description,
        })),
        organizations: section.organizations.map((o) => ({
          abbr: o.abbr,
          name: o.name,
        })),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم الخبرة"
      desc="الخبرة الأكاديمية والتدريبية والمنظمات الدولية"
    >
      <ExperienceForm initial={initial} />
    </AdminPage>
  );
}
