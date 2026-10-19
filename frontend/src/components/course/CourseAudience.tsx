import { CourseAudienceSegment } from "@/lib/types";

export default function CourseAudience({
  audience,
}: {
  audience: CourseAudienceSegment[];
}) {
  return (
    <section className="bg-ink py-16">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
          Kurs kimlar uchun?
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {audience.map((segment) => (
            <div key={segment.index}>
              <p className="font-display text-3xl font-bold text-gold-light">
                {segment.index}
              </p>
              <p className="mt-3 font-semibold text-cream">{segment.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">
                {segment.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
