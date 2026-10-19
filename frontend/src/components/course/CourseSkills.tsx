import { CircleCheck, Wrench } from "lucide-react";

export default function CourseSkills({
  skills,
  tools,
}: {
  skills: string[];
  tools: string[];
}) {
  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Kursni tugatgach sizning koʻnikmalaringiz
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border p-6 sm:p-7">
            <p className="font-semibold text-ink">Oʻzlashtirilgan koʻnikmalar</p>
            <ul className="mt-4 flex flex-col gap-3">
              {skills.map((skill) => (
                <li key={skill} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <CircleCheck size={16} className="mt-0.5 shrink-0 text-brand" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-cream-soft p-6 sm:p-7">
            <p className="font-semibold text-ink">Foydalaniladigan asbob-uskunalar</p>
            <ul className="mt-4 flex flex-col gap-3">
              {tools.map((tool) => (
                <li key={tool} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Wrench size={16} className="mt-0.5 shrink-0 text-brand" />
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
