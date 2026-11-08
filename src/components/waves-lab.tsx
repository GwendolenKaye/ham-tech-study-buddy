import { useState } from "react";
import { Note, Panel, Slider } from "@/components/bits";

export function WavesLab() {
  const [hertz, setHertz] = useState(2);

  return (
    <Panel kicker="Two kinds of current" title="DC stays. AC turns around.">
      <p className="text-sm leading-relaxed text-muted">
        Direct current leaves a battery and keeps going the same way. Alternating current reverses, over
        and over. One full reversal and return is one cycle. Hertz counts cycles per second.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <figure className="rounded-xl border border-line bg-bg p-3">
          <figcaption className="text-sm font-medium text-fg">Direct current</figcaption>
          <svg viewBox="0 0 280 90" className="mt-2 h-20 w-full" aria-hidden="true">
            <path d="M16 46 H250" className="stroke-primary" strokeWidth="3" />
            {[0, 1, 2].map((index) => (
              <polygon
                key={index}
                points="0,0 14,6 0,12"
                className="flow-dot flow-dc fill-primary"
                style={{
                  animationDuration: "1.8s",
                  animationDelay: `${index * -0.6}s`,
                }}
              />
            ))}
          </svg>
          <p className="text-sm text-muted">One direction. A battery is the usual source.</p>
        </figure>

        <figure className="overflow-hidden rounded-xl border border-line bg-bg p-3">
          <figcaption className="text-sm font-medium text-fg">Alternating current</figcaption>
          <svg viewBox="0 0 280 90" className="mt-2 h-20 w-full" aria-hidden="true">
            <g className="wave-track" style={{ animationDuration: `${Math.max(0.6, 3.2 / hertz)}s` }}>
              <path
                d="M0 46 C 20 46, 20 16, 40 16 S 60 76, 80 76 S 100 16, 120 16 S 140 76, 160 76 S 180 16, 200 16 S 220 76, 240 76 S 260 16, 280 16 S 300 76, 320 76 S 340 16, 360 16 S 380 76, 400 76"
                fill="none"
                strokeWidth="3"
                className="stroke-primary"
              />
            </g>
          </svg>
          <p className="text-sm text-muted">It goes positive, then negative. That is the exam wording.</p>
        </figure>
      </div>

      <Slider
        label="Cycles you can picture per second"
        value={hertz}
        min={1}
        max={8}
        step={1}
        display={`${hertz} Hz`}
        onChange={setHertz}
      />

      <Note>
        If the wave above completed this back-and-forth {hertz} {hertz === 1 ? "time" : "times"} in one real
        second, the frequency would be {hertz} hertz. Radio uses thousands (kHz) or millions (MHz) of those
        cycles every second. The letter for frequency’s unit is Hz, not the henry — the henry measures
        inductance.
      </Note>
    </Panel>
  );
}
