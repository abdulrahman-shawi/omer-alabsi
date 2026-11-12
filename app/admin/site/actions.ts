"use server";

import { prisma } from "@/lib/prisma";

export type SitePayload = {
  navbarBrand: string;
  footerText: string;
  links: { label: string; href: string; visible: boolean }[];
};

export async function saveSite(
  data: SitePayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const { links, navbarBrand, footerText } = data;
    await prisma.siteSettings.upsert({
      where: { id: 1 },
      create: { id: 1, navbarBrand, footerText },
      update: { navbarBrand, footerText },
    });
    await prisma.navLink.deleteMany();
    for (const [i, l] of links.entries()) {
      if (!l.label.trim()) continue;
      await prisma.navLink.create({
        data: {
          label: l.label,
          href: l.href.trim() || "#",
          visible: l.visible,
          order: i,
        },
      });
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطأ في الحفظ" };
  }
}
