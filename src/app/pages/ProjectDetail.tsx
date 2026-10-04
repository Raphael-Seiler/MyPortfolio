import { CSSProperties, ReactNode, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import ClickSpark from "../components/ClickSpark";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import { getProject, projects, Figure, Localized, Project, TitledText } from "../../content/projects";
import figmaLogoImg from "../../assets/shared/Figma-logo.svg";
import underConstructionGif from "../../assets/shared/under-construction.gif";

const ease = [0.22, 1, 0.36, 1] as const;
const muted = "text-[#5e5e63] dark:text-[#b8b8b8]";
const strong = "text-[#1d1d1f] dark:text-[#f5f5f7]";
const tile = "rounded-[28px] bg-[#f5f5f7] dark:bg-[#1d1d1f]";
const pillButton =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:ring-offset-2";
const primaryButton = `${pillButton} bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] hover:bg-[#333336] dark:hover:bg-[#e5e5ea]`;
const secondaryButton = `${pillButton} bg-[#f5f5f7] dark:bg-[#1d1d1f] ${strong} hover:bg-[#e8e8ed] dark:hover:bg-[#2c2c2e]`;

/* ---------- project colour ---------- */

const toRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const mix = (hex: string, target: string, amount: number) => {
  const a = toRgb(hex);
  const b = toRgb(target);
  return `#${a.map((v, i) => Math.round(v + (b[i] - v) * amount).toString(16).padStart(2, "0")).join("")}`;
};
const alpha = (hex: string, a: number) => `rgba(${toRgb(hex).join(",")},${a})`;

/** CSS variables for a project's main colour: --accent (bright), --accent-ink (readable on white), --accent-soft (tint). */
const accentVars = (color: string) =>
  ({
    "--accent": color,
    "--accent-ink": mix(color, "#000000", 0.3),
    "--accent-light": mix(color, "#ffffff", 0.35),
    "--accent-soft": alpha(color, 0.18),
  }) as CSSProperties;

// Text/details in the project colour: deep shade on light backgrounds, bright colour in dark mode
const accentText = "text-[var(--accent-ink)] dark:text-[var(--accent)]";
const accentGradient =
  "bg-[linear-gradient(90deg,var(--accent-ink),var(--accent))] dark:bg-[linear-gradient(90deg,var(--accent),var(--accent-light))]";

/* ---------- shared building blocks (teaser + full page) ---------- */

function BackLink() {
  const { lang } = useLanguage();
  return (
    <Link
      to="/projects"
      className={`inline-flex items-center gap-2 text-sm font-medium ${muted} hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-lg px-2 py-1`}
    >
      <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
      <span>{translations[lang].projectDetail.backToProjects}</span>
    </Link>
  );
}

/** Centered header: status pill, big title, gradient line and an optional intro. */
function Header({ pill, title, gradient, intro }: { pill: ReactNode; title: string; gradient: string; intro?: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      className="text-center mt-10 md:mt-14 mb-12 md:mb-16"
    >
      <span className={`inline-flex items-center gap-2 rounded-full ${tile} px-4 py-1.5 text-sm font-medium ${strong} mb-6`}>{pill}</span>
      <h1 className={`text-[2rem] sm:text-5xl md:text-7xl font-semibold tracking-tight ${strong} max-w-4xl mx-auto leading-[1.05] break-words`}>
        {title}
      </h1>
      <p className={`mt-4 inline-block text-2xl md:text-4xl font-semibold tracking-tight ${accentGradient} bg-clip-text text-transparent`}>
        {gradient}
      </p>
      {intro && <p className={`mt-6 text-lg md:text-xl ${muted} max-w-2xl mx-auto`}>{intro}</p>}
    </motion.header>
  );
}

/** Large rounded cover. One photo fills it, several screens stand side by side. */
function Cover({ project, title }: { project: Project; title: string }) {
  const { hero, card } = project.images;
  const screens = hero.length > 1 ? hero : null;
  const cover = hero[0] ?? card;
  const isPhoto = hero.includes(cover);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease }}
      className={`relative overflow-hidden rounded-[32px] aspect-[4/3] md:aspect-[16/9] ${
        isPhoto && !screens
          ? "bg-black"
          : "bg-[linear-gradient(180deg,var(--accent-soft),#f5f5f7)] dark:bg-[linear-gradient(180deg,var(--accent-soft),#111113)]"
      }`}
    >
      {screens ? (
        <div className="absolute inset-0 flex items-center justify-center gap-3 md:gap-6 px-6 md:px-16">
          {screens.map((src, i) => (
            <motion.img
              key={src}
              src={src}
              alt={`${title} ${i + 1}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease }}
              className="w-[21%] max-w-[230px] h-auto aspect-[383/688] object-cover rounded-[10px] sm:rounded-[16px] md:rounded-[24px] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]"
            />
          ))}
        </div>
      ) : (
        <img
          src={cover}
          alt={title}
          className={`absolute inset-0 w-full h-full ${isPhoto ? "object-cover object-top" : "object-contain p-10 md:p-16"}`}
        />
      )}
    </motion.div>
  );
}

/** Glass card that floats over the bottom edge of the cover. */
function FloatingCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.45, ease }}
      className="relative z-10 -mt-10 md:-mt-28 mx-auto max-w-md rounded-[28px] bg-white/85 dark:bg-[#1d1d1f]/85 backdrop-blur-2xl border border-black/5 dark:border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] p-6 text-center"
    >
      {children}
    </motion.div>
  );
}

function PageShell({ color, children }: { color: string; children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const checkDarkMode = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return (
    <ClickSpark sparkColor={isDark ? "#ffffff" : "#000000"} sparkSize={19} sparkRadius={40} sparkCount={13} duration={400} disableOnMobile>
      <div className="relative w-full min-h-screen pt-28 pb-24" style={accentVars(color)}>
        {/* Faded glow in the project colour behind the top of the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,var(--accent-soft),transparent_75%)]"
        />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12">{children}</div>
      </div>
    </ClickSpark>
  );
}

/* ---------- full case study sections ---------- */

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className={`text-sm font-semibold tracking-tight mb-3 ${accentText}`}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <h2 className={`text-3xl md:text-5xl font-semibold tracking-tight ${strong} mb-8 md:mb-12`}>{children}</h2>;
}

/** Untitled entries become intro paragraphs, titled ones become numbered tiles. */
function Steps({ value, icon }: { value: string | TitledText[]; icon?: "check" }) {
  if (!Array.isArray(value)) {
    return <p className={`text-xl md:text-2xl leading-relaxed ${muted} max-w-4xl`}>{value}</p>;
  }
  const intro = value.filter((s) => !s.title);
  const titled = value.filter((s) => s.title);
  const cols = titled.length >= 4 ? "lg:grid-cols-4" : titled.length === 3 ? "lg:grid-cols-3" : "";
  return (
    <>
      {intro.map((s, i) => (
        <p key={i} className={`text-xl md:text-2xl leading-relaxed ${muted} max-w-4xl mb-6`}>
          {s.desc}
        </p>
      ))}
      {titled.length > 0 && (
        <div className={`grid gap-4 md:gap-6 md:grid-cols-2 ${cols} ${intro.length ? "mt-10" : ""}`}>
          {titled.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className={`${tile} p-7 md:p-8 flex flex-col`}
            >
              {icon === "check" ? (
                <span className="w-9 h-9 rounded-full flex items-center justify-center text-white dark:text-black mb-6 bg-[var(--accent-ink)] dark:bg-[var(--accent)]">
                  <Check size={18} strokeWidth={2.5} aria-hidden="true" />
                </span>
              ) : (
                <span className={`text-4xl font-semibold tracking-tight tabular-nums mb-6 ${accentText}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <h3 className={`text-xl md:text-2xl font-semibold tracking-tight ${strong} mb-3`}>{s.title}</h3>
              <p className={`text-base leading-relaxed ${muted}`}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}

function Figures({ figures }: { figures: Figure[] }) {
  const { lang } = useLanguage();
  return (
    <div className={`mt-10 grid gap-4 md:gap-6 ${figures.length > 1 ? "md:grid-cols-2" : ""}`}>
      {figures.map((fig) => (
        <figure key={fig.src} className={`${tile} p-6 md:p-10 flex flex-col items-center`}>
          <div className="w-full rounded-2xl bg-white p-4 flex justify-center">
            <img
              src={fig.src}
              alt={fig.alt}
              className={`w-full ${figures.length > 1 ? "h-[340px]" : "max-h-[520px]"} object-contain ${fig.blend ? "mix-blend-multiply" : ""}`}
            />
          </div>
          {fig.caption && <figcaption className={`mt-4 text-sm ${muted}`}>{fig.caption[lang]}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function Caption({ text }: { text?: Localized }) {
  const { lang } = useLanguage();
  if (!text) return null;
  return <p className="mt-3 text-sm text-[#a1a1a6]">{text[lang]}</p>;
}

/* ---------- page ---------- */

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const project = id ? getProject(id) : undefined;
  const t = translations[lang];

  if (!project) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className={muted}>{t.projectDetail.projectNotFound}</p>
      </div>
    );
  }

  const { meta, content, images, links } = project;
  const title = content.title[lang];
  const accent = meta.color;

  // A project without case-study sections yet only shows its title, cover and a construction note
  const inProgress = !content.goal && !content.process && !content.result && !content.testing && !content.reflection;
  if (inProgress) {
    return (
      <PageShell color={accent}>
        <BackLink />
        <Header
          title={title}
          gradient={lang === "de" ? "Bald verfügbar." : "Coming soon."}
          pill={
            <>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-70 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              {lang === "de" ? "In Arbeit" : "In progress"}
            </>
          }
        />
        <Cover project={project} title={title} />
        <FloatingCard>
          <div className="mx-auto w-36 h-36 rounded-[32px] bg-white overflow-hidden shadow-sm ring-1 ring-black/5">
            <img
              src={underConstructionGif}
              alt={lang === "de" ? "Baustelle: diese Projektseite ist noch im Aufbau" : "Construction site: this project page is still being built"}
              className="w-full h-full object-contain"
            />
          </div>
          <p className={`mt-5 text-lg font-semibold tracking-tight ${strong}`}>
            {lang === "de" ? "Diese Fallstudie entsteht gerade." : "This case study is being built."}
          </p>
          <Link to="/projects" className={`mt-5 ${primaryButton}`}>
            {lang === "de" ? "Andere Projekte ansehen" : "See other projects"}
          </Link>
        </FloatingCard>
      </PageShell>
    );
  }

  const index = projects.findIndex((p) => p.meta.id === meta.id);
  const next = projects[(index + 1) % projects.length];

  return (
    <PageShell color={accent}>
      <BackLink />
      <Header
        title={title}
        gradient={meta.tagline[lang]}
        intro={content.subtitle[lang]}
        pill={
          <>
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            {meta.category[lang]} · {meta.year}
          </>
        }
      />
      <Cover project={project} title={title} />

      <FloatingCard>
        {images.logo && (
          <div className="mx-auto w-28 h-28 rounded-[28px] bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center p-4">
            <img src={images.logo} alt={`${meta.title} Logo`} className="max-w-full max-h-full object-contain" />
          </div>
        )}
        {meta.stats.length > 0 && (
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {meta.stats.map((stat) => (
              <span key={stat.de} className={`px-3 py-1.5 rounded-full ${tile} text-xs font-medium ${strong}`}>
                {stat[lang]}
              </span>
            ))}
          </div>
        )}
        {links.prototype && (
          <a href={links.prototype} target="_blank" rel="noopener noreferrer" className={`mt-5 ${primaryButton}`}>
            <img src={figmaLogoImg} alt="" className="w-4 h-4 object-contain" aria-hidden="true" />
            {t.projectDetail.tryPrototype}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        )}
      </FloatingCard>

      <div className="mt-24 md:mt-32 space-y-24 md:space-y-36">
        {/* Charter as a big statement */}
        {content.charter[lang] && (
          <Reveal className="max-w-4xl">
            <Eyebrow>{t.projectDetail.projectCharter}</Eyebrow>
            <p className={`text-xl md:text-3xl font-semibold tracking-tight leading-[1.3] ${strong}`}>{content.charter[lang]}</p>
          </Reveal>
        )}

        {content.goal && (
          <Reveal className="grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-16 items-start">
            <div>
              <Eyebrow>{t.projectDetail.ourGoal}</Eyebrow>
              <h2 className={`text-3xl md:text-5xl font-semibold tracking-tight ${strong}`}>
                {lang === "de" ? "Worum es ging." : "What it was about."}
              </h2>
            </div>
            <p className={`text-xl md:text-2xl leading-relaxed ${muted}`}>{content.goal[lang]}</p>
          </Reveal>
        )}

        {content.process && (
          <Reveal>
            <Eyebrow>{lang === "de" ? t.projectDetail.prozess : t.projectDetail.process}</Eyebrow>
            <SectionTitle>{lang === "de" ? "Vom Problem zur Lösung." : "From problem to solution."}</SectionTitle>
            <Steps value={content.process[lang]} />
            {images.processFigures && <Figures figures={images.processFigures} />}
          </Reveal>
        )}

        {content.result && (
          <Reveal>
            <Eyebrow>{t.projectDetail.result}</Eyebrow>
            <SectionTitle>{lang === "de" ? "Das Ergebnis." : "The result."}</SectionTitle>
            <Steps value={content.result[lang]} />
          </Reveal>
        )}

        {/* Highlight as a dark feature card */}
        {content.highlight && (
          <Reveal>
            <div className="rounded-[32px] bg-[#1d1d1f] dark:bg-[#1c1c1e] text-[#f5f5f7] p-8 md:p-14 grid gap-10 md:gap-14 md:grid-cols-2 items-center overflow-hidden">
              <div>
                <p className="text-sm font-semibold tracking-tight mb-3 text-[var(--accent)]">{lang === "de" ? "Das Highlight" : "The highlight"}</p>
                <p className="text-lg md:text-xl leading-relaxed text-[#d2d2d7]">{content.highlight[lang]}</p>
              </div>
              {images.highlightFigure ? (
                <figure>
                  <img
                    src={images.highlightFigure.src}
                    alt={images.highlightFigure.alt}
                    className="w-full h-auto rounded-[20px]"
                  />
                  <Caption text={images.highlightFigure.caption} />
                </figure>
              ) : (
                images.logo && (
                  <div className="flex justify-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-[48px] bg-white flex items-center justify-center p-8">
                      <img src={images.logo} alt="" aria-hidden="true" className="max-w-full max-h-full object-contain" />
                    </div>
                  </div>
                )
              )}
            </div>
          </Reveal>
        )}

        {content.testing && (
          <Reveal>
            <Eyebrow>Testing &amp; Accessibility</Eyebrow>
            <SectionTitle>{lang === "de" ? "Geprüft und verbessert." : "Tested and refined."}</SectionTitle>
            <Steps value={content.testing[lang]} icon="check" />
          </Reveal>
        )}

        {/* Reflection as the closing statement */}
        {content.reflection && (
          <Reveal className="text-center max-w-3xl mx-auto">
            <Eyebrow>{t.projectDetail.reflection}</Eyebrow>
            <p className={`text-xl md:text-2xl font-semibold tracking-tight leading-snug ${strong}`}>{content.reflection[lang]}</p>
          </Reveal>
        )}

        {/* Next steps */}
        <Reveal className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={`/projects/${next.meta.id}`} className={primaryButton}>
            {lang === "de" ? "Nächstes Projekt" : "Next project"}: {next.meta.title}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link to="/projects" className={secondaryButton}>
            {lang === "de" ? "Alle Projekte" : "All projects"}
          </Link>
        </Reveal>
      </div>
    </PageShell>
  );
}
