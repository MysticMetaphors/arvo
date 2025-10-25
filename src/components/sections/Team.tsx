"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Team() {
  const team = [
    {
      name: 'Chris A.',
      position: 'Shopify, Senior Front-End Developer, WordPress & CRM Specialist',
      description: "Chris ensures seamless performance across Shopify, WordPress, and CRM platforms at Arvo.",
      image: '/default.png',
    },
    {
      name: 'Nick A.',
      position: 'Lead Researcher',
      description: "Nick oversees Arvo’s development efforts, ensuring quality, efficiency, and innovation across the team.",
      image: '/default.png',
    },
    {
      name: 'Von Bryan B.',
      position: 'UI/UX / Junior Front-End Developer',
      description: "Bryan leads Arvo’s UI/UX and front-end direction, ensuring design excellence and seamless user experiences.",
      image: '/team/bryan.png',
    },
  ]
  return (
    <section id="team" className="relative bg-black-primary text-white py-16">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 lg:py-20 lg:px-6 gap-18 items-center">
        {/* Left content */}
        <div className="h-full z-10">
          <div>
            <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white">
              Who <span className="text-green-primary">we</span> are
            </h2>
            <p className="text-gray-400 text-lg text-justify mb-8">
              At Arvo, every project is powered by collaboration. Our developers work as one unified team, combining design thinking, code precision, and the curiosity to push boundaries.
            </p>
            <Link href="/team" className="px-8 py-3 rounded-full bg-green-400 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
              Meet the team
            </Link>
          </div>
        </div>
        <div className="space-y-6 z-10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                loading="lazy"
                width={800} height={800}
                src={member.image}
                alt="Team member"
                className="w-full h-full sm:w-30 sm:h-30 md:w-30 md:h-30 rounded-lg object-cover mb-4 sm:mb-0"
              />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.position}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {member.description}
                </p>

                {/* <div className="flex space-x-4 mt-3 text-gray-400">
                  {member.socials.map((social, i) => (
                    <a href={social.url} key={i} className="hover:text-green-400 text-green-primary/70">
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}