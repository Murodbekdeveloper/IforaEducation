"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  ShieldX,
  UserX,
  Wallet,
  X,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";
import { formatDateTime } from "@/lib/format";
import type { AdminUserDetail, OrderStatus } from "@/lib/types";

const STATUS_META: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: { label: "Kutilmoqda", className: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
  CONFIRMED: { label: "Tasdiqlangan", className: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
  CANCELLED: { label: "Bekor qilingan", className: "bg-rose-500/15 text-rose-300 border-rose-400/30" },
};

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} so'm`;
}

export default function AdminUserProfileModal({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const [detail, setDetail] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [confirmEnrollmentId, setConfirmEnrollmentId] = useState<string | null>(null);
  const [removingEnrollmentId, setRemovingEnrollmentId] = useState<string | null>(null);
  const [enrollmentError, setEnrollmentError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    adminFetch(`/admin/users/${userId}`)
      .then((data) => {
        if (cancelled) return;
        setDetail(data as AdminUserDetail);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setLoadError(e instanceof Error ? e.message : "Xatolik yuz berdi.");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMessage(null);
    setPasswordError(null);

    if (newPassword.length < 6) {
      setPasswordError("Parol kamida 6 belgidan iborat boʻlishi kerak.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Parollar mos kelmadi.");
      return;
    }

    setSavingPassword(true);
    try {
      await adminFetch(`/admin/users/${userId}/password`, {
        method: "PATCH",
        body: { password: newPassword },
      });
      setPasswordMessage("Yangi parol muvaffaqiyatli oʻrnatildi.");
      setNewPassword("");
      setConfirmPassword("");
      setDetail((prev) => (prev ? { ...prev, hasPassword: true } : prev));
    } catch (e) {
      setPasswordError(e instanceof Error ? e.message : "Xatolik yuz berdi.");
    } finally {
      setSavingPassword(false);
    }
  }

  async function handleRemoveEnrollment(enrollmentId: string) {
    setRemovingEnrollmentId(enrollmentId);
    setEnrollmentError(null);
    try {
      await adminFetch(`/admin/enrollments/${enrollmentId}`, { method: "DELETE" });
      setDetail((prev) =>
        prev
          ? { ...prev, enrollments: prev.enrollments.filter((e) => e.id !== enrollmentId) }
          : prev,
      );
      setConfirmEnrollmentId(null);
    } catch (e) {
      setEnrollmentError(e instanceof Error ? e.message : "Xatolik yuz berdi.");
    } finally {
      setRemovingEnrollmentId(null);
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

          {loading && (
            <div className="flex h-72 items-center justify-center text-sm text-slate-500">
              Yuklanmoqda...
            </div>
          )}

          {!loading && loadError && (
            <div className="flex h-72 items-center justify-center text-sm text-rose-400">
              {loadError}
            </div>
          )}

          {!loading && detail && (
            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg">
                  {detail.avatarInitial}
                </span>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {detail.firstName} {detail.lastName}
                  </h2>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Phone size={12} /> {detail.phone}
                    </span>
                    {detail.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail size={12} /> {detail.email}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {formatDateTime(detail.joinedAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <Lock size={14} className="text-indigo-400" />
                  Hisob xavfsizligi
                </p>
                <div className="mb-3 flex items-center gap-2 text-xs">
                  {detail.hasPassword ? (
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck size={13} /> Parol oʻrnatilgan
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-amber-300">
                      <ShieldX size={13} /> Parol oʻrnatilmagan
                    </span>
                  )}
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-500">
                    Xavfsizlik sababli mavjud parol koʻrsatilmaydi
                  </span>
                </div>

                <form onSubmit={handleSetPassword} className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Yangi parol"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="shrink-0 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Parolni tasdiqlang"
                      className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={savingPassword}
                      className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
                    >
                      {savingPassword ? "Saqlanmoqda..." : "Yangi parol oʻrnatish"}
                    </button>
                    {passwordMessage && (
                      <span className="text-xs text-emerald-300">{passwordMessage}</span>
                    )}
                    {passwordError && (
                      <span className="text-xs text-rose-400">{passwordError}</span>
                    )}
                  </div>
                </form>
              </div>

              <div className="mt-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <Wallet size={14} className="text-emerald-400" />
                  Toʻlovlar tarixi
                  <span className="text-slate-500">({detail.orders.length})</span>
                </p>
                {detail.orders.length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-500">
                    Toʻlovlar topilmadi
                  </p>
                ) : (
                  <div className="space-y-2">
                    {detail.orders.map((o) => (
                      <div
                        key={o.id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-white">{o.courseTitle}</p>
                          <p className="text-xs text-slate-500">{formatDateTime(o.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-300">{formatCurrency(o.amount)}</span>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_META[o.status].className}`}
                          >
                            {STATUS_META[o.status].label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <BookOpen size={14} className="text-violet-400" />
                  Kurslar progressi
                  <span className="text-slate-500">({detail.enrollments.length})</span>
                </p>
                {enrollmentError && (
                  <p className="mb-3 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
                    {enrollmentError}
                  </p>
                )}
                {detail.enrollments.length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-500">
                    Kurslarga yozilmagan
                  </p>
                ) : (
                  <div className="space-y-3">
                    {detail.enrollments.map((en) => (
                      <div
                        key={en.id}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-white">{en.courseTitle}</p>
                          {en.completedAt ? (
                            <span className="flex items-center gap-1 text-xs text-emerald-300">
                              <CheckCircle2 size={12} /> Bitirgan
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">
                              {en.progressPercent}%
                            </span>
                          )}
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${en.progressPercent}%` }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={`h-full rounded-full ${
                              en.completedAt
                                ? "bg-gradient-to-r from-emerald-400 to-teal-500"
                                : "bg-gradient-to-r from-indigo-400 to-violet-500"
                            }`}
                          />
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <p className="text-xs text-slate-500">
                            {en.completedLessons}/{en.totalLessons} dars
                            {en.completedAt && ` · ${formatDateTime(en.completedAt)}`}
                          </p>

                          {confirmEnrollmentId === en.id ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-rose-300">Rostdan ham?</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveEnrollment(en.id)}
                                disabled={removingEnrollmentId === en.id}
                                className="rounded-md bg-rose-500/20 px-2 py-1 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-500/30 disabled:opacity-50 cursor-pointer"
                              >
                                {removingEnrollmentId === en.id ? "..." : "Ha, uzish"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmEnrollmentId(null)}
                                disabled={removingEnrollmentId === en.id}
                                className="rounded-md bg-white/5 px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-white/10 cursor-pointer"
                              >
                                Bekor
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmEnrollmentId(en.id)}
                              className="flex items-center gap-1 rounded-md border border-rose-400/20 px-2 py-1 text-xs font-medium text-rose-400/80 transition-colors hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-300 cursor-pointer"
                            >
                              <UserX size={12} />
                              Kursdan uzish
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
