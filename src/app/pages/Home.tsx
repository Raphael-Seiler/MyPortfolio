import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { AboutMe } from "../components/AboutMe";
import CircularGallery from "../components/CircularGallery";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import ClickSpark from "../components/ClickSpark";
import { useEffect } from "react";
import { ArrowRight, ArrowUpRight, Medal, Star } from "lucide-react";
import { projects, allAwards } from "../../content/projects";
import imgDefault from "../../assets/home/Raphi_Mii_4K.webp";
import imgHover from "../../assets/home/Raphi_Mii_4K_pose.webp";

export function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const { lang } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

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

  const galleryItems = useMemo(
    () => projects.flatMap((p) => p.images.gallery.map((image) => ({ image }))),
    []
  );

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="w-full">
        {/* Hero Section - Apple Product Page Style */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-center mb-4 leading-[1.05]"
          >
            <span className="text-[#5e5e63] dark:text-[#b8b8b8] text-4xl md:text-6xl lg:text-7xl">
              {t.home.hello}
            </span>
            <br />
            <span className="text-[#1d1d1f] dark:text-[#f5f5f7]">
              {t.home.name}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl md:text-2xl text-[#5e5e63] dark:text-[#b8b8b8] max-w-2xl text-center font-light mb-12 px-6"
          >
            {t.home.description}
          </motion.p>

          {/* CTA Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-6 mb-16"
          >
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] rounded-full text-sm font-medium hover:bg-[#333336] dark:hover:bg-[#e5e5ea] transition-all focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2"
            >
              {t.home.viewProjectsButton}
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-6 py-3 text-[#0066cc] hover:text-[#0055aa] dark:text-[#4da6ff] dark:hover:text-[#66b3ff] rounded-full text-sm font-medium transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2"
            >
              {t.home.getInTouchButton}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </button>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-4xl relative"
          >
            <div
              className="aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden bg-transparent relative select-none mx-auto"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={imgDefault}
                alt="Raphi Mii"
                className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`}
              />
              <img
                src={imgHover}
                alt="Raphi Mii Pose"
                className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          </motion.div>
        </section>

        {/* Featured Projects Carousel Section */}
        <section className="py-24 bg-[#f5f5f7] dark:bg-[#1d1d1f]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
                {t.home.highlights}
              </h3>
              <p className="text-lg text-[#5e5e63] dark:text-[#b8b8b8] max-w-2xl mx-auto">
                {lang === 'de' ? 'Entdecke die kuratierte Auswahl meiner Arbeiten' : 'Explore the curated selection of featured work'}
              </p>
            </motion.div>

            <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
              <CircularGallery
                items={galleryItems}
                textColor="#1d1d1f"
                onItemClick={() => navigate('/projects')}
              />
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
                {lang === 'de' ? 'Auszeichnungen.' : 'Awards.'}
              </h3>
              <p className="text-lg text-[#5e5e63] dark:text-[#b8b8b8] max-w-2xl mx-auto">
                {lang === 'de' ? 'Anerkennung für meine Arbeit an der OST.' : 'Recognition for my work at OST.'}
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {allAwards.map(({ award, project }, i) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-[#f5f5f7] dark:bg-[#1d1d1f] border border-[#d2d2d7]/50 dark:border-white/10 hover:scale-[1.01] transition-transform duration-500 ease-out"
                >
                  {award.image && (
                    <img
                      src={award.image}
                      alt={award.title[lang]}
                      loading="lazy"
                      className="w-full aspect-[3/2] object-cover"
                    />
                  )}
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f]">
                        {award.status === "won" ? <Medal size={22} /> : <Star size={20} />}
                      </span>
                      <span className="text-sm font-medium text-[#0066cc] dark:text-[#4da6ff]">
                        {award.result[lang]}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                      {award.title[lang]}
                    </h4>
                    <p className="text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]">
                      {project.content.title[lang]}
                    </p>
                    <p className="text-sm text-[#5e5e63] dark:text-[#b8b8b8] font-light leading-relaxed">
                      {award.description[lang]}
                    </p>
                    <p className="text-xs text-[#5e5e63] dark:text-[#b8b8b8]">
                      {award.date[lang]}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-3">
                      <Link
                        to={`/projects/${project.meta.id}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] rounded-full text-sm font-medium hover:bg-[#333336] dark:hover:bg-[#e5e5ea] transition-all focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2"
                      >
                        {lang === 'de' ? 'Zum Projekt' : 'View project'}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#d2d2d7] dark:border-[#424245] text-[#1d1d1f] dark:text-[#f5f5f7] rounded-full text-sm font-medium hover:bg-white dark:hover:bg-black transition-all focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2"
                      >
                        {lang === 'de' ? 'Zur OST-Seite' : 'View on OST website'}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Me */}
        <AboutMe />

      </div>
    </ClickSpark>
  );
}
