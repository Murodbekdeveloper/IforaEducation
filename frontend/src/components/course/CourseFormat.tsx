import { BookOpen, ClipboardCheck, PenTool, Award } from "lucide-react";
import { CourseFormatStep } from "@/lib/types";

const ICONS = [BookOpen, PenTool, ClipboardCheck, Award];

export default function CourseFormat({ format }: { format: CourseFormatStep[] }) {
  return (
    <section className="pb-16">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Kurs qay tartibda oʻtiladi?
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {format.map((step, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={step.title}
                className="flex items-start gap-4 rounded-2xl border border-border p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
