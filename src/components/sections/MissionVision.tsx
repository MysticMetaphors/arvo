"use client";
import React, { Suspense } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background/background-ripple-effect";
import Phone from "../ui/mockup/Phone";
import { motion } from "framer-motion";

export default function MissionVision() {
  return (
    <section className="relative bg-black-primary overflow-hidden">
      {/* <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-2xl bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div> */}
      <div className="mx-auto px-6 md:px-20 py-10 z-10">
        <div className="text-center grid grid-cols-1 sm:grid grid-cols-2 gap-8 mb-8 2xl:mb-16">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative overflow-hidden w-2xl bg-gray-900 border border-gray-700 p-10 rounded-lg">
            <BackgroundRippleEffect />
            <h2 className="text-xl text-green-400 mb-4 font-bold">Mission</h2>
            <p className="text-lg text-justify">To deliver reliable, project-based web solutions that empower
              businesses to launch, grow, and adapt faster in today’s digital-first economy
            </p>
            <div className="flex relative items-center p-8 px-16">
              <div className="absolute z-1 top-30 h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></div>
              <div className="absolute top-20 z-10 -right-0 shadow-[0_0_20px_#00FF99] rounded-3xl">
                <Suspense fallback={''}>
                  <Phone>
                  <header className="h-14 bg-gray-900 border-b border-gray-700 flex items-center justify-between px-4">
                    <h1 className="text-white font-semibold text-sm">Deployments</h1>
                    <div className="flex items-center gap-2">
                      <input disabled type="text" placeholder="Search..." className="bg-gray-800 text-xs px-2 py-1 rounded-lg text-slate-300 focus:outline-none w-24" />
                      <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                    </div>
                  </header>

                  <nav className="bg-gray-900 border-b border-gray-700 p-2 flex justify-between">
                    <div className="flex flex-col items-center text-slate-300 text-xs">
                      <i className="fa-solid text-green-primary fa-layer-group"></i>
                      Overview
                    </div>
                    <div className="flex flex-col items-center text-slate-300 text-xs">
                      <i className="fa-solid text-green-primary fa-code-merge"></i>
                      Deployments
                    </div>
                    <div className="flex flex-col items-center text-slate-300 text-xs">
                      <i className="fa-solid text-green-primary fa-chart-simple"></i>
                      Analytics
                    </div>
                    <div className="flex flex-col items-center text-slate-300 text-xs">
                      <i className="fa-solid text-green-primary fa-user"></i>
                      Users
                    </div>
                    <div className="flex flex-col items-center text-slate-300 text-xs">
                      <i className="fa-solid text-green-primary fa-gear"></i>
                      Settings
                    </div>
                  </nav>

                  <section className="p-2 flex flex-col gap-2">
                    <input
                      type="text"
                      className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 placeholder-gray-500 w-full"
                      placeholder="Select Date Range"
                      disabled
                    />
                    <select
                      className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full"
                      disabled
                    >
                      <option>Select status</option>
                    </select>
                  </section>

                  <section className="p-2 flex-1 overflow-hidden">
                    <div className="flex flex-col gap-2">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-3 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium text-sm">B3kd9L2F1</span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-900 text-green-300">Production</span>
                          </div>
                          <div className="text-gray-400 text-xs">Last Deployed: September 19, 2025</div>
                        </div>
                      ))}
                    </div>
                  </section>
                </Phone>
                </Suspense>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative overflow-hidden w-2xl bg-gray-900 border border-gray-700 p-10 rounded-lg">
            <BackgroundRippleEffect />
            <div className="z-10">
              <h2 className="text-xl z-10 text-green-400 mb-4 font-bold">Vision</h2>
              <p className="text-lg z-10 text-justify">A future where every business, no matter the size, has access to smart,
                scalable, and affordable technology that drives long-term growth and community impact.
              </p>
            </div>
            <div className="flex relative items-center p-4 px-16">
              <div className="relative flex justify-between mx-auto my-6 w-full max-w-lg">
                <div className="z-10 text-2xl p-3 px-4.5 rounded-sm bg-green-400 text-gray-900 shadow-[0_0_20px_#00FF99]">
                  <i className="fa-solid fa-lightbulb"></i>
                </div>
                <div className="z-10 text-2xl p-3 rounded-sm bg-green-400 text-gray-900 shadow-[0_0_20px_#00FF99]">
                  <i className="fa-solid fa-gears"></i>
                </div>
                <div className="z-10 text-2xl p-3 rounded-sm bg-green-400 text-gray-900 shadow-[0_0_20px_#00FF99]">
                  <i className="fa-solid fa-hand-holding-heart"></i>
                </div>
                <div className="absolute z-1 top-1/2 h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}