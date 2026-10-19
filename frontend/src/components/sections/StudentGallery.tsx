"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Course } from "@/lib/types";
import { GALLERY_ENTRIES, GalleryEntry } from "@/lib/gallery-data";
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from "@/lib/course-icon";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function StudentGallery({ courses }: { courses: Course[] }) {
  const entries = GALLERY_ENTRIES.map((entry) => {
    const course = courses.find((c) => c.slug === entry.courseSlug);
    return course ? { ...entry, course } : null;
  }).filter((entry): entry is GalleryEntry & { course: Course } => entry !== null);

  if (entries.length === 0) return null;

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Natijalar
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Shogirdlarimiz nima tikishadi
          </h2>
          <p className="mt-4 text-ink-soft">
            Har bir kurs — real, kiyishga yaroqli buyum bilan yakunlanadi.
            Quyida bitiruvchilarimizning ishlaridan namunalar.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {entries.map((entry) => {
            const Icon = CATEGORY_ICONS[entry.course.category] ?? DEFAULT_CATEGORY_ICON;
            return (
              <motion.div
                key={entry.studentName}
                variants={item}
                className="group overflow-hidden rounded-2xl border border-border bg-cream"
              >
                <div
                  className="relative flex h-48 items-end overflow-hidden p-5"
                  style={{
                    background: `linear-gradient(150deg, ${entry.course.coverColor} 0%, ${entry.course.coverColor}CC 100%)`,
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
                  <Icon
                    aria-hidden
                    size={128}
                    strokeWidth={1}
                    className="pointer-events-none absolute -bottom-6 -right-6 text-media-light/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  />
                  <span className="relative rounded-full bg-media-light/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-media-light backdrop-blur-sm">
                    {entry.course.category}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-relaxed text-ink">{entry.caption}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {entry.studentName}
                      </p>
                      <p className="text-xs text-ink-soft">{entry.course.title}</p>
                    </div>
                    <Link
                      href={`/kurslar/${entry.course.slug}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand transition-colors hover:bg-brand hover:text-cream"
                      aria-label={`${entry.course.title} kursini koʻrish`}
                    >
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
