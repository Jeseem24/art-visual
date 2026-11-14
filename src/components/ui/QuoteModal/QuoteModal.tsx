"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  CONTACT_INQUIRY_DEFAULTS,
  type ServiceOption,
} from "@/components/sections/contact/ContactInquirySection/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import styles from "./QuoteModal.module.css";

interface QuoteFormState {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

type QuoteFormErrors = Partial<Record<keyof QuoteFormState, string>>;

export interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_FORM_STATE: QuoteFormState = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values: QuoteFormState): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  const digitsOnly = values.phone.replace(/\D/g, "");
  if (!values.phone.trim() || digitsOnly.length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.email.trim() || !EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.service) {
    errors.service = "Please select a service.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us a bit about your project.";
  }

  return errors;
}

function formatWhatsAppQuoteMessage(
  values: QuoteFormState,
  serviceOptions: ServiceOption[]
): string {
  const matchedService = serviceOptions.find((opt) => opt.value === values.service);
  const serviceLabel = matchedService ? matchedService.label : values.service;
  const companyName = values.company.trim() || "Not specified";

  return [
    "Hello Art Visual Team,",
    "",
    "I would like to request a free quote for a video production project:",
    "",
    `*Full Name:* ${values.fullName.trim()}`,
    `*Phone Number:* ${values.phone.trim()}`,
    `*Email:* ${values.email.trim()}`,
    `*Company / Brand:* ${companyName}`,
    `*Service Required:* ${serviceLabel}`,
    "",
    "*Project Details:*",
    values.message.trim(),
  ].join("\n");
}

/**
 * @component QuoteModal
 * @description Accessible modal dialog for requesting a free video production quote via WhatsApp.
 */
export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const baseId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [formValues, setFormValues] = useState<QuoteFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<QuoteFormErrors>({});

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleFieldChange = (field: keyof QuoteFormState, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedMessage = formatWhatsAppQuoteMessage(
      formValues,
      CONTACT_INQUIRY_DEFAULTS.serviceOptions
    );
    const whatsappUrl = getWhatsAppUrl(formattedMessage);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setErrors({});
    setFormValues(INITIAL_FORM_STATE);
    onClose();
  };

  const headingId = `${baseId}-heading`;
  const fullNameId = `${baseId}-full-name`;
  const phoneId = `${baseId}-phone`;
  const emailId = `${baseId}-email`;
  const companyId = `${baseId}-company`;
  const serviceId = `${baseId}-service`;
  const messageId = `${baseId}-message`;

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <div className={styles.modalCard}>
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close quote modal"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.closeIcon}
            aria-hidden="true"
          >
            <path
              d="M17 1L1 17M1 1L17 17"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Left Column: Studio Image */}
        <div className={styles.imageColumn}>
          <Image
            src="/images/contact/quote-modal-studio.png"
            alt="SBSC Video Production Studio"
            width={568}
            height={827}
            sizes="568px"
            className={styles.studioImage}
            priority
          />
        </div>

        {/* Right Column: Quote Form Card */}
        <div className={styles.formCard}>
          <h2 id={headingId} className={styles.formHeading}>
            request a free quote
          </h2>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Row 1: Full Name & Phone Number */}
            <div className={styles.formRowTwoCol}>
              <div className={styles.fieldGroup}>
                <label htmlFor={fullNameId} className={styles.fieldLabel}>
                  FULL NAME
                </label>
                <input
                  id={fullNameId}
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="your name"
                  value={formValues.fullName}
                  onChange={(e) => handleFieldChange("fullName", e.target.value)}
                  className={`${styles.input} ${errors.fullName ? styles.fieldInvalid : ""}`.trim()}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? `${fullNameId}-error` : undefined}
                  required
                />
                {errors.fullName && (
                  <p id={`${fullNameId}-error`} className={styles.errorText} role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor={phoneId} className={styles.fieldLabel}>
                  PHONE NUMBER
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+91 xxxxxxxxxxxx"
                  value={formValues.phone}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  className={`${styles.input} ${errors.phone ? styles.fieldInvalid : ""}`.trim()}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
                  required
                />
                {errors.phone && (
                  <p id={`${phoneId}-error`} className={styles.errorText} role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Email */}
            <div className={styles.fieldGroup}>
              <label htmlFor={emailId} className={styles.fieldLabel}>
                EMAIL
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="your@explain.com"
                value={formValues.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                className={`${styles.input} ${errors.email ? styles.fieldInvalid : ""}`.trim()}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? `${emailId}-error` : undefined}
                required
              />
              {errors.email && (
                <p id={`${emailId}-error`} className={styles.errorText} role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Row 3: Company / Brand Name & Service Required */}
            <div className={styles.formRowTwoCol}>
              <div className={styles.fieldGroup}>
                <label htmlFor={companyId} className={styles.fieldLabel}>
                  COMPANY / BRAND NAME
                </label>
                <input
                  id={companyId}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="your brand name"
                  value={formValues.company}
                  onChange={(e) => handleFieldChange("company", e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label htmlFor={serviceId} className={styles.fieldLabel}>
                  SERVICE REQUIRED
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id={serviceId}
                    name="service"
                    value={formValues.service}
                    onChange={(e) => handleFieldChange("service", e.target.value)}
                    className={`${styles.select} ${
                      !formValues.service ? styles.selectPlaceholder : ""
                    } ${errors.service ? styles.fieldInvalid : ""}`.trim()}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? `${serviceId}-error` : undefined}
                    required
                  >
                    <option value="" disabled>
                      select a service
                    </option>
                    {CONTACT_INQUIRY_DEFAULTS.serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <Image
                    src="/icons/contact/chevron-down.svg"
                    alt=""
                    width={14}
                    height={10}
                    className={styles.selectChevron}
                    aria-hidden="true"
                  />
                </div>
                {errors.service && (
                  <p id={`${serviceId}-error`} className={styles.errorText} role="alert">
                    {errors.service}
                  </p>
                )}
              </div>
            </div>

            {/* Row 4: Tell Us About Your Project */}
            <div className={styles.fieldGroup}>
              <label htmlFor={messageId} className={styles.fieldLabel}>
                TELL US ABOUT YOUR PROJECT
              </label>
              <textarea
                id={messageId}
                name="message"
                placeholder="tell us more about your idea..."
                value={formValues.message}
                onChange={(e) => handleFieldChange("message", e.target.value)}
                className={`${styles.textarea} ${errors.message ? styles.fieldInvalid : ""}`.trim()}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${messageId}-error` : undefined}
                required
              />
              {errors.message && (
                <p id={`${messageId}-error`} className={styles.errorText} role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Row */}
            <div className={styles.submitRow}>
              <button type="submit" className={styles.submitButton}>
                <span>{CONTACT_INQUIRY_DEFAULTS.submitLabel}</span>
                <span className={styles.submitIconBox} aria-hidden="true">
                  <Image
                    src="/icons/contact/arrow-right.svg"
                    alt=""
                    width={14}
                    height={18}
                  />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default QuoteModal;
