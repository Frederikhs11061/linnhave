"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  category: string;
};
export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("Alle");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = items.filter(
    (i) => filter === "Alle" || i.category === filter,
  );
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);
  return (
    <>
      <div className="filter-row" aria-label="Filtrér inspiration">
        {["Alle", "Arkitektur", "Indretning", "Detaljer"].map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {visible.map((i) => (
          <button
            key={i.src}
            className="gallery-item"
            onClick={() => setSelected(items.indexOf(i))}
          >
            <span className="photo">
              <Image
                src={i.src}
                alt={i.alt}
                fill
                sizes="(max-width:700px) 100vw,50vw"
                quality={85}
              />
              <span className="image-open" aria-hidden="true">
                +
              </span>
            </span>
            <span className="gallery-caption">
              <strong>{i.title}</strong>
              <span>{i.category}</span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Billedgalleri"
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        {selected !== null && (
          <>
            <button
              className="lightbox-close"
              onClick={() => setSelected(null)}
              aria-label="Luk billede"
            >
              Luk ×
            </button>
            <div className="lightbox-image">
              <Image
                src={items[selected].src}
                alt={items[selected].alt}
                fill
                sizes="90vw"
                quality={85}
              />
            </div>
            <div className="lightbox-footer">
              <button
                onClick={() =>
                  setSelected((selected + items.length - 1) % items.length)
                }
                aria-label="Forrige billede"
              >
                Forrige
              </button>
              <p>
                {items[selected].title}{" "}
                <span>
                  {selected + 1} / {items.length}
                </span>
              </p>
              <button
                onClick={() => setSelected((selected + 1) % items.length)}
                aria-label="Næste billede"
              >
                Næste
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
