"use client"

import { motion } from "framer-motion";
import ArvoCard from "@/components/ui/arvo/ArvoCard";

export default function projects() {
  const projects = [
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components.",
      image: "fluxo.png",
      url: "https://fluxo-alpha.vercel.app/",
      design: true,
      icons: ["react", "tailwindcss", "html5"]
    },
  ];
  return (
    <section id="projects" className="relative bg-black-primary overflow-hidden">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

      <div className="px-6 md:px-6 pt-20 pb-8 lg:pt-30 lg:px-12 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-white"
        >
          Our <span className="text-green-primary">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-400 mx-auto mb-6"
        >
          A collection of projects that reflect our passion for clean design and smart development.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }} 
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></motion.div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 lg:pt-12 pt-8 lg:px-0 sm:p-6">
          {projects.map((project, i) => (
            <ArvoCard onView={false} key={i} index={i} {...project} />
          ))}
        </div>
      </div>

    </section>
  )
}