"use client";

import { motion } from "framer-motion";

type ToastProps = {
  theme?: string,
  text?: string
}

export default function Toast({ theme, text }: ToastProps) {
  return (
  <motion.div
    initial={{ opacity: 0, x: -20 }}          
    animate={{ opacity: 1, x: 0 }}            
    transition={{ duration: 0.5, ease: "easeOut" }} 
    exit={{ opacity: 0, x: 50 }}              
  >
    <motion.div
      initial={{ opacity: 1, x: -40 }}
      animate={{ opacity: 0, x: 0}}
      transition={{ delay: 4, duration: 1, ease: "easeOut" }} // fade out at 4s
      className="max-w-md border text-sm rounded-lg bg-gray-900 border-white/20 text-white"
      role="alert"
    >
      <div id="hs-toast-soft-color-dark-label" className="flex p-4">
        <div className="shrink-0 mr-4">
          {theme === "error" ? (
            <i className="fa-solid text-lg fa-circle-xmark text-red-400"></i>
          ) : (
            <i className="fa-solid text-lg fa-circle-check text-green-500"></i>
          )}
        </div>
        <p className="mr-3">{text ? text : "Message Sent."}</p>
      </div>
    </motion.div>
  </motion.div>

  )
}