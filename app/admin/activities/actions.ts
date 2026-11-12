"use server";

import { prisma } from "@/lib/prisma";

export type ActivitiesPayload = {
  title: string;
  subtitle: string;
  visible: boolean;
  items: { title: string; description: string; icon: string }[];
};

export async function saveActivities(
  data: ActivitiesPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { items, ...fields } = data;
    await prisma.activitiesSection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.activityItem.deleteMany({ where: { sectionId: 1 } });
    for (const [i, item] of items.entries()) {
      if (!item.title.trim()) continue;
      await prisma.activityItem.create({
        data: { sectionId: 1, ...item, order: i },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
