"use server";

import { prisma } from "@/lib/prisma";

export type ExperiencePayload = {
  title: string;
  subtitle: string;
  bgImage: string;
  visible: boolean;
  academicRole: string;
  academicField: string;
  academicPlace: string;
  academicDescription: string;
  academicNote: string;
  trainingItems: { role: string; place: string; description: string }[];
  organizations: { abbr: string; name: string }[];
};

export async function saveExperience(
  data: ExperiencePayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { trainingItems, organizations, ...fields } = data;
    await prisma.experienceSection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.experienceTraining.deleteMany({ where: { sectionId: 1 } });
    await prisma.experienceOrganization.deleteMany({ where: { sectionId: 1 } });
    for (const [i, t] of trainingItems.entries()) {
      if (!t.role.trim()) continue;
      await prisma.experienceTraining.create({
        data: { sectionId: 1, ...t, order: i },
      });
    }
    for (const [i, o] of organizations.entries()) {
      if (!o.abbr.trim()) continue;
      await prisma.experienceOrganization.create({
        data: { sectionId: 1, ...o, order: i },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
