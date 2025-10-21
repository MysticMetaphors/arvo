"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="relative bg-black-primary">

      <div className="mx-auto px-6 md:px-6 py-20 lg:py-30 max-w-7xl">
        <div className="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-2 gap-7">
          <div className="col-span-2 z-10">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="mb-4 text-4xl leading-tight font-extrabold text-white">
                Contact <span className="text-green-primary">Us</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-gray-400 text-lg text-justify mb-8">
                Have a question or a project in mind? Arvo is here to help you turn your vision into reality.
                Reach out to us today — let’s collaborate and create something exceptional together.
              </motion.p>
              {/* <div className="absolute"> */}
              {/* <Phone> */}
              <div className="space-y-8 p-8">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-center">
                  <li className="fa-solid fa-envelope text-lg p-2 rounded-sm bg-green-primary/70"></li>
                  <p className="text-md">j3rry.tagle@gmail.com</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-center">
                  <li className="fa-solid fa-phone text-lg p-2 rounded-sm bg-green-primary/70"></li>
                  <p className="text-md">+63 917 115 3726</p>
                </motion.div>
                <motion.a
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 2 * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  href="https://linkedin.com/in/jerrytagle" className="flex gap-4 items-center">
                  <li className="fa-brands fa-linkedin-in text-lg p-2 rounded-sm bg-green-primary/70"></li>
                  <p className="text-md underline">Jerry Tagle</p>
                </motion.a>
              </div>
              {/* </Phone> */}
              {/* </div> */}
            </div>
          </div>
          <div className="col-span-3 z-10">{/* bg-radial-[at_100%_100%] from-green-primary from-5% to-gray-900 to-40%  */}
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              action="" className="bg-gradient-to-t from-green-primary/20 via-gray-900 to-gray-900 border border-gray-700 rounded-lg h-full w-full z-10 p-10 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstname" className="block text-white mb-2">Firstname</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your firstname"
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
                  />
                </div>

                <div>
                  <label htmlFor="lastname" className="block text-white mb-2">Lastname</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your lastname"
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
                  />
                </div>

                <div>
                  <label htmlFor="number" className="block text-white mb-2">Number</label>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    placeholder="Enter your phone number"
                    className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-5 bg-green-400/80 font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black py-3 px-6 rounded-md"
              >
                Submit
              </button>
            </motion.form>
          </div>
        </div>

        <div className="absolute bottom-0 inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.08)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,#0a0a0a_100%)] pointer-events-none"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'none\\' stroke=\\'%2300FF99\\' stroke-width=\\'0.5\\'/></svg>')]"></div>

      </div>
    </section>
  )
}