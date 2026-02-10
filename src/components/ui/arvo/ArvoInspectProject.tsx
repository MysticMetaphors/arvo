"use client"

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Lock, Info, ImageOff } from "lucide-react";
import Image from "next/image";
import { Project, ProjectImage } from "@/types";
import RichTextParser from "../RichTextParser";

type InspectProjectProps = {
  onSelectedProject: (project: Project | null) => void;
  selectedProject: Project | null;
  initialImageIndex?: number;
};

export default function ArvoInspectProject({ selectedProject, onSelectedProject, initialImageIndex = 0 }: InspectProjectProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(initialImageIndex);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedProject, initialImageIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedProject) return;

    if (e.key === "Escape") onSelectedProject(null);
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

  // Helper: Ensures external links don't get a double slash, but local files get the root slash
  const getSrc = (src: string) => {
    if (src.startsWith("http") || src.startsWith("//")) return src;
    return `/${src}`;
  };

  // Helper: Renders the correct media player based on URL or Type
  const renderMedia = (media: ProjectImage) => {
    const src = getSrc(media.src);

    if (media.type === 'video') {
      // 1. YouTube Handling
      if (src.includes("youtube.com") || src.includes("youtu.be")) {
        let embedSrc = src;
        // Convert "watch?v=" or short URLs to "embed/"
        if (src.includes("watch?v=")) {
          embedSrc = src.replace("watch?v=", "embed/");
          // Strip any extra query params if simple replacement is used
          const ampersandIndex = embedSrc.indexOf("&");
          if (ampersandIndex !== -1) embedSrc = embedSrc.substring(0, ampersandIndex);
        } else if (src.includes("youtu.be/")) {
          embedSrc = src.replace("youtu.be/", "www.youtube.com/embed/");
        }

        return (
          <iframe
            src={embedSrc}
            className="w-full aspect-video max-h-full shadow-2xl"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );
      }

      // 2. Google Drive Handling
      if (src.includes("drive.google.com")) {
        // Ensure we use the 'preview' URL instead of 'view' for embedding
        const embedSrc = src.replace("/view", "/preview");
        return (
          <iframe
            src={embedSrc}
            className="w-full aspect-video max-h-full shadow-2xl bg-black"
            title="Google Drive video player"
            allowFullScreen
          />
        );
      }

      // 3. Local Video Handling
      return (
        <video
          src={src}
          controls
          autoPlay
          className="max-h-full max-w-full shadow-2xl"
        />
      );
    }

    // 4. Standard Image Handling
    return (
      <img
        src={src}
        alt={media.caption}
        className="max-h-full max-w-full object-contain shadow-2xl"
      />
    );
  };

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex bg-black/95 backdrop-blur-sm overflow-hidden"
        >
          {/* Close Button */}
          <button
            name="close inspect project"
            onClick={() => { onSelectedProject(null); setCurrentImageIndex(0); }}
            className="absolute top-4 right-4 md:top-4 md:left-4 w-fit z-[60] p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all"
          >
            <X size={28} />
          </button>

          <div className="flex w-full h-full flex-col lg:flex-row">
            {/* IMAGE / MEDIA AREA */}
            <div className="relative flex-1 h-full flex items-center justify-center bg-black" onClick={(e) => e.stopPropagation()}>
              {hasImages(selectedProject) && selectedProject.images.length > 1 && (
                <button
                  name="previous image"
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
                className="relative w-full h-full flex items-center justify-center p-4 lg:p-12"
              >
                {hasImages(selectedProject) ? (
                  <>
                    {renderMedia(selectedProject.images[currentImageIndex])}

                    <div className="absolute bottom-0 left-0 w-full bg-black/60 backdrop-blur-sm p-4 text-center pointer-events-none">
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
                  name="next image"
                  onClick={nextImage}
                  className="absolute right-4 z-10 p-2 bg-black/40 hover:bg-white/10 rounded-full text-white transition-colors"
                >
                  <ChevronRight size={36} />
                </button>
              )}
            </div>

            {/* SIDEBAR DETAILS */}
            <div
              className="w-full lg:w-[450px] bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col p-6 z-20 overflow-y-auto"
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

                {/* RICH TEXT DESCRIPTION */}
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  <RichTextParser content={selectedProject.description} />
                </div>
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
                    name="private application"
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