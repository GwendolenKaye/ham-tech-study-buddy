import { useEffect, useState } from "react";
import { QUESTIONS, type Question } from "@/data/questions";
import { Panel } from "@/components/bits";

const STORAGE_KEY = "ham-tech-best";

function shuffle(list: Question[]): Question[] {
  const next = [...list];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    const current = next[index];
    next[index] = next[swap];
    next[swap] = current;
  }
  return next;
}

export function QuizLab() {
  const [round, setRound] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [misses, setMisses] = useState<string[]>([]);
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setBest(Number(stored));
  }, []);

  function start(pool: Question[]) {
    setRound(shuffle(pool));
    setIndex(0);
    setPicked(null);
    setCorrect(0);
    setMisses([]);
  }

  function choose(choice: number) {
    if (!round || picked !== null) return;
    const question = round[index];
    setPicked(choice);
    if (choice === question.answer) {
      setCorrect((value) => value + 1);
    } else {
      setMisses((value) => [...value, question.topic]);
    }
  }

  function next() {
    if (!round) return;
    if (index + 1 >= round.length) {
      const score = correct;
      const percent = Math.round((score / round.length) * 100);
      setBest((previous) => {
        const nextBest = previous === null ? percent : Math.max(previous, percent);
        localStorage.setItem(STORAGE_KEY, String(nextBest));
        return nextBest;
      });
      setRound(null);
      setIndex(round.length);
      return;
    }
    setIndex((value) => value + 1);
    setPicked(null);
  }

  const finished = round === null && index > 0;
  const question = round?.[index];

  return (
    <Panel kicker="2022–2026 pool" title="Technician questions, with the reason.">
      <p className="text-sm leading-relaxed text-muted">
        These are real Electrical Principles questions (subelement T5). The exam gives you one from each
        small group. Here you can drill the whole group. {best !== null ? `Best round: ${best}%.` : null}
      </p>

      {!round && !finished ? (
        <button
          type="button"
          onClick={() => start(QUESTIONS)}
          className="min-h-12 rounded-full bg-primary px-5 text-sm font-semibold text-ink"
        >
          Start a round of {QUESTIONS.length}
        </button>
      ) : null}

      {question ? (
        <div className="space-y-3">
          <p className="text-xs tracking-[0.14em] text-primary uppercase">
            {question.topic} · {index + 1} / {round?.length}
          </p>
          <div className="h-1.5 overflow-hidden rounded-full bg-line">
            <div
              className="h-full bg-primary transition-[width] duration-200"
              style={{ width: `${(index / (round?.length ?? 1)) * 100}%` }}
            />
          </div>
          <h3 className="text-lg font-medium leading-snug text-fg">{question.prompt}</h3>
          <div className="grid gap-2">
            {question.choices.map((choice, choiceIndex) => {
              const revealed = picked !== null;
              const isAnswer = choiceIndex === question.answer;
              const isPick = choiceIndex === picked;
              let tone = "border-line bg-raised text-fg";
              if (revealed && isAnswer) tone = "border-good bg-raised text-good";
              else if (revealed && isPick) tone = "border-bad bg-raised text-bad";
              return (
                <button
                  key={choice}
                  type="button"
                  disabled={revealed}
                  onClick={() => choose(choiceIndex)}
                  className={`min-h-12 rounded-xl border px-3 text-left text-sm ${tone}`}
                >
                  <span className="mr-2 font-mono text-primary">{String.fromCharCode(65 + choiceIndex)}</span>
                  {choice}
                </button>
              );
            })}
          </div>
          {picked !== null ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-fg">{question.why}</p>
              <button
                type="button"
                onClick={next}
                className="min-h-11 rounded-full bg-primary px-5 text-sm font-semibold text-ink"
              >
                {index + 1 === round?.length ? "See score" : "Next"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {finished ? (
        <div className="space-y-3">
          <p className="font-mono text-4xl text-primary">
            {correct}
            <span className="text-2xl text-muted"> / {QUESTIONS.length}</span>
          </p>
          <p className="text-sm text-fg">
            {correct / QUESTIONS.length >= 0.74
              ? "That is at or above the 74% you need on the real exam. The real test mixes other topics in, so keep the labs handy."
              : "Not there yet, and that is the point of the labs. The misses below say which picture to reopen."}
          </p>
          {misses.length > 0 ? (
            <p className="text-sm text-muted">Revisit: {[...new Set(misses)].join(", ")}.</p>
          ) : (
            <p className="text-sm text-good">Clean round.</p>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => start(QUESTIONS)}
              className="min-h-11 rounded-full bg-primary px-4 text-sm font-semibold text-ink"
            >
              Another full round
            </button>
            <button
              type="button"
              onClick={() => {
                setIndex(0);
                setCorrect(0);
                setMisses([]);
              }}
              className="min-h-11 rounded-full border border-line bg-raised px-4 text-sm text-fg"
            >
              Back
            </button>
          </div>
        </div>
      ) : null}
    </Panel>
  );
}
