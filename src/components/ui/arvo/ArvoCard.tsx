"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type ArvoCardProps = {
  type?: string;
  title?: string;
  description?: string;
  image?: string;
  icons?: string[];
  index?: number;
  onView?: boolean;
};

export default function ArvoCard({ type = '', title = '', description = '', image = '', icons = [], index = 0, onView }: ArvoCardProps) {
  const animationProps = onView
    ? {
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
    }
    : {
      animate: { opacity: 1, y: 0 },
    };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      {...animationProps}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative border border-gray-700 rounded-lg bg-black-primary overflow-hidden 
             transform transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-lg 
             hover:shadow-green-primary/20"
    >
      {type == "design" ?
        <span className="absolute top-3 right-3 z-10 shadow-[0_0_5px_#00FF99] px-3 py-1 text-sm font-medium text-gray-100 bg-green-600 rounded-md">
          Design
        </span> : ''
      }

      <Image
        src={`/${image}`}
        alt={title}
        width={800}
        height={800}
        className="w-full object-cover rounded-lg transition-opacity duration-300 group-hover:opacity-70"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center align-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-10 py-2 w-full flex justify-center items-center">
          <div>
            <h3 className="text-white lg:text-xl mb:text-md font-semibold tracking-tight mb-2">{title}</h3>
            <p className="text-gray-400 lg:text-lg md:text-md mb-2 hidden sm:block">{description}</p>
            <div className="flex justify-between lg:mt-4">
              <div className="lg:flex gap-4 hidden">
                {icons ?
                  icons.map((icon, i) => (
                    <Image key={i} width={800} height={800} alt={icon} src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`} className="lg:w-8 md:w-6 " />
                  ))
                  : ''}

              </div>
              <a href="#" className="px-6 py-1 bg-green-primary/5 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300">
                Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
