import { prisma } from "./prisma";

// ── أنواع البيانات التي تستهلكها مكونات صفحة العرض ──

export type NavLinkItem = { label: string; href: string };

export type HeroData = {
  visible: boolean;
  greeting: string;
  name: string;
  title: string;
  qualifications: string;
  avatarLetter: string;
  bgImage: string;
  specialties: string[];
  buttons: { label: string; href: string; style: string }[];
};

export type AboutData = {
  visible: boolean;
  title: string;
  subtitle: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];
};

export type EducationData = {
  visible: boolean;
  title: string;
  subtitle: string;
  degrees: {
    title: string;
    status: string;
    university: string;
    year: string;
    description: string;
    highlights: string[];
  }[];
};

export type ExperienceData = {
  visible: boolean;
  title: string;
  subtitle: string;
  bgImage: string;
  academic: {
    role: string;
    field: string;
    place: string;
    description: string;
    note: string;
  };
  training: { role: string; place: string; description: string }[];
  organizations: { abbr: string; name: string }[];
};

export type TeachingData = {
  visible: boolean;
  title: string;
  subtitle: string;
  domains: {
    title: string;
    description: string;
    color: string;
    icon: string;
    courses: string[];
  }[];
};

export type CertificationsData = {
  visible: boolean;
  title: string;
  subtitle: string;
  standardsTitle: string;
  standardsIntro: string;
  certGroupsTitle: string;
  programsTitle: string;
  programsIntro: string;
  standards: { code: string; name: string }[];
  certGroups: { field: string; items: string[] }[];
  programs: string[];
};

export type GalleryData = {
  visible: boolean;
  title: string;
  subtitle: string;
  note: string;
  photos: { src: string; title: string; category: string }[];
};

export type ActivitiesData = {
  visible: boolean;
  title: string;
  subtitle: string;
  items: { title: string; description: string; icon: string }[];
};

export type SkillsData = {
  visible: boolean;
  title: string;
  subtitle: string;
  languagesTitle: string;
  groups: { title: string; color: string; skills: string[] }[];
  languages: { name: string; code: string; level: string; percent: number }[];
};

export type ObjectiveData = {
  visible: boolean;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  interestsTitle: string;
  interests: string[];
};

export type ContactData = {
  visible: boolean;
  title: string;
  subtitle: string;
  bgImage: string;
  metaLine: string;
  cards: {
    title: string;
    value: string;
    href: string;
    action: string;
    icon: string;
  }[];
};

export type SiteData = {
  ok: boolean;
  navbarBrand?: string;
  footerText?: string;
  navLinks: NavLinkItem[];
  hero?: HeroData;
  about?: AboutData;
  education?: EducationData;
  experience?: ExperienceData;
  teaching?: TeachingData;
  certifications?: CertificationsData;
  gallery?: GalleryData;
  activities?: ActivitiesData;
  skills?: SkillsData;
  objective?: ObjectiveData;
  contact?: ContactData;
};

// جلب كل أقسام الموقع في طلب واحد متوازٍ
export async function getSiteData(): Promise<SiteData> {
  const empty: SiteData = { ok: false, navLinks: [] };
  try {
    const [
      settings,
      links,
      hero,
      about,
      education,
      experience,
      teaching,
      certifications,
      gallery,
      activities,
      skills,
      objective,
      contact,
    ] = await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: 1 } }),
      prisma.navLink.findMany({
        where: { visible: true },
        orderBy: { order: "asc" },
      }),
      prisma.hero.findUnique({
        where: { id: 1 },
        include: {
          specialties: { orderBy: { order: "asc" } },
          buttons: { orderBy: { order: "asc" } },
        },
      }),
      prisma.about.findUnique({
        where: { id: 1 },
        include: {
          paragraphs: { orderBy: { order: "asc" } },
          stats: { orderBy: { order: "asc" } },
        },
      }),
      prisma.educationSection.findUnique({
        where: { id: 1 },
        include: {
          degrees: {
            orderBy: { order: "asc" },
            include: { highlights: { orderBy: { order: "asc" } } },
          },
        },
      }),
      prisma.experienceSection.findUnique({
        where: { id: 1 },
        include: {
          trainingItems: { orderBy: { order: "asc" } },
          organizations: { orderBy: { order: "asc" } },
        },
      }),
      prisma.teachingSection.findUnique({
        where: { id: 1 },
        include: {
          domains: {
            orderBy: { order: "asc" },
            include: { courses: { orderBy: { order: "asc" } } },
          },
        },
      }),
      prisma.certificationsSection.findUnique({
        where: { id: 1 },
        include: {
          standards: { orderBy: { order: "asc" } },
          certGroups: {
            orderBy: { order: "asc" },
            include: { items: { orderBy: { order: "asc" } } },
          },
          programs: { orderBy: { order: "asc" } },
        },
      }),
      prisma.gallerySection.findUnique({
        where: { id: 1 },
        include: { photos: { orderBy: { order: "asc" } } },
      }),
      prisma.activitiesSection.findUnique({
        where: { id: 1 },
        include: { items: { orderBy: { order: "asc" } } },
      }),
      prisma.skillsSection.findUnique({
        where: { id: 1 },
        include: {
          groups: {
            orderBy: { order: "asc" },
            include: { skills: { orderBy: { order: "asc" } } },
          },
          languages: { orderBy: { order: "asc" } },
        },
      }),
      prisma.objectiveSection.findUnique({
        where: { id: 1 },
        include: { interests: { orderBy: { order: "asc" } } },
      }),
      prisma.contactSection.findUnique({
        where: { id: 1 },
        include: { cards: { orderBy: { order: "asc" } } },
      }),
    ]);

    return {
      ok: true,
      navbarBrand: settings?.navbarBrand,
      footerText: settings?.footerText,
      navLinks: links.map((l) => ({ label: l.label, href: l.href })),
      hero: hero
        ? {
            visible: hero.visible,
            greeting: hero.greeting,
            name: hero.name,
            title: hero.title,
            qualifications: hero.qualifications,
            avatarLetter: hero.avatarLetter,
            bgImage: hero.bgImage,
            specialties: hero.specialties.map((s) => s.label),
            buttons: hero.buttons.map((b) => ({
              label: b.label,
              href: b.href,
              style: b.style,
            })),
          }
        : undefined,
      about: about
        ? {
            visible: about.visible,
            title: about.title,
            subtitle: about.subtitle ?? "",
            paragraphs: about.paragraphs.map((p) => p.text),
            stats: about.stats.map((s) => ({ value: s.value, label: s.label })),
          }
        : undefined,
      education: education
        ? {
            visible: education.visible,
            title: education.title,
            subtitle: education.subtitle ?? "",
            degrees: education.degrees.map((d) => ({
              title: d.title,
              status: d.status ?? "",
              university: d.university,
              year: d.year,
              description: d.description,
              highlights: d.highlights.map((h) => h.text),
            })),
          }
        : undefined,
      experience: experience
        ? {
            visible: experience.visible,
            title: experience.title,
            subtitle: experience.subtitle ?? "",
            bgImage: experience.bgImage ?? "",
            academic: {
              role: experience.academicRole,
              field: experience.academicField,
              place: experience.academicPlace,
              description: experience.academicDescription,
              note: experience.academicNote,
            },
            training: experience.trainingItems.map((t) => ({
              role: t.role,
              place: t.place,
              description: t.description,
            })),
            organizations: experience.organizations.map((o) => ({
              abbr: o.abbr,
              name: o.name,
            })),
          }
        : undefined,
      teaching: teaching
        ? {
            visible: teaching.visible,
            title: teaching.title,
            subtitle: teaching.subtitle ?? "",
            domains: teaching.domains.map((d) => ({
              title: d.title,
              description: d.description,
              color: d.color,
              icon: d.icon,
              courses: d.courses.map((c) => c.name),
            })),
          }
        : undefined,
      certifications: certifications
        ? {
            visible: certifications.visible,
            title: certifications.title,
            subtitle: certifications.subtitle ?? "",
            standardsTitle: certifications.standardsTitle,
            standardsIntro: certifications.standardsIntro,
            certGroupsTitle: certifications.certGroupsTitle,
            programsTitle: certifications.programsTitle,
            programsIntro: certifications.programsIntro,
            standards: certifications.standards.map((s) => ({
              code: s.code,
              name: s.name,
            })),
            certGroups: certifications.certGroups.map((g) => ({
              field: g.field,
              items: g.items.map((it) => it.text),
            })),
            programs: certifications.programs.map((p) => p.name),
          }
        : undefined,
      gallery: gallery
        ? {
            visible: gallery.visible,
            title: gallery.title,
            subtitle: gallery.subtitle ?? "",
            note: gallery.note,
            photos: gallery.photos.map((p) => ({
              src: p.src,
              title: p.title,
              category: p.category ?? "",
            })),
          }
        : undefined,
      activities: activities
        ? {
            visible: activities.visible,
            title: activities.title,
            subtitle: activities.subtitle ?? "",
            items: activities.items.map((item) => ({
              title: item.title,
              description: item.description,
              icon: item.icon,
            })),
          }
        : undefined,
      skills: skills
        ? {
            visible: skills.visible,
            title: skills.title,
            subtitle: skills.subtitle ?? "",
            languagesTitle: skills.languagesTitle,
            groups: skills.groups.map((g) => ({
              title: g.title,
              color: g.color,
              skills: g.skills.map((s) => s.name),
            })),
            languages: skills.languages.map((l) => ({
              name: l.name,
              code: l.code ?? "",
              level: l.level,
              percent: l.percent,
            })),
          }
        : undefined,
      objective: objective
        ? {
            visible: objective.visible,
            heading: objective.heading,
            paragraph1: objective.paragraph1,
            paragraph2: objective.paragraph2,
            interestsTitle: objective.interestsTitle,
            interests: objective.interests.map((i) => i.name),
          }
        : undefined,
      contact: contact
        ? {
            visible: contact.visible,
            title: contact.title,
            subtitle: contact.subtitle ?? "",
            bgImage: contact.bgImage ?? "",
            metaLine: contact.metaLine,
            cards: contact.cards.map((c) => ({
              title: c.title,
              value: c.value,
              href: c.href,
              action: c.action,
              icon: c.icon,
            })),
          }
        : undefined,
    };
  } catch {
    return empty;
  }
}
