"use client"

import { motion } from "framer-motion";

export default function ChartMockup() {
  return (
    <div className="absolute bottom-6 left-8 flex items-end gap-2 h-28 w-full overflow-hidden">
      <motion.div
        animate={{ height: ["40%", "60%", "40%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="w-8 bg-gray-200 dark:bg-white/10 rounded-t"
      />
      <motion.div
        animate={{ height: ["70%", "95%", "70%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="w-8 bg-[#00FF99] dark:bg-[#00FF99]/70 rounded-t shadow-[0_0_15px_rgba(0,255,153,0.4)]"
      />
      <motion.div
        animate={{ height: ["50%", "30%", "50%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        className="w-8 bg-gray-200 dark:bg-white/10 rounded-t"
      />
      <motion.div
        animate={{ height: ["40%", "70%", "40%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        className="w-8 bg-gray-200 dark:bg-white/10 rounded-t"
      />
      <motion.div
        animate={{ height: ["50%", "20%", "50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="w-8 bg-gray-200 dark:bg-white/10 rounded-t"
      />
      <motion.div
        animate={{ height: ["40%", "65%", "40%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-8 bg-gray-200 dark:bg-white/10 rounded-t"
      />
      <motion.div
        animate={{ height: ["80%", "50%", "80%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="w-8 bg-[#00FF99] dark:bg-[#00FF99]/70 rounded-t shadow-[0_0_15px_rgba(0,255,153,0.4)]"
      />
      <motion.div
        animate={{ height: ["70%", "90%", "70%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        className="w-8 bg-[#00FF99] dark:bg-[#00FF99]/70 rounded-t shadow-[0_0_15px_rgba(0,255,153,0.4)]"
      />
      <motion.div
        animate={{ height: ["50%", "75%", "50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="w-8 bg-gray-200 dark:bg-white/10 rounded-t"
      />
      <motion.div
        animate={{ height: ["40%", "65%", "40%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-8 bg-gray-200 dark:bg-white/10 rounded-t"
      />
      <motion.div
        animate={{ height: ["80%", "50%", "80%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="w-8 bg-[#00FF99] dark:bg-[#00FF99]/70 rounded-t shadow-[0_0_15px_rgba(0,255,153,0.4)]"
      />
      <motion.div
        animate={{ height: ["70%", "90%", "70%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        className="w-8 bg-[#00FF99] dark:bg-[#00FF99]/70 rounded-t shadow-[0_0_15px_rgba(0,255,153,0.4)]"
      />
      <motion.div
        animate={{ height: ["50%", "75%", "50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="w-8 bg-gray-200 dark:bg-white/10 rounded-t"
      />

    </div>
  );
}