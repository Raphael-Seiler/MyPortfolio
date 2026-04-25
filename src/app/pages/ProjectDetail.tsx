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
import spryteLogoImg from "../../assets/projects/spryte/Spryte_Logo.png";
import figmaLogoImg from "../../assets/shared/Figma-logo.svg";
import fishingLandingImg from "../../assets/projects/fishing/LandingPage.png";
import fishingLogoImg from "../../assets/projects/fishing/FishingLogo.png";
import kachelAndereImg from "../../assets/projects/fishing/Kachel_andere.png";
import kachelMeineImg from "../../assets/projects/fishing/Kachel_meine.png";

const placeholderProjects: Record<string, {
  title: { de: string; en: string };
  description: { de: string; en: string };
  image: string;
  charter: { de: string; en: string };
  goal: { de: string; en: string };
  process: { de: string; en: string } | { title: string; desc: string }[];
  result: { de: string; en: string } | { title: string; desc: string }[];
  reflection: { de: string; en: string };
  highlight: { de: string; en: string };
  testing: { de: string; en: string } | { title: string; desc: string }[];
}> = {
  "spryte": {
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
        { title: "Develop", desc: "In dieser Phase entstand das Designsystem und unser Maskottchen, der «Fruit Dude». Wir bauten einen hochfunktionalen Prototypen in Figma, der die zentrale Interaktion simuliert." },
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
      de: "Der absolute Höhepunkt des Projekts war für mich die finale Präsentation. Endlich durften wir unser Konzept der ‹standortübergreifenden Kollaboration› vorstellen. Es war eine besondere Ehre, vor unseren Dozenten und erfahrenen UX-Grössen zu stehen. Vertreter von Firmen wie der Migros, der SBB und weiteren Branchenführern waren dabei. Ehrlich gesagt war der Moment auch ein wenig nervenaufreibend. Diese Profis jonglieren täglich enorm komplexe Systemen. Dass sie unsere Herleitung sofort verstanden, war ein tolles Gefühl. Sie lobten explizit die kreative Idee und praktische Tiefe unseres Ansatzes. Das war für mich die schönste Bestätigung für all die späten Arbeitsstunden.",
      en: "The absolute highlight of the project for me was the final presentation. Finally, we were able to present our concept of 'cross-location collaboration'. It was a special honor to stand before our lecturers and experienced UX experts. Representatives from companies like Migros, SBB and other industry leaders were there. Honestly, the moment was also a bit nerve-wracking. These professionals juggle enormously complex systems daily. That they immediately understood our rationale was a great feeling. They explicitly praised the creative idea and practical depth of our approach. That was the nicest confirmation for me of all those late working hours."
    },
    reflection: {
      de: "Das Projekt hat mir gezeigt, dass gutes Design die Brücke zwischen Technik und Mensch schlägt. Die Arbeit im 6er-Team war intensiv und lehrreich – besonders die Herausforderung, komplexe Interaktionen so zu reduzieren, dass sie im Vorbeilaufen funktionieren. SPRYTE zeigt, dass auch in einer digitalen Welt der physische Raum und das gemeinsame Erlebnis unersetzbar sind.",
      en: "The project showed me that good design bridges the gap between technology and humans. Working in the 6-person team was intense and educational – especially the challenge of reducing complex interactions so they work in passing. SPRYTE shows that even in a digital world, physical space and shared experience are irreplaceable."
    }
  },
  "fishing": {
    title: { de: "Helvetic Fishing Co.", en: "Helvetic Fishing Co." },
    description: {
      de: "Ein moderner E-Commerce-Shop für die Helvetic Fishing Co.",
      en: "A modern e-commerce shop for Helvetic Fishing Co."
    },
    image: fishingLandingImg,
    charter: {
      de:"",
      en:""
    },
    goal: {
      de: "Mein Ziel war die Entwicklung eines modernen E-Commerce-Shops für die Helvetic Fishing Co. Ich wollte ein relevantes Problem für eine spezifische Zielgruppe lösen: Schweizer Hobby- und Sportfischer. Dabei war mir wichtig, dass das Interface für alle Nutzer intuitiv funktioniert – unabhängig von ihrem Technik-Know-how. Das gesamte Einkaufserlebnis sollte sowohl auf dem Smartphone als auch am Desktop absolut reibungslos ablaufen.",
      en: "My goal was to develop a modern e-commerce shop for Helvetic Fishing Co. I wanted to solve a relevant problem for a specific target group: Swiss hobby and sport fishermen. It was important to me that the interface works intuitively for all users – regardless of their technical know-how. The entire shopping experience should run absolutely smoothly on both smartphone and desktop."
    },
    process: {
      de: [
        { title: "", desc: "Ich habe den gesamten Weg von den ersten Low-Fidelity-Skizzen bis zum High-Fidelity-Prototypen allein durchlaufen. Ein entscheidender Teil meiner Vorbereitung war eine gründliche Marktanalyse. Dabei fiel mir auf, dass viele Shops breite Standard-Bilder für ihre Kacheln nutzen. Bei langen, dünnen Angelruten verschenkt das viel Platz und sieht unvorteilhaft aus." },
        { title: "", desc: "Meine Design-Entscheidungen im Prozess:" },
        { title: "Formatwechsel", desc: "Ich entschied mich bewusst für hochkantige Produktkacheln, um die Ruten perfekt in Szene zu setzen." },
        { title: "Systematik", desc: "In Figma baute ich ein modulares Designsystem auf, das auf Varianten und Auto-Layout basiert." },
        { title: "Effizienz", desc: "Jede Komponente wurde so entworfen, dass sie konsistent über das gesamte Projekt hinweg funktioniert und leicht erweiterbar bleibt." }
      ],
      en: [
        { title: "", desc: "I went through the entire process from the first low-fidelity sketches to the high-fidelity prototype on my own. A crucial part of my preparation was a thorough market analysis. I noticed that many shops use wide standard images for their tiles. For long, thin fishing rods, this wastes a lot of space and looks unflattering." },
        { title: "", desc: "My design decisions in the process:" },
        { title: "Format Change", desc: "I deliberately chose portrait-oriented product tiles to showcase the rods perfectly." },
        { title: "Systematics", desc: "In Figma, I built a modular design system based on variants and auto-layout." },
        { title: "Efficiency", desc: "Each component was designed to function consistently throughout the entire project and remain easily expandable." }
      ]
    },
    highlight: {
      de: "Das absolute Herzstück meiner Arbeit ist die technische Umsetzung des Prototypen. Ich bin sehr stolz darauf, dass der Prototyp nicht nur statisch gut aussieht, sondern extrem lebendig wirkt. Echtes Website-Feeling: Durch den massiven Einsatz von Variablen und komplexen Prototyping-Verknüpfungen reagiert das Interface sofort auf jede Eingabe. Full Responsive Design: Das Layout ist komplett dynamisch. Es passt sich flüssig an verschiedene Geräte und Bildschirmgrössen an – vom Smartphone bis zum grossen Desktop-Monitor. Adaptive Logik: Elemente wie die Filterleiste oder das Produktgrid verändern ihr Verhalten je nach verfügbarem Platz, genau wie eine echte Web-Applikation.",
      en: "The absolute centerpiece of my work is the technical implementation of the prototype. I am very proud that the prototype not only looks good statically, but appears extremely lively. Real website feeling: Through the massive use of variables and complex prototyping links, the interface responds immediately to every input. Full responsive design: The layout is completely dynamic. It adapts fluidly to different devices and screen sizes – from smartphone to large desktop monitor. Adaptive logic: Elements like the filter bar or product grid change their behavior depending on available space, just like a real web application."
    },
    result: {
      de: "Das Ergebnis ist ein funktionaler High-Fidelity-Prototyp, der weit über die Standard-Anforderungen hinausgeht. Die Navigation ist durch einen globalen Header und eine klare Struktur sehr einfach gestaltet. Ich habe zudem wichtige Features wie eine detaillierte Filterleiste, eine Merkliste («Pin») und eine Vergleichsfunktion integriert, um den Nutzwert für die Fischer zu maximieren. Die hochkantigen Bilder sorgen dabei für eine moderne Ästhetik und eine optimale Produktdarstellung.",
      en: "The result is a functional high-fidelity prototype that goes far beyond standard requirements. Navigation is simplified through a global header and clear structure. I also integrated important features like a detailed filter bar, a wishlist ('Pin'), and a comparison function to maximize utility for fishermen. The portrait-oriented images ensure a modern aesthetic and optimal product presentation."
    },
    testing: {
      de: "Ein Design ist erst gut, wenn es in der Praxis besteht. Deshalb habe ich meinen Prototyp intensiv mit Kommiliton:innen getestet. Durch diese Test-Sessions konnte ich Schwachstellen finden und das Design gezielt verfeinern. Ich optimierte die Schatten der Kacheln für eine bessere räumliche Trennung und schärfte die Sortierfunktion. Bei der Barrierefreiheit achtete ich auf hohe Kontraste und wählte die Schrift «San Francisco» von Apple für beste Lesbarkeit.",
      en: "A design is only good when it succeeds in practice. That's why I intensively tested my prototype with fellow students. Through these test sessions, I was able to find weaknesses and refine the design in a targeted manner. I optimized the shadows of the tiles for better spatial separation and sharpened the sorting function. For accessibility, I paid attention to high contrasts and chose Apple's 'San Francisco' font for best readability."
    },
    reflection: {
      de: "Dieses Einzelprojekt war für mich ein riesiger Meilenstein. Ich konnte meine Figma-Skills auf ein völlig neues Level heben, besonders durch die Logik hinter den Zustandswechseln. Es war eine wertvolle Erfahrung zu sehen, wie ein systematischer Aufbau die Wartbarkeit eines Designs verbessert. Mein Fazit: Gute Gestaltung ist weit mehr als nur Optik. Ich habe bewiesen, dass mein Konzept Hand und Fuss hat und das Potenzial besitzt, komplexe Design-Herausforderungen in der realen Praxis erfolgreich zu lösen.",
      en: "This individual project was a huge milestone for me. I was able to take my Figma skills to a whole new level, especially through the logic behind state changes. It was a valuable experience to see how a systematic structure improves the maintainability of a design. My conclusion: Good design is far more than just aesthetics. I have proven that my concept is solid and has the potential to successfully solve complex design challenges in real-world practice."
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
        <p className="text-[#5e5e63] dark:text-[#b8b8b8]">{t.projectDetail.projectNotFound}</p>
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
      <div className="w-full min-h-screen">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 pt-32">
          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5e5e63] hover:text-[#1d1d1f] dark:text-[#b8b8b8] dark:hover:text-[#f5f5f7] transition-colors mb-12 focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-lg px-2 py-1"
          >
            <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
            <span>{t.projectDetail.backToProjects}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Project Title */}
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-4">
              {project.title[lang]}
            </h1>
            <p className="text-xl text-[#5e5e63] dark:text-[#b8b8b8] font-light max-w-2xl">
              {project.description[lang]}
            </p>
          </motion.div>

          {/* Hero Images Grid */}
          {id === 'fishing' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <img src={fishingLandingImg} alt="Fishing E-Commerce Landing Page" className="w-full h-auto object-contain rounded-2xl" />
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[screen1Img, screen2Img, screen3Img, screen4Img].map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="overflow-hidden rounded-2xl bg-[#f5f5f7] dark:bg-[#1d1d1f]"
                >
                  <img src={src} alt={`SPRYTE Screen ${i + 1}`} className="w-full h-auto object-cover rounded-2xl" />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Content Section - Apple-style card */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-3xl p-8 md:p-12"
          >
            {/* Logo */}
            <div className="flex justify-center mb-10">
              {id === 'fishing' ? (
                <img src={fishingLogoImg} alt="Fishing Logo" className="h-24 md:h-36 w-auto object-contain" />
              ) : (
                <img src={spryteLogoImg} alt="SPRYTE Logo" className="h-24 md:h-36 w-auto object-contain" />
              )}
            </div>

            {/* Sections */}
            <div className="space-y-12">
              {/* Project Charter */}
              {project.charter[lang] && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5e5e63] dark:text-[#b8b8b8] mb-4">
                    {t.projectDetail.projectCharter}
                  </h2>
                  <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light">
                    {project.charter[lang]}
                  </p>
                </motion.section>
              )}

              {/* Goal */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5e5e63] dark:text-[#b8b8b8] mb-4">
                  {t.projectDetail.ourGoal}
                </h2>
                <p className="text-lg text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light">
                  {project.goal[lang]}
                </p>
              </motion.section>

              {/* Process */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5e5e63] dark:text-[#b8b8b8] mb-6">
                  {lang === 'de' ? t.projectDetail.prozess : t.projectDetail.process}
                </h2>
                {id === 'spryte' && (
                  <div className="mb-8 flex justify-center">
                    <div className="bg-white dark:bg-[#000000] rounded-2xl p-6">
                      <img src={userFlowImg} alt="User Flow Diagram" className="w-full max-w-[500px] h-auto" />
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  {Array.isArray(project.process[lang]) ? (
                    project.process[lang].map((phase, i) => (
                      <div key={i} className={phase.title ? "flex gap-4" : ""}>
                        {phase.title && (
                          <span className="min-w-[100px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                            {phase.title}
                          </span>
                        )}
                        <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light flex-1">
                          {phase.desc}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light">
                      {project.process[lang]}
                    </p>
                  )}
                </div>
              </motion.section>

              {/* Kachel Images for Fishing */}
              {id === 'fishing' && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-[#000000] p-4 rounded-2xl">
                      <img src={kachelAndereImg} alt="Tiles from other shops" className="w-full h-[350px] object-contain mix-blend-multiply dark:mix-blend-screen" />
                      <p className="text-xs text-[#5e5e63] dark:text-[#b8b8b8] mt-3 text-center">
                        {lang === 'de' ? 'Kacheln anderer Shops' : 'Tiles from other shops'}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-[#000000] p-4 rounded-2xl">
                      <img src={kachelMeineImg} alt="My tiles" className="w-full h-[350px] object-contain mix-blend-multiply dark:mix-blend-screen" />
                      <p className="text-xs text-[#5e5e63] dark:text-[#b8b8b8] mt-3 text-center">
                        {lang === 'de' ? 'Meine Kacheln' : 'My tiles'}
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Result */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5e5e63] dark:text-[#b8b8b8] mb-6">
                  {t.projectDetail.result}
                </h2>
                <div className="space-y-4">
                  {Array.isArray(project.result[lang]) ? (
                    project.result[lang].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="w-[100px] flex-shrink-0 font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                          {item.title}
                        </span>
                        <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light flex-1">
                          {item.desc}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light">
                      {project.result[lang]}
                    </p>
                  )}
                </div>

                {/* Figma Prototype Link */}
                <div className="flex flex-col items-center gap-3 mt-8">
                  <a
                    href={id === 'fishing'
                      ? "https://www.figma.com/proto/f0YTThD34TWx4MJda6GzNg/E-Commerce?node-id=536-10832&p=f&viewport=462%2C-231%2C0.08&t=bp1qxJ7lReOusWMT-8&scaling=contain&content-scaling=responsive&starting-point-node-id=536%3A10832&page-id=1%3A2&hide-ui=1"
                      : "https://www.figma.com/proto/qQ9rpUbWYi582pMQEB1UnU/Spryte?node-id=436-822&viewport=921%2C-656%2C0.08&t=508QId7KkcGBQnm5-8&scaling=scale-down&content-scaling=fixed&starting-point-node-id=436%3A822&page-id=0%3A1&hide-ui=1"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#0066cc] rounded-xl p-4"
                  >
                    <span className="text-sm font-medium text-[#0066cc] dark:text-[#4da6ff] group-hover:text-[#0055aa] dark:group-hover:text-[#66b3ff] transition-colors">
                      {t.projectDetail.tryPrototype}
                    </span>
                    <svg className="text-[#0066cc] dark:text-[#4da6ff] w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14"/>
                      <path d="M19 12l-7 7-7-7"/>
                    </svg>
                    <img src={figmaLogoImg} alt="Figma" className="w-12 h-12 object-contain transition-transform group-hover:scale-110" />
                  </a>
                </div>
              </motion.section>

              {/* Highlight */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5e5e63] dark:text-[#b8b8b8] mb-4">
                  {id === 'fishing'
                    ? (lang === 'de' ? 'Highlight' : 'Highlight')
                    : (lang === 'de' ? 'Das Highlight' : 'The Highlight')
                  }
                </h2>
                {id === 'spryte' ? (
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light flex-1">
                      {project.highlight[lang]}
                    </p>
                    <div className="flex-shrink-0">
                      <img src={groupPicImg} alt="Team presentation" className="w-[400px] max-w-full h-auto rounded-2xl" />
                      <p className="text-xs text-[#5e5e63] dark:text-[#b8b8b8] mt-3 text-center">
                        {lang === 'de' ? 'Präsentation vor UX-Experten' : 'Presentation to UX experts'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light">
                    {project.highlight[lang]}
                  </p>
                )}
              </motion.section>

              {/* Testing */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5e5e63] dark:text-[#b8b8b8] mb-4">
                  Testing & Accessibility
                </h2>
                <div className="space-y-4">
                  {Array.isArray(project.testing[lang]) ? (
                    project.testing[lang].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="min-w-[120px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                          {item.title}
                        </span>
                        <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light flex-1">
                          {item.desc}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light">
                      {project.testing[lang]}
                    </p>
                  )}
                </div>
              </motion.section>

              {/* Reflection */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5e5e63] dark:text-[#b8b8b8] mb-4">
                  {t.projectDetail.reflection}
                </h2>
                <p className="text-[#1d1d1f] dark:text-[#f5f5f7] leading-relaxed font-light">
                  {project.reflection[lang]}
                </p>
              </motion.section>
            </div>
          </motion.div>
        </div>
      </div>
    </ClickSpark>
  );
}
