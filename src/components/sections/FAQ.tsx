"use client"

import { motion } from "framer-motion"
import Questions_FAQ from "../ui/Question-FAQ"
import { useState } from "react";

export default function FAQ() {
  const questions = [
    {
      question: "What services does Arvo provide?",
      answer: "Arvo builds modern, fast, and mobile-responsive websites for businesses. We offer one-time website development, custom systems, and optional monthly maintenance that covers hosting, updates, security, performance checks, and content edits."
    },
    {
      question: "How does the one-time payment work?",
      answer: "The one-time fee covers the complete design, development, setup, and launch of your website or system. No hidden costs. You only pay again if you choose optional monthly maintenance or request additional features."
    },
    {
      question: "Is monthly maintenance required?",
      answer: "No. Monthly maintenance is optional. It is recommended if you want us to handle hosting, security updates, speed optimization, content edits, or monitoring. You may choose a plan at any time."
    },
    {
      question: "What is included in the monthly maintenance?",
      answer: "Depending on the plan, maintenance may include hosting, backups, plugin and system updates, security checks, performance optimization, monitoring, content changes, and developer support hours."
    },
    {
      question: "How long does it take to finish a website?",
      answer: "Timelines vary per package: Starter: 5–10 days, Growth: 7–14 days, Professional: 2–5 weeks, Advance: 4–10 weeks. Revisions, content availability, and integrations may extend these estimates."
    },
    {
      question: "Do you provide hosting and domain?",
      answer: "Yes. All maintenance plans include hosting. Domains are not included, but we can assist in purchasing or connecting your existing domain."
    },
    {
      question: "Can I request revisions after the website is done?",
      answer: "Yes. Each plan includes a specific number of revisions. Additional or major changes can be done at an hourly or fixed cost depending on scope."
    },
    {
      question: "What if I don’t have content yet?",
      answer: "No problem. We can launch placeholders first and update the content once provided. If you need help creating text or layout suggestions, we can assist as well."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Yes. You can upgrade to a higher package or add monthly maintenance anytime. Your existing website will simply be enhanced with the new features included in the upgraded plan."
    },
    {
      question: "Do you work with custom systems or dashboards?",
      answer: "Yes. Our Advance and Custom plans support complex systems, admin dashboards, workflows, automation, integrations, and scalable architectures."
    },
    {
      question: "Who owns the website after it’s built?",
      answer: "You fully own the website, design, and content after completion. If you stop your maintenance plan, you may request files or migration support."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes. We offer a 14-day money-back guarantee for monthly plans. One-time project refunds depend on project progress and are handled case-by-case."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We support local bank transfers, GCash, Maya, PayPal, and credit/debit card payments depending on the client’s preference."
    },
    {
      question: "Do you offer support after the website launch?",
      answer: "Yes. If you choose a maintenance plan, you receive ongoing support based on your chosen tier. For one-time builds, we provide basic post-launch support."
    },
    {
      question: "Can you connect my website to third-party tools?",
      answer: "Yes. Depending on your plan, we integrate with tools like email marketing platforms, CRMs, booking systems, analytics, payment processors, and more."
    }
  ];

  const [page, setPage] = useState(1);
  const [loadedFAQ, setLoadedFAQ] = useState(questions.slice(0, 5))

  function loadMoreFAQs() {
    setPage(page + 1);
    const newFAQs = questions.slice(0, (page + 1) * 5);
    setLoadedFAQ(newFAQs);
  }

  return (
<section
  id="FAQ"
  className="
    py-20
    bg-white text-black
    dark:bg-black-primary dark:text-white
  "
>
  <div className="max-w-6xl mx-auto px-6 text-center">

    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="
        mb-4 text-4xl leading-tight font-extrabold
        text-black dark:text-white
      "
    >
      Frequently Asked <span className="text-darkgreen-primary dark:text-green-primary">Questions</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="
        max-w-2xl mx-auto mb-12
        text-gray-600 dark:text-gray-400
      "
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
          onClick={loadMoreFAQs}
          className="
            px-4 py-2 rounded-md mx-auto block transition-all duration-300
            border text-sm font-medium

            border-green-500 text-green-600 bg-green-100/30
            hover:bg-green-500 hover:text-black

            dark:border-green-400 dark:text-green-400 dark:bg-green-400/5
            dark:hover:bg-green-400 dark:hover:text-black
          "
        >
          Load More FAQs
        </button>
      )}
    </div>
  </div>
</section>

  )
}