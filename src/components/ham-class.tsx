import { useEffect, useState } from "react";
import { LESSONS } from "@/data/class";

const KEY = "ham-tech-class-done";

function Picture({ kind }: { kind: (typeof LESSONS)[number]["picture"] }) {
  if (kind === "people" || kind === "hello") {
    return (
      <svg viewBox="0 0 320 120" className="h-28 w-full" role="img" aria-label="Two people and a radio wave between them">
        <rect x="18" y="36" width="44" height="62" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="40" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M78 70 H130" stroke="currentColor" strokeWidth="2" />
        <path d="M118 62 L132 70 L118 78" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M150 48 q16 -18 32 0 q16 18 32 0 q16 -18 32 0" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="250" y="36" width="44" height="62" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="272" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === "license") {
    return (
      <svg viewBox="0 0 320 120" className="h-28 w-full" role="img" aria-label="A small card with a call sign">
        <rect x="70" y="22" width="180" height="78" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="160" y="52" textAnchor="middle" fill="currentColor" fontSize="12">
          Technician
        </text>
        <text x="160" y="78" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="700">
          your call sign
        </text>
      </svg>
    );
  }
  if (kind === "radio") {
    return (
      <svg viewBox="0 0 320 120" className="h-28 w-full" role="img" aria-label="A handheld radio">
        <rect x="132" y="16" width="56" height="88" rx="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="142" y="28" width="36" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="160" cy="70" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M160 16 V6" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === "bands") {
    return (
      <svg viewBox="0 0 320 120" className="h-28 w-full" role="img" aria-label="A dial with a few marked spots">
        <path d="M30 80 H290" stroke="currentColor" strokeWidth="2" />
        <circle cx="70" cy="80" r="6" fill="currentColor" />
        <circle cx="160" cy="80" r="6" fill="currentColor" />
        <circle cx="250" cy="80" r="6" fill="currentColor" />
        <text x="70" y="58" textAnchor="middle" fill="currentColor" fontSize="12">
          2 m
        </text>
        <text x="160" y="58" textAnchor="middle" fill="currentColor" fontSize="12">
          70 cm
        </text>
        <text x="250" y="58" textAnchor="middle" fill="currentColor" fontSize="12">
          later
        </text>
      </svg>
    );
  }
  if (kind === "hill") {
    return (
      <svg viewBox="0 0 320 120" className="h-28 w-full" role="img" aria-label="A radio on a hill between two small radios">
        <path d="M20 96 L110 40 L200 96" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M110 40 V22" stroke="currentColor" strokeWidth="2" />
        <circle cx="40" cy="96" r="6" fill="currentColor" />
        <circle cx="250" cy="96" r="6" fill="currentColor" />
        <path d="M48 90 Q110 50 242 90" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (kind === "rules") {
    return (
      <svg viewBox="0 0 320 120" className="h-28 w-full" role="img" aria-label="Four short rules">
        {["Say your call sign", "Stay in your bands", "No music, no business", "Use little power"].map(
          (line, i) => (
            <text key={line} x="36" y={32 + i * 22} fill="currentColor" fontSize="14">
              {i + 1}. {line}
            </text>
          ),
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 120" className="h-28 w-full" role="img" aria-label="One step, then rest">
      <rect x="40" y="36" width="70" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="75" y="66" textAnchor="middle" fill="currentColor" fontSize="13">
        1 idea
      </text>
      <path d="M120 60 H170" stroke="currentColor" strokeWidth="2" />
      <path d="M158 52 L172 60 L158 68" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="180" y="36" width="90" height="48" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="225" y="66" textAnchor="middle" fill="currentColor" fontSize="13">
        then stop
      </text>
    </svg>
  );
}

export function HamClass({ onOpenLabs }: { onOpenLabs: () => void }) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [showPath, setShowPath] = useState(false);
  const [doneThrough, setDoneThrough] = useState(-1);

  useEffect(() => {
    const saved = Number(localStorage.getItem(KEY));
    if (Number.isFinite(saved) && saved >= 0) {
      const next = Math.min(saved, LESSONS.length - 1);
      setDoneThrough(saved);
      setIndex(next);
    }
  }, []);

  const lesson = LESSONS[index];
  const correct = picked === lesson.check.answer;
  const last = index === LESSONS.length - 1;

  function choose(choice: number) {
    setPicked(choice);
    if (choice === lesson.check.answer) {
      const through = Math.max(doneThrough, index + 1);
      setDoneThrough(through);
      localStorage.setItem(KEY, String(through));
    }
  }

  function go(next: number) {
    setIndex(next);
    setPicked(null);
    setShowPath(false);
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
            Class · lesson {index + 1} of {LESSONS.length}
          </p>
          <p className="text-xs text-muted">{lesson.minutes} min</p>
        </div>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{lesson.title}</h2>
        <p className="mt-3 text-base leading-relaxed">{lesson.lead}</p>
        <div className="mt-4 rounded-xl border border-line bg-bg px-3 py-2 text-primary">
          <Picture kind={lesson.picture} />
        </div>
        <ul className="mt-4 space-y-3">
          {lesson.points.map((point) => (
            <li key={point} className="text-sm leading-relaxed text-fg">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <h3 className="text-base font-semibold">Check</h3>
        <p className="mt-2 text-sm leading-relaxed">{lesson.check.prompt}</p>
        <div className="mt-3 space-y-2">
          {lesson.check.choices.map((choice, choiceIndex) => {
            const selected = picked === choiceIndex;
            const show = picked !== null;
            const isAnswer = choiceIndex === lesson.check.answer;
            return (
              <button
                key={choice}
                type="button"
                onClick={() => choose(choiceIndex)}
                className={`min-h-11 w-full rounded-xl border px-3 py-2 text-left text-sm ${
                  show && isAnswer
                    ? "border-primary bg-primary text-ink"
                    : selected
                      ? "border-line bg-raised"
                      : "border-line bg-bg"
                }`}
              >
                {choice}
              </button>
            );
          })}
        </div>
        {picked !== null ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">{lesson.check.why}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => go(index - 1)}
            className="min-h-11 rounded-full border border-line bg-raised px-4 text-sm disabled:opacity-40"
          >
            Back
          </button>
          {last ? (
            <button
              type="button"
              disabled={!correct && doneThrough < LESSONS.length}
              onClick={onOpenLabs}
              className="min-h-11 rounded-full bg-primary px-4 text-sm font-semibold text-ink disabled:opacity-40"
            >
              Open the picture labs
            </button>
          ) : (
            <button
              type="button"
              disabled={!correct && doneThrough <= index}
              onClick={() => go(index + 1)}
              className="min-h-11 rounded-full bg-primary px-4 text-sm font-semibold text-ink disabled:opacity-40"
            >
              Next lesson
            </button>
          )}
        </div>
        {!correct && picked === null ? (
          <p className="mt-3 text-xs text-muted">Answer the check to open the next lesson. You can miss it and try again.</p>
        ) : null}
      </section>

      <button
        type="button"
        onClick={() => setShowPath((open) => !open)}
        className="min-h-11 text-sm font-medium text-primary"
      >
        {showPath ? "Hide the path" : "See the whole path"}
      </button>
      {showPath ? (
        <ol className="space-y-2">
          {LESSONS.map((item, itemIndex) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(itemIndex)}
                className={`min-h-11 w-full rounded-xl border px-3 text-left text-sm ${
                  itemIndex === index ? "border-primary bg-surface" : "border-line bg-bg"
                }`}
              >
                {itemIndex + 1}. {item.title}
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
