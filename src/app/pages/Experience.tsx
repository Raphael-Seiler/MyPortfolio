import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import ClickSpark from "../components/ClickSpark";
import { experiences } from "../data";

export function Experience() {
  const { lang } = useLanguage();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const t = translations[lang];

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="w-full min-h-screen bg-[#ffffff] dark:bg-[#000000] pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6"
          >
            {t.experience.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#5e5e63] dark:text-[#b8b8b8] max-w-2xl font-light"
          >
            {t.experience.description}
          </motion.p>
        </div>

        {/* Timeline Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="relative">
            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-12 relative">
              {/* Timeline Line - visible on all screen sizes */}
              <div className="absolute left-[80px] sm:left-[180px] top-0 bottom-0 w-px bg-[#d2d2d7] dark:bg-[#424245] transform -translate-x-1/2" />

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
                    {/* Timeline Dot - centered on the line and vertically on the tile */}
                    <div className="absolute left-[80px] sm:left-[180px] top-1/2 w-3 h-3 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] transform -translate-x-1/2 -translate-y-1/2 z-10 ring-4 ring-white dark:ring-[#000000]" />

                    {/* Content Row - date on left, card on right */}
                    <div className="flex sm:flex-row flex-row items-stretch">
                      {/* Date on the left side of the timeline */}
                      <div className="w-[80px] sm:w-[180px] flex-shrink-0 flex items-center justify-end sm:pr-4 pr-4">
                        <span className="text-xs sm:text-sm font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] text-right">
                          {period}
                        </span>
                      </div>

                      {/* Content Card on the right side of the timeline */}
                      <div className="flex-1 sm:pl-8 pl-4">
                        <div className="bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-2xl p-4 sm:p-6 min-h-[160px]">
                          {/* Role */}
                          <h3 className="text-base sm:text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                            {role}
                          </h3>

                          {/* Company */}
                          <p className="text-xs sm:text-sm text-[#5e5e63] dark:text-[#b8b8b8] font-medium mb-3">
                            {company}
                          </p>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-[#5e5e63] dark:text-[#b8b8b8] font-light leading-relaxed">
                            {description}
                          </p>

                          {/* Details */}
                          {details && (
                            <details className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-[#d2d2d7] dark:border-[#424245] group">
                              <summary className="text-xs font-medium text-[#0066cc] dark:text-[#4da6ff] cursor-pointer list-none flex items-center gap-1 hover:underline">
                                {lang === 'de' ? 'Mehr erfahren' : 'Learn more'}
                                <svg className="w-3 h-3 transform group-open:rotate-180 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M6 9l6 6 6-6" />
                                </svg>
                              </summary>
                              <p className="mt-2 text-xs sm:text-sm text-[#5e5e63] dark:text-[#b8b8b8] font-light leading-relaxed">
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
            {/* Arrow at the end of timeline */}
            <div className="absolute left-[80px] sm:left-[180px] -bottom-8 transform -translate-x-1/2">
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#d2d2d7] dark:text-[#424245]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}
