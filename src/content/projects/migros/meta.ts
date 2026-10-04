import type { ProjectMeta } from "../types";

// TODO: replace the working title with the real project name
export const meta: ProjectMeta = {
  id: "migros",
  title: "Migros",
  tagline: { de: "Umweltbewusst einkaufen", en: "Environmentally aware shopping" },
  description: {
    de: "Eine digitale Lösung, entwickelt in Zusammenarbeit mit der Migros, die das Umweltbewusstsein beim Einkaufen stärkt.",
    en: "A digital solution, developed in collaboration with Migros, that raises environmental awareness while shopping.",
  },
  category: { de: "Kooperation", en: "Collaboration" },
  tags: ["ux", "ui"],
  year: "2026",
  color: "#FF6600",
  stats: [
    { de: "In Zusammenarbeit mit Migros", en: "In collaboration with Migros" },
    { de: "Nachhaltigkeit", en: "Sustainability" },
  ],
};
