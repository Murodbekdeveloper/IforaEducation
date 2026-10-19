"use client";

import { motion } from "framer-motion";
import RewardsPanel from "@/components/results/RewardsPanel";
import { CourseResult, RewardStatus } from "@/lib/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ResultsView({
  results,
  rewards,
}: {
  results: CourseResult[];
  rewards: RewardStatus;
}) {
  return (
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col gap-6">
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Natijalarim</h1>
        <p className="mt-1 text-ink-soft">Har bir kurs boʻyicha topshiriq va nazorat natijalari</p>
      </motion.div>

      <RewardsPanel rewards={rewards} />

      <motion.div variants={container} className="flex flex-col gap-6">
        {results.map((course) => (
          <motion.div
            key={course.courseTitle}
            variants={item}
            className="overflow-hidden rounded-2xl border border-border/70 bg-surface shadow-[0_1px_2px_rgba(36,28,26,0.04),0_12px_24px_-18px_rgba(36,28,26,0.1)]"
          >
            <div className="bg-gradient-to-r from-cream-soft to-cream px-5 py-3">
              <p className="font-semibold text-ink">{course.courseTitle}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-ink-soft">
                    <th className="px-5 py-3 font-medium">Modul</th>
                    <th className="px-5 py-3 font-medium">Ball</th>
                    <th className="px-5 py-3 font-medium">Natija</th>
                  </tr>
                </thead>
                <tbody>
                  {course.rows.map((row) => {
                    const percent = Math.round((row.score / row.maxScore) * 100);
                    return (
                      <tr
                        key={row.module}
                        className="border-b border-border/70 transition-colors last:border-0 hover:bg-cream-soft/60"
                      >
                        <td className="px-5 py-3.5 text-ink">{row.module}</td>
                        <td className="px-5 py-3.5 font-semibold text-ink">
                          {row.score}/{row.maxScore}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              percent >= 90
                                ? "bg-brand/10 text-brand"
                                : percent >= 75
                                  ? "bg-gold/15 text-gold"
                                  : "bg-terracotta/10 text-terracotta"
                            }`}
                          >
                            {percent}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
