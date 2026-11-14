"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FaqItem } from "@/types";

interface FaqAccordionProps {
  items: FaqItem[];
}

/**
 * Reusable FAQ Accordion Component
 * Handles expansion/collapse states with keyboard accessibility.
 */
export function FaqAccordion({ items }: FaqItem[] | any) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto divide-y divide-black/10">
      {items.map((item: FaqItem, index: number) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.id} className="py-6 transition-colors">
            <button
              type="button"
              onClick={() => toggle(index)}
              className="flex items-center justify-between w-full text-left gap-4 group focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-sans font-medium text-lg sm:text-xl text-black group-hover:text-[#CD3743] transition-colors">
                {item.question}
              </span>
              <span className="flex-shrink-0 w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-black/70 group-hover:border-[#CD3743] group-hover:text-[#CD3743] transition-colors">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div className="pt-4 pr-12 text-black/70 text-sm sm:text-base font-light leading-relaxed animate-in fade-in duration-200">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

