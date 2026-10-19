"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Ban,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Mail,
  Phone,
  Wallet,
  X,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";
import { formatDateTime } from "@/lib/format";
import type { AdminStudentPayment, OrderStatus } from "@/lib/types";

const STATUS_META: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: "Kutilmoqda", className: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
  CONFIRMED: { label: "Tasdiqlangan", className: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
  CANCELLED: { label: "Bekor qilingan", className: "bg-rose-500/15 text-rose-300 border-rose-400/30" },
};

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} so'm`;
}

function recomputeCourses(payment: AdminStudentPayment): AdminStudentPayment {
  const byCourse = new Map<string, { paidAmount: number }>();
  for (const o of payment.orders) {
    const course = payment.courses.find((c) => c.courseSlug === o.courseSlug);
    if (!course) continue;
    if (!byCourse.has(course.courseId)) byCourse.set(course.courseId, { paidAmount: 0 });
    if (o.status === "CONFIRMED") {
      byCourse.get(course.courseId)!.paidAmount += o.amount;
    }
  }
  const courses = payment.courses.map((c) => {
    const paidAmount = byCourse.get(c.courseId)?.paidAmount ?? 0;
    const paidPercent =
      c.coursePrice > 0 ? Math.min(100, Math.round((paidAmount / c.coursePrice) * 100)) : 0;
    return { ...c, paidAmount, paidPercent };
  });
  return {
    ...payment,
    courses,
    totalPaid: courses.reduce((sum, c) => sum + c.paidAmount, 0),
  };
}

export default function AdminStudentPaymentsModal({
  payment,
  onClose,
  onUpdate,
}: {
  payment: AdminStudentPayment;
  onClose: () => void;
  onUpdate: (updated: AdminStudentPayment) => void;
}) {
  const [busyOrderId, setBusyOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateOrderStatus(orderId: string, status: OrderStatus) {
    setBusyOrderId(orderId);
    setError(null);
    try {
      await adminFetch(`/orders/${orderId}`, { method: "PATCH", body: { status } });
      const updatedOrders = payment.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o,
      );
      onUpdate(recomputeCourses({ ...payment, orders: updatedOrders }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xatolik yuz berdi.");
    } finally {
      setBusyOrderId(null);
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      >
        <motion.div
          key="panel"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0f18] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
        >
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="p-6 sm:p-7">
            <div className="flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg">
                {payment.avatarInitial}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {payment.firstName} {payment.lastName}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Phone size={12} /> {payment.phone}
                  </span>
                  {payment.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail size={12} /> {payment.email}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Wallet size={12} /> {formatCurrency(payment.totalPaid)}
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
                {error}
              </p>
            )}

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-white">
                Kurslar boʻyicha toʻlov holati
                <span className="ml-1.5 text-slate-500">({payment.courses.length})</span>
              </p>
              <div className="space-y-3">
                {payment.courses.map((c) => (
                  <div
                    key={c.courseId}
                    className={`rounded-xl border p-4 ${
                      c.overdue || c.dueSoon
                        ? "border-amber-400/30 bg-amber-500/[0.06]"
                        : c.completed
                          ? "border-emerald-400/30 bg-emerald-500/[0.06]"
                          : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white">{c.courseTitle}</p>
                      <div className="flex items-center gap-1.5">
                        {c.completed && (
                          <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
                            <GraduationCap size={11} /> Tugatgan
                          </span>
                        )}
                        {c.overdue && (
                          <span className="flex items-center gap-1 rounded-full border border-rose-400/30 bg-rose-500/15 px-2 py-0.5 text-xs font-medium text-rose-300">
                            <AlertTriangle size={11} /> Muddati oʻtgan
                          </span>
                        )}
                        {!c.overdue && c.dueSoon && (
                          <span className="flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-300">
                            <AlertTriangle size={11} /> Muddat yaqin
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${c.paidPercent}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`h-full rounded-full ${
                          c.paidPercent >= 100
                            ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                            : "bg-gradient-to-r from-indigo-400 to-violet-500"
                        }`}
                      />
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1 text-xs text-slate-400">
                      <span>
                        {formatCurrency(c.paidAmount)} / {formatCurrency(c.coursePrice)} (
                        {c.paidPercent}%)
                      </span>
                      {c.nextDueAt && !c.completed && c.paidPercent < 100 && (
                        <span className="text-slate-500">
                          Keyingi toʻlov: {formatDateTime(c.nextDueAt)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-white">
                Toʻlovlar tarixi
                <span className="ml-1.5 text-slate-500">({payment.orders.length})</span>
              </p>
              <div className="space-y-2">
                {payment.orders.map((o) => (
                  <div
                    key={o.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{o.courseTitle}</p>
                      <p className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar size={11} /> {formatDateTime(o.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-300">{formatCurrency(o.amount)}</span>
                      <span
                        className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_META[o.status].className}`}
                      >
                        {STATUS_META[o.status].label}
                      </span>
                      <div className="flex gap-1">
                        {o.status !== "CONFIRMED" && (
                          <button
                            onClick={() => updateOrderStatus(o.id, "CONFIRMED")}
                            disabled={busyOrderId === o.id}
                            title="Tasdiqlash"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 transition-colors hover:bg-emerald-500/20 disabled:opacity-40 cursor-pointer"
                          >
                            <CheckCircle2 size={13} />
                          </button>
                        )}
                        {o.status !== "CANCELLED" && (
                          <button
                            onClick={() => updateOrderStatus(o.id, "CANCELLED")}
                            disabled={busyOrderId === o.id}
                            title="Bekor qilish"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-rose-400/30 bg-rose-500/10 text-rose-300 transition-colors hover:bg-rose-500/20 disabled:opacity-40 cursor-pointer"
                          >
                            <Ban size={13} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
