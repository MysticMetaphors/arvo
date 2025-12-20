"use client"

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Lock, Info, ImageOff } from "lucide-react";
import Image from "next/image";

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

type InspectProjectProps = {
  onSelectedProject: (project: Project | null) => void;
  selectedProject: Project | null;
};



export default function ArvoInspectProject({ selectedProject ,onSelectedProject }: InspectProjectProps) {
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

    if (e.key === "Escape") onSelectedProject(null);
    if (e.key === "Escape") setCurrentImageIndex(0);
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
    //   category: "Category Name",
    //   tooltip: "Tooltip Text",
    //   tooltip_design: "green",
    //   isGray: false,
    //   icons: ["react", "typescript"]
    // },
    // =========================================================================

    {
      title: "Lounge - Social Media",
      description: "A social media for pets.",
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

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex bg-black/95 backdrop-blur-sm overflow-hidden"
        >
          <button
            onClick={() => [onSelectedProject(null), setCurrentImageIndex(0)]}
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
                  {selectedProject.tooltip && (
                    <span className="flex items-center gap-1 px-2 py-1 text-[10px] uppercase font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800/50">
                      <Info size={10} />
                      {selectedProject.tooltip}
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
                    <Image key={icon} width={800} height={800} alt={icon} src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`} className="w-8" />
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
  )
}