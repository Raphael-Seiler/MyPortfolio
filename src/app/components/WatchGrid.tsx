import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { projects, Project } from "../../content/projects";

type Bubble = { key: string; src: string; contain: boolean; project: Project };

/** One "app icon" per project: its logo, or the card image if it has none. */
function bubbleFor(project: Project): Bubble {
  const { images } = project;
  const src = images.logo ?? images.card;
  return {
    key: project.meta.id,
    src,
    // logos and cut-outs keep their transparent edges, photos fill the circle
    contain: src === images.logo || !images.hero.includes(src),
    project,
  };
}

/** Honeycomb rows like the watch face: 2-1, 3-4-3, 4-5-4, … depending on the count. */
function rowSizes(count: number): number[] {
  if (count <= 2) return [count];
  const rows: number[] = [];
  const wide = Math.max(3, Math.ceil(Math.sqrt(count * 1.2)));
  let left = count;
  let narrow = true;
  while (left > 0) {
    const n = Math.min(left, narrow ? wide - 1 : wide);
    rows.push(n);
    left -= n;
    narrow = !narrow;
  }
  return rows;
}

const SPACING = 1.08; // distance between centers, relative to icon size
const MAX_SIZE = 180;

function Icon({
  bubble,
  x,
  y,
  size,
  mx,
  my,
  active,
  maxDistance,
  reduceMotion,
  onHover,
}: {
  bubble: Bubble;
  x: number;
  y: number;
  size: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  active: MotionValue<number>;
  maxDistance: number;
  reduceMotion: boolean;
  onHover: (b: Bubble | null, x?: number, y?: number) => void;
}) {
  const { lang } = useLanguage();
  const step = size * SPACING;

  // Fisheye: at rest the icons shrink towards the edge, while hovering the
  // icon under the pointer grows and its neighbours make room.
  const scaleTarget = useTransform([mx, my, active], ([px, py, a]: number[]) => {
    if (reduceMotion) return 1;
    const rest = 1.05 - 0.3 * Math.min(1, Math.hypot(x, y) / maxDistance) ** 2;
    const d = Math.hypot(x - px, y - py);
    const hover = 0.8 + 0.8 * Math.exp(-((d / (0.55 * step)) ** 2));
    return rest + (hover - rest) * a;
  });
  // Neighbours are pushed away from the pointer, strongest one ring out
  const push = (axis: "x" | "y", px: number, py: number, a: number) => {
    if (reduceMotion) return 0;
    const dx = x - px;
    const dy = y - py;
    const d = Math.hypot(dx, dy);
    if (d < 1) return 0;
    const amount = 0.22 * step * Math.exp(-(((d - step) / (0.7 * step)) ** 2)) * a;
    return ((axis === "x" ? dx : dy) / d) * amount;
  };
  const pushX = useTransform([mx, my, active], ([px, py, a]: number[]) => push("x", px, py, a));
  const pushY = useTransform([mx, my, active], ([px, py, a]: number[]) => push("y", px, py, a));

  const spring = { stiffness: 260, damping: 26, mass: 0.6 };
  const scale = useSpring(scaleTarget, spring);
  const tx = useSpring(pushX, spring);
  const ty = useSpring(pushY, spring);
  const zIndex = useTransform(scale, (s) => Math.round(s * 10));

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        width: size,
        height: size,
        marginLeft: x - size / 2,
        marginTop: y - size / 2,
        x: tx,
        y: ty,
        scale,
        zIndex,
      }}
    >
      <Link
        to={`/projects/${bubble.project.meta.id}`}
        aria-label={bubble.project.meta.title}
        onPointerEnter={() => onHover(bubble, x, y)}
        onFocus={() => onHover(bubble, x, y)}
        onBlur={() => onHover(null)}
        className={`block w-full h-full rounded-full overflow-hidden shadow-[0_8px_24px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5 dark:ring-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0066cc] ${
          bubble.contain ? "bg-white" : "bg-[#e8e8ed] dark:bg-[#2c2c2e]"
        }`}
      >
        <img
          src={bubble.src}
          alt={`${bubble.project.meta.title} – ${bubble.project.meta.tagline[lang]}`}
          draggable={false}
          loading="lazy"
          className={`w-full h-full select-none ${bubble.contain ? "object-contain p-[14%]" : "object-cover"}`}
        />
      </Link>
    </motion.div>
  );
}

/** Project images as round "apps", arranged like the Apple Watch home screen. */
export function WatchGrid() {
  const { lang } = useLanguage();
  const reduceMotion = !!useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [hovered, setHovered] = useState<Bubble | null>(null);
  const [canHover] = useState(() => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches);

  const bubbles = useMemo(() => projects.map(bubbleFor), []);
  const rows = useMemo(() => rowSizes(bubbles.length), [bubbles.length]);
  const widest = Math.max(...rows);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Icon size so the widest row fits, leaving room for the hover growth
  const size = Math.min(MAX_SIZE, width / (widest * SPACING + 0.6));
  const step = size * SPACING;
  const rowStep = step * 0.87;

  const positions = useMemo(() => {
    const list: { x: number; y: number }[] = [];
    rows.forEach((n, r) => {
      const y = (r - (rows.length - 1) / 2) * rowStep;
      // rows with the same parity as the row above are shifted half a step so the icons interlock
      const shift = r > 0 && n % 2 === rows[r - 1] % 2 ? step / 2 : 0;
      for (let i = 0; i < n; i++) list.push({ x: (i - (n - 1) / 2) * step + shift, y });
    });
    return list;
  }, [rows, step, rowStep]);

  const maxDistance = Math.max(1, ...positions.map((p) => Math.hypot(p.x, p.y)));
  const height = (rows.length - 1) * rowStep + size * 1.45;

  // Pointer position relative to the grid center
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const activeTarget = useMotionValue(0);
  const active = useSpring(activeTarget, { stiffness: 200, damping: 30 });

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const rect = containerRef.current!.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
    activeTarget.set(1);
  };
  const onPointerLeave = () => {
    activeTarget.set(0);
    setHovered(null);
  };
  const onHover = (b: Bubble | null, x?: number, y?: number) => {
    setHovered(b);
    if (b && x !== undefined && y !== undefined) {
      // keyboard focus: pretend the pointer is on the focused icon
      if (activeTarget.get() === 0) {
        mx.set(x);
        my.set(y);
        activeTarget.set(1);
      }
    } else if (!b) {
      activeTarget.set(0);
    }
  };

  return (
    <div>
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative w-full mx-auto max-w-3xl"
        style={{ height: width ? height : 420 }}
      >
        {width > 0 &&
          bubbles.map((b, i) => (
            <Icon
              key={b.key}
              bubble={b}
              x={positions[i].x}
              y={positions[i].y}
              size={size}
              mx={mx}
              my={my}
              active={active}
              maxDistance={maxDistance}
              reduceMotion={reduceMotion}
              onHover={onHover}
            />
          ))}
      </div>

      {/* Caption for the hovered app */}
      <div className="h-16 mt-6 text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key={hovered.project.meta.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
                {hovered.project.meta.title}
              </p>
              <p className="text-sm text-[#5e5e63] dark:text-[#b8b8b8]">
                {hovered.project.meta.tagline[lang]} · {lang === "de" ? "Klicken zum Öffnen" : "Click to open"}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-[#5e5e63] dark:text-[#b8b8b8] pt-3"
            >
              {canHover
                ? (lang === "de" ? "Fahre über eine App und klicke, um das Projekt zu öffnen." : "Hover over an app and click to open the project.")
                : (lang === "de" ? "Tippe auf eine App, um das Projekt zu öffnen." : "Tap an app to open the project.")}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
