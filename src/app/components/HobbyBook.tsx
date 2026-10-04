import { KeyboardEvent, PointerEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { hobbies, Hobby } from "../../content/hobbies";

const turnEase = [0.645, 0.045, 0.355, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

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

const paperClass = "absolute inset-0 overflow-hidden bg-[#fbfaf7] dark:bg-[#2c2c2e]";

/** Left page of a spread: the photo. */
function PhotoPage({ hobby }: { hobby: Hobby }) {
  const { lang } = useLanguage();
  return (
    <div className={`${paperClass} rounded-l-[18px] p-4 md:p-6`}>
      <img
        src={hobby.image}
        alt={hobby.alt[lang]}
        draggable={false}
        className="w-full h-full object-cover rounded-[10px] select-none"
      />
      {/* fold shadow towards the spine */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/15 to-transparent dark:from-black/40" />
    </div>
  );
}

/** Right page of a spread: number, title and text. */
function TextPage({ hobby, number, total }: { hobby: Hobby; number: number; total: number }) {
  const { lang } = useLanguage();
  return (
    <div className={`${paperClass} rounded-r-[18px] p-8 lg:p-12 flex flex-col`}>
      <span className="text-sm font-semibold tracking-tight text-[#86868b]">
        {pad(number)} / {pad(total)}
      </span>
      <div className="my-auto">
        <h5 className="text-4xl lg:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
          {hobby.title[lang]}
        </h5>
        <p className="text-lg lg:text-2xl font-medium tracking-tight leading-snug text-[#5e5e63] dark:text-[#b8b8b8] max-w-sm">
          {hobby.text[lang]}
        </p>
      </div>
      <span className="self-end text-xs tabular-nums text-[#86868b]">{number * 2}</span>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/15 to-transparent dark:from-black/40" />
    </div>
  );
}

export function HobbyBook() {
  const { lang } = useLanguage();
  const t = translations[lang].home;
  const total = hobbies.length;
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<0 | 1 | -1>(0);
  const [mobileDir, setMobileDir] = useState(1);
  const pointerStart = useRef<number | null>(null);

  const go = (dir: 1 | -1) => {
    const target = index + dir;
    if (turn !== 0 || target < 0 || target >= total) return;
    if (!isDesktop || reduceMotion) {
      setMobileDir(dir);
      setIndex(target);
      return;
    }
    setTurn(dir);
  };

  const jumpTo = (target: number) => {
    if (turn !== 0 || target === index) return;
    setMobileDir(target > index ? 1 : -1);
    setIndex(target);
  };

  const finishTurn = () => {
    setIndex((i) => i + turn);
    setTurn(0);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  };

  // Swipe / drag to turn the page
  const onPointerDown = (e: PointerEvent) => { pointerStart.current = e.clientX; };
  const onPointerUp = (e: PointerEvent) => {
    if (pointerStart.current === null) return;
    const dx = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  // Pages visible underneath a turning leaf
  const leftHobby = hobbies[turn === -1 ? index - 1 : index];
  const rightIndex = turn === 1 ? index + 1 : index;

  const paddleClass =
    "w-11 h-11 rounded-full flex items-center justify-center bg-[#e8e8ed] dark:bg-[#333336] text-[#1d1d1f] dark:text-[#f5f5f7] transition-all hover:bg-[#dcdce1] dark:hover:bg-[#424245] disabled:opacity-40 disabled:cursor-default focus:outline-none focus:ring-2 focus:ring-[#0066cc]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[28px] bg-[#f5f5f7] dark:bg-[#1d1d1f] p-6 md:p-12"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-12">
        <div>
          <span className="block text-sm font-semibold tracking-tight mb-3 text-[#248a3d] dark:text-[#30d158]">{t.hobbies}</span>
          <h4 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
            {t.wennIchNichtDesigne}
          </h4>
        </div>
        <p className="text-sm text-[#5e5e63] dark:text-[#b8b8b8]">
          {isDesktop
            ? (lang === "de" ? "Klicke auf eine Seite oder nutze die Pfeile zum Blättern." : "Click a page or use the arrows to turn it.")
            : (lang === "de" ? "Zum Blättern wischen." : "Swipe to turn the page.")}
        </p>
      </div>

      {/* Book */}
      <div
        role="region"
        aria-roledescription={lang === "de" ? "Buch" : "book"}
        aria-label={t.hobbies}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="mx-auto max-w-5xl touch-pan-y select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0066cc] rounded-[18px]"
      >
        {isDesktop ? (
          <div
            className="relative aspect-[8/5] rounded-[18px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
            style={{ perspective: 2400 }}
          >
            {/* Static spread */}
            <div className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize" onClick={() => go(-1)}>
              <PhotoPage hobby={leftHobby} />
            </div>
            <div className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize" onClick={() => go(1)}>
              <TextPage hobby={hobbies[rightIndex]} number={rightIndex + 1} total={total} />
            </div>

            {/* Spine */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-black/10 dark:bg-white/10 z-20" />

            {/* Turning leaf, forward: right page flips over to the left */}
            {turn === 1 && (
              <motion.div
                className="absolute inset-y-0 right-0 w-1/2 z-10"
                style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -180 }}
                transition={{ duration: 0.9, ease: turnEase }}
                onAnimationComplete={finishTurn}
              >
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <TextPage hobby={hobbies[index]} number={index + 1} total={total} />
                </div>
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <PhotoPage hobby={hobbies[index + 1]} />
                </div>
              </motion.div>
            )}

            {/* Turning leaf, backward: left page flips over to the right */}
            {turn === -1 && (
              <motion.div
                className="absolute inset-y-0 left-0 w-1/2 z-10"
                style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 180 }}
                transition={{ duration: 0.9, ease: turnEase }}
                onAnimationComplete={finishTurn}
              >
                <div className="absolute inset-0 [backface-visibility:hidden]">
                  <PhotoPage hobby={hobbies[index]} />
                </div>
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <TextPage hobby={hobbies[index - 1]} number={index} total={total} />
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          /* Phone: one page at a time, photo above the text */
          <div className="relative overflow-hidden rounded-[18px] bg-[#fbfaf7] dark:bg-[#2c2c2e] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)]">
            <AnimatePresence mode="wait" initial={false} custom={mobileDir}>
              <motion.div
                key={hobbies[index].id}
                custom={mobileDir}
                initial={{ opacity: 0, x: mobileDir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mobileDir * -60 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-4"
              >
                <img
                  src={hobbies[index].image}
                  alt={hobbies[index].alt[lang]}
                  draggable={false}
                  className="w-full aspect-[4/5] object-cover rounded-[10px]"
                />
                <div className="px-2 pt-6 pb-3">
                  <span className="text-sm font-semibold text-[#86868b]">{pad(index + 1)} / {pad(total)}</span>
                  <h5 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {hobbies[index].title[lang]}
                  </h5>
                  <p className="mt-2 text-lg text-[#5e5e63] dark:text-[#b8b8b8]">{hobbies[index].text[lang]}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center md:justify-between gap-4">
        <div className="flex items-center md:-ml-3" role="tablist" aria-label={lang === "de" ? "Seiten" : "Pages"}>
          {hobbies.map((h, i) => (
            <button
              key={h.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={h.title[lang]}
              onClick={() => jumpTo(i)}
              className="group flex items-center justify-center px-1.5 h-11 focus:outline-none"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#0066cc] ${
                  i === index ? "w-6 bg-[#1d1d1f] dark:bg-[#f5f5f7]" : "w-2 bg-[#c7c7cc] dark:bg-[#48484a] group-hover:bg-[#86868b]"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="hidden md:flex gap-3">
          <button type="button" onClick={() => go(-1)} disabled={index === 0 || turn !== 0} className={paddleClass} aria-label={lang === "de" ? "Vorherige Seite" : "Previous page"}>
            <ChevronLeft size={20} />
          </button>
          <button type="button" onClick={() => go(1)} disabled={index === total - 1 || turn !== 0} className={paddleClass} aria-label={lang === "de" ? "Nächste Seite" : "Next page"}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
