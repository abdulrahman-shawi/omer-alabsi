"use server";

import { prisma } from "@/lib/prisma";

export type TeachingDomainInput = {
  title: string;
  description: string;
  color: string;
  icon: string;
  courses: string[];
};

export type TeachingPayload = {
  title: string;
  subtitle: string;
  visible: boolean;
  domains: TeachingDomainInput[];
};

export async function saveTeaching(
  data: TeachingPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { domains, ...fields } = data;
    await prisma.teachingSection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.teachingDomain.deleteMany({ where: { sectionId: 1 } });
    for (const [i, d] of domains.entries()) {
      if (!d.title.trim()) continue;
      await prisma.teachingDomain.create({
        data: {
          sectionId: 1,
          title: d.title,
          description: d.description,
          color: (d.color || "sky") as "sky" | "indigo" | "emerald" | "amber",
          icon: d.icon,
          order: i,
          courses: {
            create: d.courses
              .map((c, j) => ({ name: c, order: j }))
              .filter((c) => c.name.trim()),
          },
        },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
