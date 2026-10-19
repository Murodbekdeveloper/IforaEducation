import Link from "next/link";
import { BookOpen, Clock, Star } from "lucide-react";
import { Course } from "@/lib/types";
import { formatSom } from "@/lib/format";
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from "@/lib/course-icon";

export default function CourseCard({ course }: { course: Course }) {
  const CategoryIcon = CATEGORY_ICONS[course.category] ?? DEFAULT_CATEGORY_ICON;

  return (
    <Link
      href={`/kurslar/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-cream shadow-[0_2px_10px_-4px_rgba(36,28,26,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-16px_rgba(36,28,26,0.25)]">
      <div
        className="relative flex h-40 flex-col justify-between overflow-hidden p-5"
        style={{
          background: `linear-gradient(150deg, ${course.coverColor} 0%, ${course.coverColor}CC 100%)`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(251,247,241,0.9) 1px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          aria-hidden
          className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125"
        />
        <CategoryIcon
          aria-hidden
          size={104}
          strokeWidth={1.1}
          className="pointer-events-none absolute -bottom-5 -right-5 text-media-light/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        />

        <div className="relative flex items-start justify-between">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-media-light/15 text-media-light backdrop-blur-sm">
            <CategoryIcon size={20} strokeWidth={1.75} />
          </span>
          {course.badge && (
            <span className="rounded-full bg-media-light/90 px-3 py-1 text-xs font-semibold text-media-dark">
              {course.badge}
            </span>
          )}
        </div>

        <span
          aria-hidden
          className="relative block h-px w-10 opacity-50"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--color-media-light) 0, var(--color-media-light) 4px, transparent 4px, transparent 8px)",
          }}
        />
        <span className="relative w-fit rounded-full bg-media-light/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-media-light backdrop-blur-sm">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand">
          <span className="rounded-full bg-brand/10 px-2.5 py-1">{course.level}</span>
          <span className="inline-flex items-center gap-1 text-gold">
            <Star size={13} fill="currentColor" strokeWidth={0} />
            {course.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="font-display mt-3 text-lg font-bold leading-snug text-ink">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {course.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {course.durationMonths} oy
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen size={14} />
            {course.lessonsCount} dars
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <div>
            {course.oldPrice && (
              <p className="text-xs text-ink-soft line-through">
                {formatSom(course.oldPrice)}
              </p>
            )}
            <p className="font-display text-base font-bold text-ink">
              {formatSom(course.price)}
            </p>
          </div>
          <span className="rounded-full bg-brand/10 px-4 py-2 text-xs font-semibold text-brand transition-colors group-hover:bg-brand group-hover:text-cream">
            Batafsil
          </span>
        </div>
      </div>
    </Link>
  );
}
