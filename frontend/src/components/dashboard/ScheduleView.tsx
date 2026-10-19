"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { ScheduleItem } from "@/lib/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 14, x: -6 },
  show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ScheduleView({ schedule }: { schedule: ScheduleItem[] }) {
  return (
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col gap-6">
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Dars jadvali</h1>
        <p className="mt-1 text-ink-soft">Joriy haftadagi darslar va jonli sessiyalar</p>
      </motion.div>

      <motion.div variants={container} className="relative flex flex-col gap-3">
        <div
          aria-hidden
          className="absolute bottom-6 left-[2.55rem] top-6 hidden w-px bg-gradient-to-b from-brand/30 via-border to-transparent sm:block"
        />
        {schedule.map((item_, i) => (
          <motion.div
            key={`${item_.day}-${i}`}
            variants={item}
            whileHover={{ y: -2 }}
            className="group relative flex items-center gap-4 rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_1px_2px_rgba(36,28,26,0.04)] transition-shadow hover:border-brand/30 hover:shadow-[0_16px_32px_-18px_rgba(122,46,59,0.2)]"
          >
            <div className="relative z-10 flex w-20 shrink-0 flex-col items-center rounded-xl bg-gradient-to-br from-cream-soft to-cream py-2.5 shadow-inner">
              <p className="text-xs font-semibold uppercase text-ink-soft">{item_.day.slice(0, 3)}</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-bold text-ink">
                <Clock size={12} className="text-brand" />
                {item_.time}
              </p>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-ink">{item_.topic}</p>
              <p className="mt-0.5 text-sm text-ink-soft">{item_.courseTitle}</p>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-gold-light to-gold opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
