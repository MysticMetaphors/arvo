"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Lock } from "lucide-react";

type ArvoCardProps = {
  title?: string;
  description?: string;
  design?: string;
  url?: string;
  image?: string;
  icons?: string[];
  index?: number;
  onView?: boolean;
};

export default function ArvoCard({
  title = '',
  description = '',
  design,
  url,
  image = '',
  icons = [],
  index = 0,
  onView }
  : ArvoCardProps) {
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
              hover:shadow-green-primary/20 group-hover:opacity-70"
    >
      {design && (
        <span className="absolute top-3 right-3 z-10 shadow-[0_0_5px_#00FF99] px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-100 bg-green-600 rounded-md">
          {design}
        </span>
      )}

      <Image
        src={`/${image}`}
        alt={title}
        width={800}
        height={312}
        className="w-full min-h-[312px] max-h-[312px] object-cover rounded-lg transition-opacity duration-300 "
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-center align-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="p-10 py-2 w-full flex justify-center items-center">
          <div className="space-y-4">
            <h3 className="text-white lg:text-xl mb:text-md font-semibold tracking-tight">{title}</h3>
            <p className="text-gray-400 lg:text-lg md:text-md hidden sm:block">{description}</p>
            <div className="flex justify-between items-center">
              <div className="md:flex gap-4 hidden">
                {icons ?
                  icons.map((icon, i) => (
                    <Image key={i} width={800} height={800} alt={icon} src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`} className="lg:w-8 md:w-6 " />
                  ))
                  : ''}
              </div>
              
              {url ? (
                <a href={url} className="px-6 py-1 bg-green-primary/5 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300">
                  Visit
                </a>
              ) : (
                <span className="flex items-center gap-2 px-4 py-1 bg-zinc-800/80 rounded-lg border border-zinc-600 text-zinc-400 cursor-not-allowed">
                  <Lock size={14} /> Private
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {url ? (
        <a href={url} className="block sm:hidden absolute bottom-3 right-3 px-6 py-1 font-bold shadow-[0_0_5px_#00FF99] bg-green-primary rounded-lg border border-green-400 text-green-900 hover:bg-green-400 hover:text-black transition-all duration-300">
          Visit
        </a>
      ) : (
        <div className="block sm:hidden absolute bottom-3 right-3 px-4 py-1 font-bold bg-zinc-800 rounded-lg border border-zinc-600 text-zinc-400">
          <Lock size={16} />
        </div>
      )}
    </motion.div>
  );
}