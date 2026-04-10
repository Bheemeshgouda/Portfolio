
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import About from "./About";
import Projects from "./Projects";
import Services from "./Services";
import Contact from "./Contact";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    const shouldScrollToAbout = sessionStorage.getItem("scrollToAbout");
    if (shouldScrollToAbout === "true") {
      sessionStorage.removeItem("scrollToAbout");
      setTimeout(() => {
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }

    const sectionToScroll = sessionStorage.getItem("scrollToSection");
    if (sectionToScroll) {
      sessionStorage.removeItem("scrollToSection");
      setTimeout(() => {
        const section = document.getElementById(sectionToScroll);
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Hero />
      <About />
     
      <Services />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;