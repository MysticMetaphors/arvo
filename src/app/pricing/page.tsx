"use client"

import { motion } from "framer-motion";
import DetailedPricingComparison from "@/components/sections/DetailedPricingComparison";
import { useState } from "react";

export default function pricing() {
  const [showComparison, setShowComparison] = useState(false)

  const basic = [
    "Custom Page Design",
    "3 Main Pages",
    "Basic SEO",
    "Social Network",
  ]
  const growth = [
    "Custom Page Design",
    "7 Main Pages",
    "SEO",
    "2 Social Network",
    "Product Catalogue",
    "Newsletter",
  ]
  const advance = [
    "Custom Page Design",
    "Unlimited Pages",
    "SEO",
    "2 Social Network",
    "Product Catalogue",
    "Newsletter",
    "Role-based admin panels",
    "Workflow Automations",
  ]
  return (
    <section id="projects" className="relative bg-black-primary overflow-hidden">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

      <div className="px-6 md:px-6 pt-20 pb-8 lg:pt-30 lg:px-12 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-white"
        >
          Choose the <span className="text-green-primary">Perfect Plan</span> for Your Needs
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-400 mx-auto mb-6"
        >
          A collection of projects that reflect our passion for clean design and smart development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 gap-10 lg:pt-12 pt-8">

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-sm lg:max-w-lg text-center bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow">
            <h3 className="mb-4 text-3xl text-white font-bold">Basic</h3>
            <p className="text-gray-400 sm:text-md">Best option for personal use & for your next project.</p>
            <div className="flex flex-col text-center justify-center my-2">
              <span className="block text-md font-semibold text-gray-200">Starting at </span>
              <span className="text-4xl font-extrabold text-green-primary/80">₱69,999</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left text-white mt-6">
              {basic.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 p-0.5 bg-blue-300 rounded-full text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-auto border border-gray-800 text-white bg-gradient-to-r from-gray-900 to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get started
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-sm lg:max-w-lg text-center bg-gradient-to-b from-green-500/20 via-gray-900 to-gray-900 text-gray-900 rounded-lg border-2 border-green-400/70 shadow-xl ring-2 ring-green-500/30">
            <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Most Popular
            </span>

            <h3 className="mb-4 text-3xl text-white font-bold">Growth</h3>
            <p className="text-gray-300 sm:text-md">
              Relevant for multiple users, extended & premium support.
            </p>

            <div className="flex flex-col text-center justify-center my-2">
              <span className="block text-md font-semibold text-gray-200">Starting at </span>
              <span className="text-4xl font-extrabold text-green-primary/80">₱174,999</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left text-white mt-6">
              {growth.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 p-0.5 bg-green-300 rounded-full text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a

              href="#"
              className="mt-auto text-white bg-green-500/70 hover:bg-green-600 transition-all duration-200 focus:ring-4 focus:ring-green-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get started
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-sm lg:max-w-lg text-center bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow h-full"
          >
            <h3 className="mb-4 text-3xl text-white font-bold">Advance</h3>
            <p className="text-gray-400 sm:text-md">
              Best for large scale uses and extended redistribution rights.
            </p>
            <div className="flex flex-col text-center justify-center my-2">
              <span className="block text-md font-semibold text-gray-200">Starting at </span>
              <span className="text-4xl font-extrabold text-green-primary/80">₱599,999</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left text-white mt-6 flex-1">
              {advance.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 p-0.5 bg-blue-300 rounded-full text-black"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="mt-auto border border-gray-800 text-white bg-gradient-to-r from-gray-900 to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Get started
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full max-w-sm lg:max-w-full lg:col-span-3 flex flex-col justify-center items-center mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-green-500/30 rounded-lg shadow-lg text-center p-10 text-white">
            <h3 className="text-3xl font-bold mb-4 text-green-primary">Need a Custom Plan?</h3>
            <p className="text-gray-300 mb-6">
              Not sure which package fits your needs? Let’s build a plan that works just for you.
            </p>

            <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-4">
              <button className="cursor-pointer px-8 py-3 rounded-full bg-green-400 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
                Contact
              </button>
              <button className="cursor-pointer px-8 py-3 bg-green-primary/5 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="my-6 w-full lg:col-span-3 flex flex-col justify-center items-center mx-auto">
          <button onClick={() => setShowComparison(!showComparison)} className={`cursor-pointer px-8 py-3 w-full rounded-lg ${!showComparison ? 'border border-green-400 bg-green-400/80 hover:bg-green-400/60 text-black' : 'border border-gray-800 text-white bg-gradient-to-r from-gray-900 to-gray-700'} transition-all duration-300`}>
            {!showComparison ? 'Show' : 'Close'} Detailed Plan Comparison
          </button>
        </motion.div>

        {showComparison ?
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:col-span-3 flex flex-col justify-center items-center mx-auto">
            <DetailedPricingComparison maxWidth="1423px"/>
          </motion.div>
          : ''
        }
      </div>

    </section>
  )
}