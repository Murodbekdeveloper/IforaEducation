"use client";

import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { NotificationItem } from "@/lib/types";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function NotificationsView({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  return (
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col gap-6">
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Xabarnomalar</h1>
        <p className="mt-1 text-ink-soft">
          Kurslar, topshiriqlar va tizim yangiliklaridan xabardor boʻling
        </p>
      </motion.div>

      <motion.div variants={container} className="flex flex-col gap-3">
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            variants={item}
            whileHover={{ y: -2 }}
            className={`relative flex items-start gap-4 overflow-hidden rounded-2xl border p-5 transition-shadow ${
              n.read
                ? "border-border/70 bg-surface shadow-[0_1px_2px_rgba(36,28,26,0.04)]"
                : "border-brand/25 bg-gradient-to-br from-brand/[0.04] to-gold/[0.04] shadow-[0_12px_24px_-16px_rgba(122,46,59,0.2)]"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${
                n.read
                  ? "bg-cream-soft text-ink-soft"
                  : "bg-gradient-to-br from-brand-light to-brand-dark text-cream"
              }`}
            >
              <Bell size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-ink">{n.title}</p>
                {!n.read && (
                  <span className="shrink-0 rounded-full bg-gradient-to-r from-brand to-terracotta px-2 py-0.5 text-[10px] font-semibold uppercase text-cream">
                    Yangi
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{n.message}</p>
              <p className="mt-2 text-xs text-ink-soft/70">{n.time}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
