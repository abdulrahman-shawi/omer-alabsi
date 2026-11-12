-- CreateEnum
CREATE TYPE "AccentColor" AS ENUM ('sky', 'indigo', 'emerald', 'amber');

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "navbarBrand" TEXT NOT NULL,
    "footerText" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavLink" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "NavLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hero" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "greeting" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "qualifications" TEXT NOT NULL,
    "avatarLetter" TEXT NOT NULL DEFAULT 'ع',
    "bgImage" TEXT NOT NULL DEFAULT '/hero-bg.jpg',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSpecialty" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "HeroSpecialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroButton" (
    "id" SERIAL NOT NULL,
    "heroId" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "style" TEXT NOT NULL DEFAULT 'primary',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "HeroButton_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutParagraph" (
    "id" SERIAL NOT NULL,
    "aboutId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AboutParagraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutStat" (
    "id" SERIAL NOT NULL,
    "aboutId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "AboutStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationDegree" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT,
    "university" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EducationDegree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationHighlight" (
    "id" SERIAL NOT NULL,
    "degreeId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EducationHighlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "bgImage" TEXT,
    "academicRole" TEXT NOT NULL,
    "academicField" TEXT NOT NULL,
    "academicPlace" TEXT NOT NULL,
    "academicDescription" TEXT NOT NULL,
    "academicNote" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExperienceSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceTraining" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ExperienceTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceOrganization" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "abbr" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ExperienceOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeachingSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingDomain" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" "AccentColor" NOT NULL DEFAULT 'sky',
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeachingDomain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingCourse" (
    "id" SERIAL NOT NULL,
    "domainId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeachingCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificationsSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "standardsTitle" TEXT NOT NULL,
    "standardsIntro" TEXT NOT NULL,
    "certGroupsTitle" TEXT NOT NULL,
    "programsTitle" TEXT NOT NULL,
    "programsIntro" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CertificationsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertStandard" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CertStandard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertGroup" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "field" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CertGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertItem" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CertItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DevelopmentProgram" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DevelopmentProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GallerySection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "note" TEXT NOT NULL DEFAULT '* صور توضيحية — يمكن استبدالها بالصور الحقيقية من الأنشطة',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GallerySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryPhoto" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "src" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GalleryPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivitiesSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityItem" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ActivityItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillsSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "languagesTitle" TEXT NOT NULL DEFAULT 'اللغات',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillsSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillGroup" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "color" "AccentColor" NOT NULL DEFAULT 'sky',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SkillGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillItem" (
    "id" SERIAL NOT NULL,
    "groupId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SkillItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "level" TEXT NOT NULL,
    "percent" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectiveSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "heading" TEXT NOT NULL DEFAULT 'الهدف الأكاديمي',
    "paragraph1" TEXT NOT NULL,
    "paragraph2" TEXT NOT NULL,
    "interestsTitle" TEXT NOT NULL DEFAULT 'الاهتمامات البحثية',
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ObjectiveSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResearchInterest" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ResearchInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSection" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "bgImage" TEXT,
    "metaLine" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactCard" (
    "id" SERIAL NOT NULL,
    "sectionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ContactCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HeroSpecialty" ADD CONSTRAINT "HeroSpecialty_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeroButton" ADD CONSTRAINT "HeroButton_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Hero"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutParagraph" ADD CONSTRAINT "AboutParagraph_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AboutStat" ADD CONSTRAINT "AboutStat_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationDegree" ADD CONSTRAINT "EducationDegree_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "EducationSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EducationHighlight" ADD CONSTRAINT "EducationHighlight_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "EducationDegree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceTraining" ADD CONSTRAINT "ExperienceTraining_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ExperienceSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceOrganization" ADD CONSTRAINT "ExperienceOrganization_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ExperienceSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingDomain" ADD CONSTRAINT "TeachingDomain_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "TeachingSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachingCourse" ADD CONSTRAINT "TeachingCourse_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "TeachingDomain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertStandard" ADD CONSTRAINT "CertStandard_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CertificationsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertGroup" ADD CONSTRAINT "CertGroup_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CertificationsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertItem" ADD CONSTRAINT "CertItem_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "CertGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DevelopmentProgram" ADD CONSTRAINT "DevelopmentProgram_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CertificationsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GalleryPhoto" ADD CONSTRAINT "GalleryPhoto_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "GallerySection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityItem" ADD CONSTRAINT "ActivityItem_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ActivitiesSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillGroup" ADD CONSTRAINT "SkillGroup_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SkillsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillItem" ADD CONSTRAINT "SkillItem_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "SkillGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SkillsSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResearchInterest" ADD CONSTRAINT "ResearchInterest_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ObjectiveSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactCard" ADD CONSTRAINT "ContactCard_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ContactSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
