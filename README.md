# Linhave

Et komplet visuelt rebuild med otte sider, originale billeder, Trustpilot-kilder, galleri og kontaktflow.

```sh
npm install
npm run dev
```

Produktionskontrol:

```sh
npm run lint
npm run build
npm start -- --port 3001
npm run check
```

Læs docs/BRIEF.md for kilder og de tilslutninger, der mangler inden offentlig lancering. Vercel kan importere projektet direkte som Next.js. Kopiér .env.example til .env.local og tilføj værdier uden at lægge hemmeligheder i versionsstyring.
