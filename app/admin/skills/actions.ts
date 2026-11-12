"use server";

import { prisma } from "@/lib/prisma";

export type SkillGroupInput = {
  title: string;
  color: string;
  skills: string[];
};

export type LanguageInput = {
  name: string;
  code: string;
  level: string;
  percent: number;
};

export type SkillsPayload = {
  title: string;
  subtitle: string;
  languagesTitle: string;
  visible: boolean;
  groups: SkillGroupInput[];
  languages: LanguageInput[];
};

export async function saveSkills(
  data: SkillsPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { groups, languages, ...fields } = data;
    await prisma.skillsSection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.skillGroup.deleteMany({ where: { sectionId: 1 } });
    await prisma.language.deleteMany({ where: { sectionId: 1 } });
    for (const [i, g] of groups.entries()) {
      if (!g.title.trim()) continue;
      await prisma.skillGroup.create({
        data: {
          sectionId: 1,
          title: g.title,
          color: (g.color || "sky") as "sky" | "indigo" | "emerald" | "amber",
          order: i,
          skills: {
            create: g.skills
              .map((name, j) => ({ name, order: j }))
              .filter((s) => s.name.trim()),
          },
        },
      });
    }
    for (const [i, l] of languages.entries()) {
      if (!l.name.trim()) continue;
      await prisma.language.create({
        data: {
          sectionId: 1,
          name: l.name,
          code: l.code.trim() || null,
          level: l.level,
          percent: Math.max(0, Math.min(100, l.percent)),
          order: i,
        },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
