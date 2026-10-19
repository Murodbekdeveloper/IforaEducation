"use client";

import { motion } from "framer-motion";
import { Award, Gem, Lock, Medal, Sparkles, Trophy } from "lucide-react";
import { RewardStatus, RewardTierStatus } from "@/lib/types";

const TIER_STYLE: Record<
  string,
  { icon: typeof Medal; iconClass: string }
> = {
  bronza: { icon: Medal, iconClass: "bg-gradient-to-br from-terracotta to-brand-dark text-cream" },
  kumush: { icon: Award, iconClass: "bg-gradient-to-br from-ink-soft to-ink text-cream" },
  oltin: { icon: Trophy, iconClass: "bg-gradient-to-br from-gold-light to-gold text-ink" },
  olmos: { icon: Gem, iconClass: "bg-gradient-to-br from-brand-light to-brand-dark text-cream" },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

function TierCard({ tier }: { tier: RewardTierStatus }) {
  const style = TIER_STYLE[tier.key] ?? TIER_STYLE.bronza;
  const Icon = style.icon;

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -3 }}
      className={`relative flex flex-col gap-3 overflow-hidden rounded-2xl border p-5 transition-all ${
        tier.unlocked
          ? "border-brand/20 bg-surface shadow-[0_12px_24px_-16px_rgba(122,46,59,0.18)]"
          : "border-border bg-cream-soft opacity-70"
      }`}
    >
      {tier.unlocked && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-gold-light/25 to-transparent blur-xl"
        />
      )}
      <div className="flex items-center justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm ${style.iconClass}`}
        >
          <Icon size={20} />
        </span>
        {tier.unlocked ? (
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
            Ochildi
          </span>
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink-soft">
            <Lock size={13} />
          </span>
        )}
      </div>
      <div>
        <p className="font-display font-bold text-ink">{tier.title}</p>
        <p className="text-xs text-ink-soft">{tier.threshold}+ ball</p>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{tier.perk}</p>
    </motion.div>
  );
}

export default function RewardsPanel({ rewards }: { rewards: RewardStatus }) {
  const { totalPoints, discountPercent, currentTierTitle, nextTier, pointsToNext, tiers } =
    rewards;
  const progressPercent = nextTier
    ? Math.min(100, Math.round((totalPoints / nextTier.threshold) * 100))
    : 100;

  return (
    <motion.div
      variants={item}
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface p-6 shadow-[0_1px_2px_rgba(36,28,26,0.04),0_16px_32px_-20px_rgba(36,28,26,0.1)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-gold-light/15 to-transparent blur-3xl"
      />

      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-light to-brand-dark text-cream shadow-sm">
            <Sparkles size={22} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              Mukofotlar
            </p>
            <h2 className="font-display text-xl font-bold text-ink">
              {totalPoints} ball toʻpladingiz
            </h2>
          </div>
        </div>

        {discountPercent > 0 && (
          <div className="rounded-full bg-gradient-to-r from-brand/10 to-gold/15 px-4 py-2 text-sm font-semibold text-brand">
            Keyingi xaridingizga {discountPercent}% chegirma faol
          </div>
        )}
      </div>

      <div className="relative mt-5">
        <div className="flex items-center justify-between text-xs text-ink-soft">
          <span>{currentTierTitle ?? "Hali daraja yoʻq"}</span>
          {nextTier ? (
            <span>
              {nextTier.title} darajasigacha yana {pointsToNext} ball
            </span>
          ) : (
            <span>Barcha darajalar ochildi</span>
          )}
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream-soft">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand to-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        initial="hidden"
        animate="show"
        className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {tiers.map((tier) => (
          <TierCard key={tier.key} tier={tier} />
        ))}
      </motion.div>

      <p className="relative mt-5 text-xs leading-relaxed text-ink-soft">
        Har bir modul topshirig‘idan olingan ball umumiy hisobga qo‘shiladi.
        Chegirmalar keyingi kurs xaridida toʻlov summasidan avtomatik
        ayiriladi, jismoniy sovgʻalar esa administrator bilan bogʻlanib
        olinadi.
      </p>
    </motion.div>
  );
}
