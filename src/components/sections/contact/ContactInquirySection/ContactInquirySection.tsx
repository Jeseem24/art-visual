"use client";

import React, { memo, useId, useState } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  CONTACT_INQUIRY_DEFAULTS,
  type ContactInquiryData,
  type ServiceOption,
} from "./constants";
import styles from "./ContactInquirySection.module.css";

export interface ContactInquirySectionProps {
  data?: Partial<ContactInquiryData>;
  className?: string;
}

interface InquiryFormState {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

type InquiryFormErrors = Partial<Record<keyof InquiryFormState, string>>;

const INITIAL_FORM_STATE: InquiryFormState = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values: InquiryFormState): InquiryFormErrors {
  const errors: InquiryFormErrors = {};

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

/**
 * @component ContactInquirySection
 * @description Two-column contact details and interactive project inquiry form section.
 */
export const ContactInquirySection = memo(function ContactInquirySection({
  data,
  className = "",
}: ContactInquirySectionProps) {
  const content: ContactInquiryData = {
    ...CONTACT_INQUIRY_DEFAULTS,
    ...data,
  };

  const baseId = useId();
  const [formValues, setFormValues] = useState<InquiryFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<InquiryFormErrors>({});

  const handleFieldChange = (
    field: keyof InquiryFormState,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const formatWhatsAppInquiry = (
    values: InquiryFormState,
    serviceOptions: ServiceOption[]
  ): string => {
    const matchedService = serviceOptions.find((opt) => opt.value === values.service);
    const serviceLabel = matchedService ? matchedService.label : values.service;
    const companyName = values.company.trim() || "Not specified";

    return [
      "Hello Art Visual Team,",
      "",
      "I would like to inquire about a video production project:",
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
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedMessage = formatWhatsAppInquiry(formValues, content.serviceOptions);
    const whatsappUrl = getWhatsAppUrl(formattedMessage);

    setErrors({});
    setFormValues(INITIAL_FORM_STATE);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const fullNameId = `${baseId}-full-name`;
  const phoneId = `${baseId}-phone`;
  const emailId = `${baseId}-email`;
  const companyId = `${baseId}-company`;
  const serviceId = `${baseId}-service`;
  const messageId = `${baseId}-message`;

  return (
    <section
      className={`${styles.section} ${className}`.trim()}
      aria-labelledby="contact-inquiry-heading"
    >
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Contact Info & Studio Location */}
          <div className={styles.leftColumn}>
            <SectionHeader
              id="contact-inquiry-heading"
              badgeText={content.badgeText}
              align="left"
              size="compact"
              className={styles.sectionHeader}
              title={content.headline}
            />

            <ul className={styles.contactList}>
              {content.contactItems.map((item) => (
                <li key={item.id} className={styles.contactItem}>
                  <div className={styles.iconBox} aria-hidden="true">
                    <Image
                      src={item.iconSrc}
                      alt={item.iconAlt}
                      width={item.iconWidth}
                      height={item.iconHeight}
                      className={styles.contactIcon}
                    />
                  </div>
                  <div className={styles.contactText}>
                    <p className={styles.contactLabel}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className={`${styles.contactValue} ${styles.contactLink}`}>
                        {item.value}
                      </a>
                    ) : (
                      <p className={styles.contactValue}>{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.studioImageCard}>
              <Image
                src={content.studioImage.src}
                alt={content.studioImage.alt}
                fill
                className={styles.studioImage}
                sizes="(max-width: 1023px) 100vw, 692px"
              />
            </div>
          </div>

          {/* Right Column: Interactive Message Form Card */}
          <div className={styles.rightColumn}>
            <div className={styles.formCard}>
              <h2 className={styles.formHeading}>{content.formTitle}</h2>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {/* Row 1: Full Name & Phone Number */}
                <div className={styles.formRowTwoCol}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor={fullNameId} className={styles.fieldLabel}>
                      full name
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
                      phone number
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
                    email
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
                      company / brand name
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
                      service required
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
                        {content.serviceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <Image
                        src="/icons/contact/chevron-down.svg"
                        alt=""
                        width={21}
                        height={15}
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
                    tell us about your project
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
                    <span>{content.submitLabel}</span>
                    <span className={styles.submitIconBox} aria-hidden="true">
                      <Image
                        src="/icons/contact/arrow-right.svg"
                        alt=""
                        width={12}
                        height={16}
                      />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ContactInquirySection;
