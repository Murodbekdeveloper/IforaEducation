import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { CourseWithDetail } from "@/lib/types";
import { formatSom } from "@/lib/format";

export default function CoursePricing({ course }: { course: CourseWithDetail }) {
  const { pricing } = course.detail;

  return (
    <section id="narx" className="bg-ink py-16">
      <div className="container-custom flex flex-col items-center text-center">
        <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
          Kurs narxi qancha?
        </h2>

        <div className="mt-8 flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-cream sm:flex-row">
          <div className="flex-1 p-7 text-left sm:p-8">
            <p className="font-semibold text-ink">Narxga kiritilgan xizmatlar</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {pricing.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <CircleCheck size={16} className="mt-0.5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 bg-cream-soft p-7 text-center sm:w-64 sm:p-8">
            <span className="inline-flex rounded-full bg-brand/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
              {pricing.periodLabel}
            </span>
            <p className="text-xs text-ink-soft">{pricing.note}</p>

            <div>
              {course.oldPrice && (
                <p className="text-xs text-ink-soft line-through">
                  {formatSom(course.oldPrice)}
                </p>
              )}
              <p className="font-display text-2xl font-bold text-ink">
                {formatSom(course.price)}
              </p>
            </div>

            <Link
              href={`/kurslar/${course.slug}/tolov`}
              className="w-full rounded-full bg-brand py-3 text-center text-sm font-semibold text-cream transition-colors hover:bg-brand-dark"
            >
              Sotib olish
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
