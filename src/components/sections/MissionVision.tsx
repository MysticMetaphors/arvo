"use client";

import { Suspense, useEffect, useState } from "react";
import { BackgroundRippleEffect } from "@/components/ui/background/background-ripple-effect";
import Phone from "../mockups/Phone";
import { motion } from "framer-motion";

export default function MissionVision() {
  const [cols, setCols] = useState(9);
  const [rows, setRows] = useState(7);
  const [cellSize, setCellSize] = useState(83);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {        // mobile (sm)
        setCols(7);
        setCellSize(83);
        setRows(5)
      } else if (window.innerWidth < 1024) { // tablet (md)
        setCols(9);
        setCellSize(83);
        setRows(5)
      } else {                              // desktop (lg+)
        setCols(9);
        setCellSize(83);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    { icon: "lightbulb", label: "Strategy" },
    { icon: "gears", label: "Development" },
    { icon: "hand-holding-heart", label: "Impact" }
  ];

  return (
    <section className="relative bg-white dark:bg-black-primary">
      {/* <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full lg:w-2xl bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div> */}
      <div className="mx-auto px-6 lg:px-20 py-10 z-10">
        <div className="text-center flex justify-center flex-col md:flex-row gap-8 mb-8 2xl:mb-16">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative overflow-hidden w-full lg:w-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-10 rounded-lg">
            <BackgroundRippleEffect cols={cols} rows={rows} cellSize={cellSize} />
            <div className="relative z-10">
              <h2 className="text-xl text-darkgreen-primary dark:text-green-primary mb-4 font-bold">Mission</h2>
              <p className="text-lg text-justify">To deliver reliable, project-based web solutions that empower
                businesses to launch, grow, and adapt faster in today’s digital-first economy
              </p>
            </div>
            <div className="flex relative items-center p-8 px-16">
              <div className="absolute z-1 top-30 h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></div>
              <div className="absolute top-10 md:top-20 z-10 -right-15 md:-right-0 dark:shadow-[0_0_20px_#00FF99] rounded-3xl">
                <Suspense fallback={''}>
                  <Phone>
                    <div className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
                      <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between p-4 transition-colors duration-300">
                        <h1 className="text-gray-900 dark:text-white font-semibold text-sm">Deployments</h1>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                      </header>

                      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between transition-colors duration-300">
                        <div className="flex flex-col items-center text-gray-400 dark:text-slate-300 text-xs cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                          <i className="fa-solid text-darkgreen-primary dark:text-green-primary fa-layer-group"></i>
                        </div>
                        <div className="flex flex-col items-center text-gray-400 dark:text-slate-300 text-xs cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                          <i className="fa-solid text-darkgreen-primary dark:text-green-primary fa-code-merge"></i>
                        </div>
                        <div className="flex flex-col items-center text-gray-400 dark:text-slate-300 text-xs cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                          <i className="fa-solid text-darkgreen-primary dark:text-green-primary fa-chart-simple"></i>
                        </div>
                        <div className="flex flex-col items-center text-gray-400 dark:text-slate-300 text-xs cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                          <i className="fa-solid text-darkgreen-primary dark:text-green-primary fa-user"></i>
                        </div>
                        <div className="flex flex-col items-center text-gray-400 dark:text-slate-300 text-xs cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors">
                          <i className="fa-solid text-darkgreen-primary dark:text-green-primary fa-gear"></i>
                        </div>
                      </nav>

                      <section className="p-2 flex flex-col gap-2 bg-white dark:bg-gray-900 transition-colors duration-300">
                        <input
                          type="text"
                          className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 placeholder-gray-400 dark:placeholder-gray-500 w-full transition-colors"
                          placeholder="Select Date Range"
                          disabled
                        />
                        <select
                          className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full transition-colors"
                          disabled
                        >
                          <option>Select status</option>
                        </select>
                      </section>

                      <section className="p-2 flex-1 overflow-y-auto bg-white dark:bg-gray-900 transition-colors duration-300">
                        <div className="flex flex-col gap-2 pb-4">
                          {Array.from({ length: 10 }, (_, i) => (
                            <div
                              key={i}
                              className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-transparent rounded-lg p-3 flex flex-col gap-1 transition-colors duration-300 hover:shadow-sm"
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-gray-900 dark:text-white font-medium text-sm">B3kd9L2F1</span>

                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 transition-colors">
                                  Production
                                </span>
                              </div>
                              <div className="text-gray-500 dark:text-gray-400 text-xs">Last Deployed: September 19, 2025</div>
                            </div>
                          ))}
                        </div>
                      </section>

                    </div>
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
            className="relative overflow-hidden w-full lg:w-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-10 rounded-lg">
            <BackgroundRippleEffect cols={cols} rows={rows} cellSize={cellSize} />
            <div className="relative z-10">
              <h2 className="text-xl z-10 text-darkgreen-primary dark:text-green-primary mb-4 font-bold">Vision</h2>
              <p className="text-lg z-10 text-justify">A future where every business, no matter the size, has access to smart,
                scalable, and affordable technology that drives long-term growth and community impact.
              </p>
            </div>
            <div className="flex relative items-center justify-center p-4 px-0 lg:px-16 py-12">
              <div className="relative flex justify-between mx-auto w-full max-w-lg">

                {/* --- CONNECTING LINES --- */}
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
                  {/* Background Track (Dashed) */}
                  <div className="h-[2px] w-full bg-gray-200 dark:bg-gray-800"
                    style={{ backgroundImage: 'linear-gradient(to right, currentColor 50%, transparent 50%)', backgroundSize: '16px 1px' }}
                  />

                  {/* Animated Progress Beam */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.1, ease: "easeInOut", delay: 0.1 }}
                    className="absolute top-0 left-0 h-[3px] bg-green-primary dark:bg-green-primary dark:brightness-90 dark:shadow-[0_0_10px_currentColor]"
                  />
                </div>

                {/* --- STEPS --- */}
                {steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    // Stagger the appearance based on the line progress
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2 + (i * 0.6) // 0.2s, 0.8s, 1.4s
                    }}
                    className="relative z-10 group"
                  >
                    {/* Pulse Ring Animation */}
                    <div className="absolute inset-0 rounded-xl bg-darkgreen-primary/60 dark:bg-green-primary/60 animate-ping blur-sm opacity-75 duration-1000" style={{ animationDelay: `${i * 0.1}s` }} />

                    {/* Icon Container */}
                    <div className="
                relative flex items-center justify-center w-14 h-14 rounded-md 
                bg-green-primary dark:bg-green-primary 
                text-white dark:text-gray-900
                shadow-lg transition-all duration-300
                
                group-hover:-translate-y-2 
                group-hover:text-gray-900
                group-hover:shadow-[0_10px_20px_-5px_rgba(34,197,94,0.3)] dark:group-hover:shadow-[0_0_20px_rgba(0,255,153,0.4)]
                    ">
                      <i className={`fa-solid fa-${step.icon} text-2xl transition-transform duration-300 group-hover:scale-110`}></i>
                    </div>

                    {/* Label (Tooltip style) */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-xs font-bold uppercase tracking-wider text-darkgreen-primary dark:text-green-primary">
                        {step.label}
                      </span>
                    </div>

                  </motion.div>
                ))}

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}