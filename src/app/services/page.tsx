"use client"

import { motion } from "framer-motion";

export default function services() {
  const services = [
    {
      icon: "globe",
      service: "Websites & Landing Pages",
      description: "We craft responsive, high-converting websites and landing pages designed to make a strong first impression and drive results."
    },
    {
      icon: "bag-shopping",
      service: "E-commerce Development",
      description: "Build powerful online stores with secure payment systems, intuitive user experience, and efficient product management tools."
    },
    {
      icon: "bars-progress",
      service: "Admin Systems & Dashboards",
      description: "Custom-built dashboards that help you track, manage, and analyze your business operations with real-time data insights."
    },
    {
      icon: "plug",
      service: "AI & Web3 Integrations",
      description: "Integrate cutting-edge AI and blockchain solutions to enhance automation, personalization, and digital trust in your platform."
    },
    {
      icon: "mobile",
      service: "Mobile App Development",
      description: "Create cross-platform mobile apps with smooth performance, engaging design, and seamless user experience."
    },
    {
      icon: "pen-nib",
      service: "Custom Web Applications",
      description: "Develop tailored web applications built to meet your specific business needs — from concept to deployment."
    }
  ];

  return (
    <section className="relative bg-black-primary overflow-hidden">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

      <div className="px-6 md:px-6 pt-20 pb-8 lg:pt-30 lg:px-12 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-white"
        >
          What we <span className="text-green-primary">can do</span> for you
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:pt-12 pt-8 relative z-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800
                         p-8 text-left transition-all duration-500 ease-out hover:-translate-y-2
                         hover:shadow-lg hover:shadow-green-primary/20"
            >
              <i className={`fa-solid fa-${service.icon} text-2xl p-3 rounded-sm bg-green-primary/70 mb-3`}></i>
              <h3 className="text-2xl font-semibold mb-2 group-hover:text-green-primary transition-colors">
                {service.service}
              </h3>
              <p className="text-gray-400 text-md">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}