"use client";

import { motion } from "framer-motion";
import DetailedPricingComparison from "./DetailedPricingComparison";
import { useState } from "react";
import Link from "next/link";

export default function Pricing() {
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
    <>
      <section id="pricing" className="bg-black-primary">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl leading-tight font-extrabold text-white">Choose the <span className="text-green-primary">Perfect Plan</span> for Your Needs</h2>
            <p className="mb-5 text-gray-400 sm:text-md">Choose a plan that fits your needs — from getting started to full-scale growth.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 gap-10">

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
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

              <Link
                href="/contact"
                className="mt-auto border border-gray-800 text-white bg-gradient-to-r from-gray-900 to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
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

              <Link
                href="/contact"
                className="mt-auto text-white bg-green-500/70 hover:bg-green-600 transition-all duration-200 focus:ring-4 focus:ring-green-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-sm lg:max-w-lg text-center bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow h-full"
            >
              <h3 className="mb-4 text-3xl text-white font-bold">Advance</h3>
              <p className="text-gray-400 sm:text-md">
                Best for large scale uses and Full custom web solution.
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

              <Link
                href="/contact"
                className="mt-auto border border-gray-800 text-white bg-gradient-to-r from-gray-900 to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                <Link href="/contact" className="cursor-pointer px-8 py-3 rounded-full bg-green-400 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
                  Contact
                </Link>
                <Link href="/learnmore" className="cursor-pointer px-8 py-3 bg-green-primary/5 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300">
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="my-6 items-center mx-auto max-w-sm sm:max-w-full">
            <button onClick={() => setShowComparison(!showComparison)} className={`cursor-pointer px-8 py-3 w-full rounded-lg ${!showComparison ? 'border border-green-400 bg-green-400/80 hover:bg-green-400/60 text-black' : 'border border-gray-800 text-white bg-gradient-to-r from-gray-900 to-gray-700'} transition-all duration-300`}>
              {!showComparison ? 'Show' : 'Close'} Detailed Plan Comparison
            </button>
          </motion.div>

          {showComparison ?
            <motion.div
              initial={{ opacity: 0}}
              whileInView={{ opacity: 1}}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="w-full lg:col-span-3 flex flex-col justify-center items-center mx-auto">
              <DetailedPricingComparison />
            </motion.div>
            : ''
          }
        </div>
      </section>
    </>
  )
}