import { ReactNode, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import ClickSpark from "../components/ClickSpark";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import { getProject, Figure, Localized, TitledText } from "../../content/projects";
import figmaLogoImg from "../../assets/shared/Figma-logo.svg";
import underConstructionGif from "../../assets/shared/under-construction.gif";

const headingClass =
  "text-xs font-semibold tracking-widest uppercase text-[#5e5e63] dark:text-[#b8b8b8]";
const bodyClass = "text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light";

function Section({ title, delay = 0, spaced, children }: { title: string; delay?: number; spaced?: boolean; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <h2 className={`${headingClass} ${spaced ? "mb-6" : "mb-4"}`}>{title}</h2>
      {children}
    </motion.section>
  );
}

/** Renders either a plain paragraph or a list of titled paragraphs. */
function TextOrSteps({ value, titleWidth }: { value: string | TitledText[]; titleWidth: string }) {
  if (!Array.isArray(value)) return <p className={bodyClass}>{value}</p>;
  return (
    <div className="space-y-4">
      {value.map((item, i) => (
        <div key={i} className={item.title ? "flex gap-4" : ""}>
          {item.title && (
            <span className={`${titleWidth} flex-shrink-0 font-medium text-[#1d1d1f] dark:text-[#f5f5f7]`}>
              {item.title}
            </span>
          )}
          <p className={`${bodyClass} flex-1`}>{item.desc}</p>
        </div>
      ))}
    </div>
  );
}

function Caption({ text }: { text?: Localized }) {
  const { lang } = useLanguage();
  if (!text) return null;
  return <p className="text-xs text-[#5e5e63] dark:text-[#b8b8b8] mt-3 text-center">{text[lang]}</p>;
}

function ProcessFigures({ figures }: { figures: Figure[] }) {
  const single = figures.length === 1;
  return (
    <div className={single ? "mt-8 flex justify-center" : "mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"}>
      {figures.map((fig) => (
        <div key={fig.src} className={`bg-white dark:bg-[#000000] rounded-2xl ${single ? "p-6" : "p-4"}`}>
          <img
            src={fig.src}
            alt={fig.alt}
            className={
              single
                ? "w-full max-w-[500px] h-auto"
                : `w-full h-[350px] object-contain ${fig.blend ? "mix-blend-multiply dark:mix-blend-screen" : ""}`
            }
          />
          <Caption text={fig.caption} />
        </div>
      ))}
    </div>
  );
}

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const project = id ? getProject(id) : undefined;
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

  if (!project) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-[#5e5e63] dark:text-[#b8b8b8]">{t.projectDetail.projectNotFound}</p>
      </div>
    );
  }

  const { content, images, links } = project;
  const title = content.title[lang];

  // A project without case-study sections yet only shows its title, cover and a construction note
  const inProgress = !content.goal && !content.process && !content.result && !content.testing && !content.reflection;
  if (inProgress) {
    const cover = images.hero[0] ?? images.card;
    const isPhoto = images.hero.includes(cover);
    return (
      <ClickSpark sparkColor={isDark ? '#ffffff' : '#000000'} sparkSize={19} sparkRadius={40} sparkCount={13} duration={400} disableOnMobile>
        <div className="w-full min-h-screen pt-28 pb-24">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#5e5e63] hover:text-[#1d1d1f] dark:text-[#b8b8b8] dark:hover:text-[#f5f5f7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-lg px-2 py-1"
            >
              <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
              <span>{t.projectDetail.backToProjects}</span>
            </Link>

            {/* Teaser headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mt-10 md:mt-14 mb-12 md:mb-16"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] dark:bg-[#1d1d1f] px-4 py-1.5 text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff9f0a] opacity-70 animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff9f0a]" />
                </span>
                {lang === 'de' ? 'In Arbeit' : 'In progress'}
              </span>
              <h1 className="text-[2rem] sm:text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] max-w-4xl mx-auto leading-[1.05] break-words">
                {title}
              </h1>
              <p className="mt-4 inline-block text-2xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-[#ff9f0a] via-[#ff375f] to-[#bf5af2] bg-clip-text text-transparent">
                {lang === 'de' ? 'Bald verfügbar.' : 'Coming soon.'}
              </p>
            </motion.div>

            {/* Cover */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-[32px] aspect-[4/3] md:aspect-[16/9] ${isPhoto ? 'bg-black' : 'bg-[#f5f5f7] dark:bg-[#1d1d1f]'}`}
            >
              <img
                src={cover}
                alt={title}
                className={`absolute inset-0 w-full h-full ${isPhoto ? 'object-cover' : 'object-contain p-10 md:p-16'}`}
              />
            </motion.div>

            {/* Floating construction card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 -mt-10 md:-mt-28 mx-auto max-w-sm rounded-[28px] bg-white/85 dark:bg-[#1d1d1f]/85 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] p-6 text-center"
            >
              <div className="mx-auto w-36 h-36 rounded-[32px] bg-white overflow-hidden shadow-sm ring-1 ring-black/5">
                <img
                  src={underConstructionGif}
                  alt={lang === 'de' ? 'Baustelle: diese Projektseite ist noch im Aufbau' : 'Construction site: this project page is still being built'}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-5 text-lg font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                {lang === 'de' ? 'Diese Fallstudie entsteht gerade.' : 'This case study is being built.'}
              </p>
              <Link
                to="/projects"
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] text-sm font-medium hover:bg-[#333336] dark:hover:bg-[#e5e5ea] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2"
              >
                {lang === 'de' ? 'Andere Projekte ansehen' : 'See other projects'}
              </Link>
            </motion.div>
          </div>
        </div>
      </ClickSpark>
    );
  }

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 pt-32">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#5e5e63] hover:text-[#1d1d1f] dark:text-[#b8b8b8] dark:hover:text-[#f5f5f7] transition-colors mb-12 focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-lg px-2 py-1"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          <span>{t.projectDetail.backToProjects}</span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
            {title}
          </h1>
          <p className="text-xl text-[#5e5e63] dark:text-[#b8b8b8] font-light max-w-2xl">{content.subtitle[lang]}</p>
        </motion.div>

        {/* Hero Images */}
        {images.hero.length === 1 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <img src={images.hero[0]} alt={title} className="w-full h-auto object-contain rounded-2xl" />
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {images.hero.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="overflow-hidden rounded-2xl bg-[#f5f5f7] dark:bg-[#1d1d1f]"
              >
                <img src={src} alt={`${title} ${i + 1}`} className="w-full h-auto object-cover rounded-2xl" />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-3xl p-8 md:p-12"
        >
          {images.logo && (
            <div className="flex justify-center mb-10">
              <img src={images.logo} alt={`${title} Logo`} className="h-24 md:h-36 w-auto object-contain" />
            </div>
          )}

          <div className="space-y-12">
            <Section title={t.projectDetail.projectCharter}>
              <p className={`text-lg ${bodyClass}`}>{content.charter[lang]}</p>
            </Section>

            {content.goal && (
              <Section title={t.projectDetail.ourGoal} delay={0.1}>
                <p className={`text-lg ${bodyClass}`}>{content.goal[lang]}</p>
              </Section>
            )}

            {content.process && (
              <Section title={lang === "de" ? t.projectDetail.prozess : t.projectDetail.process} delay={0.2} spaced>
                <TextOrSteps value={content.process[lang]} titleWidth="min-w-[100px]" />
                {images.processFigures && <ProcessFigures figures={images.processFigures} />}
              </Section>
            )}

            {content.result && (
              <Section title={t.projectDetail.result} delay={0.3} spaced>
                <TextOrSteps value={content.result[lang]} titleWidth="w-[100px]" />

                {links.prototype && (
                  <div className="flex flex-col items-center gap-3 mt-8">
                    <a
                      href={links.prototype}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-2xl p-4"
                    >
                      <span className="text-sm font-medium text-[#0066cc] dark:text-[#4da6ff] group-hover:text-[#004d99] dark:group-hover:text-[#80c0ff] transition-colors">
                        {t.projectDetail.tryPrototype}
                      </span>
                      <svg className="text-[#0066cc] dark:text-[#4da6ff] w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 5v14" />
                        <path d="M19 12l-7 7-7-7" />
                      </svg>
                      <img src={figmaLogoImg} alt="Figma" className="w-12 h-12 object-contain transition-transform group-hover:scale-110" />
                    </a>
                  </div>
                )}
              </Section>
            )}

            {content.highlight && (
              <Section title={lang === "de" ? "Das Highlight" : "The Highlight"} delay={0.4}>
                {images.highlightFigure ? (
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <p className={`${bodyClass} flex-1`}>{content.highlight[lang]}</p>
                    <div className="flex-shrink-0">
                      <img
                        src={images.highlightFigure.src}
                        alt={images.highlightFigure.alt}
                        className="w-[400px] max-w-full h-auto rounded-2xl"
                      />
                      <Caption text={images.highlightFigure.caption} />
                    </div>
                  </div>
                ) : (
                  <p className={bodyClass}>{content.highlight[lang]}</p>
                )}
              </Section>
            )}

            {content.testing && (
              <Section title="Testing & Accessibility" delay={0.45}>
                <TextOrSteps value={content.testing[lang]} titleWidth="min-w-[120px]" />
              </Section>
            )}

            {content.reflection && (
              <Section title={t.projectDetail.reflection} delay={0.5}>
                <p className={bodyClass}>{content.reflection[lang]}</p>
              </Section>
            )}
          </div>
        </motion.div>
      </div>
    </div>
    </ClickSpark>
  );
}
