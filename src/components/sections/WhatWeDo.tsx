"use client";

import { motion } from "framer-motion";

export default function WhatWeDo() {
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
    <section id="services" className="py-20 bg-white text-gray-900 dark:bg-black-primary dark:text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className=" mb-4 text-4xl leading-tight font-extrabold text-gray-900 dark:text-white"
        >
          What we <span className="text-darkgreen-primary dark:text-green-primary">do</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-400"
        >
          We craft tailored digital experiences designed to scale, convert, and
          empower your business across modern platforms.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="shadow-lg group p-8 text-left rounded-lg border transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lg border-gray-200 hover:shadow-gray-400/60 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:hover:shadow-green-primary/20">
              <i className={`fa-solid fa-${service.icon} text-2xl p-3 rounded-sm mb-3 bg-darkgreen-primary/70 text-white dark:bg-green-primary/70`}></i>

              <h3 className="text-2xl font-semibold mb-2 dark:group-hover:text-green-600 dark:group-hover:text-green-primary transition-colors">
                {service.service}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-md">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
}
