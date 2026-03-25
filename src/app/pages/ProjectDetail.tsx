import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import ClickSpark from "../components/ClickSpark";
import { useState, useEffect } from "react";

const placeholderProjects: Record<string, { title: string; description: string; image: string }> = {
  "1": {
    title: "Fintech Mobile App",
    description: "Eine minimalistische Banking-App mit Fokus auf Benutzerfreundlichkeit und klare visuelle Hierarchie.",
    image: "https://images.unsplash.com/photo-1750056393326-8feed2a1c34f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbW9iaWxlJTIwYXBwJTIwdWklMjBtb2NrdXB8ZW58MXx8fHwxNzcyNzE5NDkxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  "2": {
    title: "Analytics Dashboard",
    description: "Ein cleanes Dashboard-Konzept für Datenvisualisierung mit reduziertem Interface.",
    image: "https://images.unsplash.com/photo-1649442279006-8bccb4cc63e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdlYnNpdGUlMjBkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  "3": {
    title: "Wireframe Kit",
    description: "Ein UI-Kit für schnelle Prototypen und Wireframes in Figma.",
    image: "https://images.unsplash.com/photo-1761122827167-159d1d272313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2glMjB1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
};

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? placeholderProjects[id] : null;
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

  if (!project) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-[#55555a] dark:text-[#e5e5ea]">Projekt nicht gefunden.</p>
      </div>
    );
  }

  return (
    <ClickSpark
      sparkColor={isDark ? '#ffffff' : '#000000'}
      sparkSize={19}
      sparkRadius={40}
      sparkCount={13}
      duration={400}
      disableOnMobile
    >
      <div className="w-full h-screen max-w-4xl mx-auto px-6 md:px-12 py-20">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center space-x-2 text-sm font-medium text-[#55555a] dark:text-[#e5e5ea] hover:text-black dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={18} strokeWidth={1.5} />
        <span>Zurück zu Projekten</span>
      </Link>

      {/* Project Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="rounded-[2.5rem] overflow-hidden bg-transparent mb-8">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[400px] md:h-[600px] object-cover"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
          {project.title}
        </h1>

        <p className="text-lg text-[#55555a] dark:text-[#e5e5ea] font-light leading-relaxed max-w-2xl">
          {project.description}
        </p>
      </motion.div>
    </div>
    </ClickSpark>
  );
}
