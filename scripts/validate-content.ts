import { homeSchema, pictures } from "../src/lib/content";
import home from "../content/forside.json";
import pages from "../content/sider.json";
import { z } from "zod";
import { existsSync } from "node:fs";
try {
  homeSchema.parse(home);
  const schema = z
    .object({
      lastUpdated: z.iso
        .date()
        .refine((v) => v <= new Date().toISOString().slice(0, 10)),
      title: z.string().min(20).max(80),
      description: z.string().min(100).max(180),
      h1: z.string().min(1).max(120),
      intro: z.string().min(1),
      image: z.enum(
        Object.keys(pictures) as [
          keyof typeof pictures,
          ...(keyof typeof pictures)[],
        ],
      ),
      sections: z.array(
        z
          .object({ title: z.string().min(1), text: z.string().min(1) })
          .strict(),
      ),
    })
    .strict();
  for (const [name, p] of Object.entries(pages)) {
    const result = schema.safeParse(p);
    if (!result.success) throw Error(`${name}: ${result.error.message}`);
  }
  for (const p of Object.values(pictures)) {
    if (!existsSync("public" + p)) throw Error(`Billede mangler: ${p}`);
  }
  console.log("Indhold, datoer og billeder er valideret.");
} catch (error) {
  console.error("Indholdsfejl: Ret indholdsfilen før bygning.", error);
  process.exit(1);
}
