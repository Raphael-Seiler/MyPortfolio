import type { Award, Project } from "./types";
import { spryte } from "./spryte";
import { fishing } from "./fishing";
import { lakers } from "./lakers";

export type { Project, Award, Localized, TitledText, Figure } from "./types";

/** All projects, in display order (first = featured). To add a project, copy a project folder and list it here. */
export const projects: Project[] = [spryte, fishing, lakers];

export const getProject = (id: string) => projects.find((p) => p.meta.id === id);

/** Every award with the project it belongs to. */
export const allAwards: { award: Award; project: Project }[] = projects.flatMap((project) =>
  project.awards.map((award) => ({ award, project })),
);
