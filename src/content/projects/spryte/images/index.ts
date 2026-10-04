import fruitDude from "./Fruit_Dude.png";
import grouppic from "./Grouppic.webp";
import screen1 from "./screen-1.webp";
import screen2 from "./screen-2.webp";
import screen3 from "./screen-3.webp";
import screen4 from "./screen-4.webp";
import logo from "./Spryte_Logo.png";
import userFlow from "./UserFlow.webp";
import type { ProjectImages } from "../../types";

export const images: ProjectImages = {
  card: fruitDude,
  logo,
  hero: [screen1, screen2, screen3, screen4],
  processFigures: [{ src: userFlow, alt: "User Flow Diagram" }],
  highlightFigure: {
    src: grouppic,
    alt: "Team presentation",
    caption: { de: "Präsentation vor UX-Experten", en: "Presentation to UX experts" },
  },
  gallery: [screen2, screen3, fruitDude],
};
