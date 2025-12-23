"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArvoCard from "@/components/ui/arvo/ArvoCard";
import ArvoInspectProject from "@/components/ui/arvo/ArvoInspectProject";
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

const PLACEHOLDER_IMAGE = "/images/placeholder.png";
const projects = projectsData as unknown as Project[];
const CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

        {/* CONTROLS ROW: Filters (Left) and Search (Right) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-16">
          
          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
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

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative w-full md:w-64"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-green-primary focus:ring-1 focus:ring-green-primary transition-colors"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>

        <div className="lg:px-0 sm:p-6">
          {visibleCategories.map((category, index) => {
            // Filter by category AND search query
            const categoryProjects = projects.filter((project) => {
               const matchesCategory = project.category === category;
               const matchesSearch = 
                 project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 project.description.toLowerCase().includes(searchQuery.toLowerCase());
               
               return matchesCategory && matchesSearch;
            });

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
                          type={project.images?.[0]?.type || "image"}
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