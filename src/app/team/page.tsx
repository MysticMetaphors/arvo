"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function team() {
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
          Our <span className="text-green-primary">Team</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-400 mx-auto mb-6"
        >
          At Arvo, we focus on markets where technology, innovation, and design
          unlock long-term value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></motion.div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-8 lg:px-0 lg:pt-12 pt-8 sm:p-6">
          {Array.from({ length: 12 }, (_, i) =>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.10,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-10 bg-gray-800 rounded-lg p-3 border border-gray-700 
                                  transition-all duration-500 ease-out hover:-translate-y-2
                                  hover:shadow-lg hover:shadow-green-primary/20"
            >
              <Image
                width={800} height={800}
                src="/MY_IMG.jpg"
                alt="Team member"
                className="w-full h-full sm:w-30 sm:h-30 rounded-lg object-cover mb-4 sm:mb-0"
              />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Von Bryan Bañal</h3>
                <p className="text-gray-400 text-sm">UI/UX / Front-End Developer</p>
                <p className="text-gray-400 text-sm mt-1">
                  Bryan drives the creative and technical direction of Arvo.
                </p>

                <div className="flex space-x-4 mt-3 text-gray-400">
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fas fa-globe"></i>
                  </a>
                  <a href="#" className="hover:text-green-400 text-green-primary/70">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </section>
  )
}