import { useMemo, useState } from "react";
import { Note, Panel, Slider, formatNumber } from "@/components/bits";

type Solve = "I" | "E" | "R";

export function OhmLab() {
  const [solve, setSolve] = useState<Solve>("I");
  const [volts, setVolts] = useState(12);
  const [amps, setAmps] = useState(3);
  const [ohms, setOhms] = useState(4);

  const result = useMemo(() => {
    if (solve === "I") return { value: volts / ohms, unit: "A", formula: "I = E / R", name: "current" };
    if (solve === "E") return { value: amps * ohms, unit: "V", formula: "E = I × R", name: "voltage" };
    return { value: volts / amps, unit: "Ω", formula: "R = E / I", name: "resistance" };
  }, [solve, volts, amps, ohms]);

  const flowAmps = solve === "I" ? volts / ohms : solve === "E" ? amps : volts / amps;
  const duration = `${Math.max(0.4, 2 / Math.max(flowAmps, 0.15)).toFixed(2)}s`;

  return (
    <Panel kicker="Ohm’s law" title="Cover the one you want to find.">
      <p className="text-sm leading-relaxed text-muted">
        Three numbers, one relationship. E is voltage (the push), I is current (the flow), R is resistance
        (the squeeze). Cover the letter you are solving for. What you still see is the formula.
      </p>

      <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-center">
        <svg viewBox="0 0 220 200" className="mx-auto w-full max-w-[220px]" role="img" aria-label="Ohm’s law triangle">
          <polygon points="110,16 16,184 204,184" className="fill-bg stroke-primary" strokeWidth="3" />
          <line x1="62" y1="128" x2="158" y2="128" className="stroke-line" />
          {(
            [
              ["E", 110, 78],
              ["I", 74, 164],
              ["R", 146, 164],
            ] as const
          ).map(([letter, x, y]) => (
            <g key={letter}>
              {solve === letter ? <circle cx={x} cy={y - 8} r="22" className="fill-primary" /> : null}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                className={solve === letter ? "fill-ink text-[26px]" : "fill-fg text-[26px]"}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {solve === letter ? "?" : letter}
              </text>
            </g>
          ))}
        </svg>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {(
              [
                ["I", "Find current"],
                ["E", "Find voltage"],
                ["R", "Find resistance"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setSolve(id)}
                className={`min-h-11 rounded-full px-4 text-sm font-medium ${
                  solve === id ? "bg-primary text-ink" : "border border-line bg-raised text-fg"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="font-mono text-lg text-primary">{result.formula}</p>
          <p className="font-mono text-4xl text-fg">
            {formatNumber(result.value)} <span className="text-2xl text-primary">{result.unit}</span>
          </p>
          <p className="text-sm text-muted">That is the {result.name}.</p>
        </div>
      </div>

      <div className="grid gap-3">
        {solve !== "E" ? (
          <Slider label="Voltage E" value={volts} min={1} max={120} step={1} display={`${volts} V`} onChange={setVolts} />
        ) : null}
        {solve !== "I" ? (
          <Slider label="Current I" value={amps} min={0.5} max={20} step={0.5} display={`${amps} A`} onChange={setAmps} />
        ) : null}
        {solve !== "R" ? (
          <Slider label="Resistance R" value={ohms} min={1} max={100} step={1} display={`${ohms} Ω`} onChange={setOhms} />
        ) : null}
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-bg px-2 py-3">
        <svg viewBox="0 0 640 90" className="h-16 w-full" aria-hidden="true">
          <rect x="24" y="28" width="36" height="34" rx="4" className="fill-primary" />
          <rect x="48" y="34" width="8" height="22" className="fill-ink" />
          <path d="M68 45 H560" fill="none" className="stroke-line" strokeWidth="8" />
          <rect x="300" y="30" width="46" height="30" rx="4" fill="none" className="stroke-fg" strokeWidth="3" />
          {[0, 1, 2, 3, 4].map((index) => (
            <circle
              key={index}
              r="4"
              className="flow-dot flow-wire fill-primary"
              style={{
                animationDuration: duration,
                animationDelay: `-${index * 0.35}s`,
              }}
            />
          ))}
        </svg>
        <p className="px-3 text-center text-xs text-muted">Dots move faster when current is higher.</p>
      </div>

      <Note>
        Try the exam pair: 90 volts and 3 amperes. Cover resistance and you should get 30 ohms. Or 12 volts
        across 4 ohms: current is 3 amperes.
      </Note>
    </Panel>
  );
}
