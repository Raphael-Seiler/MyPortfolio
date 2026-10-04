import { ReactNode, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import ClickSpark from "../components/ClickSpark";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import { getProject, Figure, Localized, TitledText } from "../../content/projects";
import figmaLogoImg from "../../assets/shared/Figma-logo.svg";

const headingClass =
  "text-sm font-medium tracking-widest uppercase text-[#55555a] dark:text-[#e5e5ea]";
const bodyClass = "text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed";
const chipClass =
  "inline-block px-4 py-1.5 bg-black/5 dark:bg-white/10 text-[#55555a] dark:text-[#e5e5ea] text-xs font-semibold tracking-wider uppercase rounded-full";

function Section({ title, delay = 0, children }: { title?: string; delay?: number; children: ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {title && <h2 className={`${headingClass} mb-4`}>{title}</h2>}
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
        <div key={i} className={item.title ? "flex gap-3" : ""}>
          {item.title && (
            <span className={`${titleWidth} flex-shrink-0 font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] break-words`}>
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
  return <p className="text-xs text-[#55555a] dark:text-[#e5e5ea] mt-3 text-center">{text[lang]}</p>;
}

function ProcessFigures({ figures }: { figures: Figure[] }) {
  const single = figures.length === 1;
  return (
    <div className={single ? "mt-8 flex justify-center" : "mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"}>
      {figures.map((fig) => (
        <div key={fig.src} className={`bg-white dark:bg-black rounded-2xl ${single ? "p-6 shadow-lg" : "p-4"}`}>
          <img
            src={fig.src}
            alt={fig.alt}
            className={
              single
                ? "w-[600px] max-w-full h-auto"
                : `w-full h-[400px] object-contain ${fig.blend ? "mix-blend-multiply dark:mix-blend-screen" : ""}`
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
        <p className="text-[#55555a] dark:text-[#e5e5ea]">{t.projectDetail.projectNotFound}</p>
      </div>
    );
  }

  const { meta, content, images, links } = project;
  const title = content.title[lang];

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="w-full min-h-screen max-w-6xl mx-auto px-6 md:px-12 py-20 pt-48">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center space-x-2 text-sm font-medium text-[#55555a] dark:text-[#e5e5ea] hover:text-black dark:hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span>{t.projectDetail.backToProjects}</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Hero Images */}
          {images.hero.length === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden bg-transparent mt-8"
            >
              <img src={images.hero[0]} alt={title} className="w-full h-auto object-cover rounded-2xl" />
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {images.hero.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="overflow-hidden bg-transparent"
                >
                  <img src={src} alt={`${title} ${i + 1}`} className="w-full h-auto object-cover" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Milky Background Container */}
          <div className="rounded-[2.5rem] bg-white/80 dark:bg-black/60 backdrop-blur-xl px-8 md:px-12 py-12 mt-8">
            {/* Project Labels */}
            <div className="flex justify-between items-center flex-wrap gap-2 mb-8">
              <span className={chipClass}>{meta.category[lang]}</span>
              <span className={chipClass}>{meta.year}</span>
            </div>

            {images.logo ? (
              <div className="flex justify-center mb-8">
                <img src={images.logo} alt={`${title} Logo`} className="h-32 md:h-48 w-auto object-contain" />
              </div>
            ) : (
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-center text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
                {title}
              </h1>
            )}

            <p className="text-lg text-[#55555a] dark:text-[#e5e5ea] font-light leading-relaxed mb-12 text-center">
              {content.subtitle[lang]}
            </p>

            {/* Project Sections */}
            <div className="space-y-16">
              <Section delay={0.1}>
                <p className={bodyClass}>{content.charter[lang]}</p>
              </Section>

              {content.goal && (
                <Section title={t.projectDetail.ourGoal} delay={0.2}>
                  <p className={bodyClass}>{content.goal[lang]}</p>
                </Section>
              )}

              {content.process && (
                <Section title={lang === 'de' ? t.projectDetail.prozess : t.projectDetail.process} delay={0.3}>
                  <TextOrSteps value={content.process[lang]} titleWidth="min-w-[120px]" />
                  {images.processFigures && <ProcessFigures figures={images.processFigures} />}
                </Section>
              )}

              {content.result && (
                <Section title={t.projectDetail.result} delay={0.3}>
                  <TextOrSteps value={content.result[lang]} titleWidth="w-[120px]" />
                </Section>
              )}

              {links.prototype && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center"
                >
                  <a
                    href={links.prototype}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 cursor-pointer"
                  >
                    <span className="text-sm text-[#55555a] dark:text-[#e5e5ea] font-medium">
                      {t.projectDetail.tryPrototype}
                    </span>
                    <svg className="w-4 h-4 text-[#55555a] dark:text-[#e5e5ea] transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                    <img src={figmaLogoImg} alt="Figma Prototype" className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-105" />
                  </a>
                </motion.section>
              )}

              {content.highlight && (
                <Section title={lang === 'de' ? 'Das Highlight' : 'The Highlight'} delay={0.4}>
                  {images.highlightFigure ? (
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <p className={`${bodyClass} flex-1 md:max-w-[50%]`}>{content.highlight[lang]}</p>
                      <div className="flex-shrink-0">
                        <img
                          src={images.highlightFigure.src}
                          alt={images.highlightFigure.alt}
                          className="w-[450px] max-w-full h-auto rounded-2xl"
                        />
                        <Caption text={images.highlightFigure.caption} />
                      </div>
                    </div>
                  ) : (
                    <p className={`${bodyClass} w-full`}>{content.highlight[lang]}</p>
                  )}
                </Section>
              )}

              {content.testing && (
                <Section title="Testing & Accessibility" delay={0.5}>
                  <TextOrSteps value={content.testing[lang]} titleWidth="w-[140px]" />
                </Section>
              )}

              {content.reflection && (
                <Section title={t.projectDetail.reflection} delay={0.6}>
                  <p className={bodyClass}>{content.reflection[lang]}</p>
                </Section>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </ClickSpark>
  );
}
