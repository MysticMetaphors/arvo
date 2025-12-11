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
    // {
    //   title: "Project 1",
    //   description: "Powered by modern tech, built to outperform. From Laravel to React, every line of code we write is designed for speed, scalability, and seamless user experience — the way the web should be.",
    //   image: "fluxo.png",
    //   url: "https://fluxo-alpha.vercel.app/",
    //   design: false,
    //   icons: ["react", "tailwindcss", "html5"]
    // },
    // {
    //   title: "Project 2",
    //   description: "One codebase, endless possibilities. Whether it’s a store on Shopify, a blog on WordPress, or an app in Kotlin, our team makes every platform feel custom-built just for you.",
    //   image: "fluxo.png",
    //   url: "https://fluxo-alpha.vercel.app/",
    //   design: false,
    //   icons: ["react", "tailwindcss", "html5"]
    // },
  ];
  return (
    <section id="projects" className="relative bg-white dark:bg-black-primary overflow-hidden">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full  bg-gradient-to-t from-transparent via-green-primary/20 to-transparent dark:via-green-primary/10 pointer-events-none"></div>

      <div className="px-6 md:px-6 pt-20 pb-8 lg:pt-30 lg:px-12 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white"
        >
          Recent <span className="text-darkgreen-primary dark:text-green-primary">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 mx-auto mb-6"
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