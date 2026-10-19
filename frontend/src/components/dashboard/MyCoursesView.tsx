"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookMarked, CircleCheck } from "lucide-react";
import CourseCard from "@/components/sections/CourseCard";
import { Course, EnrolledCourse } from "@/lib/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function MyCoursesView({
  courses,
  availableCourses,
}: {
  courses: EnrolledCourse[];
  availableCourses: Course[];
}) {
  return (
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col gap-6">
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Kurslarim</h1>
        <p className="mt-1 text-ink-soft">Yozilgan kurslaringiz va ulardagi progressingiz</p>
      </motion.div>

      {courses.length === 0 && (
        <motion.div
          variants={item}
          className="rounded-2xl border border-dashed border-border bg-cream-soft p-8 text-center"
        >
          <p className="font-display text-lg font-bold text-ink">
            Hozircha yozilgan kursingiz yoʻq
          </p>
          <p className="mt-1.5 text-sm text-ink-soft">
            Quyidagi kurslardan birini tanlab, tikuvchilik sari birinchi qadamni tashlang.
          </p>
        </motion.div>
      )}

      <motion.div variants={container} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const done = course.progressPercent === 100;
          return (
            <motion.div key={course.slug} variants={item}>
              <Link
                href={`/oqish/${course.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_1px_2px_rgba(36,28,26,0.04)] transition-all hover:-translate-y-1.5 hover:shadow-[0_28px_48px_-20px_rgba(122,46,59,0.3)]"
              >
                <div
                  className="relative flex h-28 items-center justify-between overflow-hidden p-5"
                  style={{
                    background: `linear-gradient(135deg, ${course.coverColor} 0%, ${course.coverColor}CC 100%)`,
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.1] transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage:
                        "radial-gradient(rgba(251,247,241,0.9) 1px, transparent 1.5px)",
                      backgroundSize: "14px 14px",
                    }}
                  />
                  <span className="relative rounded-full bg-media-light/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-media-light backdrop-blur-sm">
                    {course.category}
                  </span>
                  {done && (
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-media-light text-media-dark shadow-sm">
                      <CircleCheck size={16} />
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <p className="font-display font-bold text-ink">{course.title}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-soft">
                    <BookMarked size={13} />
                    {course.completedLessons}/{course.totalLessons} dars
                  </p>

                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-cream-soft">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progressPercent}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-ink-soft">{course.nextLesson}</span>
                    <span className="font-semibold text-ink">{course.progressPercent}%</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {availableCourses.length > 0 && (
        <motion.div variants={item} className="mt-6 flex flex-col gap-5">
          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-border pt-6">
            <div>
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Boshqa kurslarni ham kashf eting
              </h2>
              <p className="mt-1 text-ink-soft">
                Yangi yoʻnalishni oʻrganib, koʻnikmalaringizni kengaytiring
              </p>
            </div>
            <Link
              href="/kurslar"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              Barcha kurslar
              <ArrowRight size={15} />
            </Link>
          </div>

          <motion.div variants={container} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <motion.div key={course.id} variants={item}>
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
