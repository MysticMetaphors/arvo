"use client";

import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-100 absolute z-10 top-5 left-1/2 transform -translate-x-1/2 max-w-7xl w-full px-6 py-4 bg-transparent flex items-center justify-between rounded-full">
      <img src="Arvo_logo_rb.png" alt="Logo" className="h-8 z-110 " />

      <div className="hidden md:flex gap-6 text-white">
        {["Home", "Projects", "Team", "Pricing", "Services", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="cursor-pointer hover:text-green-primary hover:underline underline-offset-4 transition-all"
          >
            {item}
          </a>
        ))}
      </div>

      <button
        className="md:hidden z-110 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-2xl`}></i>
      </button>

      {isOpen && (
        <div className="absolute border border-green-primary/50 pt-20 -top-10 left-0 w-full bg-gray-900/90 backdrop-blur-md mt-3 py-5 rounded-lg flex flex-col items-center gap-4 text-white md:hidden">
          {["Home", "Projects", "Team", "Pricing", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="cursor-pointer hover:text-green-primary transition-all"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

