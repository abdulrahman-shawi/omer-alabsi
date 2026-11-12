"use server";

import { prisma } from "@/lib/prisma";

export type GalleryPayload = {
  title: string;
  subtitle: string;
  note: string;
  visible: boolean;
  photos: { src: string; title: string; category: string }[];
};

export async function saveGallery(
  data: GalleryPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { photos, ...fields } = data;
    await prisma.gallerySection.upsert({
      where: { id: 1 },
      create: { id: 1, ...fields },
      update: fields,
    });
    await prisma.galleryPhoto.deleteMany({ where: { sectionId: 1 } });
    for (const [i, p] of photos.entries()) {
      if (!p.src.trim()) continue;
      await prisma.galleryPhoto.create({
        data: {
          sectionId: 1,
          src: p.src,
          title: p.title,
          category: p.category.trim() || null,
          order: i,
        },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
