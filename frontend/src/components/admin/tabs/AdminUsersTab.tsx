"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ShieldPlus, UserRound } from "lucide-react";
import { adminFetch } from "@/lib/admin-fetch";
import { formatDateTime } from "@/lib/format";
import type { AdminUser } from "@/lib/types";
import AdminUserProfileModal from "../AdminUserProfileModal";

export default function AdminUsersTab({
  initialUsers,
  currentUserId,
}: {
  initialUsers: AdminUser[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.phone} ${u.email ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [users, query]);

  async function promote(userId: string) {
    setBusyId(userId);
    setError(null);
    try {
      await adminFetch(`/admin/users/${userId}/role`, {
        method: "PATCH",
        body: { role: "ADMIN" },
      });
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Xatolik yuz berdi.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white">
          Foydalanuvchilar <span className="text-slate-500">({users.length})</span>
        </h2>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 sm:w-72">
          <Search size={15} className="text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ism, telefon, email..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-300">
          {error}
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 font-medium">Foydalanuvchi</th>
                <th className="px-5 py-3 font-medium">Telefon</th>
                <th className="px-5 py-3 font-medium">Ro&apos;yxatdan o&apos;tgan</th>
                <th className="px-5 py-3 font-medium">Kurslar</th>
                <th className="px-5 py-3 font-medium">To&apos;lovlar</th>
                <th className="px-5 py-3 font-medium text-right">Amal</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.02, 0.4) }}
                  onClick={() => setSelectedUserId(u.id)}
                  className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.05]"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-semibold text-white">
                        {u.avatarInitial}
                      </span>
                      <div>
                        <p className="font-medium text-white">
                          {u.firstName} {u.lastName}
                        </p>
                        <p className="text-xs text-slate-500">{u.email ?? "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-300">{u.phone}</td>
                  <td className="px-5 py-3 text-slate-400">{formatDateTime(u.joinedAt)}</td>
                  <td className="px-5 py-3 text-slate-300">{u.enrollmentsCount}</td>
                  <td className="px-5 py-3 text-slate-300">{u.ordersCount}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        promote(u.id);
                      }}
                      disabled={busyId === u.id || u.id === currentUserId}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                    >
                      <ShieldPlus size={13} />
                      {busyId === u.id ? "..." : "Admin qilish"}
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-slate-500">
            <UserRound size={28} />
            <p className="text-sm">Foydalanuvchi topilmadi</p>
          </div>
        )}
      </div>

      {selectedUserId && (
        <AdminUserProfileModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
        />
      )}
    </div>
  );
}
