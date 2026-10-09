import { ProcessStory, AboutStory, CarpentryStory } from "@/components/features/VisualStories";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import data from "../../../content/sider.json";
import { pictures, settings } from "@/lib/content";
import { pages, link } from "@/lib/pages";
import { Photo, ContactBand, Breadcrumb } from "@/components/features/Shared";
import Gallery from "@/components/features/Gallery";
import ContactForm from "@/components/features/ContactForm";
import { JsonLd } from "@/components/features/JsonLd";
export const dynamic = "force-static";
export const dynamicParams = false;
type Slug = keyof typeof data;
export function generateStaticParams() {
  return Object.keys(data).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = data[slug as Slug];
  if (!content) return {};
  return {
    title: { absolute: content.title },
    description: content.description,
    alternates: { canonical: pages.find((p) => p.slug === slug)?.path },
    ...(slug === "privatliv"
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}
const gallery = [
  {
    src: pictures.exterior,
    alt: "Toetages murstenshus med store vinduespartier",
    title: "Lys, luft og lange linjer",
    category: "Arkitektur",
  },
  {
    src: pictures.hero,
    alt: "Etplanshus i lyse mursten med store glaspartier",
    title: "Haven helt tæt på",
    category: "Arkitektur",
  },
  {
    src: pictures.kitchen,
    alt: "Køkken med mørke fronter og et varmt træloft",
    title: "Et samlingssted i hverdagen",
    category: "Indretning",
  },
  {
    src: pictures.detail,
    alt: "Murstenspejs og blå lænestol",
    title: "Et roligt hjørne",
    category: "Detaljer",
  },
  {
    src: pictures.house,
    alt: "Moderne hus i mursten med altan og have",
    title: "Udsigt fra flere vinkler",
    category: "Arkitektur",
  },
  {
    src: pictures.living,
    alt: "Stue med sofa og store vinduer",
    title: "Rum til at være sammen",
    category: "Indretning",
  },
  {
    src: pictures.brick,
    alt: "Nærbillede af mursten i varierede grå nuancer",
    title: "Materialer med karakter",
    category: "Detaljer",
  },
  {
    src: pictures.dining,
    alt: "Spiseplads med pejs i murstensvæg",
    title: "Varme omkring bordet",
    category: "Indretning",
  },
];
export default async function Subpage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(slug in data)) notFound();
  const content = data[slug as Slug];
  const name = pages.find((p) => p.slug === slug)!.name;
  const isContact = slug === "kontakt";
  const isLegal = slug === "privatliv";
  return (
    <main id="indhold">
      <JsonLd slug={slug as Slug} />
      <section className={`sub-hero wrap ${isContact ? "contact-title" : ""}`}>
        <Breadcrumb name={name} />
        <p className="eyebrow">
          {name}{" "}
          {slug === "byg-nyt" || slug === "toemrerarbejde"
            ? "· Østjylland"
            : ""}
        </p>
        <h1>{content.h1}</h1>
        <p className="sub-intro">{content.intro}</p>
      </section>
      {slug === "inspiration" ? (
        <section className="wrap gallery-section">
          <Gallery items={gallery} />
        </section>
      ) : isContact ? (
        <section className="wrap contact-layout">
          <div className="contact-details">
            <div className="person-card">
              <Image
                src={pictures.julius}
                alt="Julius Linhave"
                width={170}
                height={170}
              />
              <h2>Julius Linhave</h2>
              <p>Ejer & direktør</p>
              <a href={`tel:${settings.phoneLink}`} className="large-phone">
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
            <address>
              {settings.address}
              <br />
              {settings.city}
            </address>
            <p className="contact-note">Et byggemøde er uforpligtende.</p>
          </div>
          <ContactForm />
        </section>
      ) : (
        <>
          {!isLegal && (
            <div className="wrap sub-photo">
              <Photo
                src={pictures[content.image as keyof typeof pictures]}
                alt={
                  gallery.find(
                    (i) =>
                      i.src ===
                      pictures[content.image as keyof typeof pictures],
                  )?.alt || "Detaljer fra et hjem bygget af Linhave"
                }
                priority
              />
            </div>
          )}
          {slug === "processen" ? <ProcessStory sections={content.sections} /> : slug === "om-linhave" ? <AboutStory sections={content.sections} /> : slug === "toemrerarbejde" ? <CarpentryStory sections={content.sections} /> : <section
            className={`wrap section content-sections ${isLegal ? "legal" : ""}`}
          >
            {content.sections.map((s, i) => (
              <article key={s.title} className="content-chapter" data-reveal>
                <span className="chapter-number">0{i + 1}</span>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </article>
            ))}
          </section>}
          {slug === "om-linhave" && (
            <section className="wrap team-section">
              <h2>Dem, I møder.</h2>
              <div className="team-grid">
                {[
                  {
                    name: "Julius Linhave",
                    role: "Ejer & direktør",
                    image: pictures.julius,
                    phone: settings.phone,
                    href: settings.phoneLink,
                  },
                  {
                    name: "Peter Sabroe Pedersen",
                    role: "Byggeleder",
                    image: pictures.peter,
                    phone: "26 78 86 16",
                    href: "+4526788616",
                  },
                ].map((p) => (
                  <article key={p.name}>
                    <Photo src={p.image} alt={p.name} />
                    <h3>{p.name}</h3>
                    <p>{p.role}</p>
                    <a href={`tel:${p.href}`}>{p.phone}</a>
                  </article>
                ))}
              </div>
            </section>
          )}
          {slug === "byg-nyt" && (
            <div className="wrap related-link">
              <Link href={link("processen")} className="text-link">
                Se hele vejen fra idé til indflytning
              </Link>
            </div>
          )}
        </>
      )}
      {!isContact && !isLegal && <ContactBand />}
    </main>
  );
}
