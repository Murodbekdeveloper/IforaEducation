"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Circle, Clock } from "lucide-react";
import { CourseModule, CourseWithDetail } from "@/lib/types";

export default function CourseCurriculum({ course }: { course: CourseWithDetail }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { curriculum } = course.detail;

  return (
    <section id="dasturi" className="py-16">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Kurs tarkibi</h2>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-ink-soft">
          <span>{course.lessonsCount} ta dars</span>
          <span>{curriculum.length} ta mavzu</span>
          <span>Kurs davomiyligi: {course.durationMonths} oy</span>
        </div>

        <div className="mt-8 divide-y divide-border rounded-2xl border border-border">
          {curriculum.map((module: CourseModule, i: number) => {
            const isOpen = openIndex === i;
            return (
              <div key={module.title}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                >
                  <span className="font-semibold text-ink">
                    {String(i + 1).padStart(2, "0")} {module.title}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-ink-soft transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="flex flex-col gap-3 px-5 pb-5">
                        {module.lessons.map((lesson) => (
                          <li
                            key={lesson.title}
                            className="flex items-center justify-between gap-4 text-sm text-ink-soft"
                          >
                            <span className="flex items-center gap-2.5">
                              <Circle size={7} className="shrink-0 fill-current text-brand/40" />
                              {lesson.title}
                            </span>
                            {lesson.duration && (
                              <span className="flex shrink-0 items-center gap-1.5 text-xs text-ink-soft/70">
                                <Clock size={12} />
                                {lesson.duration}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
