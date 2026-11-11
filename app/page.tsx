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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <Teaching />
        <Certifications />
        <Photos />
        <Activities />
        <Skills />
        <Objective />
        <Contact />
      </main>
    </div>
  );
}
