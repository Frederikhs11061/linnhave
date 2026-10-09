"use client";

import { useEffect, useRef, useState, useId } from "react";

const steps = [
  { label: "Samtalen", title: "Først lærer vi jer at kende", text: "Vi taler om jeres hverdag, grund og ønsker. Og om økonomien, der skal få det hele til at hænge sammen.", caption: "Jeres ønsker bliver vores udgangspunkt." },
  { label: "Tegningen", title: "Så giver vi drømmene form", text: "Sammen med arkitekten finder vi husets linjer, rum og materialer. Alt bliver tilpasset jer.", caption: "Tanker bliver til rum, lys og sammenhæng." },
  { label: "Håndværket", title: "Vi bygger. I følger med.", text: "Med en fast kontaktperson og løbende dialog ved I, hvad der sker, og hvad det næste skridt er.", caption: "Streg for streg. Lag for lag. Et hjem tager form." },
  { label: "Hjemmet", title: "Og en dag er I hjemme", text: "Vi gennemgår huset sammen. Så er det jeres tur til at fylde rummene med liv.", caption: "Nu begynder det vigtigste. Livet i huset." },
];

export function Drawing({ stage }: { stage: number }) {
  const grid = useId();
  return <svg viewBox="0 0 520 280" fill="none" aria-hidden="true" className="journey-drawing">
    <defs><pattern id={grid} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="currentColor" strokeOpacity=".07" /></pattern></defs>
    <rect width="520" height="280" fill={`url(#${grid})`} />
    <g className="drawing-lines" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" key={stage}>
      {stage === 0 ? <>
        <path d="M116 76H287V171H192L158 199V171H116Z" />
        <path d="M303 114H393V207H367L341 230V207H264V189" />
        <path d="M145 103H242M145 124H218M145 145H191M313 146H362M292 169H363" />
        <path className="drawing-accent" d="M326 57l13-12 13 12v20h-26Z M339 45V35M312 57h-10M364 57h10" />
      </> : stage === 4 ? <>
        <path d="M145 45H315L355 85V234H145ZM315 45V85H355M174 105H271M174 138H238M174 171H254M174 204H227"/>
        <path className="drawing-accent" d="M280 137l9 10 19-24M280 172l9 10 19-24M280 206l9 10 19-24"/>
      </> : stage === 1 ? <>
        <path d="M125 55H395V220H125ZM125 137H233V55M233 137H320V220M320 137V55M170 137V180M233 177V220" />
        <path d="M147 76H211V112H147ZM340 78H376V116H340ZM143 191H196V208H143" />
        <path className="drawing-accent" d="M125 238H395M125 232V244M395 232V244M106 55V220M100 55H112M100 220H112M256 157h42v40h-42Z" />
        <path strokeDasharray="4 6" d="M254 35V245M107 137H415" opacity=".3" />
      </> : <>
        <path d="M76 225H447M110 225V116L252 63L402 110V225M110 116L264 151L402 110M264 151V225M252 63V134" />
        <path d="M97 110L252 51L418 103L402 110M97 110V118L264 160L418 113V103" />
        <path d="M136 146L180 157V213L136 204ZM200 162L242 172V225M286 163L330 150V218L286 225ZM349 144L382 134V204L349 214Z" />
        {stage === 2 ? <>
          <path className="drawing-accent" d="M90 232V93M191 244V125M80 157L203 188M80 204L203 235M85 154L194 235M85 205L194 184M424 228V86M411 137H439M411 185H439" />
          <path strokeDasharray="4 5" d="M252 37V61M252 51L110 104" opacity=".5" />
        </> : <>
          <path className="drawing-windows" d="M137 147L179 158V212L137 203ZM287 164L329 151V217L287 224ZM350 145L381 135V203L350 212Z" stroke="none" />
          <path className="drawing-accent" d="M54 225V181M54 200C18 190 31 163 54 155C78 164 90 192 54 200ZM452 225V169M452 190C415 181 426 150 452 140C478 152 490 180 452 190ZM193 233L264 255L335 233" />
          <circle cx="382" cy="48" r="17" className="drawing-accent" />
          <path d="M154 151V207M306 157V222M365 140V209" />
        </>}
      </>}
    </g>
  </svg>;
}

type JourneyStep = { label: string; title: string; text: string; caption: string; stage?: number };
export default function ProcessJourney({ items = steps, detailed = false }: { items?: JourneyStep[]; detailed?: boolean }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = root.current;
      if (!el) return;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 128;
      el.style.setProperty("--journey-top", `${headerHeight + 12}px`);
      const board = el.querySelector(".journey-board")!.getBoundingClientRect();
      const mobile = innerWidth < 760;
      const line = mobile ? Math.min(innerHeight * .78, board.bottom + 180) : innerHeight * .58;
      let selected = 0;
      el.querySelectorAll<HTMLElement>(".scroll-chapter").forEach((chapter, i) => {
        if (chapter.getBoundingClientRect().top <= line) selected = i;
      });
      setActive(selected);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener("scroll", schedule); removeEventListener("resize", schedule); };
  }, []);
  return <div className={`journey scroll-journey ${detailed ? "journey-detailed" : ""}`} ref={root}>
    <div className="journey-visual">
      <div className="journey-board" id="process-illustration" role="img" aria-label={`${items[active].label}: ${items[active].caption}`}>
        <div className="journey-board-top"><span>Fra idé til hjem</span><span>0{active + 1} / 0{items.length}</span></div>
        <Drawing stage={items[active].stage ?? active} />
        <p className="journey-caption" aria-hidden="true">{items[active].caption}</p>
        <div className="journey-progress" aria-hidden="true">{items.map((s,i)=><span key={s.label} className={i <= active ? "filled" : ""} />)}</div>
      </div>
      <p className="scroll-note">En fortælling i {items.length} kapitler <span aria-hidden="true">↓</span></p>
    </div>
    <ol className="scroll-chapters">{items.map((s,i)=><li key={s.label} className={`scroll-chapter ${active===i ? "active" : ""}`} aria-current={active===i ? "step" : undefined}>
      <span className="scroll-chapter-index">0{i+1} <span>{s.label}</span></span>
      <h3>{s.title}</h3><p>{s.text}</p>
      <span className="chapter-line" aria-hidden="true" />
    </li>)}</ol>
  </div>;
}
