import landing from "./LandingPage.webp";
import logo from "./FishingLogo.webp";
import tilesOthers from "./Kachel_andere.png";
import tilesMine from "./Kachel_meine.png";
import type { ProjectImages } from "../../types";

export const images: ProjectImages = {
  card: landing,
  logo,
  hero: [landing],
  processFigures: [
    {
      src: tilesOthers,
      alt: "Tiles from other shops",
      caption: { de: "Kacheln anderer Shops", en: "Tiles from other shops" },
      blend: true,
    },
    {
      src: tilesMine,
      alt: "My tiles",
      caption: { de: "Meine Kacheln", en: "My tiles" },
      blend: true,
    },
  ],
  gallery: [logo, landing],
};
