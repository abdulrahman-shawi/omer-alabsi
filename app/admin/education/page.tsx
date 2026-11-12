import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import EducationForm from "@/components/admin/education-form";
import type { EducationDegreeInput } from "@/app/admin/education/actions";

const defaults = {
  title: "المؤهلات العلمية",
  subtitle: "المسار الأكاديمي",
  visible: true,
  degrees: [] as EducationDegreeInput[],
};

export default async function EducationAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.educationSection.findUnique({
    where: { id: 1 },
    include: {
      degrees: {
        orderBy: { order: "asc" },
        include: { highlights: { orderBy: { order: "asc" } } },
      },
    },
  });

  const initial = section
    ? {
        title: section.title,
        subtitle: section.subtitle ?? "",
        visible: section.visible,
        degrees: section.degrees.map((d) => ({
          title: d.title,
          status: d.status ?? "",
          university: d.university,
          year: d.year,
          description: d.description,
          highlights: d.highlights.map((h) => h.text),
        })),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم المؤهلات العلمية"
      desc="الدرجات العلمية مع النقاط البارزة لكل درجة"
    >
      <EducationForm initial={initial} />
    </AdminPage>
  );
}
