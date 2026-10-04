export type Localized<T = string> = { de: T; en: T };

/** A titled paragraph, used for process / result / testing steps. */
export type TitledText = { title: string; desc: string };

/** Card data for the projects overview. */
export interface ProjectMeta {
  /** Also the URL slug: /projects/:id */
  id: string;
  title: string;
  tagline: Localized;
  /** Short text for the overview card. */
  description: Localized;
  category: Localized;
  tags: string[];
  year: string;
  /** Accent color (hex), each design derives its own tints from it */
  color: string;
  stats: Localized[];
}

/** Case-study text for the detail page. Sections left out are not rendered. */
export interface ProjectContent {
  title: Localized;
  subtitle: Localized;
  charter: Localized;
  goal?: Localized;
  process?: Localized<string | TitledText[]>;
  result?: Localized<string | TitledText[]>;
  testing?: Localized<string | TitledText[]>;
  highlight?: Localized;
  reflection?: Localized;
}

export interface ProjectLinks {
  /** Clickable prototype (e.g. Figma) */
  prototype?: string;
  website?: string;
  repo?: string;
}

export interface Figure {
  src: string;
  alt: string;
  caption?: Localized;
  /** Blend away white image backgrounds (product cut-outs). */
  blend?: boolean;
}

export interface ProjectImages {
  /** Image shown on the overview card */
  card: string;
  /** Logo on the detail page */
  logo?: string;
  /** Hero images: one = full width, several = grid */
  hero: string[];
  /** Figures shown below the process text */
  processFigures?: Figure[];
  /** Figure shown next to the highlight text */
  highlightFigure?: Figure;
  /** Images used in the home page carousel */
  gallery: string[];
}

export interface Award {
  id: string;
  status: "won" | "nominated";
  title: Localized;
  /** e.g. "3. Platz" */
  result: Localized;
  date: Localized;
  description: Localized;
  image?: string;
  link: string;
}

export interface Project {
  meta: ProjectMeta;
  content: ProjectContent;
  links: ProjectLinks;
  images: ProjectImages;
  awards: Award[];
}
