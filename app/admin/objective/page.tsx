import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import ObjectiveForm from "@/components/admin/objective-form";

const defaults = {
  heading: "الهدف الأكاديمي",
  paragraph1: "",
  paragraph2: "",
  interestsTitle: "الاهتمامات البحثية",
  visible: true,
  interests: [] as string[],
};

export default async function ObjectiveAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.objectiveSection.findUnique({
    where: { id: 1 },
    include: { interests: { orderBy: { order: "asc" } } },
  });

  const initial = section
    ? {
        heading: section.heading,
        paragraph1: section.paragraph1,
        paragraph2: section.paragraph2,
        interestsTitle: section.interestsTitle,
        visible: section.visible,
        interests: section.interests.map((i) => i.name),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم الهدف والاهتمامات"
      desc="الهدف الأكاديمي والاهتمامات البحثية"
    >
      <ObjectiveForm initial={initial} />
    </AdminPage>
  );
}
