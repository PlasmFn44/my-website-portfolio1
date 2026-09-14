/**
 * Single source of truth for every outbound link on the site.
 * Update a URL here and it changes everywhere: nav, hero, cards, dock, footer.
 */
export const LINKS = {
  youtube: "https://www.youtube.com/@PlasmFN",
  x: "https://x.com/PlasmFnYT",
  instagram: "https://www.instagram.com/plasmfnyt/",
  discord: "https://discord.gg/NFVujeph8z",
} as const;

/** Short, human-readable handles shown in the UI. */
export const HANDLES = {
  youtube: "@PlasmFN",
  x: "@PlasmFnYT",
  instagram: "@plasmfnyt",
  discord: "discord.gg/NFVujeph8z",
} as const;

export const VIDEO_ID = "fzaqqerv9vU";
export const VIDEO_URL = `https://youtu.be/${VIDEO_ID}`;
export const VIDEO_EMBED = `https://www.youtube.com/embed/${VIDEO_ID}?rel=0`;
export const VIDEO_THUMB = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
export const VIDEO_THUMB_FALLBACK = `https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`;

// No JavaScript navigation is used for external links.
// Every outbound link is a plain <a href="..." target="_blank">
// so the browser opens it exactly once, in a new tab.
