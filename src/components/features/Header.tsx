"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { link, navPages } from "@/lib/pages";
import settings from "../../../content/indstillinger.json";
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="announcement" aria-label="Kontaktoplysninger">
        <a href={`tel:${settings.phoneLink}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.6 10.8a15.4 15.4 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z" />
          </svg>
          {settings.phone}
        </a>
        <a href={`mailto:${settings.email}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 5h18v14H3z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path
              d="m3 6 9 7 9-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
          {settings.email}
        </a>
        <span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          {settings.address}, {settings.city}
        </span>
      </div>
      <div className="header-inner">
        <Link
          href={link("forside")}
          className="logo"
          aria-label="Linhave – forsiden"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo/Logo-hjemmeside-1.png"
            alt="Linhave"
            width={175}
            height={45}
            priority
          />
        </Link>
        <nav aria-label="Hovedmenu" className="desktop-nav">
          {navPages.map((p) => (
            <Link
              key={p.path}
              href={p.path}
              aria-current={path === p.path ? "page" : undefined}
            >
              {p.name}
            </Link>
          ))}
        </nav>
        <Link href={link("kontakt")} className="button header-cta">
          Lad os tale om jeres hjem
        </Link>
        <button
          className="menu-button"
          aria-label={open ? "Luk menu" : "Åbn menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Luk" : "Menu"}
          <span className={open ? "menu-lines active" : "menu-lines"}>
            <i />
            <i />
          </span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobilmenu"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {navPages.map((p) => (
            <Link key={p.path} href={p.path} onClick={() => setOpen(false)}>
              {p.name}
            </Link>
          ))}
          <Link href={link("kontakt")} onClick={() => setOpen(false)}>
            Book et byggemøde
          </Link>
          <a href="tel:+4522778854">22 77 88 54</a>
        </nav>
      )}
    </header>
  );
}
