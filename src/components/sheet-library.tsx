import { useState } from "react";
import { SHEETS } from "@/data/sheets";

export function SheetLibrary() {
  const [id, setId] = useState(SHEETS[0]?.id ?? "");
  const sheet = SHEETS.find((item) => item.id === id) ?? SHEETS[0];

  if (!sheet) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href="/sheets/packet.html"
          className="inline-flex min-h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-ink"
        >
          Open the print packet
        </a>
        <a
          href="/sheets/ham-tech-cheat-sheets.pdf"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-raised px-4 text-sm font-medium text-fg"
        >
          Open the PDF
        </a>
      </div>
      <p className="text-sm leading-relaxed text-muted">
        Printing and saving work on your phone after this app is installed. They do not work inside the chat
        preview. On your phone, open the packet, then use the share button and choose Print.
      </p>
      <div className="flex gap-2 overflow-x-auto" aria-label="Cheat sheets">
        {SHEETS.map((item) => {
          const active = item.id === sheet.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setId(item.id)}
              className={`min-h-11 shrink-0 rounded-full px-3 text-sm font-medium ${
                active ? "bg-primary text-ink" : "border border-line bg-raised text-fg"
              }`}
            >
              {item.title}
            </button>
          );
        })}
      </div>
      <figure className="overflow-hidden rounded-2xl border border-line bg-paper">
        <img src={sheet.image} alt={sheet.line} className="w-full" />
        <figcaption className="px-3 py-2 text-sm text-ink">{sheet.line}</figcaption>
      </figure>
    </div>
  );
}
