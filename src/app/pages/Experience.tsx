import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "motion/react";
import { Car, ChevronLeft, ChevronRight } from "lucide-react";
import { experiences } from "../data";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import ClickSpark from "../components/ClickSpark";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollVelocity = useMotionValue(0);
  const { lang } = useLanguage();
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

  const t = translations[lang];

  // Drag scrolling state (desktop only)
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);
  const scrollStart = useRef<number>(0);

  // Track horizontal scroll of the container
  useScroll({
    container: containerRef,
  });

  // Track scroll velocity for car tilt animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollLeft = container.scrollLeft;
    let velocity = 0;

    const handleScroll = () => {
      velocity = container.scrollLeft - lastScrollLeft;
      lastScrollLeft = container.scrollLeft;
      scrollVelocity.set(velocity);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollVelocity]);

  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth / 100 : 12
  );
  const isMobile = vw < 7.68;

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth / 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const N = experiences.length;
  const itemSpacing = useMemo(() => isMobile ? 340 : 450, [isMobile]);
  // Car centered in viewport
  const carVW = 50;

  // Total scrollable distance: stations span from carVW to carVW + N*itemSpacing (including "Fortsetzung folgt")
  // Max scroll = distance from first station to "Fortsetzung folgt"
  const maxScroll = useMemo(() => Math.max(1, N * itemSpacing), [N, itemSpacing]);

  // Car position - fixed at carVW in the viewport
  const carX = `${carVW}vw`;

  // Car tilt based on scroll velocity for dynamic feel
  const carRotation = useSpring(
    useTransform(scrollVelocity, [-20, 0, 20], [-3, 0, 3]),
    { damping: 30, stiffness: 200 }
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandUpdateCounter, setExpandUpdateCounter] = useState(0);
  const expandProgressRef = useRef<number[]>([]);

  // Update active index based on actual scroll position and proximity to stations
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActiveIndex = () => {
      const currentScroll = container.scrollLeft;

      // Car is fixed at carVW in the viewport
      const carViewportX = carVW * vw;

      let closestIndex = 0;
      let closestDistance = Infinity;

      // Calculate expansion progress for each station
      const expandThreshold = isMobile ? itemSpacing * 0.8 : itemSpacing * 0.6;

      for (let i = 0; i < N; i++) {
        // Station's position in the scrollable content
        const stationContentX = carVW * vw + i * itemSpacing;
        // Station's current position on screen (relative to viewport)
        const stationScreenX = stationContentX - currentScroll;
        // Distance from car's position
        const distance = Math.abs(stationScreenX - carViewportX);
        
        // Progress is 1 when at station (distance=0), 0 when at threshold
        const progress = Math.max(0, 1 - distance / expandThreshold);
        expandProgressRef.current[i] = progress;

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      // Trigger re-render by incrementing counter
      setExpandUpdateCounter(c => c + 1);

      // Check if we're past all stations (at "Fortsetzung folgt")
      const lastStationContentX = carVW * vw + (N - 1) * itemSpacing;
      const fortsetzungContentX = lastStationContentX + itemSpacing;
      const fortsetzungScreenX = fortsetzungContentX - currentScroll;

      if (fortsetzungScreenX <= carViewportX + itemSpacing / 2 && currentScroll > maxScroll * 0.9) {
        setActiveIndex(N);
      } else {
        setActiveIndex(closestIndex);
      }
    };

    // Update on scroll
    const handleScroll = () => {
      updateActiveIndex();
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    updateActiveIndex(); // Initial call

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [N, carVW, itemSpacing, vw, maxScroll]);

  // Get expand progress for a station - reads from ref
  const getExpandProgress = (i: number) => {
    return expandProgressRef.current[i] || 0;
  };


  const totalWidth = `${maxScroll + 100 * vw}px`;

  // Get scroll position for a specific station index
  // This scrolls so that the station aligns with the car's visual position (carVW)
  const getStationScroll = useCallback(
    (index: number) => {
      // Station's position in the content
      const stationContentX = carVW * vw + index * itemSpacing;
      // To align station with car at carVW, scroll so station is at carVW * vw
      const targetScroll = stationContentX - carVW * vw;

      return Math.max(0, Math.min(maxScroll, targetScroll));
    },
    [maxScroll, carVW, itemSpacing, vw]
  );

  // Drag scrolling handlers (desktop only)
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    // Only use custom drag on desktop
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    dragStartX.current = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
    scrollStart.current = container.scrollLeft;
    container.style.cursor = "grabbing";
  }, [isMobile]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX;
    const deltaX = clientX - dragStartX.current;
    container.scrollLeft = scrollStart.current - deltaX;
  }, [isDragging, isMobile]);

  const handleDragEnd = useCallback(() => {
    if (isMobile) return;

    setIsDragging(false);
    const container = containerRef.current;
    if (container) {
      container.style.cursor = "grab";
    }
  }, [isMobile]);

  // Auto-drive car to nearest station after scrolling stops - consistent smooth animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollEndTimeout: ReturnType<typeof setTimeout>;
    let animationFrameId: number | null = null;
    let isAnimating = false;
    let lastScrollLeft = container.scrollLeft;
    let scrollVelocity = 0;

    // Track scroll velocity to detect when scrolling truly stops
    const trackScrollVelocity = () => {
      scrollVelocity = container.scrollLeft - lastScrollLeft;
      lastScrollLeft = container.scrollLeft;
    };

    // Handle scroll end with delay, then auto-drive to nearest station
    const handleScrollEnd = () => {
      if (isAnimating) return;

      clearTimeout(scrollEndTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      trackScrollVelocity();

      // Wait until scroll velocity is near zero (truly stopped)
      scrollEndTimeout = setTimeout(() => {
        const totalScrollable = container.scrollWidth - container.clientWidth;
        if (totalScrollable <= 0) return;

        const currentScroll = container.scrollLeft;

        // Car is fixed at carVW in the viewport
        const carViewportX = carVW * vw;

        // Find which station is closest to the car's current position
        let nearestIndex = 0;
        let closestDistance = Infinity;

        for (let i = 0; i < N; i++) {
          const stationContentX = carVW * vw + i * itemSpacing;
          const stationScreenX = stationContentX - currentScroll;
          const distance = Math.abs(stationScreenX - carViewportX);
          if (distance < closestDistance) {
            closestDistance = distance;
            nearestIndex = i;
          }
        }

        const snapTarget = getStationScroll(nearestIndex);

        // Use proportional threshold based on station spacing
        const threshold = itemSpacing * 0.15; // 15% of station spacing

        if (Math.abs(container.scrollLeft - snapTarget) > threshold) {
          const start = container.scrollLeft;
          const distance = snapTarget - start;
          const duration = 700;
          const startTime = performance.now();
          isAnimating = true;

          const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

          const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);
            const easedT = easeInOutCubic(t);
            container.scrollLeft = start + distance * easedT;

            if (t < 1) {
              animationFrameId = requestAnimationFrame(animateScroll);
            } else {
              isAnimating = false;
              lastScrollLeft = container.scrollLeft;
            }
          };
          animationFrameId = requestAnimationFrame(animateScroll);
        } else {
          // Snap to exact position without animation if very close
          container.scrollLeft = snapTarget;
          lastScrollLeft = snapTarget;
        }
      }, Math.max(150, Math.abs(scrollVelocity) * 50)); // Dynamic delay based on velocity
    };

    // Native horizontal scroll only - listen to scroll events
    container.addEventListener("scroll", handleScrollEnd, { passive: true });

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const direction = e.key === "ArrowRight" ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(N, activeIndex + direction));
        const snapTarget = getStationScroll(nextIndex);
        container.scrollTo({ left: snapTarget, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Drag event listeners
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("touchmove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);

    return () => {
      container.removeEventListener("scroll", handleScrollEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchend", handleDragEnd);
      clearTimeout(scrollEndTimeout);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [N, getStationScroll, activeIndex, itemSpacing, handleDragMove, handleDragEnd, carVW, vw, maxScroll]);

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="w-full pb-[100px] pt-48">
      {/* Fixed Title Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-8 relative z-30 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4 pointer-events-auto"
        >
          {t.experience.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-[#55555a] dark:text-[#e5e5ea] font-light max-w-2xl pointer-events-auto"
        >
          {t.experience.description}
        </motion.p>
      </div>

      {/* The Timeline Area */}
      <div className="relative w-full h-[900px] md:h-[1000px] z-10">
        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-x-auto overflow-y-visible md:overflow-y-hidden relative z-10 [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            userSelect: isDragging ? "none" : "auto",
          }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Inner scrolling track */}
          <div
            className="h-full relative"
            style={{ width: totalWidth }}
          >
            {/* The Road Line */}
            <div className="absolute top-[60%] md:top-[55%] left-0 right-0 h-[1px] bg-black/10 dark:bg-white/10 -translate-y-1/2 z-0 transition-all duration-500" />

            {/* Subtle tick marks along the road */}
            {experiences.map((_, i) => {
              const leftPos = `calc(${carVW}vw + ${i * itemSpacing}px)`;
              return (
                <div
                  key={`tick-${i}`}
                  className="absolute top-[60%] md:top-[55%] w-[1px] h-2 bg-black/5 dark:bg-white/5 -translate-y-1/2 -translate-x-1/2 z-0"
                  style={{ left: leftPos }}
                />
              );
            })}

            {/* Timeline Items */}
            {experiences.map((exp, i) => {
              const isTopHalf = isMobile ? true : i % 2 !== 0;
              const leftPos = `calc(${carVW}vw + ${i * itemSpacing}px)`;
              const isActive = activeIndex === i;

              return (
                <motion.div
                  key={exp.id}
                  className="absolute h-full flex flex-col items-center justify-center -translate-x-1/2"
                  style={{ left: leftPos }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                >
                  {isTopHalf ? (
                    <div className="absolute bottom-[40%] md:bottom-[45%] flex flex-col items-center pb-4 transition-all duration-500">
                      <ItemCard exp={exp} isActive={isActive} expandProgress={isMobile ? getExpandProgress(i) : (isActive ? 1 : 0)} isMobile={isMobile} />
                      <div
                        className={`w-[1px] h-12 md:h-16 transition-all duration-500 ${
                          isActive
                            ? "bg-black/40 dark:bg-white/40"
                            : "bg-black/10 dark:bg-white/10"
                        }`}
                      />
                      <div
                        className={`w-3 h-3 rounded-full border-[2px] bg-[#fafafa] dark:bg-[#111111] shadow-sm absolute -bottom-1.5 transition-all duration-500 ${
                          isActive
                            ? "border-black/60 dark:border-white/60 scale-125"
                            : "border-black/10 dark:border-white/10 scale-100"
                        }`}
                      />
                    </div>
                  ) : (
                    <div className="absolute top-[60%] md:top-[55%] flex flex-col items-center pt-4 transition-all duration-500">
                      <div
                        className={`w-3 h-3 rounded-full border-[2px] bg-[#fafafa] dark:bg-[#111111] shadow-sm absolute -top-1.5 transition-all duration-500 ${
                          isActive
                            ? "border-black/60 dark:border-white/60 scale-125"
                            : "border-black/10 dark:border-white/10 scale-100"
                        }`}
                      />
                      <div
                        className={`w-[1px] h-12 md:h-16 transition-all duration-500 ${
                          isActive
                            ? "bg-black/40 dark:bg-white/40"
                            : "bg-black/10 dark:bg-white/10"
                        }`}
                      />
                      <ItemCard exp={exp} isActive={isActive} expandProgress={isMobile ? getExpandProgress(i) : (isActive ? 1 : 0)} isMobile={isMobile} />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Fortsetzung folgt */}
            <div
              className="absolute top-[60%] md:top-[55%] -translate-y-1/2 flex items-center justify-center transition-all duration-500 -translate-x-1/2"
              style={{
                left: `calc(${carVW}vw + ${N * itemSpacing}px)`,
              }}
            >
              <h2
                className={`text-6xl md:text-8xl font-bold tracking-tighter text-center transition-all duration-700 ${
                  activeIndex === N
                    ? "text-[#1d1d1f] dark:text-[#f5f5f7] opacity-100 drop-shadow-md"
                    : "text-[#1d1d1f]/30 dark:text-[#f5f5f7]/30 opacity-60"
                }`}
              >
                {t.experience.fortsetzung}
                <br />
                {t.experience.folgt}
              </h2>
            </div>
          </div>
        </div>

        {/* The Car - Fixed in Viewport */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <motion.div
            className="absolute top-[60%] md:top-[55%] -translate-x-1/2 -translate-y-[calc(100%-2px)]"
            style={{ left: carX }}
          >
            <motion.div
              style={{ rotate: carRotation }}
              className="origin-center"
            >
              <motion.div
                animate={{ y: [0, -1.5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <Car
                  size={36}
                  strokeWidth={1.5}
                  className="text-[#1d1d1f] dark:text-[#f5f5f7] drop-shadow-xl"
                  fill="currentColor"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation arrows with progress bar */}
        <div className={`absolute bottom-[-40px] left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 ${isMobile ? 'hidden' : ''}`}>
          <button
            onClick={() => {
              const container = containerRef.current;
              if (!container || activeIndex === 0) return;
              const targetIndex = activeIndex - 1;
              const targetScroll = getStationScroll(targetIndex);
              container.scrollTo({ left: targetScroll, behavior: 'smooth' });
            }}
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-[#1d1d1f] dark:text-[#f5f5f7]" />
          </button>
          <div className="flex items-center gap-1.5">
            {experiences.map((_, i) => {
              const progress = getExpandProgress(i);
              const isNearest = activeIndex === i;
              const width = isNearest ? 20 : (5 + progress * 8);
              return (
                <motion.div
                  key={`dot-${i}`}
                  className="rounded-full bg-black/40 dark:bg-white/40"
                  animate={{ width, height: 5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              );
            })}
            <motion.div
              key="dot-final"
              className="rounded-full bg-black/40 dark:bg-white/40"
              animate={{ width: activeIndex === N ? 20 : 5, height: 5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <button
            onClick={() => {
              const container = containerRef.current;
              if (!container || activeIndex >= N) return;
              const targetIndex = activeIndex + 1;
              const targetScroll = getStationScroll(targetIndex);
              container.scrollTo({ left: targetScroll, behavior: 'smooth' });
            }}
            className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-[#1d1d1f] dark:text-[#f5f5f7]" />
          </button>
        </div>
      </div>
    </div>
    </ClickSpark>
  );
}

// Subcomponent for the experience card
function ItemCard({ exp, isActive, expandProgress = 1, isMobile = false }: { exp: any; isActive: boolean; expandProgress?: number; isMobile?: boolean }) {
  const { lang } = useLanguage();

  const role = lang === 'en' && exp.roleEn ? exp.roleEn : exp.role;
  const company = lang === 'en' && exp.companyEn ? exp.companyEn : exp.company;
  const period = lang === 'en' && exp.periodEn ? exp.periodEn : exp.period;
  const description = lang === 'en' && exp.descriptionEn ? exp.descriptionEn : exp.description;
  const details = lang === 'en' && exp.detailsEn ? exp.detailsEn : exp.details;

  const opacity = 0.5 + (expandProgress * 0.5);
  const scale = isMobile ? (0.92 + (expandProgress * 0.08)) : (0.97 + (expandProgress * 0.03));
  const y = isMobile ? (8 - (expandProgress * 8)) : (4 - (expandProgress * 4));
  const shouldExpand = expandProgress > (isMobile ? 0.4 : 0.15);
  const isLocallyActive = expandProgress > 0.5;

  return (
    <motion.div
      animate={{
        opacity,
        scale,
        y,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`p-6 md:p-8 rounded-3xl border transition-all duration-500 w-[300px] md:w-[380px] relative backdrop-blur-md ${
        isLocallyActive
          ? "border-black/20 dark:border-white/20 shadow-lg bg-white/80 dark:bg-black/80 z-20"
          : "border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40 z-10"
      }`}
      style={{
        overflow: shouldExpand ? 'visible' : 'hidden',
        maxHeight: shouldExpand ? (isMobile ? '500px' : 'none') : (isMobile ? '180px' : '340px'),
        width: isMobile ? `${300 + (expandProgress * 50)}px` : undefined,
      }}
    >
      <span
        className={`inline-block px-3 py-1 bg-transparent border text-[10px] font-bold tracking-wider uppercase rounded-full mb-3 transition-colors duration-500 ${
          isLocallyActive
            ? "border-black/20 dark:border-white/20 text-[#1d1d1f] dark:text-[#f5f5f7]"
            : "border-black/10 dark:border-white/10 text-[#55555a] dark:text-[#e5e5ea]"
        }`}
      >
        {period}
      </span>
      <h3
        className={`text-xl font-semibold mb-2 leading-tight transition-colors duration-500 ${
          isLocallyActive
            ? "text-[#1d1d1f] dark:text-[#f5f5f7]"
            : "text-[#55555a] dark:text-[#e5e5ea]"
        }`}
      >
        {role}
      </h3>
      <h4 className="text-sm text-[#55555a] dark:text-[#e5e5ea] font-medium">
        {company}
      </h4>

      {/* Dynamic Details Expansion */}
      <AnimatePresence>
        {shouldExpand && (description || details) && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 16,
            }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {description && (
              <p className="text-sm text-[#55555a] dark:text-[#e5e5ea] font-light leading-relaxed mb-4">
                {description}
              </p>
            )}
            {details && (
              <>
                <div className="h-[1px] w-full bg-black/10 dark:bg-white/10 mb-4" />
                <p className="text-sm text-[#1d1d1f] dark:text-[#f5f5f7] font-light leading-relaxed">
                  {details}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}