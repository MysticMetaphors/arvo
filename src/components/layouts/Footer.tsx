import { faFacebookF, faInstagram, faLinkedinIn, faThreads, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t-4 border-green-600 dark:bg-[#0a0a0a] dark:text-gray-200 dark:border-green-primary">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-20">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="max-w-[300px] pr-20">
              <Link href="#">
                <Image
                  height={800}
                  width={800}
                  quality={75}
                  src="/Arvo_logo_rb.png"
                  className="h-8 w-fit mb-3"
                  alt="Arvo Logo"
                />
              </Link>
              <p>Smart Development. Clear Delivery. Business Growth.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-lg font-bold uppercase text-green-700 dark:text-green-primary/70">
                Navigation
              </h2>

              <ul className="text-gray-600 dark:text-gray-200">
                <li className="mb-3">
                  <Link href="/" className="hover:underline font-normal">Home</Link>
                </li>

                <li className="mb-3">
                  <Link href="/solutions" className="hover:underline font-normal">Solutions</Link>
                </li>

                <li className="mb-3">
                  <Link href="/members" className="hover:underline font-normal">Team</Link>
                </li>

                <li className="mb-3">
                  <Link href="/pricing" className="hover:underline font-normal">Pricing</Link>
                </li>

                <li className="mb-3">
                  <Link href="/services" className="hover:underline font-normal">Services</Link>
                </li>

                <li>
                  <Link href="/contact" className="hover:underline font-normal">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-bold uppercase text-green-700 dark:text-green-primary/70">Packages</h2>
              <ul className="text-gray-600 dark:text-gray-200">
                <li className="mb-3">
                  <Link href="/pricing/#starter" className="hover:underline ">Starter</Link>
                </li>
                <li className="mb-3">
                  <Link href="/pricing/#growth" className="hover:underline ">Growth</Link>
                </li>
                <li className="mb-3">
                  <Link href="/pricing/#professional" className="hover:underline ">Professional</Link>
                </li>
                <li className="mb-3">
                  <Link href="/pricing/#ecommerce" className="hover:underline ">E-commerce</Link>
                </li>
                <li>
                  <Link href="/pricing/#custom" className="hover:underline font-normal" >Custom</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-bold uppercase text-green-700 dark:text-green-primary/70">Contact</h2>
              <ul className="text-gray-600 dark:text-gray-200">
                <li className="mb-3">
                  <p className="hover:underline font-normal" >jerry.tagle@arvo.team</p>
                </li>
                <li className="mb-3">
                  <p className="hover:underline font-normal" >+63 917 115 3726</p>
                </li>
                <li className="flex gap-2">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/jerrytagle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 items-center text-gray-200"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedinIn}
                      className="text-xl px-1 p-1.5 bg-blue-500 rounded-sm text-white dark:bg-blue-500/70"
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
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-700 sm:mx-auto lg:my-15" />

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2025 <Link href="#" className="hover:underline font-normal">Arvo™</Link>. All Rights Reserved.
          </span>
        </div>

      </div>
    </footer >

  )
}