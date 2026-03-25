import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Instagram } from 'lucide-react';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';
import ClickSpark from '../components/ClickSpark';
import { useEffect } from 'react';

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const { lang } = useLanguage();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Send email via Formspree
    fetch('https://formspree.io/f/mqayvoaq', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(() => {
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 4000);
    }).catch(() => {
      // Fallback: open mail client
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      const mailtoLink = `mailto:raphi.seiler@gmail.com?subject=Kontaktanfrage von ${name}&body=Name: ${name}%0D%0AE-Mail: ${email}%0D%0A%0D%0A${message}`;
      window.location.href = mailtoLink;
    });
  };

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="w-full min-h-[80vh] flex items-center">
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full relative">

        <div className="mb-20 text-center relative z-10 pt-48">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6"
          >
            {t.contact.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-[#55555a] dark:text-[#e5e5ea] font-light"
          >
            {t.contact.description}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-transparent p-8 md:p-12 rounded-[2rem] border border-black/10 dark:border-white/10 backdrop-blur-xl transition-all duration-300 focus-within:bg-white/80 focus-within:dark:bg-[#111111]/80"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-2xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">{t.contact.sent}</h3>
              <p className="text-[#55555a] dark:text-[#e5e5ea] font-light">{t.contact.thankYou}</p>
            </motion.div>
          ) : (
            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-10 space-y-10 parent-form" action="https://formspree.io/f/mqayvoaq" method="POST">
                <div className="space-y-8">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name" name="name"
                      required
                      onFocus={() => setHasFocus(true)}
                      onBlur={() => setHasFocus(false)}
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/20 px-0 py-3 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-transparent focus:outline-none focus:border-black dark:focus:border-white transition-colors peer"
                      placeholder={t.contact.name}
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-[#55555a] dark:text-[#e5e5ea] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white">
                      {t.contact.name}
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      id="email" name="email"
                      required
                      onFocus={() => setHasFocus(true)}
                      onBlur={() => setHasFocus(false)}
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/20 px-0 py-3 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-transparent focus:outline-none focus:border-black dark:focus:border-white transition-colors peer"
                      placeholder={t.contact.email}
                    />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-[#55555a] dark:text-[#e5e5ea] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white">
                      {t.contact.email}
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea
                      id="message" name="message"
                      rows={4}
                      required
                      onFocus={() => setHasFocus(true)}
                      onBlur={() => setHasFocus(false)}
                      className="w-full bg-transparent border-b border-black/10 dark:border-white/20 px-0 py-3 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-transparent focus:outline-none focus:border-black dark:focus:border-white transition-colors peer resize-none"
                      placeholder={t.contact.message}
                    ></textarea>
                    <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs text-[#55555a] dark:text-[#e5e5ea] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white">
                      {t.contact.message}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-4 text-white dark:text-[#111111] rounded-xl font-medium tracking-wide shadow-lg shadow-black/10 dark:shadow-none transition-all duration-300 cursor-none ${
                    hasFocus
                      ? 'bg-[#1d1d1f] dark:bg-[#f5f5f7] hover:bg-black dark:hover:bg-white opacity-100'
                      : 'bg-[#1d1d1f]/50 dark:bg-[#f5f5f7]/50 opacity-60'
                  }`}
                >
                  {t.contact.send}
                </button>
              </form>
            </div>
          )}
        </motion.div>

        <div className="mt-16 flex justify-center items-center space-x-10">
          <a
            href="https://www.linkedin.com/in/rapha%C3%ABl-seiler-47b3a1338"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#86868b] hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors cursor-none"
            aria-label="LinkedIn"
          >
            <Linkedin size={32} strokeWidth={1.5} />
          </a>
          <a
            href="https://www.instagram.com/seiler_raphi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#86868b] hover:text-[#E4405F] dark:hover:text-[#E4405F] transition-colors cursor-none"
            aria-label="Instagram"
          >
            <Instagram size={32} strokeWidth={1.5} />
          </a>
        </div>
        </div>
      </div>
      </ClickSpark>
  );
}