"use client";

import { motion } from "framer-motion";
import AuroraBackground from "../ui/background/AuroraBackground";
import Navigation from "../layouts/Navigation";

export default function HomePage() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden px-6">
      <Navigation />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,153,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,#0a0a0a_100%)] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'none\\' stroke=\\'%2300FF99\\' stroke-width=\\'0.5\\'/></svg>')]"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Let’s <span className="text-green-primary">Build Something Smart</span> Together.
        </h1>

        <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
          We craft intelligent, high-performance web solutions that help your
          business grow — built with clarity, precision, and purpose.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 rounded-full bg-green-400 shadow-[0_0_5px_#00FF99] hover:bg-green-600 text-black font-semibold hover:shadow-[0_0_40px_#00FF99] transition-all duration-300">
            Let’s Talk
          </button>
          <button className="px-8 py-3 bg-green-primary/5 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300">
            Our Work
          </button>
        </div>

        <p className="mt-14 text-gray-400 tracking-wider text-lg">
          Smart Development. Clear Delivery. Business Growth.
        </p>
      </motion.div>
      <AuroraBackground />
    </section>
  );
}
