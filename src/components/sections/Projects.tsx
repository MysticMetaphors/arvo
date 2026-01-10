"use client"

import Link from "next/link";
import ArvoCard from "../ui/arvo/ArvoCard";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Lock, Info, ImageOff } from "lucide-react";
import Image from "next/image";
import ArvoInspectProject from "../ui/arvo/ArvoInspectProject";

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

interface ProjectImage {
  src: string;
  caption: string;
}

interface Project {
  title: string;
  description: string;
  images: ProjectImage[];
  url: string;
  category: string;
  tooltip: string;
  tooltip_design: "green" | "blue" | "purple" | "red";
  isGray: boolean;
  icons: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    // =========================================================================
    // TEMPLATE
    // {
    //   title: "Project Name",
    //   description: "Brief description.",
    //   images: [
    //     { src: "projects/folder/img.png", caption: "Caption" }
    //   ],
    //   url: "https://hatsune.miku",
    //   design: "Design Only",
    //   icons: ["react", "typescript"]
    // },
    // =========================================================================
    {
      title: "Seinna Brews",
      description: "A cozy café made for slowing down, unwinding, and resetting—where comfort comes first and every visit feels like a warm pause from the world.",
      images: [
        { src: "projects/seinna-brews/image.png", caption: "The main landing page showing the hero section." }
      ],
      url: "https://sienna-brews.vercel.app/",
      category: "Landing Pages",
      tooltip: "Design Only",
      tooltip_design: "green",
      isGray: false,
      icons: ["nextjs/nextjs-original.svg", "tailwindcss/tailwindcss-original.svg", "html5/html5-original.svg"]
    },
    {
      title: "Solara Grand",
      description: "A luxury resort where every moment feels truly premium, blending refined comfort with unforgettable adventures and immersive experiences designed to excite, inspire, and indulge.",
      images: [
        { src: "projects/solara-grand/image.png", caption: "" },
      ],
      url: "https://solara-grand.vercel.app/",
      category: "Landing Pages",
      tooltip: "Design Only",
      tooltip_design: "purple",
      isGray: false,
      icons: ["nextjs/nextjs-original.svg", "tailwindcss/tailwindcss-original.svg", "html5/html5-original.svg"]
    },
    {
      title: "Lounge - Social Media",
      description: "A social platform that connects pets with their owners and communities.",
      images: [
        { src: "projects/lounge/feed.png", caption: "The feed from other users." },
        { src: "projects/lounge/landing_page.png", caption: "Landing page." },
      ],
      url: "https://metaanimals.tech",
      category: "Enterprise Solutions",
      tooltip: "Full Stack",
      tooltip_design: "blue",
      isGray: false,
      icons: ["php/php-original.svg", "laravel/laravel-original.svg", "jquery/jquery-original.svg", "html5/html5-original.svg"]
    },
    {
      title: "MIS Platform",
      description: "An all-in-one management platform for admins and employees. Features a neuglassmorphism design and eye-candies as well as a robust backend.",
      images: [
        { src: "projects/attendance/inquiries_1.png", caption: "Inquiry charts and graph (Demo data)" },
        { src: "projects/attendance/inquiries_2.png", caption: "Inquiry charts and graph (Demo data)" },
        { src: "projects/attendance/inquiries_3.png", caption: "TODO: Add text" },
        { src: "projects/attendance/inquiries_4.png", caption: "TODO: Add text" },
        { src: "projects/attendance/inquiries_5.png", caption: "TODO: Add text" },
        { src: "projects/attendance/inquiries_6.png", caption: "TODO: Add text" },
        { src: "projects/attendance/inquiries_7.png", caption: "TODO: Add text" },
        { src: "projects/attendance/email_service_1.png", caption: "TODO: Add text" },
        { src: "projects/attendance/email_service_2.png", caption: "TODO: Add text" },
        { src: "projects/attendance/email_service_3.png", caption: "TODO: Add text" },
        { src: "projects/attendance/employees_1.png", caption: "TODO: Add text" },
        { src: "projects/attendance/employees_2.png", caption: "TODO: Add text" },
        { src: "projects/attendance/claims_1.png", caption: "TODO: Add text" },
        { src: "projects/attendance/claims_2.png", caption: "TODO: Add text" },
        { src: "projects/attendance/claims_3.png", caption: "TODO: Add text" },
        { src: "projects/attendance/claims_4.png", caption: "TODO: Add text" },
        { src: "projects/attendance/ai.png", caption: "TODO: Add text" },
        { src: "projects/attendance/attendance_department.png", caption: "TODO: Add text" },
        { src: "projects/attendance/attendance_1.png", caption: "TODO: Add text" },
        { src: "projects/attendance/attendance_2.png", caption: "TODO: Add text" },
      ],
      url: "",
      category: "Enterprise Solutions",
      tooltip: "Full Stack",
      tooltip_design: "blue",
      isGray: true,
      icons: ["php/php-original.svg", "codeigniter/codeigniter-plain.svg", "jquery/jquery-original.svg", "html5/html5-original.svg"]
    },
  ];

  return (
    <section id="projects" className="relative overflow-hidden bg-white text-black dark:bg-black-primary dark:text-white">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full  bg-gradient-to-t from-transparent via-green-primary/20 to-transparent dark:via-green-primary/10 pointer-events-none"></div>

      <div className="mx-auto px-6 md:px-6 py-20 lg:py-30 z-10">
        <div className="text-center items-center flex flex-col">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white"
          >
            Our <span className="text-darkgreen-primary dark:text-green-primary">Work</span> Speaks for Itself
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className=" max-w-2xl mx-auto mb-12 text-gray-600 dark:text-gray-400"
          >
            A collection of projects that reflect our passion for clean design and smart development.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:pt-12 pt-8 max-w-7xl mx-auto sm:p-6">
          {projects.map((project, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <ArvoCard
                onView={true}
                index={i}
                title={project.title}
                description={project.description}
                image={project.images?.[0]?.src || PLACEHOLDER_IMAGE}
                url={project.url}
                tooltip={project.tooltip}
                tooltip_design={project.tooltip_design}
                isGray={project.isGray}
                icons={project.icons}
              />
            </div>
          ))}
        </div>

        <ArvoInspectProject
          onSelectedProject={setSelectedProject}
          selectedProject={selectedProject}
        />

        <div className="flex w-full justify-center mt-10">
          <Link href="/projects" className="cursor-pointer px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-darkgreen-primary text-white hover:shadow-[0_0_40px_#00FF99] dark:bg-green-primary dark:text-black dark:hover:shadow-[0_0_40px_#00FF99]">
            View More
          </Link>
        </div>
      </div>
    </section >
  )
}