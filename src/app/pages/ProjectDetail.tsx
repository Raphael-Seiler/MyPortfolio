import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import ClickSpark from "../components/ClickSpark";
import { useState, useEffect } from "react";
import { translations } from "../translations";
import { useLanguage } from "../context/LanguageContext";
import fruitDudeImg from "../../assets/projects/spryte/Fruit_Dude.png";
import screen1Img from "../../assets/projects/spryte/Screen_1.png";
import screen2Img from "../../assets/projects/spryte/Screen_2.png";
import screen3Img from "../../assets/projects/spryte/Screen_3.png";
import screen4Img from "../../assets/projects/spryte/Screen_4.png";
import userFlowImg from "../../assets/projects/spryte/UserFlow.png";
import groupPicImg from "../../assets/projects/spryte/Grouppic.png";

const placeholderProjects: Record<string, {
  title: { de: string; en: string };
  description: { de: string; en: string };
  image: string;
  charter: { de: string; en: string };
  goal: { de: string; en: string };
  process: { de: string; en: string };
  result: { de: string; en: string };
  reflection: { de: string; en: string };
}> = {
  "1": {
    title: { de: "SPRYTE", en: "SPRYTE" },
    description: {
      de: "Ein interaktives Ökosystem für standortübergreifende Pixel-Kunst.",
      en: "An interactive ecosystem for cross-location pixel art."
    },
    image: fruitDudeImg,
    charter: {
      de: "SPRYTE – Place Your Pixels ist ein interaktives Ökosystem, das wir als sechsköpfige «Projektgruppe Zitrone» entwickelt haben. Unser Auftrag war es, eine digitale Stele zu entwerfen, die den Zusammenhalt in grossen Unternehmen stärkt. In einer Zeit von Homeoffice und verteilten Standorten schafft SPRYTE einen physischen Raum für Begegnung: Über vernetzte Stelen können Mitarbeitende in Echtzeit gemeinsam an einem gigantischen, standortübergreifenden Pixel-Artwork arbeiten. Jedes Teammitglied trägt mit einem kleinen Pixel zu einem grossen, gemeinsamen Bild bei.",
      en: "SPRYTE – Place Your Pixels is an interactive ecosystem developed by our six-person 'Projektgruppe Zitrone'. Our task was to design a digital stele that strengthens cohesion in large companies. In an era of home office and distributed locations, SPRYTE creates a physical space for encounter: Through networked steles, employees can work together in real-time on a gigantic, cross-location pixel artwork. Each team member contributes with a small pixel to a large, common picture."
    },
    goal: {
      de: "Das Ziel war es, eine intuitive und motivierende Erfahrung zu schaffen, die den Arbeitsalltag auflockert. Die Stele fungiert als sozialer «Eisbrecher» – sei es im Büroalltag oder an Firmenevents. Wir wollten die Kreativität fördern und eine Plattform bieten, auf der Menschen über Hierarchien und Standorte hinweg spielerisch kommunizieren können.",
      en: "The goal was to create an intuitive and motivating experience that brightens up everyday work. The stele acts as a social 'icebreaker' – whether in everyday office life or at company events. We wanted to foster creativity and provide a platform where people can communicate playfully across hierarchies and locations."
    },
    process: {
      de: [
        { title: "Discover", desc: "Wir analysierten soziale Experimente wie «r/place» auf Reddit. Dabei untersuchten wir, wie tausende Menschen ohne direkte Absprache gemeinsam Kunstwerke erschaffen und welche Dynamiken dabei entstehen." },
        { title: "Define", desc: "Wir entwickelten Personas wie «Sabine» (die erfahrene Mitarbeiterin) und «Noah» (den jungen Lernenden), um sicherzustellen, dass das System für alle Altersgruppen funktioniert. Der User Flow wurde so optimiert, dass die Teilnahme – vom ID-Scan bis zum gesetzten Pixel – nur wenige Sekunden dauert." },
        { title: "Develop", desc: "In dieser Phase entstanden das Designsystem und unser Maskottchen, der «Fruit Dude». Wir bauten einen hochfunktionalen Prototypen in Figma, der die zentrale Interaktion simuliert." },
        { title: "Deliver", desc: "Die fertige Lösung kombiniert Hardware und Software. Ein spezieller Distanzsensor erkennt, wenn sich jemand der Stele nähert, und wechselt automatisch vom Standby-Modus in den Interaktions-Modus." }
      ],
      en: [
        { title: "Discover", desc: "We analyzed social experiments like Reddit's 'r/place'. We examined how thousands of people create artworks together without direct coordination and what dynamics arise." },
        { title: "Define", desc: "We developed personas like 'Sabine' (the experienced employee) and 'Noah' (the young trainee) to ensure the system works for all age groups. The user flow was optimized so that participation – from ID scan to placed pixel – takes only a few seconds." },
        { title: "Develop", desc: "This phase created the design system and our mascot, the 'Fruit Dude'. We built a high-functional prototype in Figma that simulates the central interaction." },
        { title: "Deliver", desc: "The final solution combines hardware and software. A special distance sensor detects when someone approaches the stele and automatically switches from standby mode to interaction mode." }
      ]
    },
    testing: {
      de: [
        { title: "Barrierefreiheit", desc: "Wir stellten fest, dass Kontraste und Klickflächen optimiert werden mussten, um eine barrierefreie Bedienung zu garantieren." },
        { title: "Problemmanagement", desc: "Wir entwickelten Lösungen für kritische Szenarien, wie den Umgang mit unangebrachten Inhalten (Melde-Funktion) oder automatische Timeouts, damit die Stele für den nächsten Nutzer bereit ist." },
        { title: "Erkenntnis", desc: "Erst durch das direkte Feedback der Nutzer konnten wir die Navigation so vereinfachen, dass sie ohne Anleitung verständlich ist." }
      ],
      en: [
        { title: "Accessibility", desc: "We found that contrasts and click areas needed optimization to guarantee accessible operation." },
        { title: "Issue Management", desc: "We developed solutions for critical scenarios, such as handling inappropriate content (reporting function) or automatic timeouts to prepare the stele for the next user." },
        { title: "Key Insight", desc: "Only through direct user feedback were we able to simplify the navigation so that it's understandable without instructions." }
      ]
    },
    result: {
      de: [
        { title: "Gamification", desc: "Ein Belohnungssystem mit Coins sorgt dafür, dass Pixel eine wertvolle Ressource sind. Ranglisten und Statistiken (z.B. die meistgenutzte Farbe) motivieren zum täglichen Mitmachen." },
        { title: "Standort-Challenge", desc: "Teams können sich zusammenschliessen, um Flächen zu erobern oder Zeichnungen anderer Standorte spielerisch zu «übermalen»." },
        { title: "Technik, die mitdenkt", desc: "Dank der Sensorintegration reagiert die Stele auf die physische Präsenz der Mitarbeitenden und wird so zum aktiven Teil des Raums." }
      ],
      en: [
        { title: "Gamification", desc: "A reward system with coins ensures that pixels are a valuable resource. Leaderboards and statistics (e.g., most used color) motivate daily participation." },
        { title: "Location Challenge", desc: "Teams can join forces to conquer areas or playfully 'overwrite' drawings from other locations." },
        { title: "Smart Technology", desc: "Thanks to sensor integration, the stele responds to the physical presence of employees and becomes an active part of the space." }
      ]
    },
    highlight: {
      de: "Der krönende Abschluss war die Präsentation vor UX-Repräsentanten führender Firmen wie der Migros und der SBB. Dass Profis von solch namhaften Unternehmen unsere fundierte Herleitung und das durchdachte Konzept der «strukturierten Kollaboration» lobten, war die grösste Bestätigung für unsere Arbeit.",
      en: "The crowning conclusion was the presentation to UX representatives from leading companies like Migros and SBB. Having professionals from such renowned companies praise our solid rationale and well-thought-out concept of 'structured collaboration' was the greatest confirmation of our work."
    },
    reflection: {
      de: "Das Projekt hat mir gezeigt, dass gutes Design die Brücke zwischen Technik und Mensch schlägt. Die Arbeit im 6er-Team war intensiv und lehrreich – besonders die Herausforderung, komplexe Interaktionen so zu reduzieren, dass sie im Vorbeilaufen funktionieren. SPRYTE zeigt, dass auch in einer digitalen Welt der physische Raum und das gemeinsame Erlebnis unersetzbar sind.",
      en: "The project showed me that good design bridges the gap between technology and humans. Working in the 6-person team was intense and educational – especially the challenge of reducing complex interactions so they work in passing. SPRYTE shows that even in a digital world, physical space and shared experience are irreplaceable."
    }
  },
  "2": {
    title: { de: "Analytics Dashboard", en: "Analytics Dashboard" },
    description: {
      de: "Ein cleanes Dashboard-Konzept für Datenvisualisierung mit reduziertem Interface.",
      en: "A clean dashboard concept for data visualization with a reduced interface."
    },
    image: "https://images.unsplash.com/photo-1649442279006-8bccb4cc63e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdlYnNpdGUlMjBkYXNoYm9hcmQlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    charter: {
      de: "Ein Freelance-Projekt für ein SaaS-Startup. Das Ziel war ein Dashboard, das komplexe Analysedaten für Marketing-Teams zugänglich macht.",
      en: "A freelance project for a SaaS startup. The goal was a dashboard that makes complex analytics data accessible to marketing teams."
    },
    goal: {
      de: "Marketing-Experten sollten ohne technische Vorkenntnisse wichtige KPIs verstehen und datengesteuerte Entscheidungen treffen können.",
      en: "Marketing experts should be able to understand key KPIs and make data-driven decisions without technical prerequisites."
    },
    process: {
      de: "Workshops mit Stakeholdern, Persona-Entwicklung, Information Architecture, Wireframes, Visual Design und Prototyping. Besonderer Fokus lag auf der Hierarchie der Datenvisualisierung.",
      en: "Workshops with stakeholders, persona development, information architecture, wireframes, visual design, and prototyping. Special focus was on the hierarchy of data visualization."
    },
    result: {
      de: "Ein übersichtliches Dashboard mit anpassbaren Widgets, klaren Visualisierungen und Drill-down-Funktionen für detaillierte Einblicke.",
      en: "A clear dashboard with customizable widgets, clean visualizations, and drill-down functions for detailed insights."
    },
    reflection: {
      de: "Die Balance zwischen Detailtiefe und Übersichtlichkeit war entscheidend. Künftige Projekte würden mit noch stärkerer Datenreduktion beginnen.",
      en: "The balance between depth and clarity was crucial. Future projects would start with even stronger data reduction."
    }
  },
  "3": {
    title: { de: "Wireframe Kit", en: "Wireframe Kit" },
    description: {
      de: "Ein UI-Kit für schnelle Prototypen und Wireframes in Figma.",
      en: "A UI kit for rapid prototyping and wireframes in Figma."
    },
    image: "https://images.unsplash.com/photo-1761122827167-159d1d272313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlZnJhbWUlMjBza2V0Y2glMjB1eCUyMGRlc2lnbnxlbnwxfHx8fDE3NzI3MTk0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    charter: {
      de: "Ein persönliches Side-Projekt zur Beschleunigung des eigenen Design-Workflows. Das Kit sollte wiederverwendbare Komponenten für schnelle Low-Fidelity-Prototypen bieten.",
      en: "A personal side project to accelerate my own design workflow. The kit should provide reusable components for rapid low-fidelity prototypes."
    },
    goal: {
      de: "Designern ein Werkzeug an die Hand geben, das schnelles Iterieren von Konzepten ermöglicht, ohne sich in Details zu verlieren.",
      en: "Provide designers with a tool that enables rapid iteration of concepts without getting lost in details."
    },
    process: {
      de: "Analyse bestehender Design-Systeme, Identifikation der häufigsten UI-Muster, Erstellung einer modularen Bibliothek in Figma mit Auto-Layout und Variantensystem.",
      en: "Analysis of existing design systems, identification of most common UI patterns, creation of a modular library in Figma with auto-layout and variant system."
    },
    result: {
      de: "Eine Bibliothek mit über 100 Komponenten, die Wireframing von 2 Stunden auf 30 Minuten reduziert. Öffentlich auf Figma Community geteilt.",
      en: "A library with over 100 components, reducing wireframing from 2 hours to 30 minutes. Shared publicly on Figma Community."
    },
    reflection: {
      de: "Die Modularität war der Schlüssel. Für zukünftige Versionen plane ich mehr Industrie-spezifische Templates und Integration von Design-Tokens.",
      en: "Modularity was the key. For future versions, I plan more industry-specific templates and integration of design tokens."
    }
  }
};

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLanguage();
  const project = id ? placeholderProjects[id] : null;
  const [isDark, setIsDark] = useState(false);

  const t = translations[lang];

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
        <p className="text-[#55555a] dark:text-[#e5e5ea]">{t.projectDetail.projectNotFound}</p>
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
      <div className="w-full min-h-screen max-w-6xl mx-auto px-6 md:px-12 py-20 pt-48">
      {/* Back Button */}
      <Link
        to="/projects"
        className="inline-flex items-center space-x-2 text-sm font-medium text-[#55555a] dark:text-[#e5e5ea] hover:text-black dark:hover:text-white transition-colors mb-12"
      >
        <ArrowLeft size={18} strokeWidth={1.5} />
        <span>{t.projectDetail.backToProjects}</span>
      </Link>

      {/* Project Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 4 Screens Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="overflow-hidden bg-transparent"
          >
            <img src={screen1Img} alt="SPRYTE Hauptinterface mit Pixel-Editor und Farbauswahl" className="w-full h-auto object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="overflow-hidden bg-transparent"
          >
            <img src={screen2Img} alt="SPRYTE Canvas-Ansicht mit gemeinsamem Pixel-Arbeitsbereich" className="w-full h-auto object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-hidden bg-transparent"
          >
            <img src={screen3Img} alt="SPRYTE Leaderboard und Statistiken-Übersicht" className="w-full h-auto object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="overflow-hidden bg-transparent"
          >
            <img src={screen4Img} alt="SPRYTE Profilansicht mit persönlichen Pixel-Statistiken" className="w-full h-auto object-cover" />
          </motion.div>
        </div>

        {/* Milky Background Container */}
        <div className="rounded-[2.5rem] bg-white/80 dark:bg-black/60 backdrop-blur-xl px-8 md:px-12 py-12 mt-8">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-8">
            {project.title[lang]}
          </h1>

          <p className="text-lg text-[#55555a] dark:text-[#e5e5ea] font-light leading-relaxed mb-12">
            {project.description[lang]}
          </p>

          {/* Project Sections */}
          <div className="space-y-16">
        {/* Project Charter */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
            {project.charter[lang]}
          </p>
        </motion.section>

        {/* Our Goal */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-[#55555a] dark:text-[#e5e5ea] mb-4">
            {t.projectDetail.ourGoal}
          </h2>
          <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
            {project.goal[lang]}
          </p>
        </motion.section>

        {/* Prozess/Process */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-[#55555a] dark:text-[#e5e5ea] mb-4">
            {lang === 'de' ? t.projectDetail.prozess : t.projectDetail.process}
          </h2>
          <div className="space-y-4">
            {Array.isArray(project.process[lang]) ? (
              project.process[lang].map((phase, i) => (
                <div key={i}>
                  <div className="flex gap-3">
                    <span className="min-w-[120px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                      {phase.title}
                    </span>
                    <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed flex-1">
                      {phase.desc}
                    </p>
                  </div>
                  {i === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="mt-4 mb-6 flex flex-col items-center"
                    >
                      <img src={userFlowImg} alt="User Flow Diagramm zeigt den SPRYTE-Nutzungsprozess vom ID-Scan bis zum gesetzten Pixel" className="w-[600px] max-w-full h-auto" />
                      <p className="text-xs text-[#55555a] dark:text-[#e5e5ea] mt-3 text-center">
                        {lang === 'de' ? 'User Flow: Vom ID-Scan zum gesetzten Pixel' : 'User Flow: From ID scan to placed pixel'}
                      </p>
                    </motion.div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
                {project.process[lang]}
              </p>
            )}
          </div>
        </motion.section>

        {/* Result */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-[#55555a] dark:text-[#e5e5ea] mb-4">
            {t.projectDetail.result}
          </h2>
          <div className="space-y-4">
            {Array.isArray(project.result[lang]) ? (
              project.result[lang].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-[120px] flex-shrink-0 font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                    {item.title}
                  </span>
                  <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
                {project.result[lang]}
              </p>
            )}
          </div>
        </motion.section>

        {/* Highlight */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-[#55555a] dark:text-[#e5e5ea] mb-4">
            {lang === 'de' ? 'Das Highlight: Pitch vor der Branche' : 'The Highlight: Pitch to the Industry'}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed flex-1 md:max-w-[50%]">
              {project.highlight[lang]}
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex-shrink-0"
            >
              <img src={groupPicImg} alt="Teamfoto der Projektgruppe Zitrone bei der SPRYTE-Präsentation vor UX-Experten" className="w-[450px] max-w-full h-auto rounded-2xl" />
              <p className="text-xs text-[#55555a] dark:text-[#e5e5ea] mt-3 text-center">
                {lang === 'de' ? 'Präsentation vor UX-Experten der Migros und SBB' : 'Presentation to UX experts from Migros and SBB'}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Testing & Accessibility */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-[#55555a] dark:text-[#e5e5ea] mb-4">
            {lang === 'de' ? 'Testing & Accessibility' : 'Testing & Accessibility'}
          </h2>
          <div className="space-y-4">
            {Array.isArray(project.testing[lang]) ? (
              project.testing[lang].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-[140px] flex-shrink-0 font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] break-words">
                    {item.title}
                  </span>
                  <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
                {project.testing[lang]}
              </p>
            )}
          </div>
        </motion.section>

        {/* Reflection */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-sm font-medium tracking-widest uppercase text-[#55555a] dark:text-[#e5e5ea] mb-4">
            {t.projectDetail.reflection}
          </h2>
          <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed">
            {project.reflection[lang]}
          </p>
        </motion.section>
          </div>
        </div>
      </motion.div>
    </div>
    </ClickSpark>
  );
}
