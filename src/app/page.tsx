import dynamic from "next/dynamic";

import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Projects from "@/components/sections/Projects";
const TechStack = dynamic(() => import("@/components/sections/TechStack"), { ssr: true });
const Team = dynamic(() => import("@/components/sections/Team"), { ssr: true });
const MissionVision = dynamic(() => import("@/components/sections/MissionVision"), { ssr: true });
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
