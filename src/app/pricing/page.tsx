"use client"

import { motion } from "framer-motion";
import DetailedPricingComparison from "@/components/sections/DetailedPricingComparison";
import Link from "next/link";

export default function pricing() {

  const basic = [
    "3 Pages (Home, About, Contact)",
    "Mobile-friendly",
    "Basic SEO",
    "Social Link",
    "Hosting included"
  ]
  const growth = [
    "Up to 7 pages",
    "SEO optimization",
    "2 Social integrations",
    "Product Catalogue",
    "Newsletter / Lead Capture",
    "Basic Automations",
  ]
  const professional = [
    "Up to 12 pages",
    "CMS + Dashboards",
    "Customer forms",
    "Role-based access",
    "Catalogue",
    "SEO + Newsletter",
    "2-3 Integrations"
  ]
  const advance = [
    "Unlimited Pages",
    "Custom admin panel",
    "Workflow automations (CRM, approvals, notifications)",
    "Advanced Catalogue",
    "Scalable architecture",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 gap-10 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-sm lg:max-w-lg bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow">
              <h3 className="text-2xl text-white font-bold">Starter</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm block text-md font-semibold text-gray-200">One-Time Pay</span>
                <span className="text-4xl font-extrabold text-green-primary/80">₱69,999</span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Monthly Subscription (Optional)</span>
                <span className="text-gray-400 max-w-3xs text-sm">₱1,500–2,500 /mo (maintenance + updates)</span>
              </div>
              <p className="text-gray-400 sm:text-md mt-2">Perfect for cafés, small accommodations, rentals, freelancers, and personal brands.</p>
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
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-sm lg:max-w-lg bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow">
              <h3 className="text-2xl text-white font-bold">Growth</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm block text-md font-semibold text-gray-200">One-Time Pay</span>
                <span className="text-4xl font-extrabold text-green-primary/80">₱174,999</span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Monthly Subscription (Optional)</span>
                <span className="text-gray-400 max-w-3xs text-sm">₱3,000–5,000 /mo (maintenance, lead capture, hosting)</span>
              </div>
              <p className="text-gray-400 sm:text-md mt-2">Ideal for restaurants, clinics, small resorts, real estate agents, and small online stores.</p>
              <ul role="list" className="mb-8 space-y-4 text-left text-white mt-6">
                {growth.map((item, i) => (
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
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-sm lg:max-w-lg bg-gradient-to-b from-green-500/20 via-gray-900 to-gray-900 text-gray-900 rounded-lg border-2 border-green-400/70 shadow-xl ring-2 ring-green-500/30">
              <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>

              <h3 className="text-2xl text-white font-bold">Professional</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm block text-md font-semibold text-gray-200">One-Time Pay</span>
                <span className="text-4xl font-extrabold text-green-primary/80">₱299,999</span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Monthly Subscription (Optional)</span>
                <span className="text-gray-400 max-w-3xs text-sm">₱5,000–8,000 /mo (maintenance, automation, updates)</span>
              </div>
              <p className="text-gray-300 sm:text-md">
                Best for resorts with booking requests, real estate teams, clinics, and multi-branch service providers.
              </p>

              <ul role="list" className="mb-8 space-y-4 text-left text-white mt-6 flex-1">
                {professional.map((item, i) => (
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
                className="mt-auto text-white bg-green-500/70 hover:bg-green-600 transition-all duration-200 
               focus:ring-4 focus:ring-green-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </Link>
            </motion.div>
          </div>

          <div className="w-full grid md:grid-cols-2 gap-6 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex flex-col p-5 lg:p-10 mx-auto lg:max-w-full max-w-sm bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow h-full"
            >
              <h3 className="text-2xl text-white font-bold">Advance</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm block text-md font-semibold text-gray-200">One-Time Pay</span>
                <span className="text-4xl font-extrabold text-green-primary/80">₱599,999</span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Monthly Subscription (Optional)</span>
                <span className="text-gray-400 max-w-3xs text-sm">₱10,000+/mo (full system maintenance, workflows, hosting)</span>
              </div>
              <p className="text-gray-400 sm:text-md">
                For established companies, franchises, and multi-branch operations.
              </p>
              <ul
                role="list"
                className="mb-8 mt-6 text-left text-white grid grid-cols-2 gap-y-4 gap-x-6"
              >
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
              className="relative z-10 w-full max-w-sm lg:max-w-full mx-auto flex flex-col justify-center items-center mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-green-500/30 rounded-lg shadow-lg text-center p-10 text-white">
              <h3 className="text-3xl font-bold mb-4 text-green-primary">Need a Custom Plan?</h3>
              <p className="text-gray-300 mb-6">
                Not sure which package fits your needs? Let’s build a plan that works just for you.
              </p>

              <div className="flex flex-wrap flex-row items-center justify-center gap-4">
                <Link href="/contact" className="cursor-pointer sm:px-8 sm:py-3 px-6 py-2 rounded-full bg-green-400 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
                  Contact
                </Link>
                <Link href="/learnmore" className="cursor-pointer sm:px-8 sm:py-3 px-6 py-2 bg-green-primary/5 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300">
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex flex-col p-5 lg:p-10 bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow h-full"
            >
              <h3 className="text-2xl text-white font-bold">Custom Plan</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-4xl font-extrabold text-green-primary/80">Variable</span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Pricing based on system complexity</span>
              </div>
              <p className="text-gray-400 sm:text-md">
                For fully tailored systems: SaaS apps, web apps, mobile apps, custom AI tools, and enterprise-grade builds.
              </p>
              <ul
                role="list"
                className="mb-8 mt-6 text-left text-white grid gap-y-4 gap-x-6"
              >
                  <li className="flex items-center space-x-3">
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
                    <span>Fully customized requirements</span>
                  </li>
                  <li className="flex items-center space-x-3">
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
                    <span>All necessary integrations</span>
                  </li>
                  <li className="flex items-center space-x-3">
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
                    <span>Designed around client workflow</span>
                  </li>
              </ul>

              <Link
                href="/contact"
                className="mt-auto border border-gray-800 text-white bg-gradient-to-r from-gray-900 to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </Link>
            </motion.div> */}
          </div>


        {/* <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-white lg:pt-20 pt-8"
        >
          Plan Comparison <span className="text-green-primary">Overview</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-400 mx-auto mb-6"
        >
          Explore each plan’s features side by side to find the one that fits your goals best.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></motion.div>

        <div className="lg:py-12 py-8">
          <DetailedPricingComparison />
        </div> */}
      </div>

    </section>
  )
}