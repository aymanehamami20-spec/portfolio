import Hero from "@/components/hero/Hero";
import Work from "@/components/sections/Work";
import MoreWork from "@/components/sections/MoreWork";
import Results from "@/components/sections/Results";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Clients from "@/components/sections/Clients";
import Tools from "@/components/sections/Tools";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <MoreWork />
      <Results />
      <Services />
      <About />
      <Clients />
      <Tools />
      <Contact />
    </>
  );
}
