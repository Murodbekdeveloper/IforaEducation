"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldMinus, ShieldOff } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";
import { formatDateTime } from "@/lib/format";
import type { AdminAccount } from "@/lib/types";

export default function AdminAccountsTab({
  initialAdmins,
  currentUserId,
}: {
  initialAdmins: AdminAccount[];
  currentUserId: string;
}) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function demote(adminId: string) {
    setBusyId(adminId);
    setError(null);
    try {
      await adminFetch(`/admin/users/${adminId}/role`, {
        method: "PATCH",
        body: { role: "STUDENT" },
      });
      setAdmins((prev) => prev.filter((a) => a.id !== adminId));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xatolik yuz berdi.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Admin hisoblar <span className="text-slate-500">({admins.length})</span>
        </h2>
      </div>

      {error && (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {admins.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.05, 0.4) }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div
              aria-hidden
              className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 opacity-20 blur-2xl"
            />
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-semibold text-white shadow-lg">
                  {a.avatarInitial}
                </span>
                <div>
                  <p className="font-medium text-white">
                    {a.firstName} {a.lastName}
                  </p>
                  <p className="text-xs text-slate-500">{a.email ?? a.phone}</p>
                </div>
              </div>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <ShieldCheck size={13} />
              </span>
            </div>

            <p className="relative mt-4 text-xs text-slate-500">
              Qo&apos;shilgan: {formatDateTime(a.joinedAt)}
            </p>

            <button
              onClick={() => demote(a.id)}
              disabled={busyId === a.id || a.id === currentUserId}
              title={a.id === currentUserId ? "O'zingizni pasaytira olmaysiz" : "Admin huquqini olib tashlash"}
              className="relative mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-300 transition-colors hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
            >
              <ShieldMinus size={13} />
              {busyId === a.id ? "..." : "Admin huquqini olib tashlash"}
            </button>
          </motion.div>
        ))}
      </div>

      {admins.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-12 text-slate-500">
          <ShieldOff size={28} />
          <p className="text-sm">Admin topilmadi</p>
        </div>
      )}
    </div>
  );
}
