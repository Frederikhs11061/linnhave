export const pages = [
  { path: "/", name: "Forside", slug: "forside", parent: null, index: true },
  {
    path: "/byg-nyt",
    name: "Byg nyt hus",
    slug: "byg-nyt",
    parent: "/",
    index: true,
  },
  {
    path: "/processen",
    name: "Processen",
    slug: "processen",
    parent: "/",
    index: true,
  },
  {
    path: "/inspiration",
    name: "Inspiration",
    slug: "inspiration",
    parent: "/",
    index: true,
  },
  {
    path: "/om-linhave",
    name: "Om Linhave",
    slug: "om-linhave",
    parent: "/",
    index: true,
  },
  {
    path: "/toemrerarbejde",
    name: "Tømrerarbejde",
    slug: "toemrerarbejde",
    parent: "/",
    index: true,
  },
  {
    path: "/kontakt",
    name: "Kontakt",
    slug: "kontakt",
    parent: "/",
    index: true,
  },
  {
    path: "/privatliv",
    name: "Privatliv og cookies",
    slug: "privatliv",
    parent: "/",
    index: false,
  },
] as const;
export const link = (slug: (typeof pages)[number]["slug"]) =>
  pages.find((p) => p.slug === slug)!.path;
export const navPages = pages.filter((p) =>
  [
    "byg-nyt",
    "processen",
    "inspiration",
    "om-linhave",
    "toemrerarbejde",
  ].includes(p.slug),
);
