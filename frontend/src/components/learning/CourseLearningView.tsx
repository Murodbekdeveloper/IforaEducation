"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Circle,
  CircleCheck,
  Clock,
  Play,
} from "lucide-react";
import { CourseWithDetail, EnrolledCourse } from "@/lib/types";

interface FlatLesson {
  id: string;
  moduleTitle: string;
  title: string;
  duration?: string;
  completed: boolean;
}

export default function CourseLearningView({
  course,
  enrolled,
}: {
  course: CourseWithDetail;
  enrolled?: EnrolledCourse;
}) {
  const flatLessons = useMemo<FlatLesson[]>(() => {
    const totalLessons = course.detail.curriculum.reduce(
      (sum, m) => sum + m.lessons.length,
      0,
    );
    const completedCount = enrolled
      ? Math.round((enrolled.progressPercent / 100) * totalLessons)
      : 0;
    let counter = 0;
    const lessons: FlatLesson[] = [];
    course.detail.curriculum.forEach((module, mi) => {
      module.lessons.forEach((lesson, li) => {
        counter += 1;
        lessons.push({
          id: `m${mi}-l${li}`,
          moduleTitle: module.title,
          title: lesson.title,
          duration: lesson.duration,
          completed: counter <= completedCount,
        });
      });
    });
    return lessons;
  }, [course, enrolled]);

  const firstIncomplete = flatLessons.find((l) => !l.completed);
  const [activeId, setActiveId] = useState(
    firstIncomplete?.id ?? flatLessons[0]?.id,
  );
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(flatLessons.filter((l) => l.completed).map((l) => l.id)),
  );

  const activeIndex = flatLessons.findIndex((l) => l.id === activeId);
  const active = flatLessons[activeIndex];
  const progressPercent = Math.round(
    (completedIds.size / Math.max(flatLessons.length, 1)) * 100,
  );

  function goTo(index: number) {
    if (index < 0 || index >= flatLessons.length) return;
    setActiveId(flatLessons[index].id);
  }

  function markCompleted() {
    if (!active) return;
    setCompletedIds((prev) => new Set(prev).add(active.id));
  }

  if (!active) return null;

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border/70 bg-cream/85 px-5 py-3.5 backdrop-blur-md sm:px-8">
        <Link
          href="/dashboard/kurslarim"
          className="flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-brand"
        >
          <ArrowLeft size={16} />
          Kurslarim
        </Link>
        <p className="hidden truncate font-display text-sm font-bold text-ink sm:block">
          {course.title}
        </p>
        <div className="flex items-center gap-2.5">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-cream-soft sm:w-40">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand to-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="text-xs font-semibold text-ink-soft">{progressPercent}%</span>
        </div>
      </header>

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1fr_360px]">
        <div className="px-5 py-7 sm:px-8 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl shadow-[0_20px_50px_-24px_rgba(36,28,26,0.35)]"
                style={{
                  background: `linear-gradient(150deg, ${course.coverColor} 0%, var(--color-brand-dark) 100%)`,
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(251,247,241,0.9) 1px, transparent 1.5px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-media-light/95 text-media-dark shadow-xl cursor-pointer"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ boxShadow: "0 0 0 0 rgba(251,247,241,0.5)" }}
                  />
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border-2 border-media-light/60"
                    animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <Play size={24} fill="currentColor" />
                </motion.button>
                {active.duration && (
                  <span className="absolute bottom-3 right-3 rounded-md bg-media-dark/70 px-2 py-1 text-xs font-medium text-media-light">
                    {active.duration}
                  </span>
                )}
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-brand">
                {active.moduleTitle}
              </p>
              <h1 className="font-display mt-2 text-2xl font-bold text-ink sm:text-3xl">
                {active.title}
              </h1>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                Ushbu darsda &ldquo;{course.title.toLowerCase()}&rdquo; yoʻnalishi doirasida
                amaliy koʻnikmalarni bosqichma-bosqich oʻrganasiz. Video darsni koʻrib
                boʻlgach, quyidagi tugma orqali darsni yakunlangan deb belgilang.
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {!completedIds.has(active.id) ? (
              <motion.button
                onClick={markCompleted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-3 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(122,46,59,0.6)] cursor-pointer"
              >
                <CircleCheck size={16} />
                Darsni yakunladim
              </motion.button>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-6 py-3 text-sm font-semibold text-brand">
                <CircleCheck size={16} />
                Yakunlandi
              </span>
            )}

            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <ArrowLeft size={15} />
              Oldingi
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === flatLessons.length - 1}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              Keyingi
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <aside className="border-t border-border/70 px-5 py-7 sm:px-8 lg:border-l lg:border-t-0 lg:px-6">
          <p className="font-semibold text-ink">Kurs dasturi</p>
          <p className="mt-1 text-xs text-ink-soft">
            {completedIds.size}/{flatLessons.length} dars yakunlandi
          </p>

          <div className="mt-5 flex flex-col gap-5">
            {course.detail.curriculum.map((module, mi) => (
              <div key={module.title}>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  {String(mi + 1).padStart(2, "0")} {module.title}
                </p>
                <div className="relative mt-2 flex flex-col gap-1">
                  {module.lessons.map((lesson, li) => {
                    const id = `m${mi}-l${li}`;
                    const isActive = id === activeId;
                    const isDone = completedIds.has(id);
                    return (
                      <button
                        key={id}
                        onClick={() => setActiveId(id)}
                        className={`relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                          !isActive ? "hover:bg-cream-soft" : ""
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="lesson-active-pill"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand to-brand-dark shadow-[0_6px_14px_-6px_rgba(122,46,59,0.5)]"
                          />
                        )}
                        <span className="relative">
                          {isDone ? (
                            <CircleCheck
                              size={16}
                              className={`shrink-0 ${isActive ? "text-cream" : "text-brand"}`}
                            />
                          ) : (
                            <Circle
                              size={16}
                              className={`shrink-0 opacity-50 ${isActive ? "text-cream" : ""}`}
                            />
                          )}
                        </span>
                        <span
                          className={`relative min-w-0 flex-1 truncate ${
                            isActive ? "text-cream" : "text-ink-soft"
                          }`}
                        >
                          {lesson.title}
                        </span>
                        {lesson.duration && (
                          <span
                            className={`relative shrink-0 flex items-center gap-1 text-xs ${
                              isActive ? "text-cream/80" : "text-ink-soft/70"
                            }`}
                          >
                            <Clock size={11} />
                            {lesson.duration}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
