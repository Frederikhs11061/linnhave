# Redigering

Start lokalt med `npm install` og `npm run dev`. Åbn http://localhost:3000. Forsidens redigeringsværktøj findes på http://localhost:3000/keystatic og er slået fra i produktion.

- Firmaoplysninger: content/indstillinger.json.
- Forsidens metadata, overskrifter, introduktion og FAQ: content/forside.json.
- Undersidernes tekster og datoer: content/sider.json.
- Forsidens øvrige fortællende tekst: src/components/features/HomeStory.tsx.
- Navigation og sidehierarki: src/lib/pages.ts. Opdatér docs/STRUKTUR.md ved nye sider.
- Farver, font, radier og skygger: tailwind.config.ts.
- Fotos: public/images. Bevar kildeoplysninger i CREDITS.json ved udskiftning.

Datoen lastUpdated ændres ved væsentlige indholdsændringer, ikke ved en ny bygning eller en lille designrettelse. Bygningen validerer datoer, tekster og nødvendige billeder. Preview er med vilje noindex og har tomt sitemap. Ved lancering sættes SITE_INDEXABLE=true og NEXT_PUBLIC_SITE_URL til det korrekte domæne.

Trustpilot-tal er et øjebliksbillede. Opdatér score, antal og checked sammen efter kontrol på den eksterne profil. Kundeuddrag må ikke omskrives som citater.
