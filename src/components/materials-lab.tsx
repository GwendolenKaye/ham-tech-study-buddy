import { useState } from "react";
import { Note, Panel } from "@/components/bits";

const ITEMS = [
  {
    name: "Copper",
    kind: "conductor" as const,
    why: "A metal. Lots of free electrons, so current moves easily. Wire is usually copper.",
  },
  {
    name: "Aluminum",
    kind: "conductor" as const,
    why: "Also a metal, also full of free electrons. Antennas and some power lines use it.",
  },
  {
    name: "Glass",
    kind: "insulator" as const,
    why: "Electrons are stuck in place. This is the exam’s classic insulator.",
  },
  {
    name: "Rubber",
    kind: "insulator" as const,
    why: "Electrons do not wander. That is why it covers the outside of a wire.",
  },
  {
    name: "Mercury",
    kind: "conductor" as const,
    why: "Liquid, but still a metal. It conducts. The exam lists it next to glass to tempt you.",
  },
];

export function MaterialsLab() {
  const [pick, setPick] = useState<(typeof ITEMS)[number] | null>(ITEMS[0]);
  const [guess, setGuess] = useState<string | null>(null);

  return (
    <Panel kicker="What lets current through" title="Conductors have loose electrons. Insulators don’t.">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-line bg-bg p-3">
          <p className="text-sm font-medium text-fg">Conductor</p>
          <p className="text-xs text-muted">Electrons drift when you push</p>
          <div className="relative mt-3 h-16 overflow-hidden rounded-lg bg-raised">
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                className="electron absolute top-5 size-3 rounded-full bg-primary"
                style={{ left: 8 + index * 18, animationDelay: `${index * -0.3}s` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-line bg-bg p-3">
          <p className="text-sm font-medium text-fg">Insulator</p>
          <p className="text-xs text-muted">Electrons stay put</p>
          <div className="relative mt-3 h-16 rounded-lg bg-raised">
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                className="absolute top-5 size-3 rounded-full bg-muted"
                style={{ left: 16 + index * 28 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {ITEMS.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              setPick(item);
              setGuess(null);
            }}
            className={`min-h-11 rounded-full px-4 text-sm font-medium ${
              pick?.name === item.name ? "bg-primary text-ink" : "border border-line bg-raised text-fg"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {pick ? (
        <div className="space-y-3">
          <p className="text-sm text-fg">Is {pick.name} a conductor or an insulator?</p>
          <div className="flex gap-2">
            {(["conductor", "insulator"] as const).map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setGuess(kind)}
                className="min-h-11 flex-1 rounded-full border border-line bg-raised text-sm font-medium text-fg capitalize"
              >
                {kind}
              </button>
            ))}
          </div>
          {guess ? (
            <p className={`text-sm ${guess === pick.kind ? "text-good" : "text-bad"}`}>
              {guess === pick.kind ? "Yes. " : `Not quite — it is a ${pick.kind}. `}
              {pick.why}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-2">
        {[
          ["Capacitance", "farad (F)", "Stores energy in an electric field."],
          ["Inductance", "henry (H)", "Stores energy in a magnetic field."],
          ["Impedance", "ohm (Ω)", "Opposition to AC current. Still ohms."],
          ["RF", "—", "Radio frequency signals of all types."],
        ].map(([name, unit, line]) => (
          <div key={name} className="rounded-xl border border-line bg-bg px-3 py-3">
            <p className="text-sm font-medium text-fg">{name}</p>
            <p className="font-mono text-xs text-primary">{unit}</p>
            <p className="mt-1 text-sm text-muted">{line}</p>
          </div>
        ))}
      </div>

      <Note>
        Series circuit: one path, same current through every part, voltage splits. Parallel circuit: every
        part feels the same voltage, current splits among the branches.
      </Note>
    </Panel>
  );
}
