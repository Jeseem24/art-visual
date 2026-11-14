import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
}

/**
 * Reusable Service Card Component
 * Displays service thumbnail, title, summary, and action link.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group flex flex-col justify-between bg-white rounded-2xl border border-black/10 overflow-hidden hover:border-[#CD3743]/50 transition-all duration-300 hover:shadow-xl">
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-black/5">
        <Image
          src={service.cardThumbnail}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-2">
          <h3 className="font-sans font-semibold text-xl text-black group-hover:text-[#CD3743] transition-colors uppercase tracking-tight">
            {service.title}
          </h3>
          <p className="text-sm text-black/65 font-light leading-relaxed line-clamp-2">
            {service.shortDescription}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center justify-between gap-3 px-4 py-2 rounded-[11px] border border-black/25 bg-white text-black/85 hover:border-[#CD3743] hover:text-[#CD3743] transition-all text-xs uppercase tracking-wider font-medium group/btn"
          >
            <span>View service</span>
            <span className="w-px h-4 bg-black/20 group-hover/btn:bg-[#CD3743]/40" />
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

