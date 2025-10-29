"use client"

import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomPackage() {
  return (
    <section className="relative bg-black-primary overflow-hidden">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

      <div className="relative px-6 md:px-6 pt-20 pb-8 lg:pt-30 lg:px-12 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-white"
        >
          <span className="text-green-primary">Custom</span> Package
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-400 mx-auto mb-6"
        >
          Tailored solutions to match your brands goals and creative vision.
          Choose the features you need, and we&apos;ll craft a unique website package
          that fits your scope and budget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></motion.div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 lg:pt-12 pt-8">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800
                         p-8 text-left transition-all duration-500 ease-out hover:-translate-y-2
                         hover:shadow-lg hover:shadow-green-primary/20"
          >
            <i className="fa-solid fa-pen-nib text-2xl p-3 rounded-sm bg-green-primary/60 mb-3"></i>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-green-primary transition-colors">
              Design & Branding
            </h3>
            <ul className="space-y-2 text-gray-300 list-disc ml-4">
              <li>Responsive website design (mobile, tablet, desktop)</li>
              <li>Branding integration (logo, fonts, color scheme)</li>
              <li>Custom graphics & visuals</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800
                         p-8 text-left transition-all duration-500 ease-out hover:-translate-y-2
                         hover:shadow-lg hover:shadow-green-primary/20"
          >
            <i className="fa-solid fa-gear text-2xl p-3 rounded-sm bg-green-primary/60 mb-3"></i>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-green-primary transition-colors">
              Website Features
            </h3>
            <ul className="space-y-2 text-gray-300 list-disc ml-4">
              <li>Static pages (About, Services, Contact, etc.)</li>
              <li>Blog, portfolio, or gallery sections</li>
              <li>E-commerce functionality</li>
              <li>Booking or scheduling systems</li>
              <li>Membership or user login portals</li>
            </ul>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800
                         p-8 text-left transition-all duration-500 ease-out hover:-translate-y-2
                         hover:shadow-lg hover:shadow-green-primary/20"
          >
            <i className="fa-solid fa-sliders text-2xl p-3 rounded-sm bg-green-primary/60 mb-3"></i>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-green-primary transition-colors">
              Technical Setup
            </h3>
            <ul className="space-y-2 text-gray-300 list-disc ml-4">
              <li>Domain & hosting setup</li>
              <li>CMS installation (WordPress, Shopify, or custom)</li>
              <li>Security (SSL certificate, backups)</li>
            </ul>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800
                         p-8 text-left transition-all duration-500 ease-out hover:-translate-y-2
                         hover:shadow-lg hover:shadow-green-primary/20"
          >
            <i className="fa-solid fa-chart-simple text-2xl p-3 rounded-sm bg-green-primary/60 mb-3"></i>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-green-primary transition-colors">
              Marketing & Performance
            </h3>
            <ul className="space-y-2 text-gray-300 list-disc ml-4">
              <li>SEO setup (basic optimization)</li>
              <li>Social media links & sharing features</li>
            </ul>
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
          className="w-full mt-8 flex flex-col justify-center items-center mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-green-500/30 rounded-lg shadow-lg text-center p-10 text-white">
          <h3 className="text-3xl font-bold mb-4 text-green-primary">Pricing</h3>
          <p className="text-gray-300 mb-6 text-lg italic max-w-md">
            Pricing is flexible and will be finalized after consultation, based on your chosen features and project scope.
          </p>
          <Link href="/contact" className="cursor-pointer px-8 py-3 rounded-full bg-green-400 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
            Contact
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
