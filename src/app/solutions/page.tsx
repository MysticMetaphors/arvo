"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArvoInspectProject from "@/components/ui/arvo/ArvoInspectProject";
import ProjectSpotlight from "@/components/ui/arvo/ProjectSpotlight";
import projectsData from "./projects.json";
import { Project } from "@/types";

// =========================================================================
// HOW TO ADD A NEW PROJECT
// =========================================================================
// 1. Open src/app/projects/projects.json
// 2. Add a new object to the array using the template below.
// 3. To add a video, set the "type" property in the image object to "video".
//
// TEMPLATE:
// {
//   "title": "Project Name",
//   "description": "Brief description.",
//   "images": [
//     { "src": "projects/folder/img.png", "caption": "Caption", "type": "image" }
//   ],
//   "url": "https://hatsune.miku",
//   "category": "Category Name",
//   "tooltip": "Tooltip Text",
//   "tooltip_design": "green",
//   "isGray": false,
//   "icons": ["react/react-original.svg", "typescript/typescript-original.svg"]
// }
// =========================================================================

const projects = projectsData as unknown as Project[];
const CATEGORIES = ["All Projects", ...Array.from(new Set(projects.map((p) => p.category)))];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Enterprise Solutions": "Robust, scalable applications designed to streamline complex business operations, manage large datasets, and optimize organizational workflows.",
  "Landing Pages": "High-impact, visually stunning web pages crafted to convert visitors, showcase brand identity, and tell compelling stories.",
  "Dev Ops": "Infrastructure automation, CI/CD pipelines, and intelligent system agents that ensure reliability, uptime, and seamless deployment.",
  "Games": "Interactive experiences blending creative mechanics with engaging visuals for pure entertainment and challenge."
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const visibleCategories = activeCategory === "All Projects"
    ? CATEGORIES.filter(c => c !== "All Projects")
    : [activeCategory];

  const handleProjectSelect = (project: Project, index: number) => {
    setSelectedProject(project);
    setSelectedImageIndex(index);
  };

  return (
    <section id="projects" className="relative bg-white dark:bg-black-primary overflow-hidden min-h-screen">
      <div className="px-7 pt-30 pb-8 max-w-7xl mx-auto z-10 relative">

        {/* ================= HEADER GROUP ================= */}
        <div className="mb-16 space-y-8">

          {/* Top Row: Title + Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-4xl leading-tight font-extrabold text-black dark:text-white"
              >
                Live <span className="text-darkgreen-primary dark:text-green-primary">Solutions</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-gray-600 dark:text-gray-400 mt-2 max-w-lg"
              >
                A collection of completed projects that already made real world impacts.
              </motion.p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            {/* Filter Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 order-2 md:order-1"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${activeCategory === category
                    ? "bg-transparent text-darkgreen-primary border-darkgreen-primary dark:text-green-primary dark:border-green-primary"
                    : "bg-white dark:bg-zinc-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-zinc-800 hover:border-darkgreen-primary dark:hover:border-green-primary/50 hover:text-black dark:hover:text-white cursor-pointer"
                    }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative w-full md:w-72 order-1 md:order-2"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-zinc-500"></i>
              </div>
              <input
                type="text"
                className="placeholder-zinc-500 w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-all shadow-sm"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>

        {/* ================= PROJECTS GRID ================= */}
        <div className="lg:px-0 sm:p-0">
          {visibleCategories.map((category, index) => {
            const categoryProjects = projects.filter((project) => {
              const matchesCategory = project.category === category;
              const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesCategory && matchesSearch;
            });

            if (categoryProjects.length === 0) return null;

            return (
              <div key={category} className="mb-24 last:mb-0">
                <div className="md:mb-20 mb-10 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-700 to-transparent"></div>
                {/* Category Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 pl-2"
                >
                  <div className="flex items-center gap-3 mb-2 relative">
                    <i className="absolute -left-3 text-[100px] opacity-0 md:opacity-[0.20] md:dark:opacity-[0.08] fa-solid fa-play text-darkgreen-primary dark:text-green-primary text-sm mt-12"></i>
                    <h3 className="text-2xl font-bold text-black dark:text-green-primary uppercase tracking-wide md:ml-25">
                      {category}
                    </h3>
                  </div>
                  {CATEGORY_DESCRIPTIONS[category] && (
                    <p className="text-gray-500 dark:text-gray-400 max-w-3xl md:ml-25 text-sm md:text-base leading-relaxed">
                      {CATEGORY_DESCRIPTIONS[category]}
                    </p>
                  )}
                </motion.div>

                <div className="md:mt-20 mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-700 to-transparent"></div>

                {/* Projects List */}
                <div className="flex flex-col">
                  <AnimatePresence mode="popLayout">
                    {categoryProjects.map((project, i) => (
                      <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <ProjectSpotlight
                          project={project}
                          onProjectSelect={handleProjectSelect}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ArvoInspectProject
        onSelectedProject={(p) => setSelectedProject(p)}
        selectedProject={selectedProject}
        initialImageIndex={selectedImageIndex}
      />
    </section>
  )
}