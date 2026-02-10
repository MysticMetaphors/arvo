"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TechStack() {
  const stacks = [
    { name: "Laravel", src: "/techstack/laravel-original.svg" },
    { name: "CodeIgniter", src: "/techstack/codeigniter-plain.svg" },
    { name: "React.js", src: "/techstack/react-original.svg" },
    { name: "Vue.js", src: "/techstack/vuejs-original.svg" },
    { name: "Next.js", src: "/techstack/nextjs-original.svg" },
    { name: "Tailwind", src: "/techstack/tailwindcss-original.svg" },
    { name: "WordPress", src: "/techstack/wordpress-plain.svg" },
    { name: "Kotlin", src: "/techstack/kotlin-original.svg" },
    { name: "Java", src: "/techstack/java-plain.svg" },
    { name: "Python", src: "/techstack/python-original.svg" },
    { name: "Wix", src: "/techstack/Wix.png" },
    { name: "Shopify", src: "/techstack/Shopify.png" },
  ];

  // =========================================================================
  // HOW TO ADD TECH STACK
  // =========================================================================
  // 1. Find the icon class name from Devicon (https://devicon.dev/)
  // 2. Add a new object to the 'stacks' array with 'name' and 'icon' properties
  //    Example: { name: "Technology Name", icon: "devicon-icon-name colored" }
  // 3. Save the file and the new tech stack will appear in the grid
  //
  // TEMPLATE:
  // { name: "Technology Name", icon: "devicon-icon-name colored" },
  // =========================================================================


  return (
    <section id="techStack" className="py-20 bg-white text-black dark:bg-black-primary dark:text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white"
        >
          Our <span className="text-darkgreen-primary dark:text-green-primary">Tech Stack</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-400"
        >
          We leverage modern, reliable technologies to deliver powerful, scalable, and maintainable digital solutions.
        </motion.p>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center max-w-4xl w-full">

            {stacks.map((stack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="flex flex-col hover:border-green-primary items-center justify-center shadow-md p-6 w-32 h-32 rounded-xl transition-all duration-500 bg-gray-50 border border-gray-200 text-black dark:bg-gray-800/[0.50] dark:border-white/10 dark:text-gray-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-lg"
              >
                <Image
                  alt={stack.name}
                  width={400}
                  height={400}
                  src={stack.src}
                  quality={75}
                  className={`w-13 mb-3 ${stack.name === "WordPress" ? "invert-100 brightness-0" : ""}`} // if wordpress turn the logo white
                />
                <span className="text-sm font-medium">{stack.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
