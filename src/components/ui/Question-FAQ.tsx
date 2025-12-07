"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react";

export default function Questions_FAQ({ item, i }: { item: { question: string; answer: string }; i: number }) {
  const [isToggled, setIsToggled] = useState(false)

  function toggleAnswer() {
    setIsToggled(!isToggled)
  }

  return (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gray-900 border border-gray-800 rounded-md px-5 py-4 hover:shadow-lg hover:shadow-green-primary/20 transition-all duration-500"
    >
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleAnswer}>
        <h3 className="text-md font-semibold text-gray-300">{item.question}</h3>
        <i className={`fa-solid fa-chevron-down text-green-primary transition-all duration-500 ${isToggled ? '-rotate-180' : ''}`}></i>
      </div>

      <AnimatePresence>
        {isToggled && (
          <motion.p
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-gray-400 mt-4 overflow-hidden"
          >
            {item.answer}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}