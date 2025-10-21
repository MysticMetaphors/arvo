"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TechStack() {
  const stacks = [
    { name: "Laravel", icon: "devicon-laravel-plain colored" },
    { name: "CodeIgniter", icon: "devicon-codeigniter-plain colored" },
    { name: "React.js", icon: "devicon-react-original colored" },
    { name: "Vue.js", icon: "devicon-vuejs-plain colored" },
    { name: "Tailwind", icon: "devicon-tailwindcss-plain colored" },
    { name: "WordPress", icon: "devicon-wordpress-plain" },
    { name: "Kotlin", icon: "devicon-kotlin-plain colored" },
    { name: "Java", icon: "devicon-java-plain colored" },
  ];


  return (
    <section className="py-20 bg-black-primary text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-white"
        >
          Our <span className="text-green-primary">Tech Stack</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto mb-12"
        >
          We leverage modern, reliable technologies to deliver powerful, scalable, and maintainable digital solutions.
        </motion.p>

        {/* Tech Icons Grid */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center max-w-4xl w-full">
            {stacks.map((stack, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-xl 
                         p-6 w-32 h-32 hover:-translate-y-2 transition-all duration-500 hover:shadow-lg hover:shadow-green-primary/20"
              >
                <i className={`${stack.icon} text-5xl mb-3`} />
                <span className="text-gray-300 text-sm font-medium">{stack.name}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stacks.length * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-xl 
                         p-6 w-32 h-32 hover:-translate-y-2 transition-all duration-500 hover:shadow-lg hover:shadow-green-primary/20"
            >
              <Image alt="python" width={800} height={800} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" className="w-14 mb-3" />
              <span className="text-gray-300 text-sm font-medium">Python</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (stacks.length + 1) * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-xl 
                         p-6 w-32 h-32 hover:-translate-y-2 transition-all duration-500 hover:shadow-lg hover:shadow-green-primary/20"
            >
              <Image alt="wix" width={800} height={800} src="/Wix.png" className="w-14 mb-3" />
              <span className="text-gray-300 text-sm font-medium">Wix</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (stacks.length + 2) * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-xl 
                         p-6 w-32 h-32 hover:-translate-y-2 transition-all duration-500 hover:shadow-lg hover:shadow-green-primary/20"
            >
              <Image alt="shopify" width={800} height={800} src="/Shopify.png" className="w-14 mb-3" />
              <span className="text-gray-300 text-sm font-medium">Shopify</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (stacks.length + 3) * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center bg-gray-900 border border-gray-800 rounded-xl 
                         p-6 w-32 h-32 hover:-translate-y-2 transition-all duration-500 hover:shadow-lg hover:shadow-green-primary/20"
            >
              <Image alt="next" width={800} height={800} src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" className="w-14 mb-3" />
              <span className="text-gray-300 text-sm font-medium">Next.js</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
