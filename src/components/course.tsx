import { useEffect, useState } from "react";
import { COURSE, WEEKS, type Lecture, type Week } from "@/data/course";

const KEY = "ham-tech-course";

type Progress = {
  done: string[];
  scores: Record<string, number>;
};

function readProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { done: [], scores: {} };
    const parsed = JSON.parse(raw) as Progress;
    return { done: parsed.done ?? [], scores: parsed.scores ?? {} };
  } catch {
    return { done: [], scores: {} };
  }
}

function weekPassed(week: Week, scores: Record<string, number>) {
  return (scores[String(week.number)] ?? -1) >= week.pass;
}

export function Course({ onOpenLessons }: { onOpenLessons: () => void }) {
  const [progress, setProgress] = useState<Progress>({ done: [], scores: {} });
  const [weekNumber, setWeekNumber] = useState<number | null>(null);
  const [lectureId, setLectureId] = useState<string | null>(null);
  const [quizzing, setQuizzing] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  function save(next: Progress) {
    setProgress(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  const week = WEEKS.find((item) => item.number === weekNumber) ?? null;
  const lecture = week?.lectures.find((item) => item.id === lectureId) ?? null;
  const passedCount = WEEKS.filter((item) => weekPassed(item, progress.scores)).length;

  if (week && quizzing) {
    return (
      <Quiz
        week={week}
        onExit={() => setQuizzing(false)}
        onPass={(score) => {
          save({ ...progress, scores: { ...progress.scores, [String(week.number)]: score } });
        }}
      />
    );
  }

  if (week && lecture) {
    return (
      <LectureView
        week={week}
        lecture={lecture}
        done={progress.done.includes(lecture.id)}
        onBack={() => setLectureId(null)}
        onDone={() => {
          if (!progress.done.includes(lecture.id)) {
            save({ ...progress, done: [...progress.done, lecture.id] });
          }
          const index = week.lectures.findIndex((item) => item.id === lecture.id);
          const next = week.lectures[index + 1];
          setLectureId(next ? next.id : null);
        }}
      />
    );
  }

  if (week) {
    return (
      <WeekView
        week={week}
        done={progress.done}
        score={progress.scores[String(week.number)]}
        onBack={() => setWeekNumber(null)}
        onOpen={(id) => setLectureId(id)}
        onQuiz={() => setQuizzing(true)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">Course</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{COURSE.title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{COURSE.subtitle}</p>
        <p className="mt-3 text-sm">
          {passedCount} of 6 weeks passed. A week counts when its quiz is passed. You can retake it.
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-raised">
          <div className="h-full bg-primary" style={{ width: `${(passedCount / 6) * 100}%` }} />
        </div>
      </section>

      <ol className="space-y-2">
        {WEEKS.map((item) => {
          const score = progress.scores[String(item.number)];
          const passed = weekPassed(item, progress.scores);
          return (
            <li key={item.number}>
              <button
                type="button"
                disabled={!item.ready}
                onClick={() => setWeekNumber(item.number)}
                className="min-h-16 w-full rounded-2xl border border-line bg-surface px-4 py-3 text-left disabled:opacity-50"
              >
                <span className="text-xs font-medium tracking-[0.12em] text-primary uppercase">
                  Week {item.number}
                  {passed ? " · passed" : item.ready ? "" : " · coming"}
                  {score !== undefined && !passed ? ` · ${score} right` : ""}
                </span>
                <span className="mt-1 block text-base font-semibold">{item.title}</span>
                <span className="mt-1 block text-sm text-muted">{item.about}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <button type="button" onClick={onOpenLessons} className="min-h-11 text-sm text-primary">
        All 54 lessons, the old list
      </button>
    </div>
  );
}

function WeekView({
  week,
  done,
  score,
  onBack,
  onOpen,
  onQuiz,
}: {
  week: Week;
  done: string[];
  score?: number;
  onBack: () => void;
  onOpen: (id: string) => void;
  onQuiz: () => void;
}) {
  const finished = week.lectures.filter((item) => done.includes(item.id)).length;
  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="min-h-11 text-sm text-primary">
        Back to the course
      </button>
      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
          Week {week.number} · {week.minutes} min
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{week.title}</h2>
        <p className="mt-3 text-sm leading-relaxed">{week.about}</p>
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {week.outcomes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          {finished} of {week.lectures.length} lectures done
          {score !== undefined ? ` · quiz ${score} of ${week.quiz.length}` : ""}
        </p>
      </section>
      <ol className="space-y-2">
        {week.lectures.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onOpen(item.id)}
              className="min-h-11 w-full rounded-xl border border-line bg-bg px-3 text-left text-sm"
            >
              {index + 1}. {item.title}
              {done.includes(item.id) ? " · done" : ""}
            </button>
          </li>
        ))}
      </ol>
      <button type="button" onClick={onQuiz} className="min-h-11 w-full rounded-full bg-primary px-4 font-semibold text-ink">
        Week quiz
      </button>
    </div>
  );
}

function LectureView({
  week,
  lecture,
  done,
  onBack,
  onDone,
}: {
  week: Week;
  lecture: Lecture;
  done: boolean;
  onBack: () => void;
  onDone: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === lecture.check.answer;
  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="min-h-11 text-sm text-primary">
        Week {week.number}
      </button>
      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
          {lecture.minutes} min{done ? " · done" : ""}
        </p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{lecture.title}</h2>
        <p className="mt-3 text-base leading-relaxed">{lecture.lead}</p>
        <ul className="mt-4 space-y-3">
          {lecture.points.map((point) => (
            <li key={point} className="text-sm leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <h3 className="text-base font-semibold">Check</h3>
        <p className="mt-2 text-sm leading-relaxed">{lecture.check.prompt}</p>
        <div className="mt-3 space-y-2">
          {lecture.check.choices.map((choice, index) => {
            const show = picked !== null;
            const isAnswer = index === lecture.check.answer;
            return (
              <button
                key={choice}
                type="button"
                onClick={() => setPicked(index)}
                className={`min-h-11 w-full rounded-xl border px-3 py-2 text-left text-sm ${
                  show && isAnswer ? "border-primary bg-primary text-ink" : "border-line bg-bg"
                }`}
              >
                {choice}
              </button>
            );
          })}
        </div>
        {picked !== null ? <p className="mt-3 text-sm leading-relaxed text-muted">{lecture.check.why}</p> : null}
        <button
          type="button"
          onClick={onDone}
          disabled={!correct && !done}
          className="mt-4 min-h-11 rounded-full bg-primary px-4 font-semibold text-ink disabled:opacity-40"
        >
          Next
        </button>
      </section>
    </div>
  );
}

function Quiz({ week, onExit, onPass }: { week: Week; onExit: () => void; onPass: (score: number) => void }) {
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>(week.quiz.map(() => null));
  const [finished, setFinished] = useState(false);
  const question = week.quiz[index];
  const score = picks.filter((pick, i) => pick === week.quiz[i].answer).length;
  const passed = score >= week.pass;

  if (finished) {
    return (
      <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">Week {week.number} quiz</p>
        <h2 className="mt-1 text-2xl font-semibold">{passed ? "Passed" : "Not yet"}</h2>
        <p className="mt-3 text-sm">
          {score} of {week.quiz.length}. You need {week.pass}. You can retake it.
        </p>
        <button type="button" onClick={onExit} className="mt-4 min-h-11 rounded-full bg-primary px-4 font-semibold text-ink">
          Back to the week
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
        Quiz · {index + 1} of {week.quiz.length}
      </p>
      <h2 className="mt-1 text-lg font-semibold">{question.prompt}</h2>
      <div className="mt-3 space-y-2">
        {question.choices.map((choice, choiceIndex) => (
          <button
            key={choice}
            type="button"
            onClick={() => {
              const next = [...picks];
              next[index] = choiceIndex;
              setPicks(next);
            }}
            className={`min-h-11 w-full rounded-xl border px-3 py-2 text-left text-sm ${
              picks[index] === choiceIndex ? "border-primary bg-raised" : "border-line bg-bg"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      {picks[index] !== null ? (
        <p className="mt-3 text-sm leading-relaxed text-muted">{question.why}</p>
      ) : null}
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={onExit} className="min-h-11 rounded-full border border-line px-4">
          Leave
        </button>
        <button
          type="button"
          disabled={picks[index] === null}
          onClick={() => {
            if (index === week.quiz.length - 1) {
              const final = picks.filter((pick, i) => pick === week.quiz[i].answer).length;
              onPass(final);
              setFinished(true);
            } else {
              setIndex(index + 1);
            }
          }}
          className="min-h-11 rounded-full bg-primary px-4 font-semibold text-ink disabled:opacity-40"
        >
          {index === week.quiz.length - 1 ? "Score" : "Next"}
        </button>
      </div>
    </section>
  );
}
