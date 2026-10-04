import { experiences } from "./experience";
import { allAwards } from "./projects";

/** One station of the CV timeline (job, school or award). */
export interface TimelineEntry {
  id: string;
  role: string;
  roleEn: string;
  company: string;
  companyEn: string;
  period: string;
  periodEn: string;
  description: string;
  descriptionEn: string;
  details?: string;
  detailsEn?: string;
  /** Set for awards: shown with a medal/star and a link. */
  award?: { status: "won" | "nominated"; link: string };
}

/** CV entries followed by the awards (in the order of the project awards). */
export const timeline: TimelineEntry[] = [
  ...experiences,
  ...allAwards.map(({ award, project }): TimelineEntry => ({
    id: award.id,
    role: `${award.title.de} – ${award.result.de}`,
    roleEn: `${award.title.en} – ${award.result.en}`,
    company: project.content.title.de,
    companyEn: project.content.title.en,
    period: award.date.de,
    periodEn: award.date.en,
    description: award.description.de,
    descriptionEn: award.description.en,
    award: { status: award.status, link: award.link },
  })),
];
