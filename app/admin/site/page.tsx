import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import SiteForm from "@/components/admin/site-form";

const defaults = {
  navbarBrand: "عمر العبسي",
  footerText: "عمر مفيد العبسي — باحث وأكاديمي في الإدارة والعلوم التطبيقية",
  links: [
    { label: "الرئيسية", href: "#home", visible: true },
    { label: "نبذة", href: "#about", visible: true },
    { label: "المؤهلات", href: "#education", visible: true },
    { label: "الخبرة", href: "#experience", visible: true },
    { label: "مجالات التدريس", href: "#teaching", visible: true },
    { label: "الصور", href: "#photos", visible: true },
    { label: "الأنشطة", href: "#activities", visible: true },
    { label: "المهارات", href: "#skills", visible: true },
    { label: "التواصل", href: "#contact", visible: true },
  ] as { label: string; href: string; visible: boolean }[],
};

export default async function SiteAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const links = await prisma.navLink.findMany({ orderBy: { order: "asc" } });

  const initial = {
    navbarBrand: settings?.navbarBrand ?? defaults.navbarBrand,
    footerText: settings?.footerText ?? defaults.footerText,
    links: links.length
      ? links.map((l) => ({ label: l.label, href: l.href, visible: l.visible }))
      : defaults.links,
  };

  return (
    <AdminPage
      title="القائمة والإعدادات العامة"
      desc="روابط القائمة العلوية ونص الفوتر"
    >
      <SiteForm initial={initial} />
    </AdminPage>
  );
}
