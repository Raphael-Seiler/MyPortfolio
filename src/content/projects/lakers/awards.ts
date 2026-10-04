import type { Award } from "../types";
import { festivalPhoto } from "./images";

export const awards: Award[] = [
  {
    id: "ddf-2026",
    status: "won",
    title: { de: "Digital Design Festival 2026", en: "Digital Design Festival 2026" },
    result: { de: "3. Platz", en: "3rd Place" },
    date: { de: "13. Juli 2026", en: "July 13, 2026" },
    description: {
      de: "Preis der Projektausstellung des BSc Digital Design an der OST, vergeben per Publikumsvoting. Gemeinsam mit Francisco Barbosa, Aaron Bänziger und Andri Vogt.",
      en: "Prize at the BSc Digital Design project exhibition at OST, decided by audience voting. Together with Francisco Barbosa, Aaron Bänziger and Andri Vogt.",
    },
    image: festivalPhoto,
    link: "https://www.ost.ch/de/studium/informatik/bachelor-digital-design/projektausstellung-am-13-juli-2026-1",
  },
  {
    id: "yia-2026",
    status: "nominated",
    title: { de: "Young Innovators Award 2026", en: "Young Innovators Award 2026" },
    result: { de: "Nominiert · Kategorie «Golden Idea»", en: "Nominated · Category “Golden Idea”" },
    date: { de: "11. November 2026", en: "November 11, 2026" },
    description: {
      de: "Aus dem Anwendungsprojekt 3 für den Young Innovators Award der OST nominiert. Eine externe Jury entscheidet, ob wir in der Kategorie «Golden Idea» den 1., 2. oder 3. Platz erreichen. Preisverleihung in der Aula, Campus Rapperswil-Jona.",
      en: "Nominated from Application Project 3 for OST's Young Innovators Award. An external jury will decide whether we place 1st, 2nd or 3rd in the “Golden Idea” category. Award ceremony at the Aula, Campus Rapperswil-Jona.",
    },
    link: "https://www.ost.ch/de/forschung-und-dienstleistungen/informatik/young-innovators-award",
  },
];
