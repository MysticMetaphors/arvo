"use client"

import Link from "next/link";
import ArvoCard from "../ui/arvo/ArvoCard";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components.",
      image: "fluxo.png",
    },
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components.",
      image: "fluxo.png",
    },
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components.",
      image: "fluxo.png",
    },
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components.",
      image: "fluxo.png",
    },
  ];

  return (
    <>
      <section id="projects" className="relative bg-black-primary overflow-hidden">
        <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

        <div className="mx-auto px-6 md:px-6 py-20 lg:py-30 z-10">
          <div className="text-center items-center flex flex-col">
            {/* Section Header */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mb-4 text-4xl leading-tight font-extrabold text-white"
            >
              Our <span className="text-green-primary">Work</span> Speaks for Itself
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-gray-400 max-w-2xl mx-auto mb-12"
            >
              A collection of projects that reflect our passion for clean design and smart development.
            </motion.p>
          </div>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 lg:p-12 md:p-2 sm:p-6">
            {projects.map((project, i) => (
              <ArvoCard 
              type="design" 
              onView={true} 
              key={i} 
              index={i} 
              {...project} 
              icons={["react", "tailwindcss", "html5"]} />
            ))}
          </div>
          <div className="flex w-full justify-center mt-10">
            <Link href="/projects" className="cursor-pointer px-6 py-2 rounded-full bg-green-400 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
              View More
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}