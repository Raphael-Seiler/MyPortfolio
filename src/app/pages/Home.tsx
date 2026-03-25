import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { ImageWithFallback } from "../components/ImageWithFallback";
import MagicBento from "../components/MagicBento";
import CircularGallery from "../components/CircularGallery";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import ClickSpark from "../components/ClickSpark";
import { useEffect } from "react";
// SF Symbols style icons
const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
    <path d="M9 21h6"/>
    <path d="M10 17l2 2 2-2"/>
  </svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const CoffeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" x2="6" y1="1" y2="4"/>
    <line x1="10" x2="10" y1="1" y2="4"/>
    <line x1="14" x2="14" y1="1" y2="4"/>
  </svg>
);
import imgDefault from "../../assets/home/Raphi_Mii_4K.png";
import imgHover from "../../assets/home/Raphi_Mii_4K_pose.png";
import fruitDudeImg from "../../assets/projects/spryte/Fruit_Dude.png";

export function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const { lang } = useLanguage();
  const navigate = useNavigate();
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

  // Memoize gallery items to prevent recreation on language change
  const galleryItems = useMemo(() => [
    { image: fruitDudeImg },
    { image: 'https://images.unsplash.com/photo-1649442279006-8bccb4cc63e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdlYnNpdGUlMjBkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { image: 'https://images.unsplash.com/photo-1761122827167-159d1d272313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2glMjB1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { image: 'https://images.unsplash.com/photo-1551651061-a9f70670893a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjB1aXxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { image: 'https://images.unsplash.com/photo-1586717791821-0c862716d8b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { image: 'https://images.unsplash.com/photo-1581299970385-123f894d8a95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  ], []);

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 pb-32">
      {/* Circular Gallery - Featured Projects - Full Width */}
      <div
        className="relative w-full h-[600px] md:h-[700px] overflow-hidden mb-20 md:mb-0 pt-48 cursor-pointer"
      >
        <CircularGallery
          items={galleryItems}
          textColor="#1d1d1f"
          onItemClick={() => navigate('/projects')}
        />
        <div className="absolute bottom-4 left-0 right-0 z-20 pointer-events-none flex justify-center w-full">
          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#55555a] dark:text-[#e5e5ea] font-medium tracking-widest uppercase block text-sm mb-2"
            >
              {t.home.featuredProjects}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]"
            >
              {t.home.highlights}
            </motion.h2>
          </div>
        </div>
      </div>

      <section className="relative min-h-[70vh] flex flex-col md:flex-row items-center justify-between pt-10 pb-20 overflow-hidden gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-2xl flex-1 z-10"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 leading-[1.05] drop-shadow-sm dark:drop-shadow-md">
            {t.home.hello}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] to-[#55555a] dark:from-[#f5f5f7] dark:to-[#d1d1d6]">
              {t.home.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#55555a] dark:text-[#e5e5ea] max-w-xl leading-relaxed font-light">
            {t.home.description}
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
          className="flex-1 w-full max-w-4xl relative z-10"
        >
          <div
            className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-transparent relative select-none"
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

      {/* Bento Grid: About Me */}
      <section className="py-20 relative z-10">
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
                <ul className="list-disc list-inside space-y-1 text-left">
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
                <ul className="list-disc list-inside space-y-1 text-left">
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
                <ul className="list-disc list-inside space-y-1 text-left">
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
          glowColor="0, 150, 255"
          disableAnimations={false}
        />
      </section>

    </div>
    </ClickSpark>
  );
}