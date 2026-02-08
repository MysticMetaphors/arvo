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
                  <Link href="/team" className="hover:underline font-normal">Team</Link>
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
                  <p className="hover:underline font-normal" >j3rry.tagle@gmail.com</p>
                </li>
                <li className="mb-3">
                  <p className="hover:underline font-normal" >+63 917 115 3726</p>
                </li>
                <li className="flex gap-2">
                  {/* <a
                    href="https://join.slack.com/t/arvo-etb3274/shared_invite/zt-3gphlymiu-8slTUnrz6Ngktj0h3KUc0Q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-8 h-8 rounded bg-gray-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                      <path fill="#E01E5A" d="M190.1 379.1C190.1 405 168.9 426.2 143 426.2C117.1 426.2 96 405 96 379.1C96 353.2 117.2 332 143.1 332L190.2 332L190.2 379.1zM213.8 379.1C213.8 353.2 235 332 260.9 332C286.8 332 308 353.2 308 379.1L308 496.9C308 522.8 286.8 544 260.9 544C235 544 213.8 522.8 213.8 496.9L213.8 379.1z" />
                      <path fill="#27aad2ff" d="M260.9 190.1C235 190.1 213.8 168.9 213.8 143C213.8 117.1 235 96 260.9 96C286.8 96 308 117.2 308 143.1L308 190.2L260.9 190.2zM260.9 213.8C286.8 213.8 308 235 308 260.9C308 286.8 286.8 308 260.9 308L143.1 308C117.2 308 96 286.8 96 260.9C96 235 117.2 213.8 143.1 213.8L260.9 213.8z" />
                      <path fill="#2EB67D" d="M449.9 260.9C449.9 235 471.1 213.8 497 213.8C522.9 213.8 544 235 544 260.9C544 286.8 522.8 308 496.9 308L449.8 308L449.8 260.9zM426.2 260.9C426.2 286.8 405 308 379.1 308C353.2 308 332 286.8 332 260.9L332 143.1C332 117.2 353.2 96 379.1 96C405 96 426.2 117.2 426.2 143.1L426.2 260.9z" />
                      <path fill="#ECB22E" d="M379.1 449.9C405 449.9 426.2 471.1 426.2 497C426.2 522.9 405 544 379.1 544C353.2 544 332 522.8 332 496.9L332 449.8L379.1 449.8zM379.1 426.2C353.2 426.2 332 405 332 379.1C332 353.2 353.2 332 379.1 332L496.9 332C522.8 332 544 353.2 544 379.1C544 405 522.8 426.2 496.9 426.2L379.1 426.2z" />
                    </svg>
                  </a> */}
                  <a
                    href="https://www.linkedin.com/in/jerrytagle/"
                    className="flex gap-4 items-center text-gray-200">
                    <ul>
                      <li className="fa-brands fa-linkedin-in bg-blue-500/70 px-2 text-xl p-1.5 rounded"></li>
                    </ul>
                  </a>
                  {/* <a
                    href="https://www.linkedin.com/in/jerrytagle/"
                    className="flex gap-4 items-center text-gray-200">
                    <ul>
                      <li className="fa-brands fa-facebook-f bg-blue-500/70 px-2 text-xl p-1.5 rounded"></li>
                    </ul>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jerrytagle/"
                    className="flex gap-4 items-center text-gray-200">
                    <ul>
                      <li className="fa-brands fa-instagram bg-blue-500/70 px-2 text-xl p-1.5 rounded"></li>
                    </ul>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jerrytagle/"
                    className="flex gap-4 items-center text-gray-200">
                    <ul>
                      <li className="fa-brands fa-x-twitter bg-blue-500/70 px-2 text-xl p-1.5 rounded"></li>
                    </ul>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jerrytagle/"
                    className="flex gap-4 items-center text-gray-200">
                    <ul>
                      <li className="fa-brands fa-threads bg-blue-500/70 px-2 text-xl p-1.5 rounded"></li>
                    </ul>
                  </a> */}
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