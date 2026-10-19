"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Course } from "@/lib/types";
import CourseCard from "./CourseCard";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function Courses({ courses }: { courses: Course[] }) {
  const categories = useMemo(
    () => ["Barchasi", ...new Set(courses.map((c) => c.category))],
    [courses],
  );
  const [activeCategory, setActiveCategory] = useState("Barchasi");

  const filteredCourses = useMemo(
    () =>
      activeCategory === "Barchasi"
        ? courses
        : courses.filter((c) => c.category === activeCategory),
    [courses, activeCategory],
  );

  return (
    <section id="kurslar" className="py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Kurslar
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Har bir bosqich uchun yoʻnalish
          </h2>
          <p className="mt-4 text-ink-soft">
            Boshlangʻichdan professional darajagacha — sizga mos tikuvchilik
            yoʻnalishini tanlang va bugunoq oʻrganishni boshlang.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                cat === activeCategory
                  ? "bg-brand text-cream"
                  : "border border-border bg-cream text-ink-soft hover:border-brand hover:text-brand"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={item}>
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <p className="mt-12 text-center text-ink-soft">
            Ushbu yoʻnalishda hozircha kurs mavjud emas.
          </p>
        )}
      </div>
    </section>
  );
}
