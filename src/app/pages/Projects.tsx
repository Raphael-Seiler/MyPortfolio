import { useNavigate } from "react-router";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import fruitDudeImg from "../../assets/projects/spryte/Fruit_Dude.png";
import fishingLandingImg from "../../assets/projects/fishing/LandingPage.png";
import screen2Img from "../../assets/projects/spryte/Screen_2.png";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "spryte",
    image: screen2Img,
    logo: fruitDudeImg,
    title: "SPRYTE",
    tagline: { de: "Place Your Pixels", en: "Place Your Pixels" },
    description: {
      de: "Ein interaktives Ökosystem für standortübergreifende Pixel-Kunst, das Menschen über Hierarchien und Standorte hinweg spielerisch verbindet.",
      en: "An interactive ecosystem for cross-location pixel art that playfully connects people across hierarchies and locations."
    },
    category: { de: "UX Design", en: "UX Design" },
    tags: ["ux", "ui"],
    year: "2024",
    color: "#4285F4",
    bgColor: "bg-gradient-to-br from-[#4285F4]/10 via-[#34A853]/5 to-transparent",
    darkBgColor: "dark:from-[#4285F4]/10 dark:via-[#34A853]/5",
    stats: [
      { de: "6-köpfiges Team", en: "6-person team" },
      { de: "Figma Prototyp", en: "Figma prototype" }
    ]
  },
  {
    id: "fishing",
    image: fishingLandingImg,
    logo: null,
    title: "Helvetic Fishing Co.",
    tagline: { de: "Fishing E-Commerce", en: "Fishing E-Commerce" },
    description: {
      de: "Ein moderner E-Commerce-Shop für die Schweizer Fischerei-Community mit adaptivem Responsive Design.",
      en: "A modern e-commerce shop for the Swiss fishing community with adaptive responsive design."
    },
    category: { de: "E-Commerce", en: "E-Commerce" },
    tags: ["ecommerce", "ui"],
    year: "2025",
    color: "#34A853",
    bgColor: "bg-gradient-to-br from-[#34A853]/10 via-[#FBBC05]/5 to-transparent",
    darkBgColor: "dark:from-[#34A853]/10 dark:via-[#FBBC05]/5",
    stats: [
      { de: "High-Fidelity Prototyp", en: "High-fidelity prototype" },
      { de: "Responsive Design", en: "Responsive design" }
    ]
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1761122827167-159d1d272313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2glMjB1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: null,
    title: "Wireframe Kit",
    tagline: { de: "Rapid Prototyping", en: "Rapid Prototyping" },
    description: {
      de: "Ein modulares UI-Kit mit über 100 Komponenten für schnelle Prototypen und Wireframes in Figma.",
      en: "A modular UI kit with over 100 components for rapid prototyping and wireframes in Figma."
    },
    category: { de: "UI Kit", en: "UI Kit" },
    tags: ["ui"],
    year: "2024",
    color: "#FBBC05",
    bgColor: "bg-gradient-to-br from-[#FBBC05]/10 via-[#EA4335]/5 to-transparent",
    darkBgColor: "dark:from-[#FBBC05]/10 dark:via-[#EA4335]/5",
    stats: [
      { de: "100+ Komponenten", en: "100+ components" },
      { de: "Figma Community", en: "Figma Community" }
    ]
  }
];

export function Projects() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];

  const featuredProject = projects[0];
  const otherProjects = projects.filter(p => p.id !== featuredProject.id);

  return (
    <div className="w-full min-h-screen bg-[#ffffff] dark:bg-[#202124]">
      {/* Hero Banner - Google Style with gradient */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4285F4]/5 via-[#34A853]/3 to-[#FBBC05]/5 dark:from-[#4285F4]/10 dark:via-transparent dark:to-[#FBBC05]/10" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#EA4335]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-[#34A853]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#202124] dark:text-[#e8eaed] mb-8 leading-[1.05]"
            >
              {lang === "de" ? "Projekte, die" : "Projects that"}
              <br />
              <span className="text-[#1a73e8] dark:text-[#8ab4f8]">
                {lang === "de" ? "etwas bewegen" : "make a difference"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-[#5f6368] dark:text-[#9aa0a6] max-w-xl font-normal leading-relaxed"
            >
              {t.projects.subtitle}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Featured Project - Large Hero Card */}
      <section className="px-6 md:px-12 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            onClick={() => navigate(`/projects/${featuredProject.id}`)}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4285F4]/8 via-[#34A853]/4 to-[#FBBC05]/8 dark:from-[#4285F4]/15 dark:via-[#34A853]/5 dark:to-[#FBBC05]/10 border border-[#dadce0]/60 dark:border-[#5f6368]/30 cursor-pointer hover:shadow-lg transition-all duration-500"
          >
              <div className="grid lg:grid-cols-5 gap-0">
                {/* Content */}
                <div className="lg:col-span-2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: featuredProject.color }}
                      >
                        {featuredProject.category[lang]}
                      </span>
                      <span className="text-[#5f6368] dark:text-[#9aa0a6] text-sm font-medium">
                        {featuredProject.year}
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#202124] dark:text-[#e8eaed] leading-tight">
                      {featuredProject.title}
                    </h2>

                    <p className="text-lg text-[#202124] dark:text-[#e8eaed] font-medium">
                      {featuredProject.tagline[lang]}
                    </p>

                    <p className="text-[#5f6368] dark:text-[#9aa0a6] text-base md:text-lg font-normal leading-relaxed">
                      {featuredProject.description[lang]}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {featuredProject.stats.map((stat, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white/80 dark:bg-[#303134]/80 rounded-lg text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6] border border-[#dadce0]/50 dark:border-[#5f6368]/30"
                        >
                          {stat[lang]}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <span className="inline-flex items-center gap-2 text-[#1a73e8] dark:text-[#8ab4f8] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        {lang === "de" ? "Projekt entdecken" : "Explore project"}
                        <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="lg:col-span-3 relative h-80 lg:h-auto min-h-[400px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 dark:to-black/20 z-10 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    {featuredProject.logo ? (
                      <img
                        src={featuredProject.logo}
                        alt={`${featuredProject.title} Logo`}
                        className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <img
                        src={featuredProject.image}
                        alt={`${featuredProject.title} Preview`}
                        className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      {/* Project Grid - Google Style Cards */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-normal text-[#202124] dark:text-[#e8eaed]">
              {lang === "de" ? "Weitere Projekte" : "More Projects"}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="group relative overflow-hidden rounded-2xl border border-[#dadce0]/50 dark:border-[#5f6368]/30 bg-white dark:bg-[#303134] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-[#f8f9fa] dark:bg-[#202124]">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={`${project.title} Logo`}
                        className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={`${project.title} Preview`}
                        className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                  </div>
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <span className="text-xs font-medium text-[#5f6368] dark:text-[#9aa0a6]">
                      {project.category[lang]}
                    </span>
                    <span className="text-[#dadce0] dark:text-[#5f6368]">·</span>
                    <span className="text-xs text-[#9aa0a6] dark:text-[#80868b]">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-normal tracking-tight text-[#202124] dark:text-[#e8eaed] group-hover:text-[#1a73e8] dark:group-hover:text-[#8ab4f8] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[#5f6368] dark:text-[#9aa0a6] text-sm font-normal leading-relaxed line-clamp-2">
                    {project.description[lang]}
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[#1a73e8] dark:text-[#8ab4f8] text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
                      {lang === "de" ? "Details" : "Details"}
                      <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Google Style */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { number: "3", label: { de: "Projekte", en: "Projects" } },
              { number: "2", label: { de: "Jahre Erfahrung", en: "Years Experience" } },
              { number: "100+", label: { de: "Komponenten", en: "Components" } },
              { number: "∞", label: { de: "Begeisterung", en: "Passion" } },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-[#f8f9fa] dark:bg-[#303134] rounded-xl text-center border border-[#dadce0]/30 dark:border-[#5f6368]/20"
              >
                <div className="text-3xl md:text-4xl font-normal text-[#1a73e8] dark:text-[#8ab4f8] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-[#5f6368] dark:text-[#9aa0a6] font-normal">
                  {stat.label[lang]}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA - Google Style Banner */}
      <section className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a73e8] to-[#4285F4] p-10 md:p-16 text-center"
          >
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-4xl font-normal text-white mb-4">
                {lang === "de" ? "Lass uns zusammenarbeiten" : "Let's work together"}
              </h3>
              <p className="text-white/80 font-normal mb-8 max-w-lg mx-auto">
                {lang === "de"
                  ? "Ich bin immer offen für neue Herausforderungen und spannende Projekte."
                  : "I'm always open to new challenges and exciting projects."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigate("/contact")}
                  className="px-8 py-3.5 bg-white text-[#1a73e8] rounded-full text-sm font-medium hover:bg-white/90 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a73e8] shadow-lg"
                >
                  {lang === "de" ? "Kontakt aufnehmen" : "Get in touch"}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-3.5 bg-transparent text-white border border-white/30 rounded-full text-sm font-medium hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {lang === "de" ? "Mehr über mich" : "About me"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
