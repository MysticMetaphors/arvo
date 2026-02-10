"use client";

import { motion } from "framer-motion";
// import { useState } from "react";
import { appendToast } from "@/lib/global";
import { faFacebookF, faInstagram, faLinkedinIn, faThreads, faXTwitter } from "@fortawesome/free-brands-svg-icons";
<li className="fa-brands fa-linkedin-in bg-blue-500/70 px-2 text-xl p-1.5 rounded text-white"></li>
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
// import { sub } from "framer-motion/client";

type ContactProp = {
  onView?: boolean,
}

export default function Contact({ onView }: ContactProp) {
  // const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // setLoading(true);

    const submitButton = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;
    submitButton.disabled = true;
    submitButton.classList.add('opacity-50', 'cursor-not-allowed', 'pointer-events-none');

    const form = e.target as HTMLFormElement;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const number = (form.elements.namedItem("number") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();


    if (!name || !email || !number || !message) {
      appendToast('append-toast', 'error', 'Please complete the form before submitting.')
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
      return;
    }

    const subject = `📨 Message from ${name} via Arvo Website`;

    const formData = {
      access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
      from_name: `${name}`,
      name,
      email,
      number,
      message,
      subject,
    };


    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    submitButton.classList.remove('opacity-50', 'cursor-not-allowed', 'pointer-events-none');
    // setLoading(false);

    if (result.success) {
      appendToast('append-toast', 'success', 'Thanks for reaching out at Arvo!')
      form.reset();
    } else {
      appendToast('append-toast', 'error', 'Unexpected Error Occured!')
    }
  }

  const animationY = onView
    ? {
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
    }
    : {
      animate: { opacity: 1, y: 0 },
    };

  const animationX = onView
    ? {
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true },
    }
    : {
      animate: { opacity: 1, x: 0 },
    };

  return (
    <section id="contact" className="relative bg-white dark:bg-black-primary">
      <div className="mx-auto px-6 md:px-6 py-20 lg:py-30 max-w-7xl">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-2 gap-7">

          <div className="col-span-2 z-10">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                {...animationY}
                transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
                className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white">
                Contact <span className="text-darkgreen-primary dark:text-green-primary">Us</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                {...animationY}
                transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
                className="text-gray-600 dark:text-gray-400 text-lg text-justify mb-8">
                Have a question or a project in mind? Arvo is here to help you turn your vision into reality.
                Reach out to us today — let’s collaborate and create something exceptional together.
              </motion.p>

              <div className="space-y-8 p-8">
                {/* Socials Row */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  {...animationX}
                  transition={{ duration: 0.5, delay: 2 * 0.1, ease: "easeOut" }}
                  className="flex flex-wrap gap-4 items-center"
                >
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/jerrytagle/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedinIn} className="text-xl px-1 p-1.5 bg-blue-500 rounded-sm text-white dark:bg-blue-500/70" />
                  </a>

                  {/* Instagram */}
                  <a href="https://www.instagram.com/arvoi.t/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-2xl px-0.5 p-1 rounded-sm text-white bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]"
                    />
                  </a>

                  {/* X (Twitter) */}
                  <a href="https://x.com/it_vo96897" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} className="text-xl px-1 p-1.5 bg-black rounded-sm text-white dark:bg-black/70" />
                  </a>

                  {/* Facebook */}
                  <a href="https://www.facebook.com/ArvoITServices" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} className="text-xl px-1 p-1.5 bg-blue-700 rounded-sm text-white dark:bg-blue-700/70" />
                  </a>

                  {/* Threads */}
                  <a href="https://www.threads.com/@arvoi.t?hl=en" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faThreads} className="text-xl px-1 p-1.5 bg-neutral-900 rounded-sm text-white dark:bg-neutral-900/70" />
                  </a>
                </motion.div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-700 to-transparent"></div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  {...animationX}
                  transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
                  className="flex gap-4 items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xl px-1 p-1.5 bg-green-primary rounded-sm text-white dark:bg-green-primary/70" />
                  <p className="text-md">jerry.tagle@arvo.team</p>
                </motion.div>

                {/* Phone */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  {...animationX}
                  transition={{ duration: 0.5, delay: 1 * 0.1, ease: "easeOut" }}
                  className="flex gap-4 items-center">
                  <FontAwesomeIcon icon={faPhone} className="text-xl px-1 p-1.5 bg-green-primary rounded-sm text-white dark:bg-green-primary/70" />
                  <p className="text-md">+63 917 115 3726</p>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="col-span-3 z-10 pl-0 lg:pl-20">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 40 }}
              {...animationY}
              transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
              action="" className="bg-gradient-to-t from-darkgreen-primary/20 via-white to-white dark:from-green-primary/8 dark:via-gray-800/[0.50] dark:to-gray-800/[0.50] border border-gray-200 dark:border-gray-700/60 rounded-lg h-full w-full z-10 p-8 md:p-10 flex flex-col gap-5">

              <div>
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white mb-2 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="w-full p-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800/[0.40] text-black dark:text-white border border-gray-300 dark:border-gray-700 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:border-darkgreen-primary dark:focus:border-green-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white mb-2 ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@company.com"
                    className="w-full p-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800/[0.40] text-black dark:text-white border border-gray-300 dark:border-gray-700 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:border-darkgreen-primary dark:focus:border-green-primary"
                  />
                </div>

                <div>
                  <label htmlFor="number" className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white mb-2 ml-1">
                    Number
                  </label>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800/[0.40] text-black dark:text-white border border-gray-300 dark:border-gray-700 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:border-darkgreen-primary dark:focus:border-green-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-black dark:text-white mb-2 ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={5}
                  className="w-full p-3 py-2 rounded-md bg-gray-50 dark:bg-slate-800/[0.40] text-black dark:text-white border border-gray-300 dark:border-gray-700 placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:border-darkgreen-primary dark:focus:border-green-primary"
                ></textarea>
              </div>

              <button
                name="submit message"
                type="submit"
                className="mt-5 border bg-darkgreen-primary/5 text-darkgreen-primary border-darkgreen-primary font-semibold transition-all duration-300 py-3 px-6 rounded-md hover:bg-darkgreen-primary hover:text-white dark:bg-green-primary/5 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-400 dark:hover:text-black"
              >
                Submit Message
              </button>
            </motion.form>
          </div>
        </div>
      </div>
      <div id="append-toast" className="w-fit space-y-3 fixed top-5 left-10 md:left-15 z-100 flex flex-col">

      </div>
    </section>
  )
}