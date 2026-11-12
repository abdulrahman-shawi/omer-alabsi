import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import HeroForm from "@/components/admin/hero-form";

const defaults = {
  greeting: "مرحباً، أنا",
  name: "عمر مفيد العبسي",
  title: "باحث وأكاديمي في الإدارة والعلوم التطبيقية",
  qualifications: "",
  avatarLetter: "ع",
  bgImage: "/hero-bg.jpg",
  visible: true,
  specialties: [] as { label: string }[],
  buttons: [
    { label: "تواصل معي", href: "#contact", style: "primary" },
    { label: "تعرّف عليّ أكثر", href: "#about", style: "outline" },
  ] as { label: string; href: string; style: string }[],
};

export default async function HeroAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const hero = await prisma.hero.findUnique({
    where: { id: 1 },
    include: {
      specialties: { orderBy: { order: "asc" } },
      buttons: { orderBy: { order: "asc" } },
    },
  });

  const initial = hero
    ? {
        greeting: hero.greeting,
        name: hero.name,
        title: hero.title,
        qualifications: hero.qualifications,
        avatarLetter: hero.avatarLetter,
        bgImage: hero.bgImage,
        visible: hero.visible,
        specialties: hero.specialties.map((s) => ({ label: s.label })),
        buttons: hero.buttons.map((b) => ({
          label: b.label,
          href: b.href,
          style: b.style,
        })),
      }
    : defaults;

  return (
    <AdminPage
      title="قسم الترحيب"
      desc="الاسم، المسمى الوظيفي، التخصصات وأزرار الانتقال"
    >
      <HeroForm initial={initial} />
    </AdminPage>
  );
}
