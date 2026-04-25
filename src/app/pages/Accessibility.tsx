import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';
import { Check, X } from 'lucide-react';

export function Accessibility() {
  const { lang } = useLanguage();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    setHighContrast(contrastQuery.matches);

    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    const contrastHandler = (e: MediaQueryListEvent) => setHighContrast(e.matches);

    motionQuery.addEventListener('change', motionHandler);
    contrastQuery.addEventListener('change', contrastHandler);

    return () => {
      motionQuery.removeEventListener('change', motionHandler);
      contrastQuery.removeEventListener('change', contrastHandler);
    };
  }, []);

  const t = translations[lang];

  const accessibilityFeatures = [
    {
      feature: t.accessibility.keyboardNav,
      description: t.accessibility.keyboardNavDesc,
      supported: true,
    },
    {
      feature: t.accessibility.screenReader,
      description: t.accessibility.screenReaderDesc,
      supported: true,
    },
    {
      feature: t.accessibility.colorContrast,
      description: t.accessibility.colorContrastDesc,
      supported: true,
    },
    {
      feature: t.accessibility.reducedMotion,
      description: t.accessibility.reducedMotionDesc,
      supported: reducedMotion,
    },
    {
      feature: t.accessibility.highContrast,
      description: t.accessibility.highContrastDesc,
      supported: highContrast,
    },
    {
      feature: t.accessibility.focusIndicators,
      description: t.accessibility.focusIndicatorsDesc,
      supported: true,
    },
    {
      feature: t.accessibility.skipLink,
      description: t.accessibility.skipLinkDesc,
      supported: true,
    },
    {
      feature: t.accessibility.touchTargets,
      description: t.accessibility.touchTargetsDesc,
      supported: true,
    },
  ];

  return (
    <div className="w-full min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
            {t.accessibility.statementTitle}
          </h1>
          <p className="text-xl text-[#5e5e63] dark:text-[#b8b8b8] font-light leading-relaxed max-w-3xl">
            {t.accessibility.statement}
          </p>
        </motion.div>

        {/* WCAG Compliance */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 p-8 bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-3xl"
        >
          <h2 className="text-2xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
            {t.accessibility.wcagConformance}
          </h2>
          <p className="text-[#5e5e63] dark:text-[#b8b8b8] font-light leading-relaxed mb-6">
            {t.accessibility.wcagDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <span className="px-4 py-2 bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] rounded-full text-sm font-medium">
              {t.accessibility.wcagBadge}
            </span>
            <span className="px-4 py-2 bg-[#e8f4fd] dark:bg-[#1a3a5c] text-[#0066cc] dark:text-[#4da6ff] rounded-full text-sm font-medium">
              {t.accessibility.accessibleBadge}
            </span>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-8">
            {t.accessibility.featuresTitle}
          </h2>
          <div className="grid gap-6">
            {accessibilityFeatures.map((item, index) => (
              <motion.div
                key={item.feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="flex items-start gap-4 p-6 bg-white dark:bg-[#000000] border border-[#d2d2d7] dark:border-[#424245] rounded-2xl"
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  item.supported
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}>
                  {item.supported ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                </div>
                <div>
                  <h3 className="font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-1">
                    {item.feature}
                  </h3>
                  <p className="text-sm text-[#5e5e63] dark:text-[#b8b8b8] font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-3xl"
        >
          <h2 className="text-2xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
            {t.accessibility.feedbackTitle}
          </h2>
          <p className="text-[#5e5e63] dark:text-[#b8b8b8] font-light leading-relaxed mb-6">
            {t.accessibility.feedbackDescription}
          </p>
          <a
            href="mailto:raphi.seiler@gmail.com?subject=Accessibility Feedback"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] rounded-full text-sm font-medium hover:bg-[#333336] dark:hover:bg-[#e5e5ea] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2"
          >
            {t.accessibility.getInTouch}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/>
              <path d="M12 5l7 7-7 7"/>
            </svg>
          </a>
        </motion.section>
      </div>
    </div>
  );
}
