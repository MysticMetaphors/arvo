"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-black-primary">

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
                  <li className="fa-solid fa-envelope text-lg p-2 rounded-sm bg-green-primary/60"></li>
                  <p className="text-md">j3rry.tagle@gmail.com</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-center">
                  <li className="fa-solid fa-phone text-lg p-2 rounded-sm bg-green-primary/60"></li>
                  <p className="text-md">+63 917 115 3726</p>
                </motion.div>
                <motion.a
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 2 * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  href="https://www.linkedin.com/in/jerrytagle/"
                  className="flex gap-4 items-center">
                  <li className="fa-brands fa-linkedin-in bg-blue-500/70 px-2 text-xl p-1.5 rounded"></li>
                  <p className="text-md underline underline-offset-5">Jerry Tagle</p>
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 3 * 0.1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  href="https://slack.com/"
                  className="flex gap-4 items-center">
                  <div
                    className="inline-block w-8 h-8 rounded bg-gray-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path fill="#E01E5A" d="M190.1 379.1C190.1 405 168.9 426.2 143 426.2C117.1 426.2 96 405 96 379.1C96 353.2 117.2 332 143.1 332L190.2 332L190.2 379.1zM213.8 379.1C213.8 353.2 235 332 260.9 332C286.8 332 308 353.2 308 379.1L308 496.9C308 522.8 286.8 544 260.9 544C235 544 213.8 522.8 213.8 496.9L213.8 379.1z" />
                      <path fill="#27aad2ff" d="M260.9 190.1C235 190.1 213.8 168.9 213.8 143C213.8 117.1 235 96 260.9 96C286.8 96 308 117.2 308 143.1L308 190.2L260.9 190.2zM260.9 213.8C286.8 213.8 308 235 308 260.9C308 286.8 286.8 308 260.9 308L143.1 308C117.2 308 96 286.8 96 260.9C96 235 117.2 213.8 143.1 213.8L260.9 213.8z" />
                      <path fill="#2EB67D" d="M449.9 260.9C449.9 235 471.1 213.8 497 213.8C522.9 213.8 544 235 544 260.9C544 286.8 522.8 308 496.9 308L449.8 308L449.8 260.9zM426.2 260.9C426.2 286.8 405 308 379.1 308C353.2 308 332 286.8 332 260.9L332 143.1C332 117.2 353.2 96 379.1 96C405 96 426.2 117.2 426.2 143.1L426.2 260.9z" />
                      <path fill="#ECB22E" d="M379.1 449.9C405 449.9 426.2 471.1 426.2 497C426.2 522.9 405 544 379.1 544C353.2 544 332 522.8 332 496.9L332 449.8L379.1 449.8zM379.1 426.2C353.2 426.2 332 405 332 379.1C332 353.2 353.2 332 379.1 332L496.9 332C522.8 332 544 353.2 544 379.1C544 405 522.8 426.2 496.9 426.2L379.1 426.2z" />
                    </svg>
                  </div>
                  <p className="text-md underline underline-offset-5">Arvo</p>
                </motion.a>
              </div>

            </div>
          </div>
          <div className="col-span-3 z-10 pl-0 lg:pl-20">{/* bg-radial-[at_100%_100%] from-green-primary from-5% to-gray-900 to-40%  */}
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              action="" className="bg-gradient-to-t from-green-primary/20 via-gray-900 to-gray-900 border border-gray-700 rounded-lg h-full w-full z-10 p-8 md:p-10 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstname" className="block text-white mb-2">Firstname</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your firstname"
                    className="w-full p-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
                  />
                </div>

                <div>
                  <label htmlFor="lastname" className="block text-white mb-2">Lastname</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your lastname"
                    className="w-full p-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
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
                    className="w-full p-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
                  />
                </div>

                <div>
                  <label htmlFor="number" className="block text-white mb-2">Number</label>
                  <input
                    type="tel"
                    id="number"
                    name="number"
                    placeholder="Enter your phone number"
                    className="w-full p-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
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
                  className="w-full p-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-green-primary"
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