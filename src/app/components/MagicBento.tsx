import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export interface BentoCardProps {
  title?: string;
  description?: string;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

export interface BentoProps {
  cards: BentoCardProps[];
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

const createParticle = (x: number, y: number, color: string): HTMLDivElement => {
  const el = document.createElement('div');
  el.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);pointer-events:none;z-index:100;left:${x}px;top:${y}px;`;
  return el;
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({ children, className = '', disableAnimations = false, style, particleCount = DEFAULT_PARTICLE_COUNT, glowColor = DEFAULT_GLOW_COLOR, enableTilt = true, clickEffect = false, enableMagnetism = false }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismRef = useRef<gsap.core.Tween | null>(null);

  const initParticles = () => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () => createParticle(Math.random() * width, Math.random() * height, glowColor));
    particlesInitialized.current = true;
  };

  const clearParticles = () => {
    timeoutsRef.current.forEach(clearTimeout);
    magnetismRef.current?.kill();
    particlesRef.current.forEach(p => { gsap.to(p, { scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)', onComplete: () => p.parentNode?.removeChild(p) }); });
    particlesRef.current = [];
  };

  const animateParticles = () => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initParticles();
    memoizedParticles.current.forEach((p, i) => {
      const tid = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = p.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, i * 100);
      timeoutsRef.current.push(tid);
    });
  };

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;
    const enter = () => { isHoveredRef.current = true; animateParticles(); if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 }); };
    const leave = () => { isHoveredRef.current = false; clearParticles(); if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' }); if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' }); };
    const move = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top, cx = rect.width / 2, cy = rect.height / 2;
      if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -10, rotateY: ((x - cx) / cx) * 10, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      if (enableMagnetism) magnetismRef.current = gsap.to(el, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: 'power2.out' });
    };
    const click = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left, y = e.clientY - rect.top;
      const maxD = Math.max(Math.hypot(x - rect.width/2, y - rect.height/2), 50);
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;left:${x-25}px;top:${y-25}px;width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.8) 0%,transparent 70%);pointer-events:none;z-index:99;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: maxD/25, opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => ripple.parentNode?.removeChild(ripple) });
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('mousemove', move);
    el.addEventListener('click', click);
    return () => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); el.removeEventListener('mousemove', move); el.removeEventListener('click', click); clearParticles(); };
  }, [disableAnimations, enableTilt, enableMagnetism, clickEffect, particleCount, glowColor]);

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  radius?: number;
  glowColor?: string;
  disableAnimations?: boolean;
}> = ({ radius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR, disableAnimations = false }) => {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const rafRef = useRef<number>();

  useEffect(() => {
    if (disableAnimations) return;
    const handler = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', handler);
    return () => { window.removeEventListener('mousemove', handler); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [disableAnimations]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, rgba(${glowColor}, 0.15), transparent 40%)`,
        mixBlendMode: 'screen'
      }}
    />
  );
};

const useMobile = (breakpoint = MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
};

const MagicBento: React.FC<BentoProps> = ({
  cards,
  textAutoHide = false,
  enableStars = false,
  enableSpotlight = false,
  enableBorderGlow = false,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const isMobile = useMobile();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disableAnimations || !enableSpotlight) return;
    const handler = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    };
    const grid = gridRef.current;
    grid?.addEventListener('mousemove', handler);
    return () => grid?.removeEventListener('mousemove', handler);
  }, [disableAnimations, enableSpotlight]);

  return (
    <>
      <div ref={gridRef} className="relative w-full max-w-5xl mx-auto">
        <style>{`
          .bento-grid { display:grid;grid-template-columns:repeat(1,1fr);gap:1.5rem; }
          @media(min-width:768px){ .bento-grid{grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(2,minmax(180px,auto));} }
          .bento-card { position:relative;background:rgba(255,255,255,0.8);backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.25);border-radius:2rem;overflow:hidden;transition:all 0.3s ease; }
          .dark .bento-card { background:rgba(0,0,0,0.8);border:1px solid rgba(255,255,255,0.1); }
          .bento-card:hover { border-color:rgba(${glowColor},0.3);box-shadow:0 0 30px rgba(${glowColor},0.15); }
          .dark .bento-card:hover { border-color:rgba(${glowColor},0.4);box-shadow:0 0 30px rgba(${glowColor},0.25); }
          .bento-card-inner { padding:1.5rem;height:100%;display:flex;flex-direction:column;justify-content:space-between;z-index:10;position:relative; }
          .bento-label { font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;opacity:0.6;margin-bottom:0.5rem;color:inherit; }
          .bento-title { font-size:1.25rem;font-weight:600;margin-bottom:0.5rem;color:inherit; }
          .bento-desc { font-size:0.9rem;opacity:0.7;line-height:1.6;color:inherit; }
          .bento-icon { position:absolute;top:1rem;right:1rem;opacity:0.8; }
          .card-span-2 { grid-row:span 2; }
          .card-col-span-2 { grid-column:span 2; }
          @media(min-width:768px){ .card-span-2-md{grid-row:span 2;} .card-col-span-2-md{grid-column:span 2;} }
          .spotlight-overlay { position:absolute;inset:0;pointer-events:none;opacity:0;transition:opacity 0.3s ease;background:radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor},0.08), transparent 60%); }
          .bento-card:hover .spotlight-overlay { opacity:1; }
          .border-glow { position:absolute;inset:0;border-radius:2rem;padding:1px;background:linear-gradient(135deg,rgba(${glowColor},0.3),transparent 40%,rgba(${glowColor},0.2));mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);mask-composite:exclude;pointer-events:none;opacity:0;transition:opacity 0.3s ease; }
          .bento-card:hover .border-glow { opacity:1; }
          .star-sparkle { position:absolute;width:1px;height:1px;background:rgba(255,255,255,0.4);border-radius:50%;animation:twinkle 3s infinite; }
          @keyframes twinkle { 0%,100%{opacity:0.15;transform:scale(1);} 50%{opacity:0.25;transform:scale(1.1);} }
        `}</style>
        <div className="bento-grid">
          {cards.map((card, i) => (
            <ParticleCard
              key={i}
              className={`bento-card ${card.className || ''}`}
              disableAnimations={disableAnimations}
              particleCount={particleCount}
              glowColor={glowColor}
              enableTilt={!isMobile && enableTilt}
              clickEffect={clickEffect}
              enableMagnetism={enableMagnetism}
            >
              {enableBorderGlow && <div className="border-glow" />}
              {enableSpotlight && <div className="spotlight-overlay" />}
              {enableStars && !disableAnimations && Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="star-sparkle" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }} />
              ))}
              <div className="bento-card-inner">
                <div>
                  <div className="bento-label">{card.label}</div>
                  <div className="bento-title">{card.title}</div>
                  <div className="bento-desc">{card.description}</div>
                </div>
              </div>
            </ParticleCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default MagicBento;
