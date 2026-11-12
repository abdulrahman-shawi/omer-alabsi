"use server";

import { prisma } from "@/lib/prisma";

export type EducationDegreeInput = {
  title: string;
  status: string;
  university: string;
  year: string;
  description: string;
  highlights: string[];
};

export type EducationPayload = {
  title: string;
  subtitle: string;
  visible: boolean;
  degrees: EducationDegreeInput[];
};

export async function saveEducation(
  data: EducationPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { degrees, ...fields } = data;
    await prisma.educationSection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.educationDegree.deleteMany({ where: { sectionId: 1 } });
    for (const [i, d] of degrees.entries()) {
      if (!d.title.trim()) continue;
      await prisma.educationDegree.create({
        data: {
          sectionId: 1,
          title: d.title,
          status: d.status.trim() || null,
          university: d.university,
          year: d.year,
          description: d.description,
          order: i,
          highlights: {
            create: d.highlights
              .map((h, j) => ({ text: h, order: j }))
              .filter((h) => h.text.trim()),
          },
        },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
