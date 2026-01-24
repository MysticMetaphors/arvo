"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Lock } from "lucide-react";

type ArvoCardProps = {
  title?: string;
  description?: string;
  tooltip?: string;
  tooltip_design?: "green" | "blue" | "purple" | "red";
  url?: string;
  image?: string;
  type?: "image" | "video";
  icons?: string[];
  index?: number;
  onView?: boolean;
  isGray?: boolean;
};

export default function ArvoCard({
  title = '',
  description = '',
  tooltip,
  tooltip_design = "green",
  url,
  image = '',
  type = 'image',
  icons = [],
  index = 0,
  onView,
  isGray = false
}
  : ArvoCardProps) {
  const animationProps = onView
    ? {
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
    }
    : {
      animate: { opacity: 1, y: 0 },
    };

  const getTooltipStyles = (color: string) => {
    return "border border-gray-700 bg-[#00000085] backdrop-blur-md text-darkgreen-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]";

    // switch (color) {
    //   case "blue":
    //     return "bg-blue-600 shadow-[0_0_5px_#3b82f6] text-white";
    //   case "purple":
    //     return "bg-purple-600 shadow-[0_0_5px_#a855f7] text-white";
    //   case "red":
    //     return "bg-red-600 shadow-[0_0_5px_#ef4444] text-white";
    //   case "green":
    //   default:
    //     return "bg-green-600 shadow-[0_0_5px_#00FF99] text-gray-100";
    // }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      {...animationProps}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col gap-2"
    >
      <div className="group relative border border-gray-700 rounded-lg bg-black-primary overflow-hidden transform transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-lg hover:shadow-green-primary/20 group-hover:opacity-70">

        {tooltip && (
          <span className={`absolute -top-1 -right-1 z-30 px-4 py-2 rounded-bl-md text-xs font-bold uppercase tracking-wide ${getTooltipStyles(tooltip_design)}`}>
            {tooltip}
          </span>
        )}

        {/* Image/Video Container with Backdrop Effect */}
        <div className="relative w-full h-[312px] bg-black overflow-hidden">

          {/* 1. Blurred Background Layer (The Fill) */}
          {type === 'video' ? (
            <video
              src={`/${image}`}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50 transition-all duration-300 ${isGray ? "grayscale group-hover:grayscale-0" : ""}`}
            />
          ) : (
            <Image
              src={`/${image}`}
              alt={`${title} background`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover blur-2xl scale-110 opacity-50 transition-all duration-300 ${isGray ? "grayscale group-hover:grayscale-0" : ""}`}
            />
          )}

          {/* 2. Main Centered Image/Video Layer (The Content) */}
          {type === 'video' ? (
            <video
              src={`/${image}`}
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-contain z-10 transition-all duration-300 ${isGray ? "grayscale group-hover:grayscale-0" : ""}`}
            />
          ) : (
            <Image
              src={`/${image}`}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-contain z-10 transition-all duration-300 ${isGray ? "grayscale group-hover:grayscale-0" : ""}`}
            />
          )}
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center align-center bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="p-10 py-2 w-full flex justify-center items-center">
            <div className="space-y-4 w-full flex flex-col items-start">
              <h1 className="font-bold font-ethnocentric text-lg text-gray-300 text-left">{title}</h1>

              <p className="text-gray-400 text-sm sm:text-base hidden sm:block text-left leading-snug">
                {(() => {
                  // Check for any parser syntax
                  const tagIndex = description.search(/\[(?:BUTTON|COLOR|LINK):/);
                  let textToShow = description;
                  let wasTruncated = false;

                  if (tagIndex !== -1) {
                    textToShow = description.substring(0, tagIndex);
                    wasTruncated = true;
                  }

                  textToShow = textToShow.trim();

                  const maxLength = 180;
                  if (textToShow.length > maxLength) {
                    textToShow = textToShow.substring(0, maxLength);
                    wasTruncated = true;
                  }

                  return textToShow;
                })()}
              </p>

              <div className="flex justify-between items-center w-full">
                <div className="md:flex gap-4 hidden">
                  {icons ?
                    icons.map((icon, i) => (
                      <Image key={i} width={800} height={800} alt={icon} src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`} className="lg:w-8 md:w-6 " />
                    ))
                    : ''}
                </div>

                {url ? (
                  <a href={url} target="_blank" className="px-6 py-1 bg-green-primary/5 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300">
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
          <a href={url} target="_blank" className="block sm:hidden absolute bottom-3 right-3 z-30 px-6 py-1 font-bold shadow-[0_0_5px_#00FF99] bg-green-primary rounded-lg border border-green-400 text-green-900 hover:bg-green-400 hover:text-black transition-all duration-300">
            Visit
          </a>
        ) : (
          <div className="block sm:hidden absolute bottom-3 right-3 z-30 px-4 py-1 font-bold bg-zinc-800 rounded-lg border border-zinc-600 text-zinc-400">
            <Lock size={16} />
          </div>
        )}
      </div>
    </motion.div>
  );
}