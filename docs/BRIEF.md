# Linhave — rebuild

Et arkitektonisk, roligt univers, hvor kundens liv er udgangspunktet. Fortællingen bevæger sig fra hverdagen over husenes former og materialer til processen, kundeoplevelserne og menneskene bag. Originale brandfarver #6FA286 og #414042, originale billeder og Børsen Gazelle 2020.

## Kilder

- Virksomhed, ydelser og proces: https://www.linhave.dk/ samt de oprindelige undersider.
- Anmeldelser: https://dk.trustpilot.com/review/linhave.dk — 4,4/5 fra 10 anmeldelser, hentet 4. oktober 2026. Ét kort ordret uddrag (19 ord) og to tydeligt markerede resuméer. Ikke en live integration.
- CVR 36042605: Proff/CVR-oplysninger. Det registrerede navn er LINHAVE ApS TØMRER & ENTREPENØR.
- Billedkilder og status: public/images/CREDITS.json.

## Afklaringer inden offentlig lancering

- Vercel-login mangler. Ingen live hjemmeside eller DNS er ændret.
- Resend og Upstash skal tilsluttes via .env.local/Vercel. Afsenderdomænet skal verificeres, og en rigtig mailtest skal udføres. Formularen viser fejl, hvis levering ikke er tilsluttet; den lover aldrig, at en ikke-afsendt mail er sendt.
- Adresse: Linhaves hjemmeside og Trustpilot viser Flegebakken 40. En nyere CVR-aggregator viser Toftegårdsvej 28. Flegebakken er bevaret fra den ønskede reference. Bekræft den korrekte besøgs-/registreringsadresse inden lancering.
- Godkend billedrettigheder og brug af mærker hos virksomheden; originale offentliggjorte billeder er genbrugt efter bestilling, men licensen er ikke verificeret.
- Privatlivssiden er en tydeligt mærket previewtekst, ikke en godkendt juridisk politik. Aftaler, behandlingsgrundlag og slettefrister skal fastlægges med de faktiske driftsleverandører.
- Ingen tracking, statistik, marketingcookies eller unødvendige tredjepartsscripts er indsat.

## Teknik

Next.js App Router, TypeScript strict, statisk genereret HTML, Tailwind-designsystem, selvhostet Work Sans, next/image, små interaktive klientkomponenter. Native details til FAQ og dialog til billeder. Bevægelse respekterer reduced motion.

Keystatic er kun tilgængelig lokalt og redigerer forsidens metadata, overskrifter, introduktion og FAQ. Undersider redigeres i content/sider.json. Resterende fortællende tekst er samlet i HomeStory.tsx; fuld CMS-modellering kan udvides ved kundens indholdsoverdragelse.

Chokidar er overstyret til 4.x for at fjerne en sårbar braces-afhængighed i Keystatic. Keystatic bruger direkte mappestier, som understøttes i version 4.
