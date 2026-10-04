import type { ProjectContent } from "../types";

export const content: ProjectContent = {
  title: { de: "SPRYTE", en: "SPRYTE" },
  subtitle: {
    de: "Ein interaktives Ökosystem für standortübergreifende Pixel-Kunst.",
    en: "An interactive ecosystem for cross-location pixel art."
  },
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
};
