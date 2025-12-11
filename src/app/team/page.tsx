"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function team() {
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
      name: 'Von Brayn B.',
      position: 'UI/UX / Junior Front-End Developer',
      description: "Bryan leads Arvo's UI/UX and front-end direction, ensuring design excellence and seamless user experiences.",
      image: '/team/bryan.png',
    },
    {
      name: 'Nick A.',
      position: 'Lead Researcher',
      description: "Nick leads Arvo's research direction, uncovering insights that drive innovation and strategic growth.",
      image: '/team/nick.png',
    },
    {
      name: 'Matthew F.',
      position: 'Senior Back-End Developer',
      description: "Matthew builds and maintains Arvo's server-side systems, ensuring efficient, secure, and scalable performance across all applications.",
      image: '/team/matt.png',
    },
    {
      name: 'Johnry Q.',
      position: 'Full-Stack Developer',
      description: "Johnry bridges front-end experiences with back-end functionality, delivering seamless, high-performing solutions that power Arvo's digital products.",
      image: '/team/johnry.png',
    },
    {
      name: 'Chris A.',
      position: 'Shopify, Senior Front-End Developer, WordPress & CRM Specialist',
      description: "Chris ensures seamless performance across Shopify, WordPress, and CRM platforms at Arvo.",
      image: '/team/chris.png',
    },
    {
      name: 'Harlene L.',
      position: 'Cloud Developer, Senior Back-End Developer',
      description: "Harlene manages Arvo's backend systems and cloud infrastructure, ensuring secure, scalable, and reliable performance across projects.",
      image: '/team/harlene.png',
    },
    {
      name: 'Josh',
      position: 'Senior Back-End Developer',
      description: "A silent powerhouse who ensures Arvo apps stay lightning-fast, secure, and reliable behind the scenes.",
      image: '/default.png',
    },
    {
      name: 'Sam',
      position: 'Shopify, WordPress & CRM Specialist',
      description: "manages Arvo's Shopify, WordPress, and CRM development, ensuring smooth integrations and efficient, client-focused digital solutions.",
      image: '/default.png',
    },
  ]

  return (
    <section id="projects" className="relative bg-white dark:bg-black-primary overflow-hidden">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full pointer-events-none bg-gradient-to-t from-transparent via-green-primary/10 to-transparent"></div>

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
          className="text-gray-600 dark:text-gray-400 mx-auto mb-6"
        >
          At Arvo, we focus on markets where technology, innovation, and design unlock long-term value.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></motion.div>

        <div className="relative z-10 grid lg:grid-cols-2 md:grid-cols-1 gap-8 lg:px-0 lg:pt-12 pt-8 sm:p-6">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-10 p-3 rounded-lg transition-all duration-500 ease-out shadow-md bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-400/50"
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
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.position}</p>
                <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}