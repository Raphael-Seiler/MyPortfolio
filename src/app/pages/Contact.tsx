import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Linkedin, Instagram } from 'lucide-react';

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="w-full pb-32 min-h-[80vh] flex items-center">
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full relative">

        <div className="mb-20 text-center relative z-10 pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6"
          >
            Hallo sagen.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-[#55555a] dark:text-[#e5e5ea] font-light"
          >
            Offen für neue Herausforderungen und spannende Projekte.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="relative z-10 bg-transparent p-8 md:p-12 rounded-[2rem] border border-black/10 dark:border-white/10 dark:bg-[#111111]/40 dark:backdrop-blur-xl"
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <h3 className="text-2xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-2">Nachricht gesendet</h3>
              <p className="text-[#55555a] dark:text-[#e5e5ea] font-light">Vielen Dank. Ich melde mich bald bei dir.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-8">
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/20 px-0 py-3 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-transparent focus:outline-none focus:border-black dark:focus:border-white transition-colors peer"
                    placeholder="Name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-[#55555a] dark:text-[#e5e5ea] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white">
                    Name
                  </label>
                </div>
                
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/20 px-0 py-3 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-transparent focus:outline-none focus:border-black dark:focus:border-white transition-colors peer"
                    placeholder="E-Mail"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-[#55555a] dark:text-[#e5e5ea] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white">
                    E-Mail Adresse
                  </label>
                </div>
                
                <div className="relative group">
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-black/10 dark:border-white/20 px-0 py-3 text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-transparent focus:outline-none focus:border-black dark:focus:border-white transition-colors peer resize-none"
                    placeholder="Nachricht"
                  ></textarea>
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs text-[#55555a] dark:text-[#e5e5ea] transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black dark:peer-focus:text-white">
                    Nachricht
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full py-4 bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#111111] rounded-xl font-medium tracking-wide hover:bg-black dark:hover:bg-white transition-colors shadow-lg shadow-black/10 dark:shadow-none"
              >
                Senden
              </button>
            </form>
          )}
        </motion.div>

        <div className="mt-20 flex justify-center items-center space-x-6">
          <a 
            href="https://www.linkedin.com/in/rapha%C3%ABl-seiler-47b3a1338" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#86868b] hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} strokeWidth={1.5} />
          </a>
          <a 
            href="https://www.instagram.com/seiler_raphi/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#86868b] hover:text-[#E4405F] dark:hover:text-[#E4405F] transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={24} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </div>
  );
}