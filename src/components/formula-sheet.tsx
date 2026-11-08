import { useState } from "react";

type Cover = "top" | "left" | "right";

type Cell = {
  name: string;
  top: string;
  left: string;
  right: string;
  cover: Cover;
  formula: string;
};

function FormulaTriangle({
  top,
  left,
  right,
  cover,
}: {
  top: string;
  left: string;
  right: string;
  cover: Cover;
}) {
  return (
    <svg viewBox="0 0 140 118" className="mx-auto h-24 w-full max-w-36 text-ink" role="img" aria-hidden="true">
      <polygon points="70,4 6,114 134,114" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="31" y1="68" x2="109" y2="68" stroke="currentColor" strokeWidth="1.6" />
      <line x1="70" y1="68" x2="70" y2="114" stroke="currentColor" strokeWidth="1.6" />
      <Glyph x={70} y={48} text={top} circled={cover === "top"} />
      <Glyph x={50} y={96} text={left} circled={cover === "left"} />
      <Glyph x={90} y={96} text={right} circled={cover === "right"} />
    </svg>
  );
}

function Glyph({ x, y, text, circled }: { x: number; y: number; text: string; circled: boolean }) {
  const wide = text.length > 1;
  return (
    <g>
      {circled ? (
        <circle cx={x} cy={y - 5} r={wide ? 15 : 13} className="fill-paper" stroke="currentColor" strokeWidth="2" />
      ) : null}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fill="currentColor"
        fontSize={wide ? 13 : 18}
        fontFamily="IBM Plex Sans, sans-serif"
        fontWeight="650"
      >
        {text}
      </text>
    </g>
  );
}

function Trio({
  kicker,
  tone,
  columns,
  note,
}: {
  kicker: string;
  tone: "wash" | "wash2" | "paper";
  columns: Cell[];
  note: string;
}) {
  const toneClass = tone === "wash" ? "bg-wash" : tone === "wash2" ? "bg-wash2" : "bg-paper";
  return (
    <section className={`border border-ink ${toneClass}`}>
      <h2 className="border-b border-ink px-2 py-1 text-xs font-semibold tracking-[0.12em] text-ink uppercase">
        {kicker}
      </h2>
      <div className="grid grid-cols-3">
        {columns.map((column) => (
          <div key={column.name} className="border-r border-ink px-1 py-2 text-center last:border-r-0">
            <p className="text-xs font-semibold text-ink">{column.name}</p>
            <FormulaTriangle top={column.top} left={column.left} right={column.right} cover={column.cover} />
            <p className="font-mono text-sm font-semibold text-ink">{column.formula}</p>
          </div>
        ))}
      </div>
      <p className="border-t border-ink px-2 py-1 text-xs leading-snug text-ink">{note}</p>
    </section>
  );
}

const OHM: Cell[] = [
  { name: "Voltage", top: "E", left: "I", right: "R", cover: "top", formula: "E = I × R" },
  { name: "Current", top: "E", left: "I", right: "R", cover: "left", formula: "I = E / R" },
  { name: "Resistance", top: "E", left: "I", right: "R", cover: "right", formula: "R = E / I" },
];

const POWER: Cell[] = [
  { name: "Power", top: "P", left: "E", right: "I", cover: "top", formula: "P = E × I" },
  { name: "Voltage", top: "P", left: "E", right: "I", cover: "left", formula: "E = P / I" },
  { name: "Current", top: "P", left: "E", right: "I", cover: "right", formula: "I = P / E" },
];

const CURRENT_SQUARE: Cell[] = [
  { name: "Power", top: "P", left: "I²", right: "R", cover: "top", formula: "P = I² × R" },
  { name: "Current", top: "P", left: "I²", right: "R", cover: "left", formula: "I = √(P / R)" },
  { name: "Resistance", top: "P", left: "I²", right: "R", cover: "right", formula: "R = P / I²" },
];

const VOLTAGE_SQUARE: Cell[] = [
  { name: "Voltage", top: "E²", left: "P", right: "R", cover: "top", formula: "E = √(P × R)" },
  { name: "Power", top: "E²", left: "P", right: "R", cover: "left", formula: "P = E² / R" },
  { name: "Resistance", top: "E²", left: "P", right: "R", cover: "right", formula: "R = E² / P" },
];

export function FormulaSheet() {
  const [saveNote, setSaveNote] = useState("");

  async function downloadCard() {
    setSaveNote("Getting the file…");
    try {
      const response = await fetch("/ham-tech-t5-formulas.pdf");
      if (!response.ok) throw new Error("missing");
      const blob = await response.blob();
      const file = new File([blob], "ham-tech-formula-card.pdf", { type: "application/pdf" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Ham Tech formula card" });
        setSaveNote("Shared. Save it from the share sheet.");
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      setSaveNote("If a file didn’t appear, use Print this page instead.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setSaveNote("");
        return;
      }
      setSaveNote("Couldn’t save from the preview. Use Print this page.");
    }
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <p className="max-w-xl text-sm text-muted">
          One page for the desk. The circled letter is the one you are finding. Print it and keep it with the
          book.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-full bg-primary px-4 text-sm font-semibold text-ink"
          >
            Print this page
          </button>
          <button
            type="button"
            onClick={() => void downloadCard()}
            className="min-h-11 rounded-full border border-line bg-raised px-4 text-sm font-medium text-fg"
          >
            Download PDF
          </button>
        </div>
      </div>
      {saveNote ? <p className="mb-3 text-sm text-muted print:hidden">{saveNote}</p> : null}

      <article className="border border-ink bg-paper text-ink print:border-0">
        <header className="flex items-end justify-between gap-3 border-b border-ink px-3 py-2">
          <div>
            <p className="text-xs tracking-[0.16em] text-ink uppercase">Technician · T5</p>
            <h1 className="text-xl font-semibold tracking-tight">Formula card</h1>
          </div>
          <p className="max-w-56 text-right text-xs leading-snug">
            Side by side means multiply. One over the other means divide.
          </p>
        </header>

        <div className="grid gap-2 p-2">
          <Trio
            kicker="Ohm’s law"
            tone="wash"
            columns={OHM}
            note="Same numbers as the book: 90 volts and 3 amps. Cover R. 90 / 3 = 30 ohms."
          />
          <Trio
            kicker="Power"
            tone="wash2"
            columns={POWER}
            note="13.8 V × 10 A = 138 W.  12 V × 2.5 A = 30 W.  120 W at 12 V is 10 A, because I = P / E."
          />
          <div className="grid gap-2 sm:grid-cols-2">
            <Trio
              kicker="Power wheel · current squared"
              tone="paper"
              columns={CURRENT_SQUARE}
              note="If the cell says I², the division gives I². Take the square root to get amps."
            />
            <Trio
              kicker="Power wheel · voltage squared"
              tone="paper"
              columns={VOLTAGE_SQUARE}
              note="E² sits on top because E² = P × R. Square root that to get volts."
            />
          </div>

          <section className="border border-ink px-2 py-2 text-xs leading-relaxed">
            <p>
              <span className="font-semibold">Letters. </span>
              E voltage, volts. I current, amperes. R resistance, ohms. P power, watts.
            </p>
            <p className="mt-1">
              <span className="font-semibold">Prefixes, each step ×1,000. </span>
              pico, nano, micro, milli, the unit, kilo, mega, giga. 1.5 A = 1,500 mA. 28,400 kHz = 28.4 MHz.
              500 mW = 0.5 W. Write MHz and kHz.
            </p>
            <p className="mt-1">
              <span className="font-semibold">Decibels. </span>
              Twice the power is about +3 dB. Ten times is +10 dB. Down to a quarter is about −6 dB.
            </p>
            <p className="mt-1">
              <span className="font-semibold">Also on this test. </span>
              Series: same current, voltage splits. Parallel: same voltage, current splits. Capacitance
              (farad) stores an electric field. Inductance (henry) stores a magnetic field. Impedance is the
              squeeze against AC, still in ohms. The Technician exam uses the first two blocks. The wheel
              finishes the set.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
