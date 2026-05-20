import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import { experiences } from "../data";

export function Experience() {
  const { lang } = useLanguage();

  const t = translations[lang];

  return (
    <div className="w-full min-h-screen bg-[#ffffff] dark:bg-[#202124] pt-32 pb-20">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-normal tracking-tight text-[#202124] dark:text-[#e8eaed] mb-6"
        >
          {t.experience.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-[#5f6368] dark:text-[#9aa0a6] max-w-2xl font-normal"
        >
          {t.experience.description}
        </motion.p>
      </div>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="relative">
          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-12 relative">
            {/* Timeline Line */}
            <div className="absolute left-[80px] sm:left-[180px] top-0 bottom-0 w-px bg-[#dadce0] dark:bg-[#5f6368] transform -translate-x-1/2" />

            {experiences.map((exp, index) => {
              const role = lang === 'en' && exp.roleEn ? exp.roleEn : exp.role;
              const company = lang === 'en' && exp.companyEn ? exp.companyEn : exp.company;
              const period = lang === 'en' && exp.periodEn ? exp.periodEn : exp.period;
              const description = lang === 'en' && exp.descriptionEn ? exp.descriptionEn : exp.description;
              const details = lang === 'en' && exp.detailsEn ? exp.detailsEn : exp.details;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[80px] sm:left-[180px] top-1/2 w-3 h-3 rounded-full bg-[#1a73e8] dark:bg-[#8ab4f8] transform -translate-x-1/2 -translate-y-1/2 z-10 ring-4 ring-white dark:ring-[#202124]" />

                  {/* Content Row */}
                  <div className="flex sm:flex-row flex-row items-stretch">
                    {/* Date */}
                    <div className="w-[80px] sm:w-[180px] flex-shrink-0 flex items-center justify-end sm:pr-4 pr-4">
                      <span className="text-xs sm:text-sm font-medium text-[#202124] dark:text-[#e8eaed] text-right">
                        {period}
                      </span>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 sm:pl-8 pl-4">
                      <div className="bg-[#f8f9fa] dark:bg-[#303134] rounded-xl p-4 sm:p-6 min-h-[160px]">
                        {/* Role */}
                        <h3 className="text-base sm:text-lg font-medium text-[#202124] dark:text-[#e8eaed] mb-1">
                          {role}
                        </h3>

                        {/* Company */}
                        <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#9aa0a6] font-medium mb-3">
                          {company}
                        </p>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-[#5f6368] dark:text-[#9aa0a6] font-normal leading-relaxed">
                          {description}
                        </p>

                        {/* Details */}
                        {details && (
                          <details className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#dadce0] dark:border-[#5f6368] group">
                            <summary className="text-xs font-medium text-[#1a73e8] dark:text-[#8ab4f8] cursor-pointer list-none flex items-center gap-1 hover:underline">
                              {lang === 'de' ? 'Mehr erfahren' : 'Learn more'}
                              <svg className="w-3 h-3 transform group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                              </svg>
                            </summary>
                            <p className="mt-2 text-xs sm:text-sm text-[#5f6368] dark:text-[#9aa0a6] font-normal leading-relaxed">
                              {details}
                            </p>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* Arrow at the end */}
          <div className="absolute left-[80px] sm:left-[180px] -bottom-8 transform -translate-x-1/2">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#dadce0] dark:text-[#5f6368]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
