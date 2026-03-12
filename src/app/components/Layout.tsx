import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import logoImg from '../../assets/RS_Logo.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CustomCursor } from './CustomCursor';

export function Layout() {
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

  const navLinks = [
    { name: 'Ich', path: '/' },
    { name: 'Projekte', path: '/projects' },
    { name: 'Werdegang', path: '/experience' },
    { name: 'Kontakt', path: '/contact' }
  ];

  // SF Pro and fallback apple system fonts for minimal look
  const minimalFontStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  return (
    <div 
      className="min-h-screen bg-[#fafafa] dark:bg-[#111111] text-[#1d1d1f] dark:text-[#f5f5f7] flex flex-col relative overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/10 selection:text-black dark:selection:text-white transition-colors duration-500 cursor-none"
      style={minimalFontStyle}
    >
      {/* Custom Cursor */}
      <CustomCursor isDark={isDark} />

      {/* Global subtle ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.9] dark:opacity-[0.4] overflow-hidden">
        
        {/* The static base color blobs using massive radial gradients to prevent hard clipping edges */}
        <div className="absolute inset-0 mix-blend-multiply dark:mix-blend-normal opacity-100 transition-opacity duration-500">
          <div className="absolute -top-[20%] -left-[10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(181,198,224,0.4)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(181,198,224,0.3)_0%,_transparent_60%)]" />
          <div className="absolute top-[-5%] -right-[15%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,_rgba(242,201,216,0.4)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(242,201,216,0.3)_0%,_transparent_60%)]" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,_rgba(211,182,249,0.3)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(211,182,249,0.25)_0%,_transparent_60%)]" />
          <div className="absolute -bottom-[10%] -left-[20%] w-[90vw] h-[90vw] bg-[radial-gradient(circle,_rgba(251,231,198,0.4)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(251,231,198,0.3)_0%,_transparent_60%)]" />
          <div className="absolute top-[30%] left-[20%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,_rgba(199,235,209,0.3)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(199,235,209,0.25)_0%,_transparent_60%)]" />
          
          {/* Zusätzliche Farbflecken für mehr Tiefe und Farbe */}
          <div className="absolute top-[40%] -right-[10%] w-[65vw] h-[65vw] bg-[radial-gradient(circle,_rgba(255,214,186,0.3)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(255,214,186,0.25)_0%,_transparent_60%)]" />
          <div className="absolute top-[10%] left-[40%] w-[75vw] h-[75vw] bg-[radial-gradient(circle,_rgba(216,242,255,0.35)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(216,242,255,0.3)_0%,_transparent_60%)]" />
          <div className="absolute bottom-[20%] left-[30%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,_rgba(255,225,240,0.3)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(255,225,240,0.25)_0%,_transparent_60%)]" />
          <div className="absolute -bottom-[30%] left-[10%] w-[85vw] h-[85vw] bg-[radial-gradient(circle,_rgba(198,245,235,0.3)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(198,245,235,0.25)_0%,_transparent_60%)]" />
          <div className="absolute top-[60%] right-[30%] w-[55vw] h-[55vw] bg-[radial-gradient(circle,_rgba(235,215,255,0.3)_0%,_transparent_60%)] dark:bg-[radial-gradient(circle,_rgba(235,215,255,0.25)_0%,_transparent_60%)]" />
        </div>
      </div>

      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#fafafa]/70 dark:bg-[#111111]/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <NavLink to="/" className="hover:opacity-70 transition-opacity">
            <ImageWithFallback src={logoImg} alt="Raphi Logo" className="h-8 w-auto dark:invert" />
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 relative ${
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
              className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#55555a] hover:text-black dark:hover:text-white"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2 z-[60] relative">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-[#55555a] hover:text-black dark:hover:text-white transition-colors rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
            </button>
            <button 
              onClick={toggleMenu} 
              className="p-2 text-[#1d1d1f] dark:text-[#f5f5f7] hover:opacity-70 transition-opacity rounded-full"
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
                className="fixed top-24 left-6 right-6 z-[60] bg-white/95 dark:bg-[#1c1c1e]/95 border border-black/10 dark:border-white/10 rounded-3xl py-6 px-8 md:hidden shadow-2xl shadow-black/10 dark:shadow-black/50"
              >
                <div className="flex flex-col space-y-6 items-center justify-center">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `text-2xl font-semibold tracking-tight transition-all duration-300 ${
                          isActive ? 'text-black dark:text-white scale-105' : 'text-[#86868b] dark:text-[#86868b] hover:text-black dark:hover:text-white'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow pt-24 md:pt-32 relative z-10">
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

      <footer className="relative z-10 py-12 text-center mt-20 flex flex-col items-center justify-center space-y-6">
        <ImageWithFallback src={logoImg} alt="Raphi Logo" className="h-10 w-auto dark:invert opacity-60 hover:opacity-100 transition-opacity" />
        <p className="text-xs text-[#55555a] dark:text-[#e5e5ea] font-medium">
          © {new Date().getFullYear()} Raphaël Seiler. UX Designer.
        </p>
      </footer>
    </div>
  );
}