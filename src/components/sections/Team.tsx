"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Team() {
  return (
    <section className="relative bg-black-primary text-white py-16">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 lg:py-20 lg:px-6 gap-18 items-center">
        {/* Left content */}
        <div className="h-full z-10">
          <div>
            <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white">Who <span className="text-green-primary">we</span> are.</h2>
            <p className="text-gray-400 text-lg text-justify mb-6">
              At Arvo, we focus on markets where technology, innovation, and design
              unlock long-term value. Working here means you’ll collaborate with talented professionals,
              solve challenging problems, and grow together. Along the way, you may
              also make lifelong friends and enjoy opportunities that inspire growth.
            </p>
            <button className="px-8 py-3 rounded-full bg-green-400 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
              See Team
            </button>
          </div>
        </div>
        <div className="space-y-6 z-10">
          {Array.from({ length: 3 }, (_, i) =>
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}      
              whileInView={{ opacity: 1, x: 0 }}    
              transition={{
                duration: 0.6,
                delay: i * 0.2,                     
                ease: "easeOut",
              }}
              viewport={{ once: true }}             
              className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-10 bg-gray-800 rounded-lg p-3 border border-gray-700"
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