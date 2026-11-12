"use server";

import { prisma } from "@/lib/prisma";

export type ObjectivePayload = {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  interestsTitle: string;
  visible: boolean;
  interests: string[];
};

export async function saveObjective(
  data: ObjectivePayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { interests, ...fields } = data;
    await prisma.objectiveSection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.researchInterest.deleteMany({ where: { sectionId: 1 } });
    for (const [i, name] of interests.entries()) {
      if (!name.trim()) continue;
      await prisma.researchInterest.create({
        data: { sectionId: 1, name, order: i },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
