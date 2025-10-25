import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import MissionVision from "@/components/sections/MissionVision";
import Pricing from "@/components/sections/Pricing";
import Projects from "@/components/sections/Projects";

import Team from "@/components/sections/Team";
import TechStack from "@/components/sections/TechStack";
import WhatWeDo from "@/components/sections/WhatWeDo";

export default function Home() {
  return (
    <div>
      <Hero />
      <WhatWeDo />
      <Projects />
      <Pricing />
      <TechStack />
      <Team />
      <MissionVision />
      <Contact onView={true}/>
    </div>
  );
}
