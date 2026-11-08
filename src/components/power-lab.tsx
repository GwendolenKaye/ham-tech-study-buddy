import { useState } from "react";
import { Note, Panel, Slider, formatNumber } from "@/components/bits";

const PRESETS = [
  { label: "13.8 V × 10 A", volts: 13.8, amps: 10, hint: "Exam answer: 138 watts. A common mobile radio supply." },
  { label: "12 V × 2.5 A", volts: 12, amps: 2.5, hint: "Exam answer: 30 watts." },
  { label: "120 W needs ? at 12 V", volts: 12, amps: 10, hint: "120 watts at 12 volts needs 10 amperes. Current = power ÷ voltage." },
];

const DECIBELS = [
  { from: 5, to: 10, db: "+3 dB", note: "Power doubled. About +3 dB." },
  { from: 20, to: 200, db: "+10 dB", note: "Power times ten. That is +10 dB." },
  { from: 12, to: 3, db: "−6 dB", note: "Down to a quarter. About −6 dB." },
];

export function PowerLab() {
  const [volts, setVolts] = useState(13.8);
  const [amps, setAmps] = useState(10);
  const [hint, setHint] = useState(PRESETS[0].hint);
  const watts = volts * amps;

  return (
    <Panel kicker="Power" title="Watts are push times flow.">
      <p className="text-sm leading-relaxed text-muted">
        Power is how hard the electricity is working. In a DC circuit, P = E × I. The letter E is voltage.
        More pressure or more flow means more watts.
      </p>

      <div className="rounded-xl border border-line bg-bg px-4 py-5 text-center">
        <p className="font-mono text-sm text-muted">
          {formatNumber(volts)} V × {formatNumber(amps)} A
        </p>
        <p className="mt-1 font-mono text-5xl text-primary">{formatNumber(watts)}</p>
        <p className="text-sm text-fg">watts</p>
      </div>

      <Slider
        label="Voltage"
        value={volts}
        min={1}
        max={24}
        step={0.1}
        display={`${formatNumber(volts)} V`}
        onChange={(value) => {
          setVolts(value);
          setHint("P = E × I");
        }}
      />
      <Slider
        label="Current"
        value={amps}
        min={0.1}
        max={20}
        step={0.1}
        display={`${formatNumber(amps)} A`}
        onChange={(value) => {
          setAmps(value);
          setHint("P = E × I");
        }}
      />

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setVolts(preset.volts);
              setAmps(preset.amps);
              setHint(preset.hint);
            }}
            className="min-h-11 rounded-full border border-line bg-raised px-3 text-sm text-fg"
          >
            {preset.label}
          </button>
        ))}
      </div>
      <Note>{hint}</Note>

      <div>
        <h3 className="text-base font-semibold text-fg">Decibels compare two powers</h3>
        <p className="mt-1 text-sm text-muted">
          You do not need a log calculator for Technician. Remember three pictures: double is +3 dB, ten
          times is +10 dB, and a quarter is about −6 dB.
        </p>
        <ul className="mt-3 grid gap-3">
          {DECIBELS.map((item) => {
            const max = Math.max(item.from, item.to);
            return (
              <li key={item.db} className="rounded-xl border border-line bg-bg p-3">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-lg text-primary">{item.db}</span>
                  <span className="text-sm text-muted">
                    {item.from} W → {item.to} W
                  </span>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="h-2 rounded-full bg-line">
                    <div className="h-full rounded-full bg-muted" style={{ width: `${(item.from / max) * 100}%` }} />
                  </div>
                  <div className="h-2 rounded-full bg-line">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(item.to / max) * 100}%` }} />
                  </div>
                </div>
                <p className="mt-2 text-sm text-fg">{item.note}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </Panel>
  );
}
