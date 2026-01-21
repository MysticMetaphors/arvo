"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ToggleTheme } from "../ui/ToggleTheme";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-100 absolute z-10 top-5 left-1/2 transform -translate-x-1/2 max-w-7xl w-full px-6 py-4 bg-transparent flex items-center justify-between rounded-full">
      <Image height={800} width={800} src="/Arvo_logo_rb.png" alt="Arvo Logo" className="h-8 w-fit z-110" />

      <div className="hidden md:flex items-center gap-6 text-gray-900 dark:text-white">
        <Link
          href="/"
          className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary hover:underline underline-offset-4 transition-all">
          Home
        </Link>
        <Link
          href="/solutions"
          className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary hover:underline underline-offset-4 transition-all">
          Solutions
        </Link>
        <Link
          href="/services"
          className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary hover:underline underline-offset-4 transition-all">
          Services
        </Link>
        <Link
          href="/pricing"
          className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary hover:underline underline-offset-4 transition-all">
          Pricing
        </Link>
        <Link
          href="/team"
          className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary hover:underline underline-offset-4 transition-all">
          Team
        </Link>
        <Link
          href="/contact"
          className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary hover:underline underline-offset-4 transition-all">
          Contact
        </Link>
        {/* <ToggleTheme className="py-2 px-2 rounded-full bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-700" animationType="fade-in-out" isScrollAppear={false} /> */}
      </div>

      <div className="md:hidden flex gap-6 items-center">
        {/* <ToggleTheme className="py-2 px-2 rounded-full bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-700 z-110" animationType="fade-in-out" isScrollAppear={false} /> */}

        <button
          className="z-110 text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-2xl text-gray-800 dark:text-white`}></i>
        </button>
      </div>

      {isOpen && (
        <div className="absolute border border-darkgreen-primary dark:border-green-primary/50 pt-20 -top-10 left-0 w-full bg-gray-50/70 dark:bg-gray-900/90 backdrop-blur-md mt-3 py-5 rounded-lg flex flex-col items-center gap-4 text-black dark:text-white md:hidden">
          <Link
            href="/"
            className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary transition-all"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/solutions"
            className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary transition-all"
            onClick={() => setIsOpen(false)}
          >
            Solutions
          </Link>
          <Link
            href="/services"
            className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary transition-all"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/pricing"
            className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary transition-all"
            onClick={() => setIsOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/team"
            className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary transition-all"
            onClick={() => setIsOpen(false)}
          >
            Team
          </Link>
          <Link
            href="/contact"
            className="cursor-pointer hover:text-darkgreen-primary font-semibold dark:hover:text-green-primary transition-all"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

