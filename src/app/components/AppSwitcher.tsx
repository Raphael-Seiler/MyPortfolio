import { PointerEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { animate, AnimatePresence, motion, MotionValue, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ArrowUpRight, Briefcase, GraduationCap, Medal, RotateCcw, Star } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export interface SwitcherItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  details?: string;
  award?: { status: "won" | "nominated"; link: string };
}

const isSchool = (company: string) => /schule|gymnasium|university|fachhochschule/i.test(company);

function iconFor(item: SwitcherItem) {
  if (item.award) return item.award.status === "won" ? Medal : Star;
  return isSchool(item.company) ? GraduationCap : Briefcase;
}

/**
 * One card of the switcher. Its position follows the continuous index `pos`:
 * newer cards (right) lie on top and slide away fully, older cards (left)
 * stay compressed underneath, like the iPhone app switcher.
 */
function Card({
  item,
  index,
  pos,
  width,
  isActive,
  onClose,
}: {
  item: SwitcherItem;
  index: number;
  pos: MotionValue<number>;
  width: number;
  isActive: boolean;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const x = useTransform(pos, (p) => {
    const d = index - p;
    return d >= 0 ? d * width * 0.92 : d * width * 0.32;
  });
  const scale = useTransform(pos, (p) => {
    const d = index - p;
    return d >= 0 ? 1 : Math.max(0.86, 1 + d * 0.04);
  });
  // Cards that are not in focus are slightly transparent
  // Cards further back fade out completely so their text doesn't shine through each other
  const cardOpacity = useTransform(pos, (p) => {
    const d = Math.abs(index - p);
    return d <= 1 ? 1 - d * 0.45 : Math.max(0, 0.55 - (d - 1) * 0.55);
  });
  // Only the card in focus shows its label, so the labels of stacked cards don't overlap
  const labelOpacity = useTransform(pos, (p) => Math.max(0, 1 - Math.abs(index - p) * 1.6));
  const Icon = iconFor(item);

  // Swipe up to close
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-260, 0], [0, 1]);

  return (
    <motion.div
      className="absolute top-0 left-0 h-full"
      style={{ width, x, scale, opacity: cardOpacity, zIndex: index, transformOrigin: "50% 60%" }}
      exit={{ y: -500, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
    >
      <motion.div
        className="h-full flex flex-col"
        style={{ y, opacity }}
        drag={isActive ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.9, bottom: 0.05 }}
        dragDirectionLock
        onDragEnd={(_, info) => {
          if (info.offset.y < -110 || info.velocity.y < -600) onClose();
        }}
      >
        {/* App label above the card */}
        <motion.div className="flex items-center gap-2 mb-2 px-1 h-7" style={{ opacity: labelOpacity }}>
          <span
            className={`w-7 h-7 rounded-[8px] flex items-center justify-center text-white shrink-0 ${
              item.award ? "bg-gradient-to-b from-[#ffb340] to-[#ff9500]" : "bg-gradient-to-b from-[#5ac8fa] to-[#007aff]"
            }`}
          >
            <Icon size={15} aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate">{item.company}</span>
        </motion.div>

        {/* Card */}
        <div className="relative flex-1 min-h-0 overflow-hidden rounded-[30px] bg-white dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)]">
          <div className="h-full flex flex-col p-6">
            <p className="text-xs font-semibold text-[#86868b] mb-3">{item.period}</p>
            <h2 className="text-2xl font-semibold tracking-tight leading-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-3">{item.role}</h2>
            <p className="text-[15px] leading-relaxed text-[#5e5e63] dark:text-[#b8b8b8] line-clamp-[9]">{item.details || item.description}</p>
            {item.award && (
              <a
                href={item.award.link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isActive ? 0 : -1}
                className="mt-auto self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1d1d1f] dark:bg-[#f5f5f7] text-white dark:text-[#1d1d1f] text-sm font-medium"
              >
                {lang === "de" ? "Zur OST-Seite" : "View on OST website"}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Werdegang on phones: an iPhone-style app switcher. Swipe sideways to browse, swipe a card up to close it. */
export function AppSwitcher({ items }: { items: SwitcherItem[] }) {
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [closed, setClosed] = useState<string[]>([]);
  const visible = items.filter((it) => !closed.includes(it.id));
  const last = visible.length - 1;

  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setStageWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const cardWidth = stageWidth * 0.8;

  // Continuous index of the card in focus; starts at the newest (rightmost)
  const pos = useMotionValue(items.length - 1);
  const [active, setActive] = useState(items.length - 1);
  useEffect(() => pos.on("change", (v) => setActive(Math.round(v))), [pos]);

  const snapTo = (target: number, velocity = 0) => {
    const clamped = Math.max(0, Math.min(last, target));
    animate(pos, clamped, reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 32, velocity });
  };

  // Keep the focus valid when cards are closed
  useEffect(() => {
    if (pos.get() > last) snapTo(last);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [last]);

  // Horizontal drag through the cards (vertical gestures go to the card / page)
  const drag = useRef<{ x: number; y: number; start: number; axis: "x" | "y" | null; t: number; lastX: number } | null>(null);
  const onPointerDown = (e: PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, start: pos.get(), axis: null, t: performance.now(), lastX: e.clientX };
  };
  const onPointerMove = (e: PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.axis && Math.hypot(dx, dy) > 8) d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    if (d.axis !== "x") return;
    const p = d.start - dx / (cardWidth * 0.92);
    pos.set(Math.max(-0.3, Math.min(last + 0.3, p)));
    d.t = performance.now();
    d.lastX = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.axis !== "x") return;
    const dt = Math.max(1, performance.now() - d.t + 16);
    const v = -((e.clientX - d.lastX) / dt) * 1000 / (cardWidth * 0.92); // cards per second
    const flick = Math.abs(v) > 0.6 ? Math.sign(v) : 0;
    snapTo(Math.round(pos.get() + flick * 0.5), v);
  };

  const close = (id: string) => setClosed((c) => [...c, id]);

  return (
    <div>
      <div
        ref={stageRef}
        role="region"
        aria-roledescription={lang === "de" ? "App-Übersicht" : "app switcher"}
        aria-label={lang === "de" ? "Werdegang" : "Experience"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative h-[560px] touch-pan-y select-none"
      >
        <div className="absolute inset-y-0" style={{ left: (stageWidth - cardWidth) / 2, width: cardWidth }}>
          <AnimatePresence>
            {stageWidth > 0 &&
              visible.map((item, i) => (
                <Card
                  key={item.id}
                  item={item}
                  index={i}
                  pos={pos}
                  width={cardWidth}
                  isActive={i === active}
                  onClose={() => close(item.id)}
                />
              ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4">
            <p className="text-lg font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">{lang === "de" ? "Alles geschlossen." : "All closed."}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-[#5e5e63] dark:text-[#b8b8b8]">
          {lang === "de" ? "Wische seitwärts zum Blättern, nach oben zum Schliessen." : "Swipe sideways to browse, up to close."}
        </p>
        {closed.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setClosed([]);
              pos.set(items.length - 1);
            }}
            className="shrink-0 inline-flex items-center gap-2 px-4 h-11 rounded-full bg-[#f5f5f7] dark:bg-[#1d1d1f] text-sm font-medium text-[#1d1d1f] dark:text-[#f5f5f7]"
          >
            <RotateCcw size={14} aria-hidden="true" />
            {lang === "de" ? "Wiederherstellen" : "Restore"}
          </button>
        )}
      </div>
    </div>
  );
}
