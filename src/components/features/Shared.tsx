import Image from "next/image";
import Link from "next/link";
import { settings, pictures } from "@/lib/content";
import { pages, link } from "@/lib/pages";
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 80vw, 1400px"
        quality={70}
        priority={priority}
      />
    </div>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band wrap" data-reveal>
      <div>
        <p className="eyebrow">Jeres næste kapitel</p>
        <h2>
          Lad os begynde
          <br />
          med jeres idéer.
        </h2>
        <p>
          En byggegrund, en skitse eller bare en tanke.
          <br />
          Vi tager gerne den første snak.
        </p>
        <Link className="button" href={link("kontakt")}>
          Book et uforpligtende byggemøde
        </Link>
      </div>
      <div className="contact-person">
        <Image
          src={pictures.julius}
          width={130}
          height={130}
          alt="Julius Linhave"
        />
        <div>
          <strong>Julius Linhave</strong>
          <span>Ejer & direktør</span>
          <a href={`tel:${settings.phoneLink}`}>{settings.phone}</a>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="wrap footer-main">
        <div>
          <Link href={link("forside")}>
            <Image
              className="footer-logo"
              src="/images/logo/Logo-hjemmeside-1.png"
              width={210}
              height={54}
              alt="Linhave"
            />
          </Link>
          <p>
            Hjem med plads til livet.
            <br />
            Tegnet og bygget i Østjylland.
          </p>
        </div>
        <div>
          <h2>Gå på opdagelse</h2>
          {pages
            .filter((p) => p.index && p.path !== "/")
            .map((p) => (
              <Link key={p.path} href={p.path}>
                {p.name}
              </Link>
            ))}
        </div>
        <div>
          <h2>Vi tager gerne en snak</h2>
          <a href={`tel:${settings.phoneLink}`}>{settings.phone}</a>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
          <address>
            {settings.legalName}
            <br />
            {settings.address}
            <br />
            {settings.city}
            <br />
            CVR {settings.cvr}
          </address>
        </div>
        <div className="footer-gazelle">
          <Image
            src="/images/logo/gazelle2020-logo_RGB_negativ.png"
            width={160}
            height={89}
            alt="Børsen Gazelle 2020"
          />
          <span>Medlem af Byg Garanti</span>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Linhave</span>
        <Link href={link("privatliv")}>Privatliv & cookies</Link>
        <a href={settings.trustpilot.url} target="_blank" rel="noreferrer">
          Linhave på Trustpilot
        </a>
      </div>
    </footer>
  );
}
export function Breadcrumb({ name }: { name: string }) {
  return (
    <div className="breadcrumb">
      <Link href={link("forside")}>Forside</Link>
      <span>/</span>
      <span>{name}</span>
    </div>
  );
}
