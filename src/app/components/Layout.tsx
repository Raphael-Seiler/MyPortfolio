import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, Linkedin, Instagram, Mail } from 'lucide-react';
import logoImg from '../../assets/shared/RS_Logo.png';
import { ImageWithFallback } from './ImageWithFallback';
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

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#ffffff] dark:bg-[#202124] text-[#202124] dark:text-[#e8eaed] flex flex-col relative transition-colors duration-500">
      {/* Skip Link for keyboard users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Clean background - no LineWaves */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#ffffff] dark:bg-[#202124]" />

      <header
        role="banner"
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled || isMenuOpen
            ? 'bg-white/95 dark:bg-[#202124]/95 backdrop-blur-sm border-[#dadce0] dark:border-[#5f6368] shadow-sm'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#1a73e8] rounded-md p-1"
              aria-label={t.nav.home}
            >
              <ImageWithFallback src={logoImg} alt="Raphi Logo" className="h-7 w-auto dark:invert" />
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
                        window.location.hash = link.path;
                      }}
                      className={({ isActive }) =>
                        `relative px-4 py-2 text-sm font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a73e8] ${
                          isActive
                            ? 'text-[#1a73e8] dark:text-[#8ab4f8] bg-[#e8f0fe] dark:bg-[#174ea6]/20'
                            : 'text-[#5f6368] hover:text-[#202124] dark:text-[#9aa0a6] dark:hover:text-[#e8eaed] hover:bg-[#f8f9fa] dark:hover:bg-[#303134]'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Divider */}
              <div className="w-px h-6 mx-4 bg-[#dadce0] dark:bg-[#5f6368]" aria-hidden="true" />

              {/* Theme and Language Toggle */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors text-[#5f6368] dark:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
                  aria-label={isDark ? t.nav.lightMode : t.nav.darkMode}
                >
                  {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                </button>
                <button
                  onClick={toggleLang}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f1f3f4] dark:bg-[#303134] text-xs font-semibold transition-colors text-[#5f6368] dark:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
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
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors text-[#5f6368] dark:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
                aria-label={isDark ? t.nav.lightMode : t.nav.darkMode}
              >
                {isDark ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
              </button>
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#f1f3f4] dark:hover:bg-[#303134] transition-colors text-[#202124] dark:text-[#e8eaed] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
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
              className="fixed top-16 left-0 right-0 z-[55] bg-white/95 dark:bg-[#202124]/95 backdrop-blur-sm border-b border-[#dadce0] dark:border-[#5f6368] md:hidden"
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
                        `text-lg font-medium tracking-tight transition-all duration-300 block py-3 px-4 rounded-lg ${
                          isActive
                            ? 'text-[#1a73e8] dark:text-[#8ab4f8] bg-[#e8f0fe] dark:bg-[#174ea6]/20'
                            : 'text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#202124] dark:hover:text-[#e8eaed] hover:bg-[#f8f9fa] dark:hover:bg-[#303134]'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
                <div className="pt-4 mt-4 border-t border-[#dadce0] dark:border-[#5f6368] flex items-center justify-between">
                  <span className="text-sm text-[#5f6368] dark:text-[#9aa0a6]">
                    {t.nav.language}
                  </span>
                  <button
                    onClick={() => {
                      toggleLang();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-full bg-[#f1f3f4] dark:bg-[#303134] text-sm font-semibold transition-colors text-[#5f6368] dark:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#1a73e8]"
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

      <main id="main-content" role="main" className="flex-grow pt-16 relative z-10">
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

      {/* Google-style Footer */}
      <footer role="contentinfo" className="relative z-[20] bg-[#f8f9fa] dark:bg-[#303134] border-t border-[#dadce0] dark:border-[#5f6368]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-10">
            {/* Brand Column - takes 5/12 */}
            <div className="md:col-span-5">
              <NavLink to="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-[#1a73e8] rounded-lg mb-4" aria-label={t.nav.home}>
                <ImageWithFallback src={logoImg} alt="Raphi Logo" className="h-8 w-auto dark:invert opacity-80 hover:opacity-100 transition-opacity" />
              </NavLink>
              <p className="text-sm text-[#5f6368] dark:text-[#9aa0a6] leading-relaxed max-w-sm mb-5">
                {lang === 'de'
                  ? 'UX-Designer mit dem Ziel, komplexe Probleme durch empathisches Design zu lösen.'
                  : 'UX designer with the goal of solving complex problems through empathetic design.'}
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/rapha%C3%ABl-seiler-47b3a1338"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#5f6368] flex items-center justify-center text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#0A66C2] hover:border-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} strokeWidth={2} />
                </a>
                <a
                  href="https://www.instagram.com/seiler_raphi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#5f6368] flex items-center justify-center text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#E4405F] hover:border-[#E4405F] dark:hover:text-[#E4405F] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} strokeWidth={2} />
                </a>
                <a
                  href="mailto:raphi.seiler@gmail.com"
                  className="w-9 h-9 rounded-full bg-white dark:bg-[#202124] border border-[#dadce0] dark:border-[#5f6368] flex items-center justify-center text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] hover:border-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors"
                  aria-label="Email"
                >
                  <Mail size={16} strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Navigation Column - takes 4/12 */}
            <div className="md:col-span-4 md:pl-8">
              <h4 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] mb-4 uppercase tracking-wide">
                {lang === 'de' ? 'Seiten' : 'Pages'}
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className="text-sm text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors"
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Column - takes 3/12 */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold text-[#202124] dark:text-[#e8eaed] mb-4 uppercase tracking-wide">
                {lang === 'de' ? 'Mehr' : 'More'}
              </h4>
              <ul className="space-y-3">
                <li>
                  <NavLink
                    to="/accessibility"
                    className="text-sm text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors"
                  >
                    {t.footer.accessibility}
                  </NavLink>
                </li>
                <li>
                  <a
                    href="mailto:raphi.seiler@gmail.com"
                    className="text-sm text-[#5f6368] dark:text-[#9aa0a6] hover:text-[#1a73e8] dark:hover:text-[#8ab4f8] transition-colors"
                  >
                    {lang === 'de' ? 'Kontakt' : 'Contact'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#dadce0] dark:border-[#5f6368] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
              <span>© {currentYear} Raphaël Seiler</span>
              <span className="hidden sm:inline text-[#dadce0] dark:text-[#5f6368]">·</span>
              <span>{t.footer.allRightsReserved}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#5f6368] dark:text-[#9aa0a6]">
              <span>{lang === 'de' ? 'Schweiz' : 'Switzerland'}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
