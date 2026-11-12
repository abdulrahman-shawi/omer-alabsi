import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import SkillsForm from "@/components/admin/skills-form";
import type {
  LanguageInput,
  SkillGroupInput,
} from "@/app/admin/skills/actions";

const defaults = {
  title: "المهارات واللغات",
  subtitle: "ماذا أستطيع أن أقدم؟",
  languagesTitle: "اللغات",
  visible: true,
  groups: [] as SkillGroupInput[],
  languages: [] as LanguageInput[],
};

export default async function SkillsAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.skillsSection.findUnique({
    where: { id: 1 },
    include: {
      groups: {
        orderBy: { order: "asc" },
        include: { skills: { orderBy: { order: "asc" } } },
      },
      languages: { orderBy: { order: "asc" } },
    },
  });

  const initial = section
    ? {
        title: section.title,
        subtitle: section.subtitle ?? "",
        languagesTitle: section.languagesTitle,
        visible: section.visible,
        groups: section.groups.map((g) => ({
          title: g.title,
          color: g.color,
          skills: g.skills.map((s) => s.name),
        })),
        languages: section.languages.map((l) => ({
          name: l.name,
          code: l.code ?? "",
          level: l.level,
          percent: l.percent,
        })),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم المهارات واللغات"
      desc="مجموعات المهارات ومستويات اللغات"
    >
      <SkillsForm initial={initial} />
    </AdminPage>
  );
}
