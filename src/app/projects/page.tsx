"use client"

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Lock, Info, ImageOff } from "lucide-react";
import ArvoCard from "@/components/ui/arvo/ArvoCard";
import Image from "next/image";

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
  design: string;
  icons: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedProject) return;
    
    if (e.key === "Escape") setSelectedProject(null);
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  }, [selectedProject, currentImageIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const hasImages = (project: Project | null) => project && project.images && project.images.length > 0;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProject && hasImages(selectedProject)) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedProject && hasImages(selectedProject)) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

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
      title: "Fluxo",
      description: "Fluxo is a showcase of clean and modern web design, featuring responsive layouts, elegant UI components.",
      images: [
        { src: "projects/fluxo/fluxo.png", caption: "The main landing page showing the hero section." }
      ],
      url: "https://fluxo-alpha.vercel.app/",
      design: "Design Only",
      icons: ["react/react-original.svg", "tailwindcss/tailwindcss-original.svg", "html5/html5-original.svg"]
    },
    {
      title: "MIS Platform",
      description: "An all-in-one management platform for admins and employees. Features a neuglassmorphism design and eye-candies as well as a robust backend",
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
      design: "Full Stack",
      icons: ["php/php-original.svg", "codeigniter/codeigniter-plain.svg", "jquery/jquery-original.svg", "html5/html5-original.svg"]
    }
  ];

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-[1px] w-full bg-[repeating-linear-gradient(to_right,#065f46_0_12px,transparent_12px_24px)]"
        ></motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:pt-12 pt-8 lg:px-0 sm:p-6">
          {projects.map((project, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer"
            >
              <ArvoCard 
                onView={false} 
                index={i} 
                title={project.title}
                description={project.description}
                image={project.images?.[0]?.src || PLACEHOLDER_IMAGE} 
                url={project.url}
                design={project.design}
                icons={project.icons}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex bg-black/95 backdrop-blur-sm overflow-hidden"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 md:top-4 md:left-4 w-fit z-[60] p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <X size={28} />
            </button>

            <div className="flex w-full h-full flex-col lg:flex-row">
              <div className="relative flex-1 h-full flex items-center justify-center bg-black" onClick={(e) => e.stopPropagation()}>
                {hasImages(selectedProject) && selectedProject.images.length > 1 && (
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 z-10 p-2 bg-black/40 hover:bg-white/10 rounded-full text-white transition-colors"
                  >
                    <ChevronLeft size={36} />
                  </button>
                )}

                <motion.div 
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center p-4"
                >
                  {hasImages(selectedProject) ? (
                    <>
                      <img
                        src={selectedProject.images[currentImageIndex].src}
                        alt={selectedProject.title}
                        className="max-h-full max-w-full object-contain shadow-2xl"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm p-4 text-center">
                        <p className="text-white text-sm md:text-base font-medium">
                          {selectedProject.images[currentImageIndex].caption}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-500">
                      <ImageOff size={64} className="mb-4 opacity-50" />
                      <p>No images available</p>
                    </div>
                  )}
                </motion.div>

                {hasImages(selectedProject) && selectedProject.images.length > 1 && (
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 z-10 p-2 bg-black/40 hover:bg-white/10 rounded-full text-white transition-colors"
                  >
                    <ChevronRight size={36} />
                  </button>
                )}
              </div>

              <div 
                className="w-full lg:w-[350px] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col p-6 z-20 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-black dark:text-white">
                      {selectedProject.title}
                    </h3>
                    {selectedProject.design && (
                      <span className="flex items-center gap-1 px-2 py-1 text-[10px] uppercase font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800/50">
                        <Info size={10} />
                        {selectedProject.design}
                      </span>
                    )}
                  </div>

                  {hasImages(selectedProject) && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <span>{currentImageIndex + 1} / {selectedProject.images.length}</span>
                    </div>
                  )}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-200 dark:border-zinc-800">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Technologies</p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {selectedProject.icons.map((icon) => (
                      <Image key={icon} width={800} height={800} alt={icon} src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`} className="lg:w-8 md:w-6 " />
                    ))}
                  </div>
                  
                  {selectedProject.url ? (
                    <a 
                      href={selectedProject.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-green-primary/70 hover:bg-green-600 text-white font-medium rounded-md transition-colors"
                    >
                      Visit Project <ExternalLink size={16} />
                    </a>
                  ) : (
                    <button 
                      disabled
                      className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 dark:bg-zinc-800 text-gray-400 cursor-not-allowed font-medium rounded-md border border-gray-200 dark:border-zinc-700"
                    >
                      Private Application <Lock size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}