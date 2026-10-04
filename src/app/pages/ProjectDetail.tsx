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
    return (
      <ClickSpark sparkColor={isDark ? '#ffffff' : '#000000'} sparkSize={19} sparkRadius={40} sparkCount={13} duration={400} disableOnMobile>
        <div className="w-full min-h-screen">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 pt-32">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#5e5e63] hover:text-[#1d1d1f] dark:text-[#b8b8b8] dark:hover:text-[#f5f5f7] transition-colors mb-12 focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-lg px-2 py-1"
            >
              <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
              <span>{t.projectDetail.backToProjects}</span>
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]"
            >
              {title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-12 rounded-2xl overflow-hidden bg-[#f5f5f7] dark:bg-[#1d1d1f] flex justify-center"
            >
              <img src={cover} alt={title} className="w-full h-auto max-h-[560px] object-contain" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 mx-auto max-w-md rounded-3xl bg-white p-6 border border-[#d2d2d7]/50 dark:border-white/10"
            >
              <img
                src={underConstructionGif}
                alt={lang === 'de' ? 'Diese Projektseite ist noch im Aufbau' : 'This project page is under construction'}
                className="w-full h-auto"
              />
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
