import AboutSection from "./components/homepage/about";

import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import AdsScreenshots from "./components/homepage/ads-screenshots";
import HeroSection from "./components/homepage/hero-section";
import FeaturedCaseStudies from "./components/homepage/featured-case-studies";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCaseStudies />
      <AboutSection />
      <Experience />
      <AdsScreenshots />
      <Skills />
      <Education />
      <Projects />
      <ContactSection />
    </div>
  );
}
