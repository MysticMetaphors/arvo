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
      url: "https://fluxo-alpha.vercel.app/",
      design: true,
      icons: ["react", "tailwindcss", "html5"]
    },
  ];

  return (
    <section id="projects" className="relative overflow-hidden bg-white text-black dark:bg-black-primary dark:text-white">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full  bg-gradient-to-t from-transparent via-green-primary/20 to-transparent dark:via-green-primary/10 pointer-events-none"></div>

      <div className="mx-auto px-6 md:px-6 py-20 lg:py-30 z-10">
        <div className="text-center items-center flex flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white"
          >
            Our <span className="text-darkgreen-primary dark:text-green-primary">Work</span> Speaks for Itself
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className=" max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-400"
          >
            A collection of projects that reflect our passion for clean design and smart development.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 lg:p-12 md:p-2 sm:p-6">
          {projects.map((project, i) => (
            <ArvoCard onView={true} key={i} index={i} {...project} />
          ))}
        </div>

        <div className="flex w-full justify-center mt-10">
          <Link href="/projects" className="cursor-pointer px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-darkgreen-primary text-white hover:shadow-[0_0_40px_#00FF99] dark:bg-green-primary dark:text-black dark:hover:shadow-[0_0_40px_#00FF99]">
            View More
          </Link>
        </div>
      </div>
    </section>
  )
}