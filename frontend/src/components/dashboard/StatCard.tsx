"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: "brand" | "gold" | "terracotta" | "ink";
}) {
  const toneClasses: Record<string, string> = {
    brand: "bg-gradient-to-br from-brand-light to-brand-dark text-cream",
    gold: "bg-gradient-to-br from-gold-light to-gold text-ink",
    terracotta: "bg-gradient-to-br from-terracotta to-brand-dark text-cream",
    ink: "bg-gradient-to-br from-ink-soft to-ink text-cream",
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_1px_2px_rgba(36,28,26,0.04),0_12px_24px_-16px_rgba(36,28,26,0.1)] transition-shadow hover:shadow-[0_20px_40px_-18px_rgba(122,46,59,0.25)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-gold-light/20 to-transparent opacity-0 blur-xl transition-opacity group-hover:opacity-100"
      />
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ${toneClasses[tone]}`}>
        <Icon size={18} />
      </span>
      <p className="font-display mt-3.5 text-2xl font-bold text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </motion.div>
  );
}
