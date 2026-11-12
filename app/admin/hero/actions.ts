"use server";

import { prisma } from "@/lib/prisma";

export type HeroPayload = {
  greeting: string;
  name: string;
  title: string;
  qualifications: string;
  avatarLetter: string;
  bgImage: string;
  visible: boolean;
  specialties: { label: string }[];
  buttons: { label: string; href: string; style: string }[];
};

export async function saveHero(
  data: HeroPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { specialties, buttons, ...fields } = data;
    await prisma.hero.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.heroSpecialty.deleteMany({ where: { heroId: 1 } });
    await prisma.heroButton.deleteMany({ where: { heroId: 1 } });
    for (const [i, s] of specialties.entries()) {
      if (!s.label.trim()) continue;
      await prisma.heroSpecialty.create({
        data: { heroId: 1, label: s.label, order: i },
      });
    }
    for (const [i, b] of buttons.entries()) {
      if (!b.label.trim() && !b.href.trim()) continue;
      await prisma.heroButton.create({
        data: { heroId: 1, ...b, order: i },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
