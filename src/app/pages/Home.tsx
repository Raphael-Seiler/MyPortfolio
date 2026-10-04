import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import MagicBento from "../components/MagicBento";
import CircularGallery from "../components/CircularGallery";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import ClickSpark from "../components/ClickSpark";
import { useEffect } from "react";
import { Medal, Star } from "lucide-react";
import { projects, allAwards } from "../../content/projects";
import imgDefault from "../../assets/home/Raphi_Mii_4K.webp";
import imgHover from "../../assets/home/Raphi_Mii_4K_pose.webp";

// Apple-style minimal icons
const LightbulbIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
    <path d="M9 21h6"/>
    <path d="M10 17l2 2 2-2"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const CoffeeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" x2="6" y1="1" y2="4"/>
    <line x1="10" x2="10" y1="1" y2="4"/>
    <line x1="14" x2="14" y1="1" y2="4"/>
  </svg>
);

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
                <motion.a
                  key={award.id}
                  href={award.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* About Section - Bento Grid */}
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
                {t.home.aboutTitle}
              </h3>
              <p className="text-lg text-[#5e5e63] dark:text-[#b8b8b8] max-w-2xl mx-auto">
                {t.home.aboutSubtitle}
              </p>
            </motion.div>

            <MagicBento
              cards={[
                {
                  label: t.home.philosophie,
                  title: t.home.philosophieTitle,
                  description: t.home.philosophieText,
                  className: "card-span-2-md",
                  icon: <LightbulbIcon />
                },
                {
                  label: t.home.staerken,
                  title: t.home.staerkenTitle,
                  description: (
                    <ul className="list-disc list-inside space-y-1 text-left text-[#5e5e63] dark:text-[#b8b8b8]">
                      {t.home.staerkenList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ),
                  icon: <ZapIcon />
                },
                {
                  label: t.home.entwicklung,
                  title: t.home.entwicklungTitle,
                  description: (
                    <ul className="list-disc list-inside space-y-1 text-left text-[#5e5e63] dark:text-[#b8b8b8]">
                      {t.home.entwicklungList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ),
                  icon: <TargetIcon />
                },
                {
                  label: t.home.hobbies,
                  title: t.home.wennIchNichtDesigne,
                  description: (
                    <ul className="list-disc list-inside space-y-1 text-left text-[#5e5e63] dark:text-[#b8b8b8]">
                      {t.home.hobbiesList.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ),
                  className: "card-col-span-2-md",
                  icon: <CoffeeIcon />
                }
              ]}
              textAutoHide={true}
              enableStars
              enableSpotlight
              enableBorderGlow={true}
              enableTilt
              enableMagnetism={false}
              clickEffect
              spotlightRadius={290}
              particleCount={12}
              glowColor="0, 113, 227"
              disableAnimations={false}
            />
          </div>
        </section>

      </div>
    </ClickSpark>
  );
}
