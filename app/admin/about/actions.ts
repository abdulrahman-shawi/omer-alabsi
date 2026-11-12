"use server";

import { prisma } from "@/lib/prisma";

export type AboutPayload = {
  title: string;
  subtitle: string;
  visible: boolean;
  paragraphs: { text: string }[];
  stats: { value: string; label: string }[];
};

export async function saveAbout(
  data: AboutPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { paragraphs, stats, ...fields } = data;
    await prisma.about.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.aboutParagraph.deleteMany({ where: { aboutId: 1 } });
    await prisma.aboutStat.deleteMany({ where: { aboutId: 1 } });
    for (const [i, p] of paragraphs.entries()) {
      if (!p.text.trim()) continue;
      await prisma.aboutParagraph.create({
        data: { aboutId: 1, text: p.text, order: i },
      });
    }
    for (const [i, s] of stats.entries()) {
      if (!s.label.trim()) continue;
      await prisma.aboutStat.create({
        data: { aboutId: 1, ...s, order: i },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
