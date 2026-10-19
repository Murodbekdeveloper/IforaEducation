import { Hammer, Ruler, Scissors, Shirt } from "lucide-react";
import { CourseProject } from "@/lib/types";

const ICONS = [Scissors, Shirt, Ruler, Hammer];

export default function CourseProjects({ projects }: { projects: CourseProject[] }) {
  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Kurs davomida bajariladigan loyihalar
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {projects.map((project, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={project.title}
                className="overflow-hidden rounded-2xl border border-border"
              >
                <div className="flex h-32 items-center justify-center bg-ink">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/10 text-cream">
                    <Icon size={20} />
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-semibold text-ink">
                    {i + 1}-loyiha: {project.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {project.description}
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
