"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface RichTextParserProps {
  content: string;
  className?: string;
}

export default function RichTextParser({ content, className = "" }: RichTextParserProps) {
  if (!content) return null;

  const paragraphs = content.split("\n");

  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((paragraph, pIndex) => {
        if (!paragraph.trim()) return <br key={pIndex} />;

        const regex = /(\[BUTTON:.*?\|.*?\]|\[COLOR:.*?\|.*?\]|\[LINK:.*?\|.*?\])/g;
        
        const parts = paragraph.split(regex);

        return (
          <p key={pIndex} className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {parts.map((part, i) => {
              // Handle BUTTON
              if (part.startsWith("[BUTTON:")) {
                const clean = part.replace("[BUTTON:", "").replace("]", "");
                const [label, url] = clean.split("|");
                return (
                  <span key={i} className="inline-block my-2 mr-2">
                    <Link 
                      href={url || "#"} 
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded border border-blue-200 dark:border-blue-800/50 font-bold rounded-lg hover:shadow-[0_0_15px_rgba(0,255,153,0.4)] transition-all duration-300 text-sm"
                    >
                      {label} <ExternalLink size={14} />
                    </Link>
                  </span>
                );
              }

              // Handle COLOR
              if (part.startsWith("[COLOR:")) {
                const clean = part.replace("[COLOR:", "").replace("]", "");
                const [colorClass, text] = clean.split("|");
                return (
                  <span key={i} className={`${colorClass} font-semibold`}>
                    {text}
                  </span>
                );
              }

              // Handle LINK
              if (part.startsWith("[LINK:")) {
                const clean = part.replace("[LINK:", "").replace("]", "");
                const [label, url] = clean.split("|");
                return (
                  <Link 
                    key={i} 
                    href={url || "#"} 
                    target="_blank"
                    className="text-green-600 dark:text-green-400 underline hover:text-green-500 decoration-green-500/30 underline-offset-4 transition-colors"
                  >
                    {label}
                  </Link>
                );
              }

              // Handle regular text
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}