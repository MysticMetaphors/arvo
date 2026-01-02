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
        setGeoLocation(geoRes?.currency?.code?.toLowerCase() || 'usd');
      } catch (error) {
        console.log('Unexpected Error Occured!')
        setGeoLocation('usd')
      }
    }

    fetchData()
  }, [])

  // const geoLocation = 'php'

  const basic = [
    "Up to 3 pages (+$5 per page after 3)",
    "Basic SEO",
    "Up to 5 edits",
    "Hosting included",
    "24/7 Support",
    <>Addon: +<Exchange base={geoLocation} currencies="usd" amount={20} />/month for unlimited edits</>,
  ]
  const growth = [
    <>Up to 7 pages (+<Exchange base={geoLocation} currencies="usd" amount={5} /> per page after 7)</>,
    <>+<Exchange base={geoLocation} currencies="usd" amount={5} /> Per Social after 2</>,
    "Advanced SEO",
    "Up to 10 edits",
    "Hosting included",
    "24/7 Support",
    <>Addon: +<Exchange base={geoLocation} currencies="usd" amount={20} />/month for unlimited edits</>,
  ]
  const professional = [
    "Unlimited pages",
    "4 customizable features (+$500 per additional feature)",
    "Hosting included",
    "Custom domain included",
    "24/7 Priority Support",
    "Installment options"
  ]
  const advance = [
    "Custom-built Shopify store",
    "Dedicated 24/7 Support",
    <>Unlimited Pages +<Exchange base={geoLocation} currencies="usd" amount={50} /> /month for unlimited edits</>,
    "Advanced app configuration",
    "Integrated shipping",
    "Fully editable CMS",
    "Complete Shopify onboarding walkthrough"
  ]

  return (
    <>
      <section id="pricing" className="bg-white dark:bg-black-primary">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-6">
          <div className="mx-auto max-w-screen-md mb-8 lg:mb-16 text-center">
            <h2 className="text-4xl leading-tight font-extrabold text-black dark:text-white">Choose the <span className="text-darkgreen-primary dark:text-green-primary">Perfect Plan</span> for Your Needs</h2>
            <p className="mb-5 text-gray-700 dark:text-gray-300 sm:text-md">Choose a plan that fits your needs — from getting started to full-scale growth.</p>
            <div className="w-fit mx-auto">
              <CurrencySelector value={geoLocation} onChange={setGeoLocation} />
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
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-full lg:col-span-2 col-span-1 bg-gradient-to-b from-blue-800/0 via-white to-white dark:from-blue-800/20 dark:via-gray-900 dark:to-gray-900 text-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="text-2xl text-black dark:text-white font-bold">Starter</h3>
              <div className="flex flex-col justify-center my-2">
                <span className="text-sm text-gray-700 block font-semibold dark:text-gray-200">Monthly</span>
                <div className="flex justify-left gap-2 my-2 flex-wrap">
                  <div className="flex flex-col items-left">
                    <span className="text-4xl font-extrabold text-darkgreen-primary dark:text-green-primary/80">
                      <Exchange base={geoLocation} currencies="usd" amount={20} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gray-300 my-2 dark:bg-gray-700"></div>

              <p className="text-gray-700 dark:text-gray-300 sm:text-md">Perfect for cafés, small accommodations, rentals, freelancers, and personal brands.</p>
              <ul role="list" className="mb-8 space-y-4 text-left text-white mt-6">
                {basic.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <svg
                      className="flex-shrink-0 mt-1 w-5 h-5 p-0.5 bg-blue-400 dark:bg-blue-300 rounded-full text-black"
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
                    <span className="text-black dark:text-white">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-auto border border-gray-300 dark:border-gray-800 text-black dark:text-white bg-gradient-to-r from-gray-300 hover:from-gray-200 to-gray-200 dark:from-gray-900 dark:hover:from-gray-700 dark:to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Starter
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
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-full lg:col-span-2 col-span-1 bg-gradient-to-b from-blue-800/0 via-white to-white dark:from-blue-800/20 dark:via-gray-900 dark:to-gray-900 text-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="text-2xl text-black dark:text-white font-bold">Growth</h3>

              <div className="flex flex-col justify-center my-2">
                <span className="text-sm text-gray-700 block font-semibold dark:text-gray-200">Monthly</span>
                <div className="flex justify-left gap-2 my-2 flex-wrap">
                  <div className="flex flex-col items-left">
                    <span className="text-4xl font-extrabold text-darkgreen-primary dark:text-green-primary/80">
                      <Exchange base={geoLocation} currencies="usd" amount={30} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gray-300 my-2 dark:bg-gray-700"></div>

              <p className="text-gray-700 dark:text-gray-300 sm:text-md">Ideal for restaurants, clinics, small resorts, real estate agents, and small online stores.</p>
              <ul role="list" className="mb-8 space-y-4 text-left text-white mt-6">
                {growth.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <svg
                      className="flex-shrink-0 mt-1 w-5 h-5 p-0.5 bg-blue-400 dark:bg-blue-300 rounded-full text-black"
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
                    <span className="text-black dark:text-white">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-auto border border-gray-300 dark:border-gray-800 text-black dark:text-white bg-gradient-to-r from-gray-300 hover:from-gray-200 to-gray-200 dark:from-gray-900 dark:hover:from-gray-700 dark:to-gray-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Growth
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex flex-col p-5 lg:p-10 mx-auto max-w-full lg:col-span-2 col-span-1 bg-white dark:bg-transparent dark:bg-gradient-to-b dark:from-green-500/20 dark:via-gray-900 dark:to-gray-900 text-gray-900 dark:text-gray-200 rounded-lg border-2 border-green-400/40 dark:border-green-400/70 shadow-lg dark:shadow-xl ring-1 ring-green-300/30 dark:ring-2 dark:ring-green-500/30">
              <span className="absolute top-3 right-3 bg-green-600 dark:bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>

              <h3 className="text-2xl font-bold text-black dark:text-white">Professional</h3>

              <div className="flex flex-col justify-center my-2">
                <span className="text-sm text-gray-700 block font-semibold dark:text-gray-200">Lump-sum</span>
                <div className="flex justify-left gap-2 my-2 flex-wrap">
                  <div className="flex flex-col items-left">
                    <span className="text-4xl font-extrabold text-darkgreen-primary dark:text-green-primary/80">
                      <Exchange base={geoLocation} currencies="usd" amount={1000} />
                    </span>
                  </div>
                  <span className="flex justify-center items-end">
                    +<Exchange base={geoLocation} currencies="usd" amount={20} />/mo
                  </span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gray-300 my-2 dark:bg-gray-700"></div>

              <p className="text-gray-600 dark:text-gray-300 sm:text-md">
                Best for resorts with booking requests, real estate teams, clinics, and multi-branch service providers.
              </p>

              <ul
                role="list"
                className="mb-8 space-y-4 text-left text-gray-700 dark:text-white mt-6 flex-1"
              >
                {professional.map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <svg
                      className="flex-shrink-0 mt-1 w-5 h-5 p-0.5 bg-green-400 dark:bg-green-300 rounded-full text-black"
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
                    <span className="text-black dark:text-white">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="mt-auto text-white transition-all duration-300 bg-darkgreen-primary text-white shadow-md hover:bg-green-600 hover:shadow-lg dark:bg-green-400 dark:text-black dark:shadow-[0_0_5px_#00FF99] dark:hover:bg-green-600 dark:hover:shadow-[0_0_40px_#00FF99]00FF99] transition-all duration-200 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-400 font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Choose Professional
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
              className="elative flex flex-col p-5 lg:p-10 mx-auto max-w-full lg:col-span-3 col-span-1 bg-gradient-to-b from-blue-800/0 via-white to-white dark:from-blue-800/20 dark:via-gray-900 dark:to-gray-900 text-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md">
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Ecommerce
              </h3>

              <div className="h-[1px] w-full bg-gray-300 mt-4 dark:bg-gray-700"></div>

              <p className="text-gray-600 dark:text-gray-300 sm:text-md my-4">
                Enterprise-grade ecommerce solutions tailored to your business needs.
                Designed for large-scale stores, custom workflows, and advanced integrations.
              </p>

              <ul
              role="list"
              className="mb-8 mt-4 text-left text-white grid grid-cols-1 gap-y-4 gap-x-6"
            >
              {advance.map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <svg
                    className="flex-shrink-0 mt-1 w-5 h-5 p-0.5 bg-blue-400 dark:bg-blue-300 rounded-full text-black"
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
                  <span className="text-black dark:text-white">{item}</span>
                </li>
              ))}
            </ul>

              <Link
                href="/contact"
                className="mt-auto transition-all duration-300 bg-darkgreen-primary text-white shadow-md hover:bg-green-600 hover:shadow-lg dark:bg-green-400 dark:text-black dark:shadow-[0_0_5px_#00FF99] dark:hover:bg-green-600 dark:hover:shadow-[0_0_40px_#00FF99] font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Contact Us
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative z-10 w-full max-w-full lg:col-span-3 sm:col-span-2 col-span-1 mx-auto flex flex-col justify-center items-center p-10 rounded-lg shadow-lg text-center text-gray-900 border border-green-400/40 bg-gradient-to-r from-green-50 via-gray-100 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-white dark:border-green-500/30"
            >
              <h3 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-primary">Need a Custom Plan?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Not sure which package fits your needs? Let’s build a plan that works just for you.
              </p>
              <div className="flex flex-wrap flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="cursor-pointer sm:px-8 sm:py-3 px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-darkgreen-primary text-white shadow-md hover:bg-green-600 hover:shadow-lg dark:bg-green-400 dark:text-black dark:shadow-[0_0_5px_#00FF99] dark:hover:bg-green-600 dark:hover:shadow-[0_0_40px_#00FF99]"
                >
                  Contact
                </Link>

                {/* <Link
                  href="/learnmore"
                  className="cursor-pointer sm:px-8 sm:py-3 px-6 py-2 rounded-full transition-all duration-300 border font-semibold bg-gray-50 text-green-600 border-green-500/40 hover:bg-green-200 hover:text-black dark:bg-green-primary/5 dark:text-green-400 dark:border-green-400  dark:hover:bg-green-400 dark:hover:text-black"
                >
                  Learn More
                </Link> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}