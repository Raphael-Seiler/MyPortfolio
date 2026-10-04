import fruitDude from "./Fruit_Dude.png";
import grouppic from "./Grouppic.png";
import screen1 from "./Screen_1.png";
import screen2 from "./Screen_2.png";
import screen3 from "./Screen_3.png";
import screen4 from "./Screen_4.png";
import logo from "./Spryte_Logo.png";
import userFlow from "./UserFlow.png";
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
