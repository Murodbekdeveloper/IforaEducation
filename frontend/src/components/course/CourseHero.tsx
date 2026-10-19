"use client";

import { motion } from "framer-motion";
import { ArrowRight, Scissors, Send, Star } from "lucide-react";
import { CourseWithDetail } from "@/lib/types";

export default function CourseHero({ course }: { course: CourseWithDetail }) {
  return (
    <section
      className="relative overflow-hidden pt-14 pb-16 md:pt-20 md:pb-20"
      style={{
        background: `linear-gradient(150deg, ${course.coverColor} 0%, var(--color-brand-dark) 100%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(251,247,241,0.9) 1px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      <motion.span
        aria-hidden
        animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-8 top-1/2 hidden h-52 w-52 -translate-y-1/2 items-center justify-center rounded-full border-2 border-dashed border-media-light/25 lg:flex"
      >
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-media-light/10 text-media-light backdrop-blur-sm">
          <Scissors size={36} />
        </span>
      </motion.span>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-media-light/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-media-light backdrop-blur-sm">
            {course.detail.heroTagline}
          </span>

          <h1 className="font-display mt-5 text-3xl font-bold leading-[1.15] text-media-light sm:text-4xl lg:text-[2.75rem]">
            {course.title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-media-light/80">
            {course.description}
          </p>

          <div className="mt-4 flex items-center gap-4 text-sm text-media-light/80">
            <span className="inline-flex items-center gap-1.5">
              <Star size={14} className="text-gold-light" fill="currentColor" strokeWidth={0} />
              {course.rating.toFixed(1)}
            </span>
            <span>{course.lessonsCount} ta dars</span>
            <span>{course.durationMonths} oy</span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#narx"
              className="group inline-flex items-center gap-2 rounded-full bg-media-light px-6 py-3.5 text-sm font-semibold text-media-dark shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Kursni sotib olish
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <button className="inline-flex items-center gap-2 rounded-full border border-media-light/40 px-6 py-3.5 text-sm font-semibold text-media-light transition-colors hover:bg-media-light/10 cursor-pointer">
              <Send size={16} />
              Telegram guruhga qoʻshilish
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
