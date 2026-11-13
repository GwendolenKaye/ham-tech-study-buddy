import { useState } from "react";
import {
  Activity,
  BookOpen,
  Droplets,
  Gauge,
  ListChecks,
  Printer,
  Ruler,
  Triangle,
  Waves,
  Zap,
} from "lucide-react";
import { Course } from "@/components/course";
import { HamClass } from "@/components/ham-class";
import { SheetLibrary } from "@/components/sheet-library";
import { TriangleLab } from "@/components/triangle-lab";
import { WaterLab } from "@/components/water-lab";
import { PrefixLab } from "@/components/prefix-lab";
import { OhmLab } from "@/components/ohm-lab";
import { PowerLab } from "@/components/power-lab";
import { MaterialsLab } from "@/components/materials-lab";
import { WavesLab } from "@/components/waves-lab";
import { QuizLab } from "@/components/quiz-lab";

const SECTIONS = [
  { id: "course", label: "Course", icon: BookOpen },
  { id: "class", label: "Lessons", icon: BookOpen },
  { id: "sheet", label: "Sheets", icon: Printer },
  { id: "bench", label: "Bench", icon: Gauge },
  { id: "triangles", label: "Triangles", icon: Triangle },
  { id: "water", label: "Water", icon: Droplets },
  { id: "prefix", label: "Metrics", icon: Ruler },
  { id: "ohm", label: "Ohm", icon: Triangle },
  { id: "power", label: "Power", icon: Zap },
  { id: "materials", label: "Materials", icon: Activity },
  { id: "waves", label: "AC / DC", icon: Waves },
  { id: "quiz", label: "Quiz", icon: ListChecks },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const WORDS = [
  ["Voltage", "volt (V)", "The push. Also called E."],
  ["Current", "ampere (A)", "The flow of electrons. Letter I."],
  ["Resistance", "ohm (Ω)", "The squeeze. Letter R."],
  ["Power", "watt (W)", "Push times flow. Letter P."],
  ["Frequency", "hertz (Hz)", "Cycles each second."],
  ["Capacitance", "farad (F)", "Stores energy in an electric field."],
  ["Inductance", "henry (H)", "Stores energy in a magnetic field."],
  ["Impedance", "ohm (Ω)", "The squeeze against AC."],
];

export function StudyBuddy() {
  const [section, setSection] = useState<SectionId>("course");

  return (
    <div className="min-h-dvh bg-bg text-fg print:min-h-0 print:bg-paper">
      <header className="border-b border-line bg-surface print:hidden">
        <div className="mx-auto flex max-w-3xl items-end justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-xs tracking-[0.16em] text-primary uppercase">Technician · from the start</p>
            <h1 className="text-2xl font-semibold tracking-tight">Ham Tech Study Buddy</h1>
          </div>
          <p className="hidden text-right text-xs text-muted sm:block">
            One short lesson
            <br />
            at a time
          </p>
        </div>
        <nav className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 pb-3" aria-label="Labs">
          {SECTIONS.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-medium transition-transform active:scale-[0.96] ${
                  active ? "bg-primary text-ink" : "border border-line bg-raised text-fg"
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main
        className={`mx-auto px-4 py-5 print:max-w-none print:p-0 ${section === "sheet" ? "max-w-5xl" : "max-w-3xl"}`}
      >
        {section === "course" ? <Course onOpenLessons={() => setSection("class")} /> : null}
        {section === "class" ? <HamClass onOpenLabs={() => setSection("bench")} /> : null}
        {section === "sheet" ? <SheetLibrary /> : null}
        {section === "bench" ? (
          <div className="space-y-4">
            <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">Start here</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">Three ideas run the whole chapter.</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Voltage is pressure. Current is flow. Resistance is how hard the path fights that flow.
                Power is pressure times flow. The metric prefixes are just nicknames for thousands, millions,
                and millionths so the numbers stay readable. Nothing else in this chapter is a new idea — it
                is those pictures with official names.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  ["Water", "Watch the hose pinch", "water"],
                  ["Metrics", "Walk the thousand-step ladder", "prefix"],
                  ["Ohm", "Cover a letter, find the number", "ohm"],
                ].map(([label, line, id]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSection(id as SectionId)}
                    className="min-h-20 rounded-xl border border-line bg-bg px-3 py-3 text-left"
                  >
                    <span className="block text-sm font-semibold text-primary">{label}</span>
                    <span className="mt-1 block text-sm text-fg">{line}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
              <h2 className="text-lg font-semibold">Names on the exam</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {WORDS.map(([name, unit, line]) => (
                  <li key={name} className="rounded-xl border border-line bg-bg px-3 py-3">
                    <p className="text-sm font-medium text-fg">{name}</p>
                    <p className="font-mono text-xs text-primary">{unit}</p>
                    <p className="mt-1 text-sm text-muted">{line}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
        {section === "triangles" ? <TriangleLab /> : null}
        {section === "water" ? <WaterLab /> : null}
        {section === "prefix" ? <PrefixLab /> : null}
        {section === "ohm" ? <OhmLab /> : null}
        {section === "power" ? <PowerLab /> : null}
        {section === "materials" ? <MaterialsLab /> : null}
        {section === "waves" ? <WavesLab /> : null}
        {section === "quiz" ? <QuizLab /> : null}
      </main>
    </div>
  );
}
