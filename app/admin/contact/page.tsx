import { dbAvailable, prisma } from "@/lib/prisma";
import { AdminPage, DbDown } from "@/components/admin/page";
import ContactForm from "@/components/admin/contact-form";

const defaults = {
  title: "تواصل معي",
  subtitle: "يسعدني تواصلكم في أي وقت",
  bgImage: "/contact-bg.jpg",
  metaLine: "",
  visible: true,
  cards: [] as {
    title: string;
    value: string;
    href: string;
    action: string;
    icon: string;
  }[],
};

export default async function ContactAdminPage() {
  if (!(await dbAvailable())) return <DbDown />;
  const section = await prisma.contactSection.findUnique({
    where: { id: 1 },
    include: { cards: { orderBy: { order: "asc" } } },
  });

  const initial = section
    ? {
        title: section.title,
        subtitle: section.subtitle ?? "",
        bgImage: section.bgImage ?? "",
        metaLine: section.metaLine,
        visible: section.visible,
        cards: section.cards.map((c) => ({
          title: c.title,
          value: c.value,
          href: c.href,
          action: c.action,
          icon: c.icon,
        })),
      }
    : defaults;

  return (
    <AdminPage title="قسم التواصل" desc="بطاقات التواصل وسطر المعلومات">
      <ContactForm initial={initial} />
    </AdminPage>
  );
}
