"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { useQuoteModal } from "@/components/ui/QuoteModal";

export interface CTABannerButtonProps {
  /** Button label text */
  label: string;
}

/**
 * Client-side CTA button wrapper for CTABannerSection that opens the Quote Modal.
 */
export function CTABannerButton({ label }: CTABannerButtonProps) {
  const { openQuoteModal } = useQuoteModal();

  return (
    <Button type="button" onClick={openQuoteModal}>
      {label}
    </Button>
  );
}
