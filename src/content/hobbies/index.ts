import type { Localized } from "../projects/types";
import cars from "./images/cars.webp";
import fishing from "./images/fishing.webp";
import golf from "./images/golf.webp";
import hiking from "./images/hiking.webp";
import mtb from "./images/mtb.webp";
import skiing from "./images/skiing.webp";

export interface Hobby {
  id: string;
  title: Localized;
  text: Localized;
  image: string;
  alt: Localized;
}

/** Hobbies in display order. Images: portrait photos, about 1600px tall, WebP. */
export const hobbies: Hobby[] = [
  {
    id: "cars",
    title: { de: "Autos", en: "Cars" },
    text: { de: "Ich bin ein leidenschaftlicher Autofanatiker.", en: "I'm a passionate car enthusiast." },
    image: cars,
    alt: { de: "Ein roter Ferrari F40 in einer Ausstellung", en: "A red Ferrari F40 at an exhibition" },
  },
  {
    id: "fishing",
    title: { de: "Fischen", en: "Fishing" },
    text: { de: "Ich gehe gerne fischen.", en: "I enjoy fishing." },
    image: fishing,
    alt: { de: "Raphaël mit einem gefangenen Fisch am Flussufer", en: "Raphaël holding a fish he caught by the river" },
  },
  {
    id: "hiking",
    title: { de: "Wandern", en: "Hiking" },
    text: { de: "Ich bin gerne in den Bergen unterwegs.", en: "I love being out in the mountains." },
    image: hiking,
    alt: { de: "Raphaël beim Wandern in den Bergen", en: "Raphaël hiking in the mountains" },
  },
  {
    id: "mtb",
    title: { de: "Mountainbike", en: "Mountain biking" },
    text: { de: "Ich fahre gerne Mountainbike.", en: "I enjoy mountain biking." },
    image: mtb,
    alt: { de: "Raphaël mit dem Mountainbike auf einer Holzbrücke in den Bergen", en: "Raphaël with his mountain bike on a wooden bridge in the mountains" },
  },
  {
    id: "golf",
    title: { de: "Golf", en: "Golf" },
    text: { de: "Ich spiele gerne Golf.", en: "I like playing golf." },
    image: golf,
    alt: { de: "Raphaël beim Abschlag auf dem Golfplatz", en: "Raphaël teeing off on a golf course" },
  },
  {
    id: "skiing",
    title: { de: "Skifahren", en: "Skiing" },
    text: { de: "Im Winter fahre ich gerne Ski.", en: "In winter I love to ski." },
    image: skiing,
    alt: { de: "Raphaël auf der Skipiste", en: "Raphaël on the ski slope" },
  },
];
