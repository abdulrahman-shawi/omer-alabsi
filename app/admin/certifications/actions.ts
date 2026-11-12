"use server";

import { prisma } from "@/lib/prisma";

export type CertGroupInput = {
  field: string;
  items: string[];
};

export type CertificationsPayload = {
  title: string;
  subtitle: string;
  visible: boolean;
  standardsTitle: string;
  standardsIntro: string;
  certGroupsTitle: string;
  programsTitle: string;
  programsIntro: string;
  standards: { code: string; name: string }[];
  certGroups: CertGroupInput[];
  programs: string[];
};

export async function saveCertifications(
  data: CertificationsPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { standards, certGroups, programs, ...fields } = data;
    await prisma.certificationsSection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.certStandard.deleteMany({ where: { sectionId: 1 } });
    await prisma.certGroup.deleteMany({ where: { sectionId: 1 } });
    await prisma.developmentProgram.deleteMany({ where: { sectionId: 1 } });
    for (const [i, s] of standards.entries()) {
      if (!s.code.trim()) continue;
      await prisma.certStandard.create({
        data: { sectionId: 1, ...s, order: i },
      });
    }
    for (const [i, g] of certGroups.entries()) {
      if (!g.field.trim()) continue;
      await prisma.certGroup.create({
        data: {
          sectionId: 1,
          field: g.field,
          order: i,
          items: {
            create: g.items
              .map((text, j) => ({ text, order: j }))
              .filter((it) => it.text.trim()),
          },
        },
      });
    }
    for (const [i, p] of programs.entries()) {
      if (!p.trim()) continue;
      await prisma.developmentProgram.create({
        data: { sectionId: 1, name: p, order: i },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
