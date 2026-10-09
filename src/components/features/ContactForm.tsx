"use client";
import { useState } from "react";
import Link from "next/link";
import { link } from "@/lib/pages";
import { contactSchema } from "@/lib/contact";
export default function ContactForm() {
  const [state, setState] = useState<"idle" | "busy" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  return (
    <form
      className="contact-form"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const parsed = contactSchema.safeParse(Object.fromEntries(data));
        if (!parsed.success) { setState("error"); setMessage("Tjek felterne. Skriv navn, gyldig e-mail og mindst 10 tegn i beskeden."); return; }
        setState("busy");
        try {
          const response = await fetch("/api/kontakt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
          });
          if (!response.ok) throw new Error();
          setState("success");
          setMessage("Tak for jeres besked. Vi vender tilbage til jer.");
          form.reset();
        } catch {
          setState("error");
          setMessage(
            "Beskeden kunne ikke sendes. Ring på 22 77 88 54, eller skriv til kontakt@linhave.dk.",
          );
        }
      }}
    >
      <div className="form-row">
        <label>
          Jeres navn
          <input
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            placeholder="Navn"
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            name="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="jer@eksempel.dk"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Telefon <span>(valgfrit)</span>
          <input
            type="tel"
            name="phone"
            maxLength={30}
            autoComplete="tel"
            placeholder="Telefonnummer"
          />
        </label>
        <label>
          Hvad drømmer I om?
          <select name="subject">
            <option>Et nyt hjem</option>
            <option>Renovering eller tømrerarbejde</option>
            <option>En indledende snak</option>
          </select>
        </label>
      </div>
      <label>
        Fortæl os lidt om jeres tanker
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Har I en grund, en skitse eller nogle ønsker til jeres hjem?"
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Virksomhed
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-privacy">
        Vi bruger oplysningerne til at besvare jeres henvendelse.{" "}
        <Link href={link("privatliv")}>Læs om privatliv.</Link>
      </p>
      <button className="button" disabled={state === "busy"}>
        {state === "busy" ? "Sender …" : "Send jeres henvendelse"}
      </button>
      <p role="status" className={`form-status ${state}`}>
        {message}
      </p>
    </form>
  );
}
