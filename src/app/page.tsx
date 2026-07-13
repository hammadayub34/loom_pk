import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Idea from "@/components/Idea";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
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
        {/* proof before price: the roster lands between what we do and what it costs */}
        <Clients />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
