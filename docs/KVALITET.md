# Kontrol af rebuildet — 5. oktober 2026

## Bestået
- Next.js-produktionsbuild og TypeScript strict.
- ESLint uden fejl.
- npm audit: 0 kendte sårbarheder, inklusive udviklingsafhængigheder.
- Alle otte sider svarer 200, har præcis én H1 og indeholder deres centrale tekst i rå HTML.
- Interne links er kontrolleret. Firma, telefon, adresse og CVR er til stede.
- Keystatic og dets API svarer 404 i produktion.
- Formular: 405 for GET, 403 for forkert Origin, 415 for forkert Content-Type, 413 for stor request, 400 for ukendte felter, stille 204 ved honeypot. Uden driftstjenester svarer formularen 503, aldrig falsk succes. Ingen e-mail er sendt under testen.
- Heroens geometri er kontrolleret ved 320, 360, 375, 390, 768, 1024, 1280 og 1440 px. CTA ligger før bundteksten; bundteksten forbliver inden for heroen. Ingen vandret sideoverflow ved disse mål.
- Mobilmenu, FAQ, gallerifilter, billeddialog, næste billede og Escape er afprøvet.
- Visuel gennemgang af desktop- og mobilhero samt udvalgte sektioner og undersider. Alle otte sider er kontrolleret for tekstoverflow og vandret sideoverflow ved alle otte skærmbredder fra 320 til 1440 px. Kontrollerne bestod. Dette er geometriske kontroller suppleret med visuelle stikprøver, ikke en fuld visuel gennemgang af hver sektion ved hver bredde.

## Lighthouse, mobil, lokal produktionsserver
Kørt én ad gangen med devtools-throttling:

| Måling | Resultat |
|---|---|
| Performance | 98 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 69 |
| LCP | 2,1 sek. |
| CLS | 0 |
| Total Blocking Time | 60 ms |

SEO-scoren reduceres af tilsigtet noindex og robots-blokering i preview. Dette er ikke et resultat for et offentligt lanceret domæne. INP kræver reelle brugsdata; TBT er en laboratoriemåling, ikke dokumentation for INP.

## Før offentlig lancering
Vercel-login, e-mail/Redis, domæne, godkendt privatlivspolitik og endelige billedrettigheder. Se BRIEF.md. En reel maillevering, distribueret rate limit og de eksterne strukturerede-data-validatorer er ikke testet mod tilsluttede driftstjenester.
