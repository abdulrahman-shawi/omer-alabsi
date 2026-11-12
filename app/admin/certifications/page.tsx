import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import CertificationsForm from "@/components/admin/certifications-form";
import type {
  CertGroupInput,
  CertificationsPayload,
} from "@/app/admin/certifications/actions";

const defaults: CertificationsPayload = {
  title: "الشهادات والمعايير الدولية",
  subtitle: "مؤهلاتي في الجودة والإدارة",
  visible: true,
  standardsTitle: "أنظمة إدارة الجودة والمعايير الدولية",
  standardsIntro: "",
  certGroupsTitle: "الشهادات المهنية في الإدارة",
  programsTitle: "برامج التنمية البشرية وورشات العمل",
  programsIntro: "",
  standards: [],
  certGroups: [],
  programs: [],
};

export default async function CertificationsAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.certificationsSection.findUnique({
    where: { id: 1 },
    include: {
      standards: { orderBy: { order: "asc" } },
      certGroups: {
        orderBy: { order: "asc" },
        include: { items: { orderBy: { order: "asc" } } },
      },
      programs: { orderBy: { order: "asc" } },
    },
  });

  const initial: CertificationsPayload = section
    ? {
        title: section.title,
        subtitle: section.subtitle ?? "",
        visible: section.visible,
        standardsTitle: section.standardsTitle,
        standardsIntro: section.standardsIntro,
        certGroupsTitle: section.certGroupsTitle,
        programsTitle: section.programsTitle,
        programsIntro: section.programsIntro,
        standards: section.standards.map((s) => ({ code: s.code, name: s.name })),
        certGroups: section.certGroups.map(
          (g): CertGroupInput => ({
            field: g.field,
            items: g.items.map((it) => it.text),
          })
        ),
        programs: section.programs.map((p) => p.name),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم الشهادات والمعايير"
      desc="معايير الجودة والشهادات المهنية وبرامج التنمية"
    >
      <CertificationsForm initial={initial} />
    </AdminPage>
  );
}
