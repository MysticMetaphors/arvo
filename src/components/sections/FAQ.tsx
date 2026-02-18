"use client"

import { motion } from "framer-motion"
import Questions_FAQ from "../ui/Question-FAQ"
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faInstagram, faXTwitter, faFacebookF, faThreads } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function FAQ() {
  const questions = [
    {
      question: "What services does Arvo provide?",
      answer: "Arvo provides proven enterprise solutions for all businesses--professional and those that are growing. We handle everything technology related, from simple websites, to custom-made Customer Relationship Management (CRM) softwares. For a full list of our services, check our our services section:",
      children: <Link className="bg-green-primary text-sm px-3 py-1 rounded-sm text-gray-900 font-semibold" href="/services">Services</Link>
    },
    {
      question: "How does the payment work?",
      answer: "We can cater to all businesses. For businesses that prefer lumpsum, we can accept lumpsum payments. For installments and monthly, we accept them as well. For a general list of our payments and pricing, check out our pricing section:",
      children: <Link className="bg-green-primary text-sm px-3 py-1 rounded-sm text-gray-900 font-semibold" href="/pricing">Pricing</Link>
    },
    {
      question: "How long does it take to finish a website or software system?",
      answer: "Timelines vary per scope and functionalities. For simple websites, it can be up in less than a week. For complex softwares, it may take weeks for completion. Though working and usable systems will always be done in a few days upon request. For an estimated range of your project, we recommend contacting us.",
      children:
        <div className="text-gray-600 dark:text-gray-200 mt-10 space-y-4">
          <p className="text-gray-600 dark:text-gray-400">You can reach us through the following:</p>
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-xl px-1 p-1.5 bg-green-primary rounded-sm text-white dark:bg-green-primary/70" />
            <span className="text-md">jerry.tagle@arvo.team</span>
          </div>

          {/* Phone */}
          <div className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faPhone} className="text-xl px-1 p-1.5 bg-green-primary rounded-sm text-white dark:bg-green-primary/70" />
            <span className="text-md"><span className="font-bold">(+63)</span>-997-1888-427</span>
          </div>

          <div className="flex gap-4 items-center text-gray-600 dark:text-gray-400">
            <p>You can also reach us through our social media accounts:</p>
          </div>

          <div className="flex gap-2">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jerrytagle/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center text-gray-200"
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="text-2xl px-0.5 p-1 bg-blue-500 rounded-sm text-white dark:bg-blue-500/70"
              />
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/arvoi.t/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-2xl px-0.5 p-1 rounded-sm text-white bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]"
              />
            </a>


            {/* X (Twitter) */}
            <a
              href="https://x.com/it_vo96897"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center text-gray-200"
            >
              <FontAwesomeIcon
                icon={faXTwitter}
                className="text-xl px-1 p-1.5 bg-black rounded-sm text-white dark:bg-black/70"
              />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/ArvoITServices"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center text-gray-200"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                className="text-xl px-1 p-1.5 bg-blue-700 rounded-sm text-white dark:bg-blue-700/70"
              />
            </a>

            {/* Threads */}
            <a
              href="https://www.threads.com/@arvoi.t?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center text-gray-200"
            >
              <FontAwesomeIcon
                icon={faThreads}
                className="text-xl px-1 p-1.5 bg-neutral-900 rounded-sm text-white dark:bg-neutral-900/70"
              />
            </a>
          </div>
        </div>
    },
    // {
    //   question: "Do you provide hosting and domain?",
    //   answer: "Yes. All maintenance plans include hosting. Domains are not included, but we can assist in purchasing or connecting your existing domain."
    // },
    // {
    //   question: "Can I request revisions after the website is done?",
    //   answer: "Yes. Each plan includes a specific number of revisions. Additional or major changes can be done at an hourly or fixed cost depending on scope."
    // },
    // {
    //   question: "What if I don’t have content yet?",
    //   answer: "No problem. We can launch placeholders first and update the content once provided. If you need help creating text or layout suggestions, we can assist as well."
    // },
    // {
    //   question: "Can I upgrade my plan later?",
    //   answer: "Yes. You can upgrade to a higher package or add monthly maintenance anytime. Your existing website will simply be enhanced with the new features included in the upgraded plan."
    // },
    // {
    //   question: "Do you work with custom systems or dashboards?",
    //   answer: "Yes. Our Advance and Custom plans support complex systems, admin dashboards, workflows, automation, integrations, and scalable architectures."
    // },
    // {
    //   question: "Who owns the website after it’s built?",
    //   answer: "You fully own the website, design, and content after completion. If you stop your maintenance plan, you may request files or migration support."
    // },
    // {
    //   question: "Do you offer refunds?",
    //   answer: "Yes. We offer a 14-day money-back guarantee for monthly plans. One-time project refunds depend on project progress and are handled case-by-case."
    // },
    // {
    //   question: "What payment methods do you accept?",
    //   answer: "We support local bank transfers, GCash, Maya, PayPal, and credit/debit card payments depending on the client’s preference."
    // },
    // {
    //   question: "Do you offer support after the website launch?",
    //   answer: "Yes. If you choose a maintenance plan, you receive ongoing support based on your chosen tier. For one-time builds, we provide basic post-launch support."
    // },
    // {
    //   question: "Can you connect my website to third-party tools?",
    //   answer: "Yes. Depending on your plan, we integrate with tools like email marketing platforms, CRMs, booking systems, analytics, payment processors, and more."
    // }
  ];

  const [page, setPage] = useState(1);
  const [loadedFAQ, setLoadedFAQ] = useState(questions.slice(0, 5))

  function loadMoreFAQs() {
    setPage(page + 1);
    const newFAQs = questions.slice(0, (page + 1) * 5);
    setLoadedFAQ(newFAQs);
  }

  return (
    <section id="FAQ" className="py-20 bg-white text-black dark:bg-black-primary dark:text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white"
        >
          Frequently Asked <span className="text-darkgreen-primary dark:text-green-primary">Questions</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-400"
        >
          Here are some of the most common questions we receive from our clients.
        </motion.p>

        {/* FAQ List */}
        <div className="max-w-5xl mx-auto text-left space-y-6">
          {loadedFAQ.map((item, i) => (
            <Questions_FAQ item={item} i={i} key={i} />
          ))}

          {/* Load More Button */}
          {loadedFAQ.length < questions.length && (
            <button
              name="load more faqs"
              onClick={loadMoreFAQs}
              className="cursor-pointer px-4 py-2 rounded-md mx-auto flex items-center gap-2 transition-all duration-300 text-sm font-medium border bg-darkgreen-primary/5 text-darkgreen-primary border-darkgreen-primary hover:bg-darkgreen-primary hover:text-white dark:bg-green-primary/5 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-400 dark:hover:text-black"
            >
              Load More FAQs
            </button>
          )}
        </div>
      </div>
    </section>

  )
}