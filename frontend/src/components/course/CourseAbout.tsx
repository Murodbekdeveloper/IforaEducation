import { Scissors } from "lucide-react";

export default function CourseAbout({
  about,
}: {
  about: { title: string; description: string };
}) {
  return (
    <section className="pb-16">
      <div className="container-custom">
        <div className="flex flex-col gap-6 rounded-3xl bg-cream-soft p-8 sm:flex-row sm:items-start sm:p-10">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-cream">
            <Scissors size={24} />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-ink first-letter:uppercase sm:text-2xl">
              {about.title}
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{about.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
