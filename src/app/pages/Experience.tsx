import { KeyboardEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, ChevronUp, Medal, Star } from "lucide-react";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import ClickSpark from "../components/ClickSpark";
import { timeline } from "../../content/timeline";

// Depth of the Time Machine stack: each older window sits higher and further away
const STEP = { desktop: { y: 46, z: 170 }, phone: { y: 26, z: 120 } };
const VISIBLE_BEHIND = 4;

function useIsDesktop() {
  const query = "(min-width: 768px)";
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/**
 * Werdegang as a Time Machine: every station is a window, the newest in front,
 * older ones receding into space. Navigate with the ruler, scrolling, the
 * arrow keys, the buttons or by clicking a window in the back.
 */
export function Experience() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const reduceMotion = useReducedMotion();
  const step = useIsDesktop() ? STEP.desktop : STEP.phone;
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const pick = (de: string, en?: string) => (lang === "en" && en ? en : de);
  const items = timeline.map((exp) => ({
    ...exp,
    role: pick(exp.role, exp.roleEn),
    company: pick(exp.company, exp.companyEn),
    period: pick(exp.period, exp.periodEn),
    description: pick(exp.description, exp.descriptionEn),
    details: pick(exp.details ?? "", exp.detailsEn),
  }));
  const last = items.length - 1;

  // Index into the chronological list; starts at the newest station
  const [active, setActive] = useState(last);
  const older = () => setActive((a) => Math.max(0, a - 1));
  const newer = () => setActive((a) => Math.min(last, a + 1));

  // Scroll over the stack travels through time; at either end the page scrolls normally
  const stageRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let locked = false;
    let acc = 0;
    const onWheel = (e: WheelEvent) => {
      const dir = e.deltaY > 0 ? -1 : 1; // scrolling down goes back in time
      const target = activeRef.current + dir;
      if (target < 0 || target > last) return;
      e.preventDefault();
      if (locked) return;
      acc += Math.abs(e.deltaY);
      if (acc < 30) return;
      acc = 0;
      locked = true;
      setActive(target);
      setTimeout(() => (locked = false), 480);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [last]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); older(); }
    if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); newer(); }
  };

  // Horizontal swipe on touch screens (vertical swipes keep scrolling the page)
  const swipeStart = useRef<number | null>(null);
  const onPointerDown = (e: PointerEvent) => { if (e.pointerType !== "mouse") swipeStart.current = e.clientX; };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > 40) (dx < 0 ? older : newer)();
  };

  const transition = reduceMotion ? { duration: 0 } : { type: "spring" as const, stiffness: 120, damping: 20, mass: 0.9 };
  const navButton =
    "w-11 h-11 rounded-full flex items-center justify-center bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-black/5 dark:border-white/10 text-[#1d1d1f] dark:text-[#f5f5f7] shadow-sm transition-all hover:bg-white dark:hover:bg-white/20 disabled:opacity-35 disabled:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc]";

  return (
    <ClickSpark sparkColor={isDark ? "#ffffff" : "#000000"} sparkSize={19} sparkRadius={40} sparkCount={13} duration={400} disableOnMobile>
      <div className="w-full min-h-screen bg-[#ffffff] dark:bg-[#000000] pt-32 pb-24">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6"
          >
            {t.experience.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-[#5e5e63] dark:text-[#b8b8b8] max-w-2xl font-light"
          >
            {t.experience.description}
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          {/* Year chips (phones) */}
          <div className="md:hidden -mx-6 px-6 mb-4 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active ? "step" : undefined}
                className={`shrink-0 px-4 h-11 rounded-full text-sm font-medium transition-colors ${
                  i === active
                    ? "bg-[#1d1d1f] text-white dark:bg-[#f5f5f7] dark:text-[#1d1d1f]"
                    : "bg-[#f5f5f7] text-[#5e5e63] dark:bg-[#1d1d1f] dark:text-[#b8b8b8]"
                }`}
              >
                {item.period}
              </button>
            ))}
          </div>

          {/* Time Machine panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative overflow-hidden rounded-[32px] border border-black/5 dark:border-white/10"
          >
            {/* Backdrop: soft sky in light mode, deep space in dark mode */}
            <div className="absolute inset-0 dark:hidden bg-[radial-gradient(ellipse_at_50%_115%,#cfe0ff_0%,#eef2fb_45%,#f5f5f7_75%)]" />
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                backgroundImage: [
                  "radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.8), transparent)",
                  "radial-gradient(1px 1px at 72% 12%, rgba(255,255,255,0.7), transparent)",
                  "radial-gradient(1.5px 1.5px at 38% 34%, rgba(255,255,255,0.6), transparent)",
                  "radial-gradient(1px 1px at 88% 44%, rgba(255,255,255,0.7), transparent)",
                  "radial-gradient(1px 1px at 22% 66%, rgba(255,255,255,0.5), transparent)",
                  "radial-gradient(1.5px 1.5px at 58% 8%, rgba(255,255,255,0.6), transparent)",
                  "radial-gradient(1px 1px at 6% 48%, rgba(255,255,255,0.6), transparent)",
                  "radial-gradient(ellipse at 50% 120%, #2b3f8f 0%, #101634 40%, #000000 75%)",
                ].join(","),
              }}
            />

            <div className="relative flex">
              {/* Stage */}
              <div
                ref={stageRef}
                role="region"
                aria-roledescription={lang === "de" ? "Zeitleiste" : "timeline"}
                aria-label={t.experience.title}
                tabIndex={0}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                className="relative flex-1 h-[560px] md:h-[620px] touch-pan-y focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0066cc] rounded-[32px]"
                style={{ perspective: 1400, perspectiveOrigin: "50% 0%" }}
              >
                {items.map((item, i) => {
                  const depth = active - i; // > 0: older, behind · < 0: newer, already flown past
                  const hidden = depth < 0 || depth > VISIBLE_BEHIND;
                  const isFront = depth === 0;
                  return (
                    <motion.article
                      key={item.id}
                      aria-hidden={!isFront}
                      aria-live={isFront ? "polite" : undefined}
                      onClick={() => depth > 0 && setActive(i)}
                      initial={false}
                      animate={{
                        y: depth < 0 ? 80 : -depth * step.y,
                        z: depth < 0 ? 300 : -depth * step.z,
                        opacity: hidden ? 0 : 1 - depth * 0.16,
                        filter: `blur(${depth > 0 ? Math.min(depth * 0.6, 3) : 0}px)`,
                      }}
                      transition={transition}
                      style={{ zIndex: items.length - Math.abs(depth), pointerEvents: hidden ? "none" : "auto" }}
                      className={`absolute left-4 right-4 md:left-12 md:right-12 lg:left-20 lg:right-20 top-[150px] md:top-[230px] h-[380px] md:h-[350px] ${
                        depth > 0 ? "cursor-pointer" : ""
                      }`}
                    >
                      <div className="h-full flex flex-col overflow-hidden rounded-[22px] bg-white dark:bg-[#1c1c1e] border border-black/10 dark:border-white/10 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)]">
                        {/* Window title bar */}
                        <div className="relative h-11 shrink-0 flex items-center px-4 border-b border-black/5 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e]">
                          <span className="flex gap-2" aria-hidden="true">
                            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                          </span>
                          <span className="absolute inset-x-0 text-center text-xs font-medium text-[#86868b] pointer-events-none">
                            {item.period}
                          </span>
                        </div>

                        <div className="flex-1 min-h-0 p-6 md:p-10 flex flex-col">
                          <p
                            className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
                              item.award ? "text-[#bf4800] dark:text-[#ff9f0a]" : "text-[#0071e3] dark:text-[#2997ff]"
                            }`}
                          >
                            {item.award &&
                              (item.award.status === "won" ? <Medal size={16} aria-hidden="true" /> : <Star size={16} aria-hidden="true" />)}
                            {item.company}
                          </p>
                          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-3">
                            {item.role}
                          </h2>
                          <p className={`text-base md:text-lg text-[#5e5e63] dark:text-[#b8b8b8] leading-relaxed ${item.award ? "line-clamp-2" : "line-clamp-4"}`}>
                            {item.details || item.description}
                          </p>
                          {item.award && (
                            <a
                              href={item.award.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isFront ? 0 : -1}
                              className="mt-auto pt-4 self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] text-sm font-medium hover:bg-[#333336] dark:hover:bg-[#e5e5ea] transition-colors"
                            >
                              {lang === "de" ? "Zur OST-Seite" : "View on OST website"}
                              <ArrowUpRight size={16} aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}

                {/* Controls (desktop) */}
                <div className="hidden md:flex absolute bottom-6 right-6 flex-col gap-2 z-50">
                  <button type="button" onClick={older} disabled={active === 0} className={navButton} aria-label={lang === "de" ? "Früher" : "Earlier"}>
                    <ChevronUp size={20} />
                  </button>
                  <button type="button" onClick={newer} disabled={active === last} className={navButton} aria-label={lang === "de" ? "Später" : "Later"}>
                    <ChevronDown size={20} />
                  </button>
                </div>
                <p className="hidden md:block absolute bottom-6 left-8 z-50 text-xs text-[#5e5e63] dark:text-[#b8b8b8] max-w-[60%]">
                  {lang === "de"
                    ? "Scrolle über die Fenster, nutze die Pfeile oder wähle ein Jahr."
                    : "Scroll over the windows, use the arrows or pick a year."}
                </p>
              </div>

              {/* Time ruler (desktop): oldest at the top, now at the bottom */}
              <nav
                aria-label={lang === "de" ? "Zeitleiste" : "Timeline"}
                className="hidden md:flex w-44 shrink-0 flex-col justify-center gap-1 pr-6 py-10 border-l border-black/5 dark:border-white/10"
              >
                {items.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive ? "step" : undefined}
                      className="group flex items-center justify-end gap-3 h-11 text-right focus:outline-none"
                    >
                      <span
                        className={`text-xs leading-tight transition-all ${
                          isActive
                            ? "text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold"
                            : "text-[#86868b] group-hover:text-[#1d1d1f] dark:group-hover:text-[#f5f5f7] group-focus-visible:text-[#0066cc]"
                        }`}
                      >
                        {item.period}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-[2px] rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-6 bg-[#1d1d1f] dark:bg-[#f5f5f7]"
                            : item.award
                              ? "w-3 bg-[#ff9f0a] group-hover:w-5"
                              : "w-3 bg-[#c7c7cc] dark:bg-[#48484a] group-hover:w-5"
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Controls (phones) */}
          <div className="md:hidden mt-4 flex items-center justify-between gap-4">
            <p className="text-xs text-[#5e5e63] dark:text-[#b8b8b8]">
              {lang === "de" ? "Wische oder wähle ein Jahr." : "Swipe or pick a year."}
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={older} disabled={active === 0} className={navButton} aria-label={lang === "de" ? "Früher" : "Earlier"}>
                <ChevronUp size={20} />
              </button>
              <button type="button" onClick={newer} disabled={active === last} className={navButton} aria-label={lang === "de" ? "Später" : "Later"}>
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClickSpark>
  );
}
