import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import logoImg from '../../assets/shared/RS_Logo.png';
import { ImageWithFallback } from './ImageWithFallback';
import { CustomCursor } from './CustomCursor';
import LineWaves from './LineWaves';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';

export function Layout() {
  const { lang, setLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLang = () => setLang(lang === 'de' ? 'en' : 'de');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const navLinks = [
    { name: translations[lang].nav.ich, path: '/' },
    { name: translations[lang].nav.projekte, path: '/projects' },
    { name: translations[lang].nav.werdegang, path: '/experience' },
    { name: translations[lang].nav.kontakt, path: '/contact' }
  ];

  // SF Pro and fallback apple system fonts for minimal look
  const minimalFontStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  return (
    <div
      className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] flex flex-col relative selection:bg-black/10 dark:selection:bg-white/10 selection:text-black dark:selection:text-white transition-colors duration-500 cursor-none"
      style={minimalFontStyle}
    >
      {/* Custom Cursor */}
      <CustomCursor isDark={isDark} />

      {/* Global subtle ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.6] dark:opacity-[0.15] overflow-hidden">

        {/* The static base color blobs using massive radial gradients to prevent hard clipping edges */}
        <div className="absolute inset-0 mix-blend-multiply dark:mix-blend-normal opacity-100 transition-opacity duration-500">
          <div className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(181,198,224,0.25)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(181,198,224,0.2)_0%,_transparent_60%)]" />
          <div className="absolute top-[-5%] -right-[15%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,_rgba(242,201,216,0.25)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(242,201,216,0.2)_0%,_transparent_60%)]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(211,182,249,0.2)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(211,182,249,0.15)_0%,_transparent_60%)]" />
          <div className="absolute -bottom-[10%] -left-[20%] w-[90vw] h-[90vw] bg-[radial-gradient(circle,_rgba(251,231,198,0.25)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(251,231,198,0.2)_0%,_transparent_60%)]" />
          <div className="absolute top-[30%] left-[20%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,_rgba(199,235,209,0.2)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(199,235,209,0.15)_0%,_transparent_60%)]" />

          {/* Zusätzliche Farbflecken für mehr Tiefe und Farbe */}
          <div className="absolute top-[40%] -right-[10%] w-[65vw] h-[65vw] bg-[radial-gradient(circle,_rgba(255,214,186,0.2)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(255,214,186,0.15)_0%,_transparent_60%)]" />
          <div className="absolute top-[10%] left-[40%] w-[75vw] h-[75vw] bg-[radial-gradient(circle,_rgba(216,242,255,0.25)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(216,242,255,0.2)_0%,_transparent_60%)]" />
          <div className="absolute bottom-[20%] left-[30%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,_rgba(255,225,240,0.2)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(255,225,240,0.15)_0%,_transparent_60%)]" />
          <div className="absolute -bottom-[30%] left-[10%] w-[85vw] h-[85vw] bg-[radial-gradient(circle,_rgba(198,245,235,0.2)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(198,245,235,0.15)_0%,_transparent_60%)]" />
          <div className="absolute top-[60%] right-[30%] w-[55vw] h-[55vw] bg-[radial-gradient(circle,_rgba(235,215,255,0.2)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(235,215,255,0.15)_0%,_transparent_60%)]" />
        </div>
      </div>

      {/* LineWaves background effect - visible behind header and footer */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <LineWaves
          speed={0.1}
          innerLineCount={32.0}
          outerLineCount={36.0}
          warpIntensity={1.0}
          rotation={-45}
          edgeFadeWidth={0.1}
          colorCycleSpeed={0.3}
          brightness={isDark ? 0.05 : 0.08}
          color1="#ffffff"
          color2="#e0e0e0"
          color3="#d0d0d0"
          enableMouseInteraction={true}
          mouseInfluence={0.5}
          containerClassName="pointer-events-none"
        />
      </div>

      <header
        className="fixed top-0 w-full z-50 py-6 bg-white/30 dark:bg-black/30 backdrop-blur-md cursor-none"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <NavLink to="/" className="hover:opacity-70 transition-opacity cursor-none">
            <ImageWithFallback src={logoImg} alt="Raphi Logo" className="h-8 w-auto dark:invert" />
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 relative cursor-none ${
                    isActive ? 'text-black dark:text-white' : 'text-[#55555a] hover:text-black dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-black dark:bg-white"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#55555a] hover:text-black dark:hover:text-white cursor-none"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-medium transition-colors text-[#55555a] hover:text-black dark:hover:text-white cursor-none"
              aria-label="Toggle language"
            >
              {lang === 'de' ? 'DE' : 'EN'}
            </button>
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2 z-[60] relative">
            <button
              onClick={toggleTheme}
              className="p-2 text-[#55555a] hover:text-black dark:hover:text-white transition-colors rounded-full cursor-none"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-[#1d1d1f] dark:text-[#f5f5f7] hover:opacity-70 transition-opacity rounded-full cursor-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Menu content */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="fixed top-24 left-6 right-6 z-[60] bg-white/95 dark:bg-[#1c1c1e]/95 border border-black/10 dark:border-white/10 rounded-3xl py-6 px-8 md:hidden shadow-2xl shadow-black/10 dark:shadow-black/50 cursor-none"
              >
                <div className="flex flex-col space-y-6 items-center justify-center cursor-none">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={({ isActive }) =>
                        `text-2xl font-semibold tracking-tight transition-all duration-300 cursor-none ${
                          isActive ? 'text-black dark:text-white scale-105' : 'text-[#86868b] dark:text-[#86868b] hover:text-black dark:hover:text-white'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  <button
                    onClick={() => {
                      toggleLang();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-sm font-medium transition-colors text-[#55555a] dark:text-[#e5e5ea] cursor-none"
                  >
                    {lang === 'de' ? 'DE → EN' : 'EN → DE'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-0 md:pt-0 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-[20] text-center py-8 flex flex-col items-center justify-center space-y-4 bg-white/20 dark:bg-black/20 backdrop-blur-md border-0 pointer-events-none">
        <NavLink to="/" className="pointer-events-auto">
          <ImageWithFallback src={logoImg} alt="Raphi Logo" className="h-10 w-auto dark:invert opacity-60 hover:opacity-100 transition-opacity mb-2" />
        </NavLink>
        <p className="text-xs text-[#55555a] dark:text-[#e5e5ea] font-medium">
          © {new Date().getFullYear()} {translations[lang].footer.copyright}
        </p>
      </footer>
    </div>
  );
}