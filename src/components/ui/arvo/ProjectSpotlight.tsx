"use client";

import Image from "next/image";
import { Lock, ExternalLink } from "lucide-react";
import { Project } from "@/types";

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

type ProjectSpotlightProps = {
  project: Project;
  onProjectSelect: (project: Project, index: number) => void;
};

export default function ProjectSpotlight({ project, onProjectSelect }: ProjectSpotlightProps) {
  const images = project.images && project.images.length > 0 ? project.images : [{ src: PLACEHOLDER_IMAGE, type: "image", caption: "" }];
  const totalImages = images.length;
  // We only display up to 4 images in the grid
  const displayImages = images.slice(0, 4);
  const hiddenCount = totalImages - 4;

  // Function to render media with "Blur + Contain" style to prevent cropping
  const renderMedia = (imgObj: any, index: number, className: string, isLast: boolean) => {
    const isVideo = imgObj.type === "video";
    const src = imgObj.src.startsWith("http") ? imgObj.src : `/${imgObj.src}`;
    const showOverlay = isLast && hiddenCount > 0;

    // Detect external video sources
    const isDrive = src.includes("drive.google.com");
    const isYoutube = src.includes("youtube.com") || src.includes("youtu.be");
    const isExternalVideo = isDrive || isYoutube;

    let mediaContent;

    if (isVideo) {
      if (isDrive) {
        // Handle Google Drive
        const embedSrc = src.replace("/view", "/preview");
        mediaContent = (
          <iframe
            src={embedSrc}
            className={`absolute inset-0 w-full h-full object-contain p-2 pointer-events-none ${project.isGray ? "grayscale" : ""}`}
            title={project.title}
            loading="lazy"
            allowFullScreen
          />
        );
      } else if (isYoutube) {
        // Handle YouTube
        let embedSrc = src;
        if (src.includes("watch?v=")) embedSrc = src.replace("watch?v=", "embed/");
        else if (src.includes("youtu.be/")) embedSrc = src.replace("youtu.be/", "www.youtube.com/embed/");
        
        mediaContent = (
          <iframe
            src={`${embedSrc}?autoplay=1&mute=1&controls=0&loop=1&playlist=${embedSrc.split('/').pop()}`}
            className={`absolute inset-0 w-full h-full object-contain p-2 pointer-events-none ${project.isGray ? "grayscale" : ""}`}
            title={project.title}
            loading="lazy"
            allowFullScreen
          />
        );
      } else {
        // Handle Local Video
        mediaContent = (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02] ${project.isGray ? "grayscale group-hover:grayscale-0" : ""}`}
          />
        );
      }
    } else {
      // Handle Image
      mediaContent = (
        <Image
          src={src}
          alt={imgObj.caption || project.title}
          fill
          className={`object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02] ${project.isGray ? "grayscale group-hover:grayscale-0" : ""}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      );
    }

    return (
      <div 
        key={index} 
        onClick={() => onProjectSelect(project, index)}
        className={`relative group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 cursor-pointer ${className}`}
      >
        {!isExternalVideo && (
           isVideo ? (
             <video src={src} muted loop className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl scale-110" />
           ) : (
             <Image src={src} alt="bg" fill className="object-cover opacity-20 blur-xl scale-110" />
           )
        )}
        {mediaContent}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-primary/50 rounded-xl transition-colors duration-300 pointer-events-none" />
        {showOverlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity hover:bg-black/50">
            <div className="text-center">
              <span className="block text-4xl font-bold text-white mb-1">+{hiddenCount}</span>
              <span className="text-sm font-medium text-gray-200 uppercase tracking-wider">View All</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 py-12 border-b border-gray-200 dark:border-zinc-800 last:border-0">
      
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8">
        {/* Text Content */}
        <div className="space-y-4 max-w-4xl flex-1">
          <div className="flex items-center gap-3">
             <h3 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white tracking-tight">
              {project.title}
            </h3>
          </div>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line max-w-3xl">
            {project.description.replace(/\[(?:BUTTON|COLOR|LINK):.*?\]/g, "")}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.url ? (
                <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-3 w-full xl:w-auto bg-transparent hover:bg-green-50 dark:hover:bg-green-900 text-darkgreen-primary dark:text-green-primary border border-darkgreen-primary dark:border-green-primary font-bold rounded-lg transition-all"
                >
                {project.url} <ExternalLink size={18} />
                </a>
            ) : (
                <div className="flex items-center justify-center gap-2 px-8 py-3 w-full xl:w-auto bg-gray-100 dark:bg-zinc-800 text-gray-400 border border-gray-200 dark:border-zinc-700 rounded-lg cursor-not-allowed">
                <Lock size={18} /> Private
                </div>
            )}
            <span className="text-gray-600"> — </span> 
            {project.icons && project.icons.map((icon, i) => (
              <div key={i} className="flex items-center justify-center w-10 h-10 bg-white dark:bg-zinc-800 rounded-md border border-gray-200 dark:border-zinc-700 shadow-sm" title={icon.split('/')[0]}>
                 <Image 
                   width={20} 
                   height={20} 
                   alt={icon} 
                   src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`} 
                   className="w-5 h-5" 
                 />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Bento Grid */}
      <div className={`grid gap-4 w-full ${
        displayImages.length === 1 ? 'grid-cols-1 h-[300px] md:h-[500px]' : 
        displayImages.length === 2 ? 'grid-cols-1 md:grid-cols-2 h-[600px] md:h-[400px]' :
        displayImages.length === 3 ? 'grid-cols-1 md:grid-cols-3 md:grid-rows-2 h-[900px] md:h-[500px]' :
        'grid-cols-1 md:grid-cols-2 md:grid-rows-2 h-[800px] md:h-[600px]'
      }`}>
        {displayImages.map((img, i) => {
          let className = "w-full h-full";
          const isLast = i === displayImages.length - 1;

          if (displayImages.length === 3) {
            if (i === 0) className = "md:col-span-2 md:row-span-2";
            else className = "md:col-span-1 md:row-span-1";
          }
          
          return renderMedia(img, i, className, isLast);
        })}
      </div>
    </div>
  );
}