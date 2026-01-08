"use client";

import AppInterfaceMockup from "@/components/mockups/AppInterfaceMockup";
import BrowserMockup from "@/components/mockups/BrowserMockup";
import CartMockup from "@/components/mockups/CartMockup";
import ChartMockup from "@/components/mockups/ChartMockup";
import CodeMockup from "@/components/mockups/CodeMockup";
import Phone from "@/components/mockups/Phone";
import { motion } from "framer-motion";
import { Suspense } from "react";

export default function ServicesBento() {
  const PhoneMockup = <Suspense fallback={''}>
    <div className="absolute right-10">
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
    </div>
  </Suspense>

  const services = [
    {
      id: "web",
      icon: "globe",
      service: "Websites & Landing Pages",
      description: "We craft responsive, high-converting websites and landing pages designed to make a strong first impression and drive results.",
      colSpan: "lg:col-span-2 md:col-span-3", // Spans 2 columns
      visual: <BrowserMockup />,
    },
    {
      id: "ecom",
      icon: "bag-shopping",
      service: "E-commerce",
      description: "Build powerful online stores with secure payment systems, intuitive user experience, and efficient product management tools.",
      colSpan: "lg:col-span-1 md:col-span-3",
      visual: <CartMockup />,
    },
    {
      id: "admin",
      icon: "bars-progress",
      service: "Dashboards",
      description: "Custom-built dashboards that help you track, manage, and analyze your business operations with real-time data insights.",
      colSpan: "lg:col-span-1 md:col-span-3",
      visual: <ChartMockup />,
    },
    {
      id: "ai",
      icon: "plug",
      service: "AI & Web3",
      description: "Integrate cutting-edge AI and blockchain solutions to enhance automation, personalization, and digital trust in your platform.",
      colSpan: "lg:col-span-2 md:col-span-3",
      visual: <CodeMockup />,
    },
    {
      id: "mobile",
      icon: "mobile",
      service: "Mobile Apps",
      description: "Create cross-platform mobile apps with smooth performance, engaging design, and seamless user experience.",
      colSpan: "lg:col-span-1 md:col-span-3",
      visual: PhoneMockup,
    },
    {
      id: "custom",
      icon: "pen-nib",
      service: "Custom Web Apps",
      description: "Develop tailored web applications built to meet your specific business needs — from concept to deployment.",
      colSpan: "lg:col-span-2 md:col-span-3",
      visual: <AppInterfaceMockup />,
    },
  ];

  return (
    <section className="relative bg-white dark:bg-black-primary text-white overflow-hidden py-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-16 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl text-black dark:text-white font-extrabold mb-4"
          >
            What we <span className="text-darkgreen-primary dark:text-green-primary">do</span>
          </motion.h2>
          <p className="text-gray-400 max-w-xl">
            We transform your ideas into reality with full control and customizability.
          </p>

          {/* Divider */}
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent mt-8"></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`
                ${service.colSpan} 
                group relative flex flex-col justify-between overflow-hidden rounded-lg 
                bg-gray-50 dark:bg-gray-800/[0.50] border border-gray-200 dark:border-white/10
                hover:border-darkgreen-primary/70 dark:hover:border-green-primary/50 hover:shadow-[0_0_30px_-5px_rgba(0,255,153,0.15)]
                transition-all duration-500 ease-out
              `}
            >
              <div className="p-8 z-20 relative">
                <div className="flex flex-row items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-darkgreen-primary/60 dark:group-hover:bg-green-primary transition-colors duration-300">
                    <i className={`fa-solid fa-${service.icon} text-lg text-black dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors`} />
                  </div>
                  <h3 className="text-2xl font-bold text-black dark:text-white">
                    {service.service}
                  </h3>
                </div>
                <p className="text-md text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
              <div className="relative w-full h-48 mt-auto transition-opacity duration-500">
                <div className="absolute left-0 top-0 w-full h-full">
                  {service.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}