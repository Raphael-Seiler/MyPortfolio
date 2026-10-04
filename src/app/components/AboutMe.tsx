import { ReactNode, useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  MotionValue,
} from "motion/react";
import { Car, ChevronLeft, ChevronRight, Coffee, Fish, Sparkles, Users } from "lucide-react";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";

// Icons for the hobbies, in the order of translations.home.hobbiesList
const hobbyIcons = [Car, Fish, Coffee, Users];

// Left padding that lines the gallery up with the max-w-6xl content column
const galleryInset = "max(1.5rem, calc((100vw - 72rem) / 2 + 3rem))";

const stripEllipsis = (s: string) => s.replace(/^\.\.\./, "").replace(/\.\.\.$/, "");

/** One word of the philosophy statement, lit up as the reader scrolls past it. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/** Apple-style statement: the words fade in one after another while scrolling. */
function Statement({ lead, text }: { lead: string; text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-[#1d1d1f] dark:text-[#f5f5f7]"
    >
      <span className="bg-gradient-to-r from-[#0071e3] via-[#8e5cf7] to-[#e5458f] bg-clip-text text-transparent">
        {lead}{" "}
      </span>
      {reduceMotion
        ? text
        : words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
    </p>
  );
}

function CardShell({ index, dark, children }: { index: number; dark?: boolean; children: ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`snap-start shrink-0 w-[78vw] sm:w-[440px] md:w-[480px] min-h-[420px] md:min-h-[460px] rounded-[28px] p-8 md:p-10 flex flex-col ${
        dark
          ? "bg-[#1d1d1f] text-[#f5f5f7] dark:bg-[#f5f5f7] dark:text-[#1d1d1f]"
          : "bg-[#f5f5f7] text-[#1d1d1f] dark:bg-[#1d1d1f] dark:text-[#f5f5f7]"
      }`}
    >
      {children}
    </motion.article>
  );
}

function Eyebrow({ children, className }: { children: string; className: string }) {
  return (
    <span className={`text-sm font-semibold tracking-tight mb-3 ${className}`}>
      {children}
    </span>
  );
}

export function AboutMe() {
  const { lang } = useLanguage();
  const t = translations[lang].home;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    const card = el?.querySelector("article");
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.clientWidth + 24), behavior: "smooth" });
  };

  const paddleClass =
    "w-11 h-11 rounded-full flex items-center justify-center bg-[#e8e8ed] dark:bg-[#333336] text-[#1d1d1f] dark:text-[#f5f5f7] transition-all hover:bg-[#dcdce1] dark:hover:bg-[#424245] disabled:opacity-40 disabled:cursor-default focus:outline-none focus:ring-2 focus:ring-[#0066cc]";

  return (
    <section className="py-24 md:py-32 overflow-hidden" aria-labelledby="about-title">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <h3 id="about-title" className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
            {t.aboutTitle}
          </h3>
          <p className="text-lg text-[#5e5e63] dark:text-[#b8b8b8] max-w-2xl">{t.aboutSubtitle}</p>
        </motion.div>

        {/* Philosophy */}
        <div className="max-w-4xl mb-24 md:mb-32">
          <p className="text-sm font-semibold tracking-tight text-[#5e5e63] dark:text-[#b8b8b8] mb-5">{t.philosophie}</p>
          <Statement lead={stripEllipsis(t.philosophieTitle)} text={stripEllipsis(t.philosophieText)} />
        </div>
      </div>

      {/* Card gallery */}
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: galleryInset, scrollPaddingInline: galleryInset }}
        role="region"
        aria-label={t.aboutTitle}
      >
        {/* Strengths */}
        <CardShell index={0}>
          <Eyebrow className="text-[#0071e3] dark:text-[#2997ff]">{t.staerken}</Eyebrow>
          <h4 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">{t.staerkenTitle}</h4>
          <ol className="mt-auto space-y-5">
            {t.staerkenList.map((item, i) => (
              <li key={item} className="flex items-baseline gap-5">
                <span className="text-4xl md:text-5xl font-semibold tracking-tight tabular-nums bg-gradient-to-b from-[#0071e3] to-[#8e5cf7] bg-clip-text text-transparent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl font-medium">{item}</span>
              </li>
            ))}
          </ol>
        </CardShell>

        {/* Growth */}
        <CardShell index={1}>
          <Eyebrow className="text-[#bf4800] dark:text-[#ff9f0a]">{t.entwicklung}</Eyebrow>
          <h4 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">{t.entwicklungTitle}</h4>
          <ul className="mt-auto space-y-4">
            {t.entwicklungList.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 rounded-2xl bg-white dark:bg-[#2c2c2e] px-5 py-5"
              >
                <span className="relative flex h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ff9f0a] opacity-60 animate-ping motion-reduce:animate-none" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#ff9f0a]" />
                </span>
                <span className="text-lg md:text-xl font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[#5e5e63] dark:text-[#b8b8b8]">
            {lang === "de" ? "In Arbeit." : "In progress."}
          </p>
        </CardShell>

        {/* Hobbies */}
        <CardShell index={2} dark>
          <Eyebrow className="text-[#30d158] dark:text-[#248a3d]">{t.hobbies}</Eyebrow>
          <h4 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">{t.wennIchNichtDesigne}</h4>
          <ul className="mt-auto grid grid-cols-2 gap-3">
            {t.hobbiesList.map((item, i) => {
              const Icon = hobbyIcons[i] ?? Sparkles;
              return (
                <li
                  key={item}
                  className="rounded-2xl bg-white/10 dark:bg-black/5 p-4 flex flex-col gap-3"
                >
                  <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
                  <span className="text-sm md:text-base font-medium leading-snug">{item}</span>
                </li>
              );
            })}
          </ul>
        </CardShell>

        {/* Spacer so the last card can snap to the start on wide screens */}
        <div className="shrink-0 w-px" aria-hidden="true" />
      </div>

      {/* Paddle navigation */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-6 flex justify-end gap-3">
        <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} className={paddleClass} aria-label={lang === "de" ? "Zurück" : "Previous"}>
          <ChevronLeft size={20} />
        </button>
        <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} className={paddleClass} aria-label={lang === "de" ? "Weiter" : "Next"}>
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
