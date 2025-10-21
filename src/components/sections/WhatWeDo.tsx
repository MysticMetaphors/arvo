"use client";

import { motion } from "framer-motion";

export default function WhatWeDo() {
  const services = [
    {icon: "globe",service: "Websites & Landing Pages"},
    {icon: "bag-shopping",service: "E-commerce Development"},
    {icon: "bars-progress",service: "Admin Systems & Dashboards"},
    {icon: "plug",service: "AI & Web3 Integrations"},
    {icon: "mobile",service: "Mobile App Development"},
    {icon: "pen-nib",service: "Custom Web Applications"},
  ];

  return (
    <section className="py-20 bg-black-primary text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-white"
        >
          What we <span className="text-green-primary">do</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-400 max-w-2xl mx-auto mb-12"
        >
          We craft tailored digital experiences designed to scale, convert, and
          empower your business across modern platforms.
        </motion.p>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis nihil cupiditate laboriosam ipsam accusamus.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
