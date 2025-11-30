"use client";

import { Exchange } from "@/lib/global";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import CurrencySelector from "../ui/CurrencySelector";

export default function Pricing() {
  const [geoLocation, setGeoLocation] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const geo = await fetch(`https://ip-intelligence.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_GEO}`);
        const geoRes = await geo.json();
        console.log(geoRes)
        setGeoLocation(geoRes?.currency?.code?.toLowerCase() || 'usd');
      } catch (error) {
        console.log('Unexpected Error Occured!')
        setGeoLocation('usd')
      }
    }

    fetchData()
    console.log('initial fetch')
  }, [])

  // const geoLocation = 'php'

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
    <>
      <section id="pricing" className="bg-black-primary">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6">
          <div className="mx-auto max-w-screen-md mb-8 lg:mb-16 text-center">
            <h2 className="text-4xl leading-tight font-extrabold text-white">Choose the <span className="text-green-primary">Perfect Plan</span> for Your Needs</h2>
            <p className="mb-5 text-gray-400 sm:text-md">Choose a plan that fits your needs — from getting started to full-scale growth.</p>
            <div className="w-fit mx-auto">
              <CurrencySelector value={geoLocation} onChange={setGeoLocation}/>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 sm:gap-6 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-full lg:col-span-2 col-span-1 bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow">
              <h3 className="text-2xl text-white font-bold">Starter</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm block text-md font-semibold text-gray-200">One-Time Pay</span>
                <span className="text-4xl font-extrabold text-green-primary/80">
                  <Exchange base={geoLocation} currencies="php" amount={69999} />
                </span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Monthly Subscription (Optional)</span>
                <span className="text-gray-400 max-w-3xs text-sm">
                  <Exchange base={geoLocation} currencies="php" amount={1500} />–<Exchange base={geoLocation} currencies="php" amount={2500} />
                  <span className="ml-1">/mo (maintenance + updates)</span>
                </span>
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
                className="mt-auto border border-gray-800 text-white bg-gradient-to-r from-gray-900 hover:from-gray-700 to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Plan
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
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-full lg:col-span-2 col-span-1 bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow">
              <h3 className="text-2xl text-white font-bold">Growth</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm block text-md font-semibold text-gray-200">One-Time Pay</span>
                <span className="text-4xl font-extrabold text-green-primary/80">
                  <Exchange base={geoLocation} currencies="php" amount={174999} />
                </span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Monthly Subscription (Optional)</span>
                <span className="text-gray-400 max-w-3xs text-sm"><Exchange base={geoLocation} currencies="php" amount={3000} />–<Exchange base={geoLocation} currencies="php" amount={5000} />
                  <span className="ml-1">/mo (maintenance, lead capture, hosting)</span>
                </span>
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
                className="mt-auto border border-gray-800 text-white bg-gradient-to-r from-gray-900 hover:from-gray-700 to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Plan
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
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-full lg:col-span-2 col-span-1 bg-gradient-to-b from-green-500/20 via-gray-900 to-gray-900 text-gray-900 rounded-lg border-2 border-green-400/70 shadow-xl ring-2 ring-green-500/30">
              <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>

              <h3 className="text-2xl text-white font-bold">Professional</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm block text-md font-semibold text-gray-200">One-Time Pay</span>
                <span className="text-4xl font-extrabold text-green-primary/80">
                  <Exchange base={geoLocation} currencies="php" amount={299999} />
                </span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Monthly Subscription (Optional)</span>
                <span className="text-gray-400 max-w-3xs text-sm"><Exchange base={geoLocation} currencies="php" amount={5000} />–<Exchange base={geoLocation} currencies="php" amount={8000} />
                  <span className="ml-1">/mo (maintenance, automation, updates)</span>
                </span>
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
                className="mt-auto text-white bg-green-600 shadow-[0_0_5px_#00FF99] hover:shadow-[0_0_20px_#00FF99] transition-all duration-200 
               focus:ring-4 focus:ring-green-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Plan
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
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-full lg:col-span-3 col-span-1 bg-gradient-to-b from-blue-800/30 via-gray-900 to-gray-900 text-gray-900 rounded-lg border border-gray-700 shadow h-full"
            >
              <h3 className="text-2xl text-white font-bold">Advance</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm block text-md font-semibold text-gray-200">One-Time Pay</span>
                <span className="text-4xl font-extrabold text-green-primary/80">
                  <Exchange base={geoLocation} currencies="php" amount={599999} />
                </span>
                <div className="h-[1px] w-full my-2 bg-gray-700"></div>
                <span className="text-sm block text-lg font-semibold text-gray-400 mb-1">Monthly Subscription (Optional)</span>
                <span className="text-gray-400 max-w-3xs text-sm"><Exchange base={geoLocation} currencies="php" amount={10000} />+
                  <span className="ml-1">/mo (full system maintenance, workflows, hosting)</span>
                </span>
              </div>
              <p className="text-gray-400 sm:text-md">
                For established companies, franchises, and multi-branch operations.
              </p>
              <ul
                role="list"
                className="mb-8 mt-6 text-left text-white grid sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-6"
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
                className="mt-auto border border-gray-800 text-white bg-gradient-to-r from-gray-900 hover:from-gray-700 to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Plan
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
              className="relative z-10 w-full max-w-full lg:col-span-3 sm:col-span-2 col-span-1 mx-auto flex flex-col justify-center items-center mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-green-500/30 rounded-lg shadow-lg text-center p-10 text-white">
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
          </div>
        </div>
      </section>
    </>
  )
}