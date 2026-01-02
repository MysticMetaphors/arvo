"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import teamData from "./team.json";
import { TeamMember } from "@/types";

// =========================================================================  
// HOW TO ADD A NEW TEAM MEMBER
// =========================================================================  
// 1. Open src/app/team/team.json
// 2. Add a new object to the array using the template below.
//
// TEMPLATE:
// {
//   "name": "Full Name",
//   "position": "Position/Role",
//   "description": "Brief description.",
//   "image": "team/folder/img.png"
// }
// =========================================================================

const teamMembers = teamData as unknown as TeamMember[];

export default function team() {

  return (
    <section id="projects" className="relative bg-white dark:bg-black-primary overflow-hidden">
      {/* <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full pointer-events-none bg-gradient-to-t from-transparent via-green-primary/10 to-transparent"></div> */}

      <div className="px-6 md:px-6 pt-20 pb-8 lg:pt-30 lg:px-12 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white"
        >
          Our <span className="text-darkgreen-primary dark:text-green-primary">Team</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 max-w-lg mb-6"
        >
          At Arvo, we focus on markets where technology, innovation, and design unlock long-term value.
        </motion.p>

        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative flex flex-col h-full"
            >
              {/* Card Container */}
              <div className="relative flex flex-col h-full p-6 rounded-lg border backdrop-blur-sm transition-all duration-300 ease-out bg-gray-100 dark:bg-gray-800/[0.50] border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:group-hover:bg-gray-800/[0.70] group-hover:border-darkgreen-primary/40 dark:group-hover:border-green-primary/40">
                <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="mb-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium tracking-wider mt-1 mb-3 opacity-90 text-gray-900 dark:text-green-primary">
                      {member.position}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed font-normal
                    text-gray-600 dark:text-gray-400">
                    {member.description}
                  </p>
                </div>

                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 rounded-full bg-darkgreen-primary dark:bg-green-primary shadow-[0_0_10px_rgba(34,197,94,0.5)] dark:shadow-[0_0_10px_#00FF99]"/>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}