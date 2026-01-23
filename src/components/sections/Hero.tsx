"use client";

import { motion } from "framer-motion";
import AuroraBackground from "../ui/background/AuroraBackground";

export default function HomePage() {

  return (
    <section className="relative flex flex-col inset-shadow- items-center justify-center min-h-screen text-center overflow-hidden px-6 bg-white dark:bg-black-primary">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,white_100%)] dark:bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,#0a0a0a_100%)]"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'none\\' stroke=\\'%2300FF99\\' stroke-width=\\'0.5\\'/></svg>')] dark:opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-shadow-lg text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-gray-800 dark:text-white">
          Let’s <span className="text-darkgreen-primary dark:text-green-primary">Build Something Smart</span> Together
        </h1>

        <p className="mt-6 text-gray-700 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          We help businesses grow with our proven solutions, developed for reliability, security, and full customization.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="px-8 py-3 rounded-full border transition-all duration-300 bg-darkgreen-primary/5 text-darkgreen-primary border-darkgreen-primary hover:bg-darkgreen-primary hover:text-white dark:bg-green-primary/5 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-400 dark:hover:text-black" >
            Let’s Talk
          </a>

          <a href="#projects" className="px-8 py-3 rounded-full border transition-all duration-300 bg-gray-primary/5 text-black-primary border-black-primary hover:bg-gray-400 dark:hover:bg-gray-800 hover:text-black dark:bg-gray-primary/5 dark:hover:border-white dark:text-gray-400 dark:border-gray-400 dark:hover:text-white">
            Our Work
          </a>
        </div>
      </motion.div>

      <AuroraBackground />

      <div className="absolute bottom-0 left-0 z-40 w-full h-14 bg-linear-to-t from-white to-transparent dark:from-black-primary dark:to-transparent"></div>
    </section>

  );
}
