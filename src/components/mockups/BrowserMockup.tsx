"use client"

import { motion } from "framer-motion";

export default function BrowserMockup() {
  return (
    <div className="absolute -bottom-5 left-8 w-full h-[120%] bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-lg border border-gray-200 dark:border-white/10 shadow-2xl transform group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] transition-all duration-500 overflow-hidden">

      <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-white/10 shadow-2xl dark:shadow-black h-[130%]">
        {/* Browser Header */}
        <div className="h-8 border-b border-gray-200 dark:border-white/5 flex items-center gap-2 px-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 dark:bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 dark:bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 dark:bg-green-500/50" />
        </div>

        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            <div className="w-1/2 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse duration-100" />
            <div className="w-4 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse duration-300" />
            <div className="w-4 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse duration-100" />
            <div className="w-4 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse duration-200" />
            <div className="w-1/4 h-4 bg-gray-200 dark:bg-white/10 rounded animate-pulse duration-300" />
          </div>
          <div className="w-full h-24 bg-gray-200 dark:bg-white/10 rounded animate-pulse duration-100" />
          <div className="flex gap-2">
            <div className="w-1/3 h-20 bg-gray-200 dark:bg-white/5 rounded animate-pulse duration-100" />
            <div className="w-2/3 h-20 bg-gray-200 dark:bg-white/5 rounded animate-pulse duration-100" />
          </div>
        </div>
      </div>

      {/* --- ANIMATED CURSOR --- */}
      <motion.div
        className="absolute top-1/2 left-1/2 pointer-events-none z-50"
        animate={{
          x: [0, -100, -60, 120, 0],    // Move Left -> Header -> Right -> Center
          y: [0, -40, 40, 0],    // Move Up -> Stay (Click) -> Down -> Center
          scale: [1, 1, 0.8, 1, 1],   // Scale down (Click) at index 2
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.4, 0.7, 1] // Timing of the movement
        }}
      >
        {/* Cursor SVG */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black dark:text-white drop-shadow-md"
        >
          <path
            d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
            fill="currentColor" // Adapts to text-black/white
            stroke="#00FF99"    // Green stroke for brand visibility
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Optional: Click Ripple Effect */}
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 1.2, repeatDelay: 3.5 }}
          className="absolute -top-2 -left-2 w-10 h-10 rounded-full border-2 border-[#00FF99] opacity-0"
        />
      </motion.div>

    </div>
  )
}