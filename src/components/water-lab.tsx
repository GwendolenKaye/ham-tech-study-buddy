import { useMemo, useState } from "react";
import { Note, Panel, Slider, formatNumber } from "@/components/bits";

export function WaterLab() {
  const [volts, setVolts] = useState(12);
  const [ohms, setOhms] = useState(8);
  const amps = volts / ohms;

  const opening = Math.max(10, 64 - ohms * 0.62);
  const level = 36 + (volts / 24) * 150;
  const duration = `${Math.max(0.45, 2.2 / Math.max(amps, 0.12)).toFixed(2)}s`;

  const sentence = useMemo(() => {
    const squeeze = ohms < 6 ? "wide open" : ohms < 24 ? "partly closed" : "squeezed tight";
    return `The push is ${formatNumber(volts)} volts. The pipe is ${squeeze} (${formatNumber(ohms)} ohms). The flow is ${formatNumber(amps)} amperes.`;
  }, [volts, ohms, amps]);

  return (
    <Panel kicker="Plumbing picture" title="Voltage pushes. Resistance squeezes. Current flows.">
      <p className="text-sm leading-relaxed text-muted">
        Treat the wire like a hose. Voltage is water pressure. Resistance is how far you pinch the hose.
        Current is how much water actually moves.
      </p>

      <div className="overflow-hidden rounded-xl border border-line bg-bg">
        <svg viewBox="0 0 720 280" className="h-auto w-full" role="img" aria-label="Water analogy of a circuit">
          <rect x="28" y="28" width="118" height="220" rx="16" className="fill-surface stroke-line" strokeWidth="2" />
          <clipPath id="tank">
            <rect x="40" y="40" width="94" height="196" rx="8" />
          </clipPath>
          <rect x="40" y={236 - level} width="94" height={level} clipPath="url(#tank)" className="fill-primary" />
          <text x="87" y="20" textAnchor="middle" className="fill-fg text-[13px]">
            Voltage
          </text>

          <rect x="146" y="110" width="300" height="80" rx="8" className="fill-raised" />
          <rect x="146" y={150 - opening / 2} width="300" height={opening} className="fill-primary/70" />

          <rect x="460" y="132" width="200" height="36" rx="18" className="fill-raised stroke-line" strokeWidth="2" />
          <text x="560" y="124" textAnchor="middle" className="fill-muted text-[13px]">
            Current
          </text>
          <text x="560" y="196" textAnchor="middle" className="fill-primary text-[22px]" style={{ fontFamily: "var(--font-mono)" }}>
            {formatNumber(amps)} A
          </text>

          {[0, 1, 2, 3, 4, 5].map((index) => (
            <circle
              key={index}
              r="5"
              className="flow-dot flow-water fill-ink"
              style={{
                animationDuration: duration,
                animationDelay: `-${index * 0.38}s`,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Slider
          label="Push (voltage)"
          value={volts}
          min={1}
          max={24}
          step={0.5}
          display={`${formatNumber(volts)} V`}
          onChange={setVolts}
        />
        <Slider
          label="Squeeze (resistance)"
          value={ohms}
          min={1}
          max={80}
          step={1}
          display={`${formatNumber(ohms)} Ω`}
          onChange={setOhms}
        />
      </div>

      <Note>{sentence} Raise the push and the flow speeds up. Pinch harder and it slows down.</Note>
    </Panel>
  );
}
