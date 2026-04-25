import { useNavigate } from "react-router";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import fruitDudeImg from "../../assets/projects/spryte/Fruit_Dude.png";
import fishingLandingImg from "../../assets/projects/fishing/LandingPage.png";
import screen2Img from "../../assets/projects/spryte/Screen_2.png";
import ClickSpark from "../components/ClickSpark";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: "spryte",
    image: screen2Img,
    logo: fruitDudeImg,
    title: "SPRYTE",
    tagline: { de: "Place Your Pixels", en: "Place Your Pixels" },
    description: {
      de: "Ein interaktives Ökosystem für standortübergreifende Pixel-Kunst.",
      en: "An interactive ecosystem for cross-location pixel art."
    },
    category: { de: "Schulprojekt", en: "School Project" },
    year: "2024",
    gradient: "from-orange-400/10 via-amber-400/10 to-yellow-400/10"
  },
  {
    id: "fishing",
    image: fishingLandingImg,
    logo: null,
    title: "Helvetic Fishing Co.",
    tagline: { de: "Fishing E-Commerce", en: "Fishing E-Commerce" },
    description: {
      de: "Ein moderner E-Commerce-Shop für die Schweizer Fischerei-Community.",
      en: "A modern e-commerce shop for the Swiss fishing community."
    },
    category: { de: "Schulprojekt", en: "School Project" },
    year: "2025",
    gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1761122827167-159d1d272313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2glMjB1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: null,
    title: "Wireframe Kit",
    tagline: { de: "Rapid Prototyping", en: "Rapid Prototyping" },
    description: {
      de: "Ein UI-Kit für schnelle Prototypen und Wireframes in Figma.",
      en: "A UI kit for rapid prototyping and wireframes in Figma."
    },
    category: { de: "Schulprojekt", en: "School Project" },
    year: "2024",
    gradient: "from-orange-500/10 via-amber-500/10 to-yellow-500/10"
  }
];

export function Projects() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];
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

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="w-full min-h-screen bg-[#ffffff] dark:bg-[#000000]">
        {/* Hero Section - Apple Product Page Style */}
        <section className="relative pt-32 pb-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6"
            >
              {t.projects.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#5e5e63] dark:text-[#b8b8b8] max-w-2xl mx-auto font-light"
            >
              {t.projects.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Project Cards - Apple Product Grid */}
        <section className="px-6 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                onClick={() => navigate(`/projects/${project.id}`)}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${project.gradient} dark:from-white/5 dark:via-white/[0.02] dark:to-transparent border border-[#d2d2d7]/50 dark:border-white/10 hover:scale-[1.01] transition-transform duration-500 ease-out`}
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Content Side */}
                  <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-[#f5f5f7] dark:bg-[#1d1d1f] text-[#5e5e63] dark:text-[#b8b8b8] text-xs font-medium">
                          {project.category[lang]}
                        </span>
                        <span className="text-[#5e5e63] dark:text-[#b8b8b8] text-xs font-medium">
                          {project.year}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                        {project.title}
                      </h2>

                      <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] font-medium">
                        {project.tagline[lang]}
                      </p>

                      <p className="text-[#5e5e63] dark:text-[#b8b8b8] text-base md:text-lg font-light leading-relaxed max-w-md">
                        {project.description[lang]}
                      </p>

                      <div className="pt-4">
                        <span className="inline-flex items-center gap-2 text-[#1d1d1f] dark:text-[#f5f5f7] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                          {lang === 'de' ? 'Projekt ansehen' : 'View project'}
                          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="relative h-80 md:h-[500px] overflow-hidden order-1 md:order-2">
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      {project.logo ? (
                        <img
                          src={project.logo}
                          alt={`${project.title} Logo`}
                          className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={`${project.title} Preview`}
                          className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom CTA - Apple Style */}
        <section className="px-6 md:px-12 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-12 bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-3xl"
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
                {lang === 'de' ? 'Interesse an einer Zusammenarbeit?' : 'Interested in working together?'}
              </h3>
              <p className="text-[#5e5e63] dark:text-[#b8b8b8] font-light mb-8 max-w-lg mx-auto">
                {lang === 'de'
                  ? 'Ich bin immer offen für neue Herausforderungen und spannende Projekte.'
                  : 'I\'m always open to new challenges and exciting projects.'}
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] rounded-full text-sm font-medium hover:bg-[#333336] dark:hover:bg-[#e5e5ea] transition-all focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2"
              >
                {lang === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    </ClickSpark>
  );
}
