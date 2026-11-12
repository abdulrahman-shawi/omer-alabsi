import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Teaching from "@/components/Teaching";
import Certifications from "@/components/Certifications";
import Photos from "@/components/Photos";
import Activities from "@/components/Activities";
import Skills from "@/components/Skills";
import Objective from "@/components/Objective";
import Contact from "@/components/Contact";
import { getSiteData } from "@/lib/site-data";

// المحتوى يُقرأ من قاعدة البيانات عند كل طلب
export const dynamic = "force-dynamic";

export default async function Home() {
  const site = await getSiteData();

  // إخفاء القسم فقط عندما يوجد صف في الداتابيز وvisible=false عليه
  const show = (v: boolean | undefined) => v !== false;

  return (
    <div className="min-h-screen">
      <Navbar brand={site.navbarBrand} links={site.navLinks} />
      <main>
        {show(site.hero?.visible) && <Hero data={site.hero} />}
        {show(site.about?.visible) && <About data={site.about} />}
        {show(site.education?.visible) && <Education data={site.education} />}
        {show(site.experience?.visible) && <Experience data={site.experience} />}
        {show(site.teaching?.visible) && <Teaching data={site.teaching} />}
        {show(site.certifications?.visible) && (
          <Certifications data={site.certifications} />
        )}
        {show(site.gallery?.visible) && <Photos data={site.gallery} />}
        {show(site.activities?.visible) && <Activities data={site.activities} />}
        {show(site.skills?.visible) && <Skills data={site.skills} />}
        {show(site.objective?.visible) && <Objective data={site.objective} />}
        {show(site.contact?.visible) && (
          <Contact data={site.contact} footerText={site.footerText} />
        )}
      </main>
    </div>
  );
}
