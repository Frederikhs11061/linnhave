import ProcessJourney from "./ProcessJourney";
import Image from "next/image";
import Link from "next/link";
import { Photo, ContactBand } from "./Shared";
import { home, pictures, settings } from "@/lib/content";
import { link } from "@/lib/pages";
export default function HomeStory() {
  return (
    <>
      <section className="editorial-images wrap" data-reveal>
        <Photo
          className="editorial-main"
          src={pictures.kitchen}
          alt="Køkken og spiseplads med træloft og store vinduer"
        />
        <div className="editorial-side">
          <Photo
            src={pictures.detail}
            alt="Pejs i mursten ved siden af en blå lænestol"
          />
          <p>
            Rum til hverdag.
            <br />
            Detaljer til at holde af.
          </p>
        </div>
      </section>
      <section className="projects section wrap" data-reveal>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Hjem, der allerede leves i</p>
            <h2>{home.h2[1]}</h2>
          </div>
          <Link className="text-link" href={link("inspiration")}>
            Se mere inspiration
          </Link>
        </div>
        <div className="project-grid">
          <Link className="project" href={link("inspiration")}>
            <Photo
              src={pictures.exterior}
              alt="Moderne toetages murstenshus med høje vinduespartier"
            />
            <div>
              <h3>Lys, luft og lange linjer</h3>
              <p>Arkitektur med plads til udsigten</p>
              <span className="project-number">01</span>
            </div>
          </Link>
          <Link className="project" href={link("inspiration")}>
            <Photo
              src={pictures.hero}
              alt="Etplanshus med store glaspartier mod haven"
            />
            <div>
              <h3>Tættere på haven</h3>
              <p>Når inde og ude mødes</p>
              <span className="project-number">02</span>
            </div>
          </Link>
        </div>
      </section>
      <section className="process-section">
        <div className="wrap section process-layout">
          <div className="process-intro">
            <p className="eyebrow">En tryg vej fra idé til indflytning</p>
            <h2>{home.h2[2]}</h2>
            <p>
              Vi samler trådene, så I kan se frem til det, det hele handler om:
              at komme hjem.
            </p>
            <Link className="button" href={link("processen")}>
              Lær byggeprocessen at kende
            </Link>
            <Image
              className="gazelle"
              src="/images/logo/gazelle2020-logo_RGB_negativ.png"
              width={160}
              height={89}
              alt="Børsen Gazelle 2020"
            />
          </div>
          <ProcessJourney />
        </div>
      </section>
      <section className="reviews section wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Ord fra dem, vi har bygget for</p>
            <h2>{home.h2[3]}</h2>
          </div>
          <a className="review-score" href={settings.trustpilot.url} target="_blank" rel="noreferrer">
            <Image
              className="trustpilot-logo"
              src="/images/logo/trustpilot-official.svg"
              alt="Trustpilot"
              width={140}
              height={34}
            />
            <p>
              {settings.trustpilot.score} ud af 5
            </p>
          </a>
        </div>
        <div className="review-grid">
          <article className="review-feature" data-reveal>
            <p className="review-kicker">Tryghed gennem hele forløbet</p>
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              Hele vejen igennem byggeprocessen var vi meget trygge.
              <br />
              Huset blev leveret til aftalt tid og budget.
            </blockquote>
            <div className="review-by">
              <span>Michael Holst</span>
              <span>Totalrenovering · 14. september 2024</span>
            </div>
            <a
              className="text-link"
              href="https://dk.trustpilot.com/reviews/66e5334e4d27fc804a086636"
              target="_blank"
              rel="noreferrer"
            >
              Læs hele anmeldelsen
            </a>
          </article>
          <div className="review-notes">
            <article data-reveal>
              <p className="review-rating" aria-label="5 ud af 5 stjerner">
                5 / 5
              </p>
              <h3>En partner til boligdrømmen</h3>
              <p>
                Camilla fremhæver kvaliteten og servicen gennem forløbet, efter
                at familien havde brugt god tid på at vælge byggefirma.
              </p>
              <a
                href="https://dk.trustpilot.com/reviews/65bb4c07c188040b904de555"
                target="_blank"
                rel="noreferrer"
              >
                Camilla Bergholdt · 1. februar 2024
              </a>
              <span className="review-label">Resumé af anmeldelse</span>
            </article>
            <article data-reveal>
              <p className="review-rating" aria-label="5 ud af 5 stjerner">
                5 / 5
              </p>
              <h3>Plads til idéer og god dialog</h3>
              <p>
                Stine og Jesper beskriver et samarbejde med lydhørhed over for
                deres ønsker, løbende information og omhu i udførelsen.
              </p>
              <a
                href="https://dk.trustpilot.com/reviews/65242d8ae3025001ce88e868"
                target="_blank"
                rel="noreferrer"
              >
                Jesper Thomsen · 9. oktober 2023
              </a>
              <span className="review-label">Resumé af anmeldelse</span>
            </article>
          </div>
        </div>
        <div className="review-foot">
          <span>Udvalgt uddrag og resuméer. Score hentet 4. oktober 2026.</span>
          <a
            href={settings.trustpilot.url}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            Læs alle anmeldelser på Trustpilot
          </a>
        </div>
      </section>
      <section className="people-section wrap" data-reveal>
        <div className="people-photo">
          <Photo src={pictures.julius} alt="Julius Linhave, ejer og direktør" />
          <span>Julius Linhave · Grundlægger</span>
        </div>
        <div className="people-copy">
          <p className="eyebrow">Menneskene bag Linhave</p>
          <h2>{home.h2[4]}</h2>
          <p>
            Da Julius grundlagde Linhave i 2014, begyndte det med håndværket.
            Den tilgang tager vi stadig med ind i hvert eneste hjem.
          </p>
          <p>
            Vi møder jer i øjenhøjde, taler åbent om mulighederne og er med, når
            detaljerne skal falde på plads. For tillid bliver bygget længe før
            den første mursten lægges.
          </p>
          <Link className="text-link" href={link("om-linhave")}>
            Mød Linhave
          </Link>
        </div>
      </section>
      <section className="faq section wrap" data-reveal>
        <div>
          <p className="eyebrow">Inden vi mødes</p>
          <h2>{home.h2[5]}</h2>
        </div>
        <div>
          {home.faq.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
