import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Instagram } from 'lucide-react';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasFocus, setHasFocus] = useState<keyof FormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lang } = useLanguage();

  const t = translations[lang];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.contact.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.contact.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.contact.emailInvalid;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.contact.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mqayvoaq', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      const mailtoLink = `mailto:raphi.seiler@gmail.com?subject=Kontaktanfrage von ${encodeURIComponent(formData.name)}&body=${encodeURIComponent('Name: ' + formData.name + '\nE-Mail: ' + formData.email + '\n\n' + formData.message)}`;
      window.location.href = mailtoLink;
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-6 md:px-12 w-full relative">

        {/* Header */}
        <div className="mb-12 text-center relative z-10 pt-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-normal tracking-tight text-[#202124] dark:text-[#e8eaed] mb-4"
          >
            {t.contact.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-[#5f6368] dark:text-[#9aa0a6] font-normal"
          >
            {t.contact.description}
          </motion.p>
        </div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-[#f8f9fa] dark:bg-[#303134] p-8 md:p-10 rounded-xl border border-[#dadce0] dark:border-[#5f6368] transition-all duration-300"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
              role="alert"
              aria-live="polite"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#34a853] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-2xl font-medium text-[#202124] dark:text-[#e8eaed] mb-2">{t.contact.sent}</h3>
              <p className="text-[#5f6368] dark:text-[#9aa0a6] font-normal">{t.contact.thankYou}</p>
            </motion.div>
          ) : (
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-4">
                  {/* Name Field */}
                  <div className="relative group">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${
                        errors.name
                          ? 'text-[#ea4335] dark:text-[#f28b82]'
                          : 'text-[#5f6368] dark:text-[#9aa0a6]'
                      }`}
                    >
                      {t.contact.name}
                      <span className="text-[#ea4335] ml-1" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setHasFocus('name')}
                      onBlur={() => setHasFocus(null)}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full bg-white dark:bg-[#202124] border rounded-lg px-4 py-4 text-[#202124] dark:text-[#e8eaed] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent transition-all ${
                        errors.name
                          ? 'border-[#ea4335] dark:border-[#f28b82]'
                          : 'border-[#dadce0] dark:border-[#5f6368]'
                      }`}
                      placeholder={t.contact.namePlaceholder}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-2 text-sm text-[#ea4335] dark:text-[#f28b82]" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${
                        errors.email
                          ? 'text-[#ea4335] dark:text-[#f28b82]'
                          : 'text-[#5f6368] dark:text-[#9aa0a6]'
                      }`}
                    >
                      {t.contact.emailLabel}
                      <span className="text-[#ea4335] ml-1" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setHasFocus('email')}
                      onBlur={() => setHasFocus(null)}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full bg-white dark:bg-[#202124] border rounded-lg px-4 py-4 text-[#202124] dark:text-[#e8eaed] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent transition-all ${
                        errors.email
                          ? 'border-[#ea4335] dark:border-[#f28b82]'
                          : 'border-[#dadce0] dark:border-[#5f6368]'
                      }`}
                      placeholder={t.contact.emailPlaceholder}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-2 text-sm text-[#ea4335] dark:text-[#f28b82]" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative group">
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-2 ${
                        errors.message
                          ? 'text-[#ea4335] dark:text-[#f28b82]'
                          : 'text-[#5f6368] dark:text-[#9aa0a6]'
                      }`}
                    >
                      {t.contact.message}
                      <span className="text-[#ea4335] ml-1" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setHasFocus('message')}
                      onBlur={() => setHasFocus(null)}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full bg-white dark:bg-[#202124] border rounded-lg px-4 py-4 text-[#202124] dark:text-[#e8eaed] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent transition-all resize-none ${
                        errors.message
                          ? 'border-[#ea4335] dark:border-[#f28b82]'
                          : 'border-[#dadce0] dark:border-[#5f6368]'
                      }`}
                      placeholder={t.contact.messagePlaceholder}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-2 text-sm text-[#ea4335] dark:text-[#f28b82]" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={`w-full py-4 text-white rounded-lg font-medium tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    hasFocus
                      ? 'bg-[#1a73e8]'
                      : 'bg-[#1a73e8]/90'
                  } hover:bg-[#1557b0]`}
                >
                  {isSubmitting
                    ? t.contact.sending
                    : t.contact.send
                  }
                </button>
              </form>
            </div>
          )}
        </motion.div>

        {/* Social Links */}
        <div className="mt-12 flex justify-center items-center space-x-8" role="list" aria-label={t.contact.socialLinks}>
          <a
            href="https://www.linkedin.com/in/rapha%C3%ABl-seiler-47b3a1338"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
            role="listitem"
            aria-label={t.contact.linkedIn}
          >
            <div className="w-14 h-14 rounded-full bg-[#f8f9fa] dark:bg-[#303134] flex items-center justify-center transition-all duration-300 group-hover:bg-[#0A66C2] group-hover:scale-110">
              <Linkedin size={22} strokeWidth={1.5} className="text-[#5f6368] dark:text-[#9aa0a6] group-hover:text-white transition-colors" aria-hidden="true" />
            </div>
            <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6] opacity-0 group-hover:opacity-100 transition-opacity">{t.contact.linkedIn}</span>
          </a>
          <a
            href="https://www.instagram.com/seiler_raphi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
            role="listitem"
            aria-label={t.contact.instagram}
          >
            <div className="w-14 h-14 rounded-full bg-[#f8f9fa] dark:bg-[#303134] flex items-center justify-center transition-all duration-300 group-hover:bg-[#E4405F] group-hover:scale-110">
              <Instagram size={22} strokeWidth={1.5} className="text-[#5f6368] dark:text-[#9aa0a6] group-hover:text-white transition-colors" aria-hidden="true" />
            </div>
            <span className="text-xs text-[#5f6368] dark:text-[#9aa0a6] opacity-0 group-hover:opacity-100 transition-opacity">{t.contact.instagram}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
