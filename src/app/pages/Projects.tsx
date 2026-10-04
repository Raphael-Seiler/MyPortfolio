import InfiniteMenu from "../components/InfiniteMenu";
import { useNavigate } from "react-router";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import { projects } from "../../content/projects";
import ClickSpark from "../components/ClickSpark";
import { useState, useEffect } from "react";

export function Projects() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = translations[lang];
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

  const handleNavigate = (index: number) => {
    const project = projects[index % projects.length]?.meta;
    if (project) {
      navigate(`/projects/${project.id}`);
    }
  };

  const menuItems = projects.map(({ meta, images }) => ({
    image: images.card,
    link: `/projects/${meta.id}`,
    title: meta.title,
    description: meta.description[lang]
  }));

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="relative w-full h-screen overflow-hidden">
        {/* Title */}
        <div className="absolute top-0 left-0 right-0 z-30 pt-48 pb-8 px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1d1d1f] to-[#55555a] dark:from-[#f5f5f7] dark:to-[#d1d1d6]">
              {t.projects.title}
            </span>
          </h1>
        </div>

        {/* Infinite Menu - Full viewport background */}
        <InfiniteMenu
          items={menuItems}
          scale={1.5}
          onItemClick={handleNavigate}
        />
      </div>
    </ClickSpark>
  );
}
