"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

/**
 * Reusable Project Video Card with interactive modal video player:
 * - High-res poster still
 * - Hover elevation and play badge
 * - Fullscreen modal player supporting YouTube/Vimeo/Direct MP4
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <article className="group relative flex flex-col bg-white rounded-2xl border border-black/10 overflow-hidden hover:border-[#CD3743]/50 transition-all duration-300 hover:shadow-xl">
        {/* Poster Video Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="w-14 h-14 rounded-full bg-[#CD3743] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-[#B52834]"
              aria-label={`Play ${project.title}`}
            >
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            </button>
          </div>

          {/* Category Tag (Top-left) */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium bg-black/60 text-white backdrop-blur-sm">
              {project.categoryLabel}
            </span>
          </div>
        </div>

        {/* Card Info */}
        <div className="p-6 flex flex-col justify-between flex-1 gap-2">
          <div>
            <p className="text-xs text-black/50 uppercase tracking-widest font-mono">
              {project.clientName || "Featured Work"} {project.year && `· ${project.year}`}
            </p>
            <h3 className="font-sans font-semibold text-xl text-black group-hover:text-[#CD3743] transition-colors uppercase tracking-tight mt-1">
              {project.title}
            </h3>
          </div>
          {project.description && (
            <p className="text-xs text-black/60 line-clamp-2 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>
      </article>

      {/* Fullscreen Video Modal */}
      {isPlaying && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsPlaying(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close video player"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Video Player Box */}
          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            <iframe
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}

