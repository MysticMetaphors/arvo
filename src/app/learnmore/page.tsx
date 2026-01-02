"use client"

import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomPackage() {
  const steps = [
    {
      icon: "fa-pen-nib",
      title: "Design & Branding",
      description: "Initial system configuration and institution setup",
      details: [
        "Responsive website design (mobile, tablet, desktop)",
        "Branding integration (logo, fonts, color scheme)",
        "Custom graphics & visuals",
      ],
      image: (
        <div className="bg-white dark:bg-gray-800 h-full rounded-md border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-green-200 dark:bg-green-primary/80 rounded w-1/2"></div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-40 bg-gray-100 dark:bg-gray-600 rounded animate-pulse"></div>
          </div>
        </div>
      )
    },
    {
      icon: "fa-bars-progress",
      title: "Web Feature",
      description: "Customize enrollment rules and workflows",
      details: [
        "Static pages(About, Services, Contact, etc.)",
        "Blog, portfolio, or gallery sections",
        "E-commerce functionality",
        "Booking or scheduling systems",
        "Membership or user login portals",
      ],
      image: (
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-primary/70 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded flex-1 animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6 animate-pulse"></div>
              <div className="h-3 bg-green-200 dark:bg-green-primary/80 rounded w-4/6 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: "fa-gears",
      title: "Technical Setup",
      description: "Students submit enrollment requests",
      details: [
        "Domain & hosting setup",
        "CMS installation(WordPress, Shopify, or custom)",
        "Security(SSL certificate, backups)",
      ],
      image: (
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mb-4 animate-pulse"></div>

            <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1 animate-pulse"></div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 border-2 rounded bg-green-300 dark:bg-green-primary/80 animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1 animate-pulse"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1 animate-pulse"></div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="h-10 bg-green-600 dark:bg-green-primary/70 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-3">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: "fa-sliders",
      title: "Marketing & Performance",
      description: "Ongoing enrollment management and optimization",
      details: [
        "SEO setup(basic optimization)",
        "Social media links & sharing features",
      ],
      image: (
        <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-12 mb-1 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16 mb-1 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded p-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-14 mb-1 animate-pulse"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded">
              <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-3 py-2">
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
              </div>
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6 animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1"></div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 border-2 rounded bg-green-300 dark:bg-green-primary/80"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1 animate-pulse"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-500 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded flex-1 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="relative bg-white dark:bg-black-primary overflow-hidden">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/10 to-transparent pointer-events-none"></div>

      <div className="relative px-6 md:px-6 pt-20 pb-8 lg:pt-30 lg:px-12 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white"
        >
          <span className="text-darkgreen-primary dark:text-green-primary">Custom</span> Package
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 mx-auto mb-6"
        >
          For fully tailored systems: SaaS apps, web apps, mobile apps, custom AI tools, and enterprise-grade builds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"></motion.div>

        <div className="space-y-24 my-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-darkgreen-primary text-white shadow-md dark:bg-green-400 dark:text-black dark:shadow-[0_0_5px_#00FF99] rounded-lg flex items-center justify-center text-2xl font-bold">
                    <i className={`fa-solid ${step.icon}`}></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold dark:text-white text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-md text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-3">
                      <svg
                        className="flex-shrink-0 w-5 h-5 p-0.5 bg-green-400 dark:bg-green-primary rounded-full text-black"
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
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-md flex-1">
                        {detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full h-full">
                {step.image}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="w-full mt-8 flex flex-col justify-center items-center mx-auto bg-white dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-300 dark:border-green-500/30 rounded-lg shadow-lg text-center p-10 text-white">
          <h3 className="text-3xl font-bold mb-4 text-darkgreen-primary dark:text-green-primary">Pricing</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg italic max-w-md">
            Pricing is flexible and will be finalized after consultation, based on your chosen features and project scope.
          </p>
          <Link href="/contact" className="cursor-pointer px-8 py-3 rounded-full bg-darkgreen-primary/70 dark:bg-green-primary shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
            Contact
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
