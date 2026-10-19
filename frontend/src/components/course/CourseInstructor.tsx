import Image from "next/image";
import { CourseInstructor as CourseInstructorType } from "@/lib/types";

export default function CourseInstructor({
  instructor,
}: {
  instructor: CourseInstructorType;
}) {
  const isFounder = instructor.name === "Ifora Isaqova";

  return (
    <section className="pb-16">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Kurs ustozi</h2>

        <div className="mt-8 flex items-start gap-5">
          {isFounder ? (
            <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Image
                src="/images/ifora-isaqova.jpg"
                alt={instructor.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
          ) : (
            <span className="font-display flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand text-xl font-bold text-cream">
              {instructor.name[0]}
            </span>
          )}
          <div>
            <p className="font-semibold text-ink">{instructor.name}</p>
            <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-brand">
              {instructor.role}
            </p>
            <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-ink-soft">
              {instructor.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
