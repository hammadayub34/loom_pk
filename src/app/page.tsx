import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Idea from "@/components/Idea";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Idea />
        <Services />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
