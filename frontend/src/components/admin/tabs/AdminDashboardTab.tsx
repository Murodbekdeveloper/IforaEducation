"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Clock3,
  Mail,
  MessageSquareWarning,
  Radio,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import type {
  AdminCompletion,
  AdminOrder,
  AdminOverview,
  AdminUser,
} from "@/lib/types";
import type { TabKey } from "../AdminConsole";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} so'm`;
}

const UZ_MONTHS_SHORT = [
  "yan", "fev", "mar", "apr", "may", "iyn",
  "iyl", "avg", "sen", "okt", "noy", "dek",
];

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "#10b981",
  PENDING: "#f59e0b",
  CANCELLED: "#f43f5e",
};

const STATUS_LABELS: Record<string, string> = {
  CONFIRMED: "Tasdiqlangan",
  PENDING: "Kutilmoqda",
  CANCELLED: "Bekor qilingan",
};

type Period = "daily" | "weekly" | "monthly" | "yearly";

const PERIOD_OPTIONS: { key: Period; label: string }[] = [
  { key: "daily", label: "Kunlik" },
  { key: "weekly", label: "Haftalik" },
  { key: "monthly", label: "Oylik" },
  { key: "yearly", label: "Yillik" },
];

const PERIOD_BUCKET_COUNT: Record<Period, number> = {
  daily: 14,
  weekly: 8,
  monthly: 12,
  yearly: 5,
};

function startOfPeriod(date: Date, period: Period): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  if (period === "daily") return d;
  if (period === "weekly") {
    const dayIndex = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - dayIndex);
    return d;
  }
  if (period === "monthly") {
    d.setDate(1);
    return d;
  }
  d.setMonth(0, 1);
  return d;
}

function stepPeriod(date: Date, period: Period, steps: number): Date {
  const d = new Date(date);
  if (period === "daily") d.setDate(d.getDate() + steps);
  else if (period === "weekly") d.setDate(d.getDate() + steps * 7);
  else if (period === "monthly") d.setMonth(d.getMonth() + steps);
  else d.setFullYear(d.getFullYear() + steps);
  return d;
}

function bucketLabel(date: Date, period: Period): string {
  if (period === "daily" || period === "weekly") {
    return `${date.getDate()} ${UZ_MONTHS_SHORT[date.getMonth()]}`;
  }
  if (period === "monthly") {
    return `${UZ_MONTHS_SHORT[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`;
  }
  return `${date.getFullYear()}`;
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color?: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d0f18]/95 px-3.5 py-2.5 text-xs shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl">
      {label && <p className="mb-1 font-medium text-slate-300">{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-1.5 text-slate-200">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: p.color ?? "#6366f1" }}
          />
          {p.name}: <span className="font-semibold text-white">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export default function AdminDashboardTab({
  overview,
  users,
  orders,
  completions,
  onNavigate,
}: {
  overview: AdminOverview;
  users: AdminUser[];
  orders: AdminOrder[];
  completions: AdminCompletion[];
  onNavigate: (tab: TabKey) => void;
}) {
  const [period, setPeriod] = useState<Period>("daily");

  const cards: {
    label: string;
    value: number | string;
    icon: typeof Users;
    gradient: string;
    wide?: boolean;
    tab?: TabKey;
  }[] = [
    {
      label: "Talabalar",
      value: overview.studentsCount,
      icon: Users,
      gradient: "from-indigo-500 to-blue-600",
      tab: "users",
    },
    {
      label: "Adminlar",
      value: overview.adminsCount,
      icon: ShieldCheck,
      gradient: "from-violet-500 to-purple-600",
      tab: "admins",
    },
    {
      label: "Tasdiqlangan to'lovlar",
      value: overview.ordersConfirmed,
      icon: BadgeCheck,
      gradient: "from-emerald-500 to-teal-600",
      tab: "payments",
    },
    {
      label: "Kutilayotgan to'lovlar",
      value: overview.ordersPending,
      icon: Clock3,
      gradient: "from-amber-500 to-orange-600",
      tab: "payments",
    },
    {
      label: "Jami tushum",
      value: formatCurrency(overview.revenueTotal),
      icon: Wallet,
      gradient: "from-fuchsia-500 to-pink-600",
      wide: true,
      tab: "payments",
    },
    {
      label: "Bog'lanilmagan lidlar",
      value: overview.leadsUncontacted,
      icon: MessageSquareWarning,
      gradient: "from-rose-500 to-red-600",
    },
    {
      label: "O'qilmagan xabarlar",
      value: overview.messagesUnread,
      icon: Mail,
      gradient: "from-sky-500 to-cyan-600",
    },
    {
      label: "Kutilayotgan sharhlar",
      value: overview.testimonialsPending,
      icon: Star,
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      label: "Kurslar",
      value: overview.coursesCount,
      icon: BookOpen,
      gradient: "from-lime-500 to-green-600",
    },
    {
      label: "Jonli efirlar (hozir)",
      value: overview.liveSessionsLive,
      icon: Radio,
      gradient: "from-red-500 to-rose-600",
    },
  ];

  const trend = useMemo(() => {
    const count = PERIOD_BUCKET_COUNT[period];
    const anchor = startOfPeriod(new Date(), period);
    const buckets = Array.from({ length: count }, (_, i) => {
      const start = stepPeriod(anchor, period, -(count - 1 - i));
      return { start, key: start.getTime(), label: bucketLabel(start, period) };
    });
    const index = new Map(buckets.map((b, i) => [b.key, i]));

    const signups = new Array(count).fill(0);
    const payments = new Array(count).fill(0);
    const graduates = new Array(count).fill(0);

    for (const u of users) {
      if (!u.joinedAt) continue;
      const key = startOfPeriod(new Date(u.joinedAt), period).getTime();
      const i = index.get(key);
      if (i !== undefined) signups[i] += 1;
    }
    for (const o of orders) {
      const key = startOfPeriod(new Date(o.createdAt), period).getTime();
      const i = index.get(key);
      if (i !== undefined) payments[i] += 1;
    }
    for (const c of completions) {
      const key = startOfPeriod(new Date(c.completedAt), period).getTime();
      const i = index.get(key);
      if (i !== undefined) graduates[i] += 1;
    }

    return buckets.map((b, i) => ({
      label: b.label,
      "Foydalanuvchilar": signups[i],
      "To'lovlar": payments[i],
      "Bitiruvchilar": graduates[i],
    }));
  }, [period, users, orders, completions]);

  const statusBreakdown = useMemo(() => {
    const counts = new Map<string, number>();
    for (const o of orders) {
      counts.set(o.status, (counts.get(o.status) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .filter(([, value]) => value > 0)
      .map(([status, value]) => ({
        name: STATUS_LABELS[status] ?? status,
        value,
        color: STATUS_COLORS[status] ?? "#6366f1",
      }));
  }, [orders]);

  const topCourses = useMemo(() => {
    const totals = new Map<string, number>();
    for (const o of orders) {
      if (o.status === "CANCELLED") continue;
      totals.set(o.courseTitle, (totals.get(o.courseTitle) ?? 0) + o.amount);
    }
    return Array.from(totals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([title, revenue]) => ({
        title: title.length > 18 ? `${title.slice(0, 18)}…` : title,
        revenue,
      }));
  }, [orders]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-white">Umumiy dinamika</p>
            <p className="text-xs text-slate-500">
              Foydalanuvchilar, to&apos;lovlar va kurs bitiruvchilar
            </p>
          </div>
          <div className="relative flex gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
            {PERIOD_OPTIONS.map(({ key, label }) => {
              const active = period === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPeriod(key)}
                  className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    active ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="dashboard-period-pill"
                      className="absolute inset-0 rounded-md bg-gradient-to-r from-indigo-500/90 to-violet-600/90"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-x-5 gap-y-1.5">
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-indigo-400" />
            Foydalanuvchilar
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            To&apos;lovlar
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Bitiruvchilar
          </span>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ left: -20, right: 10, top: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={24}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
              <Line
                type="monotone"
                dataKey="Foydalanuvchilar"
                stroke="#818cf8"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#818cf8", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="To'lovlar"
                stroke="#34d399"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#34d399", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="Bitiruvchilar"
                stroke="#fbbf24"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#fbbf24", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:col-span-2"
        >
          <p className="mb-1 text-sm font-semibold text-white">To&apos;lovlar holati</p>
          <p className="mb-2 text-xs text-slate-500">Umumiy taqsimot</p>
          {statusBreakdown.length === 0 ? (
            <div className="flex h-56 items-center justify-center text-sm text-slate-500">
              To&apos;lovlar yo&apos;q
            </div>
          ) : (
            <>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<ChartTooltip />} />
                    <Pie
                      data={statusBreakdown}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      cornerRadius={6}
                      strokeWidth={0}
                    >
                      {statusBreakdown.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
                {statusBreakdown.map((entry) => (
                  <span
                    key={entry.name}
                    className="flex items-center gap-1.5 text-xs text-slate-400"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: entry.color }}
                    />
                    {entry.name}
                    <span className="font-medium text-slate-200">{entry.value}</span>
                  </span>
                ))}
              </div>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:col-span-3"
        >
          <p className="mb-1 text-sm font-semibold text-white">
            Top kurslar <span className="text-slate-500">(tushum bo&apos;yicha)</span>
          </p>
          <p className="mb-4 text-xs text-slate-500">Bekor qilinmagan to&apos;lovlar asosida</p>
          {topCourses.length === 0 ? (
            <div className="flex h-56 items-center justify-center text-sm text-slate-500">
              Ma&apos;lumot yo&apos;q
            </div>
          ) : (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCourses} margin={{ left: -20, right: 10, top: 10 }}>
                  <defs>
                    <linearGradient id="courseBarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                  <XAxis
                    dataKey="title"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={24}
                    tickFormatter={(v: number) =>
                      v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : `${Math.round(v / 1000)}k`
                    }
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  />
                  <Bar
                    dataKey="revenue"
                    name="Tushum"
                    fill="url(#courseBarGradient)"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map(({ label, value, icon: Icon, gradient, wide, tab }) => {
          const clickable = Boolean(tab);
          return (
            <motion.button
              key={label}
              type="button"
              variants={item}
              whileHover={clickable ? { y: -4 } : undefined}
              onClick={clickable ? () => onNavigate(tab!) : undefined}
              disabled={!clickable}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left backdrop-blur-xl transition-colors ${
                clickable
                  ? "cursor-pointer hover:border-white/20"
                  : "cursor-default"
              } ${wide ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div
                aria-hidden
                className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-2xl`}
              />
              <div className="relative flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
                  >
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="text-xl font-bold text-white">{value}</p>
                  </div>
                </div>
                {clickable && (
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-300"
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
