"use server";

import { prisma } from "@/lib/prisma";

export type ContactPayload = {
  title: string;
  subtitle: string;
  bgImage: string;
  metaLine: string;
  visible: boolean;
  cards: { title: string; value: string; href: string; action: string; icon: string }[];
};

export async function saveContact(
  data: ContactPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { cards, ...fields } = data;
    await prisma.contactSection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.contactCard.deleteMany({ where: { sectionId: 1 } });
    for (const [i, c] of cards.entries()) {
      if (!c.title.trim()) continue;
      await prisma.contactCard.create({
        data: { sectionId: 1, ...c, order: i },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
