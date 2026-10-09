import Image from "next/image";
import { Photo } from "./Shared";
import { pictures } from "@/lib/content";
import ProcessJourney from "./ProcessJourney";

type Chapter = { title: string; text: string };
export function ProcessStory({ sections }: { sections: Chapter[] }) {
  const labels = ["Samtalen", "Arkitekturen", "Detaljerne", "Byggeriet", "Indflytningen"];
  const captions = ["Vi begynder med jer.", "Fra tanker til plantegning.", "Hver detalje får sin plads.", "Håndværket giver tegningen liv.", "Velkommen hjem."];
  return <section className="process-page-story wrap section">
    <div className="visual-section-heading" data-reveal><p className="eyebrow">Overblik hele vejen</p><h2>Se jeres hjem tage form.</h2><p>Fra den første samtale til den dag, I åbner døren. Følg de fem kapitler her.</p></div>
    <ProcessJourney detailed items={sections.map((s,i)=>({...s,label:labels[i],caption:captions[i],stage:[0,1,4,2,3][i]}))} />
  </section>;
}
function CraftDrawing({ kind }: { kind: "roof" | "kitchen" | "join" }) {
  return <svg className="craft-drawing" viewBox="0 0 400 240" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {kind === "roof" ? <><path d="M65 130L200 48L335 130M84 130L200 60L316 130M102 124V212H298V124M200 60V212M65 216H335"/><path d="M128 108L200 151L274 105M152 94L200 180L250 92M102 151H298M103 178H298"/><path className="craft-accent" d="M55 109L200 21L345 109M55 100V117M345 100V117"/></> : kind === "kitchen" ? <><path d="M58 104H342V202H58ZM58 140H342M122 104V202M203 104V202M275 104V202M50 97H351V105H50ZM68 35H176V82H68ZM230 35H333V82H230M121 35V82M281 35V82"/><path d="M74 120H104M143 120H182M222 120H255M294 120H323M144 161H182V190H144"/><path className="craft-accent" d="M227 97V71C227 55 250 55 250 71V78M220 92H259M58 216H342"/></> : <><path d="M66 83L184 47L329 89L210 129ZM66 83V118L210 164L329 124V89M66 132L210 178L329 139M66 147V179L210 226L329 185V154M210 129V164M210 178V226"/><path className="craft-accent" d="M121 100L155 90L197 103L231 94L273 108M120 182L157 170L196 183L235 172L276 187"/></>}
  </g></svg>;
}
export function AboutStory({ sections }: { sections: Chapter[] }) {
  return <section className="about-story wrap section">
    <article className="founder-story" data-reveal>
      <div className="founder-portrait"><Photo src={pictures.julius} alt="Julius Linhave, grundlægger"/><span>Julius Linhave · Grundlægger</span></div>
      <div><p className="eyebrow">Rødder i håndværket</p><span className="founding-year">2014</span><h2>{sections[0].title}</h2><p>{sections[0].text}</p></div>
    </article>
    <article className="closeness-story" data-reveal><div><p className="eyebrow">Mennesker før mursten</p><h2>{sections[1].title}</h2><p>{sections[1].text}</p><div className="connection-diagram" aria-label="Et samarbejde mellem jer, Linhave og håndværkerne"><span>Jeres idéer</span><i aria-hidden="true"/><strong>Linhave</strong><i aria-hidden="true"/><span>Jeres hjem</span></div></div><Photo src={pictures.dining} alt="Lys spiseplads med en muret pejs i et Linhave-hjem"/></article>
    <article className="craft-promise" data-reveal><div className="craft-visual"><CraftDrawing kind="join"/><span>Arkitektur · Materialer · Håndværk</span></div><div><p className="eyebrow">Omtanke i alle led</p><h2>{sections[2].title}</h2><p>{sections[2].text}</p><div className="promise-marks"><Image src="/images/logo/gazelle2020-logo_RGB_negativ.png" width={140} height={78} alt="Børsen Gazelle 2020"/><span>Medlem af<br/><strong>Byg Garanti</strong></span></div></div></article>
  </section>;
}
export function CarpentryStory({ sections }: { sections: Chapter[] }) {
  return <section className="carpentry-story wrap section">
    <article className="renovation-intro" data-reveal><div><p className="eyebrow">Bevar det gode. Skab nye muligheder.</p><h2>{sections[0].title}</h2><p>{sections[0].text}</p></div><div className="material-photo"><Photo src={pictures.brick} alt="Mursten med levende struktur og grå nuancer"/><span>Materialer med karakter</span></div></article>
    <div className="visual-section-heading" data-reveal><p className="eyebrow">Håndværk, der hænger sammen</p><h2>{sections[1].title}</h2><p>{sections[1].text}</p></div>
    <div className="craft-services">
      <article data-reveal><div className="service-art"><CraftDrawing kind="roof"/></div><span>01 / Husets ramme</span><h3>Et godt tag over hverdagen.</h3><p>Tagrenovering med blik for husets helhed.</p></article>
      <article data-reveal><Photo src={pictures.kitchen} alt="Køkken med mørke fronter og træloft"/><span>02 / Hjemmets samlingssted</span><h3>Rum til hverdagens liv.</h3><p>Køkkenmontering, hvor detaljerne mødes.</p></article>
      <article data-reveal><div className="service-art"><CraftDrawing kind="join"/></div><span>03 / Nyt og eksisterende</span><h3>Et hjem i sammenhæng.</h3><p>Større renoveringer med omtanke for det, der er.</p></article>
    </div>
    <article className="renovation-agreement" data-reveal><div className="agreement-art"><CraftDrawing kind="kitchen"/></div><div><p className="eyebrow">Før vi finder værktøjet frem</p><h2>{sections[2].title}</h2><p>{sections[2].text}</p><div className="agreement-tags"><span>Jeres ønsker</span><span>Fælles overblik</span><span>En klar aftale</span></div></div></article>
  </section>;
}
