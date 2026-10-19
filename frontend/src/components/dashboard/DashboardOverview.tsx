"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, BookMarked, ClipboardList, GraduationCap } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ProgressRing from "@/components/dashboard/ProgressRing";
import {
  EnrolledCourse,
  NotificationItem,
  StudentOverview,
} from "@/lib/types";

const STAT_ICONS = [BookMarked, GraduationCap, ClipboardList, Award] as const;
const STAT_TONES = ["brand", "gold", "terracotta", "ink"] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function DashboardOverview({
  overview,
  courses,
  notifications,
}: {
  overview: StudentOverview;
  courses: EnrolledCourse[];
  notifications: NotificationItem[];
}) {
  const { profile, stats, progress } = overview;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="flex flex-col gap-8"
    >
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-ink-soft">Salom, {profile.firstName}! 👋</p>
      </motion.div>

      <div>
        <motion.div variants={item}>
          <p className="font-semibold text-ink">Talaba faoliyati</p>
          <p className="text-sm text-ink-soft">
            Kurslar, oʻzlashtirish va yutuqlar boʻyicha koʻrsatkichlar
          </p>
        </motion.div>

        <motion.div
          variants={container}
          className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <StatCard
              key={stat.id}
              icon={STAT_ICONS[i % STAT_ICONS.length]}
              tone={STAT_TONES[i % STAT_TONES.length]}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </motion.div>

        <motion.div
          variants={container}
          className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {progress.map((ring) => (
            <motion.div
              key={ring.id}
              variants={item}
              whileHover={{ y: -3 }}
              className="flex items-center gap-4 rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_1px_2px_rgba(36,28,26,0.04),0_12px_24px_-16px_rgba(36,28,26,0.1)] transition-shadow hover:shadow-[0_20px_40px_-18px_rgba(122,46,59,0.2)]"
            >
              <ProgressRing percent={ring.percent} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                  Jonli koʻrsatkich
                </p>
                <p className="mt-1 font-semibold text-ink">{ring.label}</p>
                <p className="mt-0.5 text-xs text-ink-soft">{ring.helper}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div variants={item}>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-ink">Davom etayotgan kurslar</p>
            <Link href="/dashboard/kurslarim" className="text-sm font-medium text-brand hover:underline">
              Barchasi
            </Link>
          </div>

          <motion.div variants={container} className="mt-4 flex flex-col gap-3">
            {courses.map((course) => (
              <motion.div key={course.slug} variants={item}>
                <Link
                  href={`/oqish/${course.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-surface p-4 shadow-[0_1px_2px_rgba(36,28,26,0.04)] transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_16px_32px_-18px_rgba(122,46,59,0.25)]"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-media-light shadow-sm transition-transform group-hover:scale-105"
                    style={{ background: course.coverColor }}
                  >
                    <BookMarked size={18} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-ink">{course.title}</p>
                    <p className="truncate text-xs text-ink-soft">{course.nextLesson}</p>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream-soft">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-brand to-gold"
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progressPercent}%` }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-ink">
                    {course.progressPercent}%
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={item}>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-ink">Soʻnggi xabarnomalar</p>
            <Link href="/dashboard/xabarnomalar" className="text-sm font-medium text-brand hover:underline">
              Barchasi
            </Link>
          </div>

          <motion.div variants={container} className="mt-4 flex flex-col gap-3">
            {notifications.slice(0, 3).map((n) => (
              <motion.div
                key={n.id}
                variants={item}
                whileHover={{ y: -2 }}
                className="rounded-2xl border border-border/70 bg-surface p-4 shadow-[0_1px_2px_rgba(36,28,26,0.04)] transition-shadow hover:shadow-[0_12px_24px_-16px_rgba(36,28,26,0.12)]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-ink">{n.title}</p>
                  {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand" />}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-ink-soft">{n.message}</p>
                <p className="mt-2 text-[11px] text-ink-soft/70">{n.time}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
