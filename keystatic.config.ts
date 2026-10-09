import { config, fields, singleton } from "@keystatic/core";
const date = () =>
  fields.date({
    label: "Sidst opdateret",
    description: "Sæt dagens dato, når sidens tekst ændres væsentligt",
    validation: { isRequired: true },
  });
export default config({
  storage: { kind: "local" },
  singletons: {
    forside: singleton({
      label: "Forside",
      path: "content/forside",
      format: "json",
      schema: {
        lastUpdated: date(),
        title: fields.text({ label: "SEO-titel" }),
        description: fields.text({ label: "SEO-beskrivelse", multiline: true }),
        h1: fields.text({ label: "Hovedoverskrift" }),
        intro: fields.text({ label: "Introduktion", multiline: true }),
        h2: fields.array(fields.text({ label: "Overskrift" }), {
          label: "Sektionsoverskrifter",
        }),
        faq: fields.array(
          fields.object({
            q: fields.text({ label: "Spørgsmål" }),
            a: fields.text({ label: "Svar", multiline: true }),
          }),
          { label: "Spørgsmål og svar", itemLabel: (p) => p.fields.q.value },
        ),
      },
    }),
  },
});
