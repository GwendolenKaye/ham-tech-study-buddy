import { useMemo, useState } from "react";
import { Note, Panel, formatNumber } from "@/components/bits";

const RUNGS = [
  { sym: "p", name: "pico", exp: -12, plain: "trillionth" },
  { sym: "n", name: "nano", exp: -9, plain: "billionth" },
  { sym: "µ", name: "micro", exp: -6, plain: "millionth" },
  { sym: "m", name: "milli", exp: -3, plain: "thousandth" },
  { sym: "", name: "base", exp: 0, plain: "the plain unit" },
  { sym: "k", name: "kilo", exp: 3, plain: "thousand" },
  { sym: "M", name: "mega", exp: 6, plain: "million" },
  { sym: "G", name: "giga", exp: 9, plain: "billion" },
] as const;

const UNITS = [
  { id: "V", name: "volts" },
  { id: "A", name: "amps" },
  { id: "Hz", name: "hertz" },
  { id: "W", name: "watts" },
  { id: "F", name: "farads" },
] as const;

type UnitId = (typeof UNITS)[number]["id"];

const PRESETS: { label: string; unit: UnitId; base: number; focus: number }[] = [
  { label: "1.5 amperes", unit: "A", base: 1.5, focus: 4 },
  { label: "1,500,000 hertz", unit: "Hz", base: 1_500_000, focus: 5 },
  { label: "500 milliwatts", unit: "W", base: 0.5, focus: 3 },
  { label: "28,400 kHz", unit: "Hz", base: 28_400_000, focus: 6 },
  { label: "2,425 MHz", unit: "Hz", base: 2_425_000_000, focus: 7 },
  { label: "1 kilovolt", unit: "V", base: 1000, focus: 5 },
  { label: "1 microvolt", unit: "V", base: 1e-6, focus: 2 },
  { label: "1,000,000 pF", unit: "F", base: 1e-6, focus: 2 },
];

function labelFor(sym: string, unit: string) {
  if (!sym) return unit;
  return `${sym}${unit}`;
}

export function PrefixLab() {
  const [unit, setUnit] = useState<UnitId>("A");
  const [base, setBase] = useState(1.5);
  const [focus, setFocus] = useState(4);

  const focused = RUNGS[focus];
  const shown = base / 10 ** focused.exp;

  const neighbors = useMemo(
    () =>
      RUNGS.map((rung, index) => ({
        ...rung,
        index,
        amount: base / 10 ** rung.exp,
      })),
    [base],
  );

  function loadPreset(preset: (typeof PRESETS)[number]) {
    setUnit(preset.unit);
    setBase(preset.base);
    setFocus(preset.focus);
  }

  return (
    <Panel kicker="The ladder" title="Every step is one thousand.">
      <p className="text-sm leading-relaxed text-muted">
        pico, nano, micro, milli, the plain unit, kilo, mega, giga. Step up and the number gets 1,000
        times smaller. Step down and it gets 1,000 times bigger. The amount of stuff never changes — only
        the name.
      </p>

      <div className="flex flex-wrap gap-2">
        {UNITS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setUnit(item.id)}
            className={`min-h-11 rounded-full px-4 text-sm font-medium transition-transform active:scale-[0.96] ${
              unit === item.id ? "bg-primary text-ink" : "border border-line bg-raised text-fg"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-bg px-4 py-4">
        <p className="text-xs tracking-[0.14em] text-muted uppercase">{focused.name}</p>
        <p className="mt-1 font-mono text-4xl text-primary">
          {formatNumber(shown)} {labelFor(focused.sym, unit)}
        </p>
        <p className="mt-1 text-sm text-muted">
          {focused.plain}. Same quantity as {formatNumber(base)} {unit}.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={focus === 0}
            onClick={() => setFocus((value) => Math.max(0, value - 1))}
            className="min-h-11 rounded-full border border-line bg-raised px-4 text-sm font-medium text-fg disabled:opacity-40"
          >
            Step down ×1,000
          </button>
          <button
            type="button"
            disabled={focus === RUNGS.length - 1}
            onClick={() => setFocus((value) => Math.min(RUNGS.length - 1, value + 1))}
            className="min-h-11 rounded-full bg-primary px-4 text-sm font-semibold text-ink disabled:opacity-40"
          >
            Step up ÷1,000
          </button>
        </div>
      </div>

      <ol className="grid gap-2">
        {neighbors.map((rung) => {
          const active = rung.index === focus;
          const width = Math.max(8, Math.min(100, 18 + (rung.exp + 12) * 8));
          return (
            <li key={rung.name}>
              <button
                type="button"
                onClick={() => setFocus(rung.index)}
                className={`flex min-h-12 w-full items-center gap-3 rounded-xl border px-3 text-left transition-transform active:scale-[0.99] ${
                  active ? "border-primary bg-raised" : "border-line bg-bg"
                }`}
              >
                <span className="w-14 font-mono text-sm text-primary">{rung.sym || "—"}</span>
                <span className="w-16 text-sm text-fg">{rung.name}</span>
                <span className="hidden h-2 flex-1 overflow-hidden rounded-full bg-line sm:block">
                  <span className="block h-full bg-primary" style={{ width: `${width}%` }} />
                </span>
                <span className="ml-auto font-mono text-sm text-fg">
                  {formatNumber(rung.amount)} {labelFor(rung.sym, unit)}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div>
        <p className="mb-2 text-sm text-muted">Exam numbers. Tap one and walk it up the ladder.</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => loadPreset(preset)}
              className="min-h-11 rounded-full border border-line bg-raised px-3 text-sm text-fg"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <Note>
        Abbreviations on the test are picky: MHz and kHz, with a capital H. Mega is a capital M. Milli is a
        lowercase m. Mixing those up is a classic wrong answer.
      </Note>
    </Panel>
  );
}
