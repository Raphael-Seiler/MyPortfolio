import React, { useRef, useEffect, useState, useCallback } from "react";
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

  // Drag scrolling state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number>(0);
  const scrollStart = useRef<number>(0);

  // Track horizontal scroll of the container
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Buttery smooth spring for car movement
  const smoothProgress = useSpring(scrollXProgress, {
    damping: 50,
    stiffness: 120,
    mass: 0.8,
  });

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
  const itemSpacing = isMobile ? 340 : 450;
  const startOffsetVW = isMobile ? 50 : 20;
  const endCarVW = 50;

  const S_N = Math.max(1, N * itemSpacing + (startOffsetVW - endCarVW) * vw);
  const maxScroll = S_N;

  // Car position
  const carX = useTransform(
    smoothProgress,
    [0, 1],
    [`${startOffsetVW}vw`, `${endCarVW}vw`]
  );

  // Car tilt based on scroll velocity for dynamic feel
  const carRotation = useSpring(
    useTransform(scrollVelocity, [-20, 0, 20], [-3, 0, 3]),
    { damping: 30, stiffness: 200 }
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index based on scroll progress with proximity detection
  useEffect(() => {
    return smoothProgress.on("change", (latest) => {
      const active = Math.min(N, Math.max(0, Math.round(latest * N)));
      setActiveIndex(active);
    });
  }, [smoothProgress, N]);

  const totalWidth = `${maxScroll + 100 * vw}px`;

  // Get scroll position for a specific station index
  const getStationScroll = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return 0;
      const totalScrollable =
        container.scrollWidth - container.clientWidth;
      return Math.max(0, Math.min(totalScrollable, (index / N) * totalScrollable));
    },
    [N]
  );

  // Drag scrolling handlers
  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    scrollStart.current = container.scrollLeft;
    container.style.cursor = "grabbing";
  }, []);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const container = containerRef.current;
    if (!container) return;

    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - dragStartX.current;
    container.scrollLeft = scrollStart.current - deltaX;
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    const container = containerRef.current;
    if (container) {
      container.style.cursor = "grab";
    }
  }, []);

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

        const progress = container.scrollLeft / totalScrollable;
        const nearestIndex = Math.round(progress * N);
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
  }, [N, getStationScroll, activeIndex, itemSpacing, handleDragMove, handleDragEnd]);

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
      <div className="relative w-full h-[850px] md:h-[1000px] z-10">
        {/* Scrollable Container */}
        <div
          ref={containerRef}
          className="w-full h-full overflow-x-auto overflow-y-hidden relative z-10 [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
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
            <div className="absolute top-[75%] md:top-[55%] left-0 right-0 h-[1px] bg-black/10 dark:bg-white/10 -translate-y-1/2 z-0 transition-all duration-500" />

            {/* Subtle tick marks along the road */}
            {experiences.map((_, i) => {
              const leftPos = `calc(${startOffsetVW}vw + ${i * itemSpacing}px)`;
              return (
                <div
                  key={`tick-${i}`}
                  className="absolute top-[75%] md:top-[55%] w-[1px] h-2 bg-black/5 dark:bg-white/5 -translate-y-1/2 -translate-x-1/2 z-0"
                  style={{ left: leftPos }}
                />
              );
            })}

            {/* Timeline Items */}
            {experiences.map((exp, i) => {
              const isTopHalf = isMobile ? true : i % 2 !== 0;
              const leftPos = `calc(${startOffsetVW}vw + ${i * itemSpacing}px)`;
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
                    <div className="absolute bottom-[calc(25%+1px)] md:bottom-[calc(45%+1px)] flex flex-col items-center pb-4 transition-all duration-500">
                      <ItemCard exp={exp} isActive={isActive} />
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
                    <div className="absolute top-[calc(55%+1px)] flex flex-col items-center pt-4 transition-all duration-500">
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
                      <ItemCard exp={exp} isActive={isActive} />
                    </div>
                  )}
                </motion.div>
              );
            })}

            {/* Fortsetzung folgt */}
            <div
              className="absolute top-[75%] md:top-[55%] -translate-y-1/2 flex items-center justify-center transition-all duration-500 -translate-x-1/2"
              style={{
                left: `calc(${startOffsetVW}vw + ${N * itemSpacing}px)`,
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
            className="absolute top-[75%] md:top-[55%] -translate-x-1/2 -translate-y-[calc(100%-2px)]"
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
        {!isMobile && (
        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
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
            {experiences.map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className={`rounded-full ${
                  activeIndex === i
                    ? "bg-black/40 dark:bg-white/40"
                    : "bg-black/10 dark:bg-white/10"
                }`}
                animate={{
                  width: activeIndex === i ? 20 : 5,
                  height: 5,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ))}
            <motion.div
              className={`rounded-full ${
                activeIndex === N
                  ? "bg-black/40 dark:bg-white/40"
                  : "bg-black/10 dark:bg-white/10"
            }`}
            animate={{
              width: activeIndex === N ? 20 : 5,
              height: 5,
            }}
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
        )}
      </div>
    </div>
    </ClickSpark>
  );
}

// Subcomponent for the experience card
function ItemCard({ exp, isActive }: { exp: any; isActive: boolean }) {
  const { lang } = useLanguage();

  const role = lang === 'en' && exp.roleEn ? exp.roleEn : exp.role;
  const company = lang === 'en' && exp.companyEn ? exp.companyEn : exp.company;
  const period = lang === 'en' && exp.periodEn ? exp.periodEn : exp.period;
  const description = lang === 'en' && exp.descriptionEn ? exp.descriptionEn : exp.description;
  const details = lang === 'en' && exp.detailsEn ? exp.detailsEn : exp.details;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.97,
        y: isActive ? 0 : 4,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`p-6 md:p-8 rounded-3xl border transition-all duration-500 w-[300px] md:w-[380px] max-h-[420px] md:max-h-[340px] overflow-hidden relative z-10 backdrop-blur-md ${
        isActive
          ? "border-black/20 dark:border-white/20 shadow-lg bg-white/80 dark:bg-black/80"
          : "border-black/10 dark:border-white/10 bg-white/40 dark:bg-black/40"
      }`}
    >
      <span
        className={`inline-block px-3 py-1 bg-transparent border text-[10px] font-bold tracking-wider uppercase rounded-full mb-3 transition-colors duration-500 ${
          isActive
            ? "border-black/20 dark:border-white/20 text-[#1d1d1f] dark:text-[#f5f5f7]"
            : "border-black/10 dark:border-white/10 text-[#55555a] dark:text-[#e5e5ea]"
        }`}
      >
        {period}
      </span>
      <h3
        className={`text-xl font-semibold mb-2 leading-tight transition-colors duration-500 ${
          isActive
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
        {isActive && (description || details) && (
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