"use client"

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArvoCard from "@/components/ui/arvo/ArvoCard";
import ArvoInspectProject from "@/components/ui/arvo/ArvoInspectProject";

const PLACEHOLDER_IMAGE = "/images/placeholder.png";
const CATEGORIES = ["All", "Enterprise Solutions", "Landing Pages", "Games"];

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
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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
    //   category: "Category Name",
    //   tooltip: "Tooltip Text",
    //   tooltip_design: "green",
    //   isGray: false,
    //   icons: ["react", "typescript"]
    // },
    // =========================================================================

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
    {
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components.",
      images: [
        { src: "projects/fluxo/fluxo.png", caption: "The main landing page showing the hero section." }
      ],
      url: "https://fluxo-alpha.vercel.app/",
      category: "Landing Pages",
      tooltip: "Design Only",
      tooltip_design: "green",
      isGray: false,
      icons: ["react/react-original.svg", "tailwindcss/tailwindcss-original.svg", "html5/html5-original.svg"]
    },
    // {
    //   title: "Lean",
    //   description: "Lean is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components.",
    //   images: [
    //     { src: "projects/leanademy/landing_1.jpeg", caption: "The main landing page showing the hero section." },
    //     { src: "projects/leanademy/landing_2.jpeg", caption: "The main landing page showing the hero section." },
    //     { src: "projects/leanademy/landing_3.jpeg", caption: "The main landing page showing the hero section." },
    //     { src: "projects/leanademy/landing_4.jpeg", caption: "The main landing page showing the hero section." }
    //   ],
    //   url: "https://fluxo-alpha.vercel.app/",
    //   category: "Landing Pages",
    //   tooltip: "Design Only",
    //   tooltip_design: "green",
    //   isGray: false,
    //   icons: ["react/react-original.svg", "tailwindcss/tailwindcss-original.svg", "html5/html5-original.svg"]
    // },
    {
      title: "Enro",
      description: "This site is a showcase of sleek and modern web design, highlighting a polished landing page and intuitive dashboard layout.",
      images: [
        { src: "projects/enro/landing_1.png", caption: "TODO: Add text" },
        { src: "projects/enro/landing_2.png", caption: "TODO: Add text" },
        { src: "projects/enro/landing_3.png", caption: "TODO: Add text" },
        { src: "projects/enro/landing_4.png", caption: "TODO: Add text" },
        { src: "projects/enro/dashboard.png", caption: "TODO: Add text" },
      ],
      url: "",
      category: "Landing Pages",
      tooltip: "Design Only",
      tooltip_design: "purple",
      isGray: true,
      icons: ["nextjs/nextjs-original.svg", "tailwindcss/tailwindcss-original.svg", "html5/html5-original.svg"]
    },
    {
      title: "Syro",
      description: "This site showcases sleek and modern web design, featuring a polished landing, enriched with beautiful visual assets and subtle, elegant animations.",
      images: [
        { src: "projects/syro/landing_1.png", caption: "TODO: Add text" },
      ],
      url: "",
      category: "Landing Pages",
      tooltip: "Design Only",
      tooltip_design: "red",
      isGray: true,
      icons: ["nextjs/nextjs-original.svg", "tailwindcss/tailwindcss-original.svg", "html5/html5-original.svg"]
    },
    {
      title: "Honeyrush - Tile Matching Game",
      description: "A cute game about matching objects and bees!",
      images: [
        { src: "projects/honeyrush/main_menu.png", caption: "Main menu" },
        { src: "projects/honeyrush/gameplay.png", caption: "Gameplay" },
        { src: "projects/honeyrush/prompt_1.png", caption: "Gameplay" },
        { src: "projects/honeyrush/prompt_2.png", caption: "Gameplay" },
        { src: "projects/honeyrush/leaderboard.png", caption: "Compete with others for a spot in the leaderboards!" },
      ],
      url: "https://honeyrush.tewi.club",
      category: "Games",
      tooltip: "Full Stack",
      tooltip_design: "blue",
      isGray: false,
      icons: ["php/php-original.svg", "laravel/laravel-original.svg", "jquery/jquery-original.svg", "html5/html5-original.svg"]
    },
    {
      title: "Mochi - Incremental Rhythm Game",
      description: "An experimental game about the combination of incremental game mechanics and rhythm game mechanics.",
      images: [
        { src: "projects/mochi/gameplay.png", caption: "Gameplay" },
      ],
      url: "https://mochi.tewi.club",
      category: "Games",
      tooltip: "Full Stack",
      tooltip_design: "blue",
      isGray: false,
      icons: ["php/php-original.svg", "laravel/laravel-original.svg", "jquery/jquery-original.svg", "html5/html5-original.svg"]
    },
  ];

  // Logic to determine which categories to show
  // If "All" is selected, we show all categories that are not "All"
  // If specific category is selected, we show only that one
  const visibleCategories = activeCategory === "All"
    ? CATEGORIES.filter(c => c !== "All")
    : [activeCategory];

  return (
    <section id="projects" className="relative bg-white dark:bg-black-primary overflow-hidden min-h-screen">
      <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-full bg-gradient-to-t from-transparent via-green-primary/20 to-transparent dark:via-green-primary/10 pointer-events-none"></div>

      <div className="px-6 md:px-6 pt-20 pb-8 lg:pt-30 lg:px-12 z-10 relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-4 text-4xl leading-tight font-extrabold text-black dark:text-white"
        >
          Recent <span className="text-darkgreen-primary dark:text-green-primary">Projects</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400 mx-auto mb-6"
        >
          A collection of projects that reflect our passion for clean design and smart development.
        </motion.p>

        {/* Initial Separator */}
        <div
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)] mb-8"
          style={{ opacity: 1, transform: "none" }}
        ></div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-16"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === category
                ? "bg-green-primary text-black border-green-primary shadow-[0_0_10px_rgba(0,255,153,0.3)]"
                : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-zinc-800 hover:border-green-primary/50"
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="lg:px-0 sm:p-6">
          {visibleCategories.map((category, index) => {
            const categoryProjects = projects.filter((project) => project.category === category);

            if (categoryProjects.length === 0) return null;

            return (
              <div key={category} className="mb-20 last:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-bold text-black dark:text-white flex items-center gap-4">
                    <i className="fa-solid fa-play text-darkgreen-primary dark:text-green-primary"></i> {category}
                  </h3>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-x-8 gap-y-12">
                  <AnimatePresence mode="popLayout">
                    {categoryProjects.map((project, i) => (
                      <div
                        key={project.title}
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
                  </AnimatePresence>
                </div>

                {/* Category Separator - Only shown if it is not the last category */}
                {index !== visibleCategories.length - 1 && (
                  <div
                    className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)] mt-20"
                    style={{ opacity: 1, transform: "none" }}
                  ></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ArvoInspectProject 
        onSelectedProject={setSelectedProject}
        selectedProject={selectedProject}
      />
    </section>
  )
}