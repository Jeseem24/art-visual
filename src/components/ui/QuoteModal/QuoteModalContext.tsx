"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { QuoteModal } from "./QuoteModal";

export interface QuoteModalContextValue {
  isOpen: boolean;
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export interface QuoteModalProviderProps {
  children: React.ReactNode;
}

/**
 * @component QuoteModalProvider
 * @description Provides global state and controls for opening/closing the Request a Free Quote modal.
 */
export function QuoteModalProvider({ children }: QuoteModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openQuoteModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo<QuoteModalContextValue>(
    () => ({
      isOpen,
      openQuoteModal,
      closeQuoteModal,
    }),
    [isOpen, openQuoteModal, closeQuoteModal]
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal isOpen={isOpen} onClose={closeQuoteModal} />
    </QuoteModalContext.Provider>
  );
}

/**
 * @hook useQuoteModal
 * @description Accesses the QuoteModal open/close controls from any client component inside QuoteModalProvider.
 */
export function useQuoteModal(): QuoteModalContextValue {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return context;
}
