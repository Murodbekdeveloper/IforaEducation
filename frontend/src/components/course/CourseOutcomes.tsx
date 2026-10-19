import { Award, BookOpen, Layers, Rocket } from "lucide-react";
import { CourseOutcome } from "@/lib/types";

const ICONS: Record<CourseOutcome["key"], React.ComponentType<{ size?: number }>> = {
  skills: BookOpen,
  projects: Layers,
  certificate: Award,
  career: Rocket,
};

export default function CourseOutcomes({ outcomes }: { outcomes: CourseOutcome[] }) {
  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Kursdan nimani kutishingiz mumkin?
        </h2>

        <div className="mt-9 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {outcomes.map((outcome) => {
            const Icon = ICONS[outcome.key];
            return (
              <div key={outcome.key}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon size={20} />
                </span>
                <p className="mt-3.5 font-semibold text-ink">{outcome.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  {outcome.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
