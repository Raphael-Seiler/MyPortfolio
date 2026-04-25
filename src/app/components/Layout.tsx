import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import logoImg from '../../assets/shared/RS_Logo.png';
import { ImageWithFallback } from './ImageWithFallback';
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
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const navLinks = [
    { name: t.nav.ich, path: '/' },
    { name: t.nav.projekte, path: '/projects' },
    { name: t.nav.werdegang, path: '/experience' },
    { name: t.nav.kontakt, path: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#000000] text-[#1d1d1f] dark:text-[#f5f5f7] flex flex-col relative transition-colors duration-500">
      {/* Skip Link for keyboard users - WCAG 2.2 */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Subtle gradient background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7]/50 to-transparent dark:from-[#1d1d1f]/30 dark:to-transparent" />
      </div>

      {/* LineWaves background effect */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-30 dark:opacity-20">
        <LineWaves
          speed={0.1}
          innerLineCount={32.0}
          outerLineCount={36.0}
          warpIntensity={1.0}
          rotation={-45}
          edgeFadeWidth={0.1}
          colorCycleSpeed={0.3}
          brightness={isDark ? 0.03 : 0.05}
          color1="#1d1d1f"
          color2="#86868b"
          color3="#a1a1a6"
          enableMouseInteraction={true}
          mouseInfluence={0.3}
          containerClassName="pointer-events-none"
        />
      </div>

      <header
        role="banner"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center hover:opacity-60 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-lg p-1"
              aria-label={t.nav.home}
            >
              <ImageWithFallback src={logoImg} alt="Raphi Logo" className="h-6 w-auto dark:invert" />
            </NavLink>

            {/* Desktop Nav */}
            <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center">
              <ul className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        // Navigate programmatically
                        window.location.hash = link.path;
                      }}
                      className={({ isActive }) =>
                        `relative px-4 py-2 text-sm font-medium transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-[#0066cc] ${
                          isActive
                            ? 'text-[#1d1d1f] dark:text-[#f5f5f7] bg-[#f5f5f7] dark:bg-[#1d1d1f]'
                            : 'text-[#5e5e63] hover:text-[#1d1d1f] dark:text-[#b8b8b8] dark:hover:text-[#f5f5f7] hover:bg-[#f5f5f7]/50 dark:hover:bg-[#1d1d1f]/50'
                        }`
                      }
                    >
                      {({ isActive }) => link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="w-px h-6 mx-4 bg-[#d2d2d7] dark:bg-[#424245]" aria-hidden="true" />

              {/* Theme and Language Toggle */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f5f5f7] dark:hover:bg-[#1d1d1f] transition-colors text-[#5e5e63] dark:text-[#b8b8b8] focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                  aria-label={isDark ? t.nav.lightMode : t.nav.darkMode}
                >
                  {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                </button>
                <button
                  onClick={toggleLang}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f5f5f7] dark:bg-[#1d1d1f] text-xs font-semibold transition-colors text-[#1d1d1f] dark:text-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                  aria-label={lang === 'de' ? t.nav.switchToEnglish : t.nav.switchToGerman}
                >
                  {lang === 'de' ? 'DE' : 'EN'}
                </button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f5f5f7] dark:hover:bg-[#1d1d1f] transition-colors text-[#5e5e63] dark:text-[#b8b8b8] focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                aria-label={isDark ? t.nav.lightMode : t.nav.darkMode}
              >
                {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
              </button>
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f5f5f7] dark:hover:bg-[#1d1d1f] transition-colors text-[#1d1d1f] dark:text-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label={t.nav.ich}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed top-14 left-0 right-0 z-[55] bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-[#d2d2d7] dark:border-[#424245] md:hidden"
            >
              <div className="px-6 py-8 flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={({ isActive }) =>
                        `text-lg font-semibold tracking-tight transition-all duration-300 block py-3 px-4 rounded-xl ${
                          isActive
                            ? 'text-[#1d1d1f] dark:text-[#f5f5f7] bg-[#f5f5f7] dark:bg-[#1d1d1f]'
                            : 'text-[#5e5e63] dark:text-[#b8b8b8] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] hover:bg-[#f5f5f7]/50 dark:hover:bg-[#1d1d1f]/50'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
                <div className="pt-4 mt-4 border-t border-[#d2d2d7] dark:border-[#424245] flex items-center justify-between">
                  <span className="text-sm text-[#5e5e63] dark:text-[#b8b8b8]">
                    {t.nav.language}
                  </span>
                  <button
                    onClick={() => {
                      toggleLang();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-full bg-[#f5f5f7] dark:bg-[#1d1d1f] text-sm font-semibold transition-colors text-[#1d1d1f] dark:text-[#f5f5f7] focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                    aria-label={lang === 'de' ? t.nav.switchToEnglish : t.nav.switchToGerman}
                  >
                    {lang === 'de' ? 'Deutsch' : 'English'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" role="main" className="flex-grow pt-14 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer role="contentinfo" className="relative z-[20] py-12 flex flex-col items-center justify-center space-y-6 bg-[#f5f5f7] dark:bg-[#1d1d1f] border-t border-[#d2d2d7] dark:border-[#424245]">
        <NavLink to="/" className="focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-lg" aria-label={t.nav.home}>
          <ImageWithFallback src={logoImg} alt="Raphi Logo" className="h-8 w-auto dark:invert opacity-50 hover:opacity-100 transition-opacity" />
        </NavLink>
        <div className="flex items-center space-x-6 text-xs text-[#5e5e63] dark:text-[#b8b8b8]">
          <span>© {new Date().getFullYear()} Raphaël Seiler</span>
          <span className="w-1 h-1 rounded-full bg-[#d2d2d7] dark:bg-[#424245]" aria-hidden="true" />
          <span>{t.footer.allRightsReserved}</span>
        </div>
        <div className="flex items-center gap-6 mt-4">
          <NavLink
            to="/accessibility"
            className="text-xs text-[#5e5e63] dark:text-[#b8b8b8] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-full px-3 py-1"
          >
            {t.footer.accessibility}
          </NavLink>
        </div>
      </footer>
    </div>
  );
}
