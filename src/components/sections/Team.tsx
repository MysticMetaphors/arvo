"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Team() {
  const team = [
    {
      name: 'Jerry T.',
      position: 'CEO',
      description: "Jerry leads Arvo’s overall vision and strategy, driving innovation, growth, and team alignment to ensure the company’s long-term success.",
      image: '/team/jerry.png',
    },
    {
      name: 'Romel C.',
      position: 'Lead Developer',
      description: "Romel drives Arvo's coding standards and innovation, turning creative concepts into efficient, high-quality digital experiences.",
      image: '/team/romel.png',
    },
    {
      name: 'Von Bryan B.',
      position: 'UI/UX / Junior Front-End Developer',
      description: "Bryan leads Arvo's UI/UX and front-end direction, ensuring design excellence and seamless user experiences.",
      image: '/team/bryan.png',
    },
  ]
  return (
    <section id="team" className="relative overflow-hidden py-16 bg-white text-black dark:bg-black-primary dark:text-white">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full pointer-events-none bg-gradient-to-t from-transparent via-green-primary/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 lg:py-20 lg:px-6 gap-18 items-center">
        <div className="h-full z-10">
          <h2 className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white">
            Who <span className="text-darkgreen-primary dark:text-green-primary">we</span> are
          </h2>

          <p className="text-lg text-justify mb-8 text-gray-600 dark:text-gray-400">
            At Arvo, every project is powered by collaboration. Our developers work as one unified team,
            combining design thinking, code precision, and the curiosity to push boundaries.
          </p>

          <Link
            href="/team"
            className="px-8 py-3 rounded-full font-semibold transition-all duration-300 border bg-darkgreen-primary/5 text-darkgreen-primary border-darkgreen-primary hover:bg-darkgreen-primary hover:text-white dark:bg-green-primary/5 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-400 dark:hover:text-black">
            Meet the team
          </Link>
        </div>

        <div className="space-y-6 z-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="relative flex flex-col sm:flex-row items-center space-x-0 sm:space-x-10 sm:p-3 p-5 rounded-lg transition-all duration-500 ease-out shadow-md bg-gray-50 border border-gray-300 dark:bg-gray-800/[0.50] dark:border-white/10 hover:-translate-y-2 hover:shadow-lg hover:shadow-green-primary/20"
            >
              <Image
                loading='lazy'
                width={300}
                height={300}
                src={member.image}
                alt={member.name}
                className="w-full h-full sm:w-30 sm:h-30 md:w-30 md:h-30 rounded-lg object-cover mb-4 sm:mb-0"
              />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-black dark:text-white">{member.name}</h3>
                <p className="rounded-sm text-sm text-gray-600 dark:text-green-primary">{member.position}</p>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {member.description}
                </p>
              </div>

              <div className="absolute top-0 right-0 p-3 transition-opacity duration-300">
                <div className="w-2 h-2 rounded-full bg-darkgreen-primary dark:bg-green-primary shadow-[0_0_10px_rgba(34,197,94,0.5)] dark:shadow-[0_0_10px_#00FF99]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}