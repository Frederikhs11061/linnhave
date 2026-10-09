import { z } from "zod";
import homeData from "../../content/forside.json";
import settingsData from "../../content/indstillinger.json";
export const homeSchema = z
  .object({
    lastUpdated: z.iso
      .date()
      .refine(
        (v) => v <= new Date().toISOString().slice(0, 10),
        "Dato må ikke ligge i fremtiden",
      ),
    title: z.string().min(20).max(70),
    description: z.string().min(100).max(170),
    h1: z.string().min(1).max(100),
    intro: z.string().min(1),
    h2: z.array(z.string().min(1)),
    faq: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })),
  })
  .strict();
export const home = homeSchema.parse(homeData);
export const settings = z
  .object({
    name: z.string(),
    legalName: z.string(),
    cvr: z.string(),
    phone: z.string(),
    phoneLink: z.string(),
    email: z.email(),
    address: z.string(),
    city: z.string(),
    area: z.string(),
    founder: z.string(),
    founded: z.string(),
    trustpilot: z.object({
      url: z.url(),
      score: z.string(),
      count: z.number(),
      checked: z.iso.date(),
    }),
  })
  .strict()
  .parse(settingsData);
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const indexable = process.env.SITE_INDEXABLE === "true";
export const pictures = {
  hero: "/images/Seglager-53-kopier-scaled.jpg",
  exterior: "/images/Seglager-12-op-himmel-2-scaled.jpg",
  house: "/images/DSC_2614-NY-A-scaled.jpg",
  living: "/images/DSC_2482_edit.jpg",
  kitchen: "/images/DSC_2510_edit.jpg",
  detail: "/images/DSC_0225_edit.jpg",
  brick: "/images/DSC_0119_edit-1536x1024.jpg",
  dining: "/images/DSC_2557_edit.jpg",
  julius: "/images/Julius-kopier-2.jpg",
  peter: "/images/Peter-5-scaled.jpg",
};
