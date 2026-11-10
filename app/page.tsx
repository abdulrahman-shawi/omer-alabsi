import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Teaching from "@/components/Teaching";
import Certifications from "@/components/Certifications";
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
        <Skills />
        <Objective />
        <Contact />
      </main>
    </div>
  );
}
