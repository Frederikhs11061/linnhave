import Link from "next/link";
import Image from "next/image";
import HomeStory from "@/components/features/HomeStory";
import { JsonLd } from "@/components/features/JsonLd";
import { Photo } from "@/components/features/Shared";
import { home, settings, pictures } from "@/lib/content";
import { link } from "@/lib/pages";
export const dynamic = "force-static";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <main id="indhold">
      <JsonLd slug="forside" />
      <section className="hero">
        <Photo
          src={pictures.hero}
          alt="Arkitekttegnet hus med brede glaspartier, lys murstensfacade og have"
          priority
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Arkitekttegnede huse i Østjylland</p>
          <h1>
            <span>{home.h1.split(" begynder")[0]} </span>
            <span>begynder{home.h1.split(" begynder")[1]}</span>
          </h1>
          <p>
            Ikke to familier er ens.
            <br />
            Det skal deres hjem heller ikke være.
          </p>
          <div className="hero-actions">
            <Link href={link("byg-nyt")} className="button">
              Find jeres vej hjem
            </Link>
            <Link href={link("inspiration")} className="text-link light">
              Gå på opdagelse
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>Fra første streg til første dag hjemme.</span>
          <a href="#jeres-hjem">
            Historien begynder her <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <div className="trust-strip wrap">
        <a href={settings.trustpilot.url} target="_blank" rel="noreferrer">
          <Image
            className="trustpilot-logo"
            src="/images/logo/trustpilot-official.svg"
            alt="Trustpilot"
            width={112}
            height={28}
          />
          <span>
            <b>{settings.trustpilot.score}</b> / 5
          </span>
        </a>
        <span className="trust-divider" />
        <span>Et personligt hjem. En personlig proces.</span>
        <span className="trust-divider" />
        <span>
          Medlem af <strong>Byg Garanti</strong>
        </span>
      </div>
      <section id="jeres-hjem" className="intro wrap section" data-reveal>
        <div>
          <p className="eyebrow">Livet først. Huset bagefter.</p>
          <h2>{home.h2[0]}</h2>
        </div>
        <div className="intro-copy">
          <p>{home.intro}</p>
          <p>
            Hos Linhave begynder vi med at lytte. Til jeres vaner, jeres ønsker
            og det, I endnu ikke helt har sat ord på. Så skaber vi et
            arkitekttegnet hjem, der passer til jer og til stedet.
          </p>
          <Link className="text-link" href={link("byg-nyt")}>
            Et hus på jeres præmisser
          </Link>
        </div>
      </section>
      <HomeStory />
    </main>
  );
}
