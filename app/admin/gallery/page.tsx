import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import GalleryForm from "@/components/admin/gallery-form";

const defaults = {
  title: "معرض الصور",
  subtitle: "لقطات من الورشات والبرامج التدريبية والعمل المجتمعي",
  note: "* صور توضيحية — يمكن استبدالها بالصور الحقيقية من الأنشطة",
  visible: true,
  photos: [] as { src: string; title: string; category: string }[],
};

export default async function GalleryAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.gallerySection.findUnique({
    where: { id: 1 },
    include: { photos: { orderBy: { order: "asc" } } },
  });

  const initial = section
    ? {
        title: section.title,
        subtitle: section.subtitle ?? "",
        note: section.note,
        visible: section.visible,
        photos: section.photos.map((p) => ({
          src: p.src,
          title: p.title,
          category: p.category ?? "",
        })),
      }
    : defaults;

  return (
    <AdminPage title="قسم معرض الصور" desc="صور الورشات والبرامج">
      <GalleryForm initial={initial} />
    </AdminPage>
  );
}
