import InfiniteMenu from "../components/InfiniteMenu";
import { useNavigate } from "react-router";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import fruitDudeImg from "../../assets/projects/spryte/Fruit_Dude.png";
import fishingLogoImg from "../../assets/projects/fishing/FishingLogo.png";
import ClickSpark from "../components/ClickSpark";
import { useState, useEffect } from "react";

const projects = [
  {
    id: "spryte",
    image: fruitDudeImg,
    title: "SPRYTE",
    description: "Ein interaktives Ökosystem für standortübergreifende Pixel-Kunst."
  },
  {
    id: "fishing",
    image: fishingLogoImg,
    title: "Fishing E-Commerce",
    description: "Ein moderner E-Commerce-Shop für die Helvetic Fishing Co."
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1761122827167-159d1d272313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2glMjB1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Wireframe Kit",
    description: "Ein UI-Kit für schnelle Prototypen und Wireframes in Figma."
  }
];

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
    const project = projects[index % projects.length];
    if (project) {
      navigate(`/projects/${project.id}`);
    }
  };

  const menuItems = projects.map(project => ({
    image: project.image,
    link: `/projects/${project.id}`,
    title: project.title,
    description: project.description
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
