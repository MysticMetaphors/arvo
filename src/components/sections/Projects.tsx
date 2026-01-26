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
      "title": "Inventory System",
      "description": "A complete inventory system for an entire company's products. Includes purchase/sales orders, invoices, report generation, and more.",
      "images": [
        {
          "src": "projects/inventory/inventory.png",
          "caption": "The list of products and its inventory count."
        },
        {
          "src": "projects/inventory/products_01.png",
          "caption": "The list of products and its details (how much it costs, which branch it is attached to, the supplier, etc)."
        },
        {
          "src": "projects/inventory/products_02.png",
          "caption": "New product entry."
        },
        {
          "src": "projects/inventory/releasing_01.png",
          "caption": "Releasing of products."
        },
        {
          "src": "projects/inventory/releasing_02.png",
          "caption": "Releasing of products."
        },
        {
          "src": "projects/inventory/dashboard_01.png",
          "caption": "The dashboard overlooking data analytics for growth purposes."
        },
        {
          "src": "projects/inventory/dashboard_02.png",
          "caption": "Includes the list of admins logged in, with backup and security options for data integrity."
        },
        {
          "src": "projects/inventory/login.png",
          "caption": "The login page."
        }
      ],
      "url": "",
      "category": "Enterprise Solutions",
      "tooltip": "Full Stack",
      "tooltip_design": "blue",
      "isGray": false,
      "icons": [
        "php/php-original.svg",
        "codeigniter/codeigniter-plain.svg",
        "jquery/jquery-original.svg",
        "html5/html5-original.svg"
      ]
    },
    {
      "title": "Arvo Atlas MIS Platform",
      "description": "An all-in-one management platform for admins and employees. Features extensive management capabilities, overlooking analytics, and tons of data inputs for the entire company.",
      "images": [
        {
          "src": "projects/atlas/inquiries_01.png",
          "caption": "The dashboard for company inquiries."
        },
        {
          "src": "projects/atlas/inquiries_02.png",
          "caption": "The dashboard for company inquiries."
        },
        {
          "src": "projects/atlas/inquiries_03.png",
          "caption": "The dashboard for company inquiries."
        },
        {
          "src": "projects/atlas/inquiries_04.png",
          "caption": "Creating new inquiry."
        },
        {
          "src": "projects/atlas/claims_01.png",
          "caption": "The dashboard for company claims from customers."
        },
        {
          "src": "projects/atlas/claims_02.png",
          "caption": "A single claim request clicked..."
        },
        {
          "src": "projects/atlas/claims_03.png",
          "caption": "... and approved!"
        },
        {
          "src": "projects/atlas/hris_01.png",
          "caption": "The dashboard for employees and applicants."
        },
        {
          "src": "projects/atlas/hris_02.png",
          "caption": "Extensive record keeping."
        },
        {
          "src": "projects/atlas/hris_03.png",
          "caption": "Extensive record keeping."
        },
        {
          "src": "projects/atlas/hris_04.png",
          "caption": "Extensive record keeping."
        },
        {
          "src": "projects/atlas/attendance_01.png",
          "caption": "The online attendance system for the employees."
        },
        {
          "src": "projects/atlas/attendance_02.png",
          "caption": "The history for the employee's attendance (calendar format)."
        },
        {
          "src": "projects/atlas/attendance_03.png",
          "caption": "The history for the employee's attendance (table format)."
        },
        {
          "src": "projects/atlas/attendance_04.png",
          "caption": "The detailed list of the exact time-in and time-outs. Includes an export to Excel functionality."
        },
        {
          "src": "projects/atlas/attendance_05.png",
          "caption": "Supervisor Only: The list of the employees' attendance on a department."
        },
        {
          "src": "projects/atlas/pigeon_01.png",
          "caption": "Email service dashboard for marketing and campaign purposes."
        },
        {
          "src": "projects/atlas/pigeon_02.png",
          "caption": "Example of a campaign email to be sent to more than 5K+ recipients."
        },
        {
          "src": "projects/atlas/login.png",
          "caption": "The login page. You will need to enter a 6-character code."
        }
      ],
      "url": "",
      "category": "Enterprise Solutions",
      "tooltip": "Full Stack",
      "tooltip_design": "blue",
      "isGray": false,
      "icons": [
        "php/php-original.svg",
        "codeigniter/codeigniter-plain.svg",
        "jquery/jquery-original.svg",
        "html5/html5-original.svg"
      ]
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
            A collection of completed projects that already made real world impacts.
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
          <Link href="/solutions" className="cursor-pointer px-6 py-2 rounded-full font-semibold transition-all duration-300 border bg-darkgreen-primary/5 text-darkgreen-primary border-darkgreen-primary hover:bg-darkgreen-primary hover:text-white dark:bg-green-primary/5 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-400 dark:hover:text-black">
            View More
          </Link>
        </div>
      </div>
    </section >
  )
}