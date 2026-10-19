"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Search,
  Wallet,
} from "lucide-react";
import type { AdminOrder, AdminStudentPayment } from "@/lib/types";
import AdminStudentPaymentsModal from "../AdminStudentPaymentsModal";

function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} so'm`;
}

export default function AdminPaymentsTab({
  initialOrders,
  initialPayments,
}: {
  initialOrders: AdminOrder[];
  initialPayments: AdminStudentPayment[];
}) {
  const [orders] = useState(initialOrders);
  const [payments, setPayments] = useState(initialPayments);
  const [query, setQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return payments;
    return payments.filter((p) =>
      `${p.firstName} ${p.lastName} ${p.phone} ${p.email ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [payments, query]);

  const totals = useMemo(() => {
    const confirmed = orders.filter((o) => o.status === "CONFIRMED");
    return {
      revenue: confirmed.reduce((sum, o) => sum + o.amount, 0),
      confirmedCount: confirmed.length,
      pendingCount: orders.filter((o) => o.status === "PENDING").length,
    };
  }, [orders]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2.5 text-emerald-300">
            <Wallet size={16} />
            <p className="text-xs text-slate-400">Jami tushum</p>
          </div>
          <p className="mt-1 text-xl font-bold text-white">{formatCurrency(totals.revenue)}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2.5 text-emerald-300">
            <CheckCircle2 size={16} />
            <p className="text-xs text-slate-400">Tasdiqlangan</p>
          </div>
          <p className="mt-1 text-xl font-bold text-white">{totals.confirmedCount}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-2.5 text-amber-300">
            <Clock3 size={16} />
            <p className="text-xs text-slate-400">Kutilayotgan</p>
          </div>
          <p className="mt-1 text-xl font-bold text-white">{totals.pendingCount}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-white">
          Talabalar boʻyicha toʻlovlar{" "}
          <span className="text-slate-500">({payments.length})</span>
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

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 font-medium">Talaba</th>
                <th className="px-5 py-3 font-medium">Kurslar</th>
                <th className="px-5 py-3 font-medium">Jami toʻlangan</th>
                <th className="px-5 py-3 font-medium">Holat</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.02, 0.4) }}
                  onClick={() => setSelectedStudentId(p.id)}
                  className="cursor-pointer border-b border-white/5 transition-colors hover:bg-white/[0.05]"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-semibold text-white">
                        {p.avatarInitial}
                      </span>
                      <div>
                        <p className="font-medium text-white">
                          {p.firstName} {p.lastName}
                        </p>
                        <p className="text-xs text-slate-500">{p.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-300">{p.courses.length}</td>
                  <td className="px-5 py-3 text-slate-300">{formatCurrency(p.totalPaid)}</td>
                  <td className="px-5 py-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {p.hasDueSoon && (
                        <span className="flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-300">
                          <AlertTriangle size={11} />
                          Toʻlov muddati
                        </span>
                      )}
                      {p.hasCompleted && (
                        <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300">
                          <GraduationCap size={11} />
                          Kursni tugatgan
                        </span>
                      )}
                      {!p.hasDueSoon && !p.hasCompleted && (
                        <span className="text-xs text-slate-500">—</span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-slate-500">
            <Wallet size={28} />
            <p className="text-sm">Toʻlov topilmadi</p>
          </div>
        )}
      </div>

      {selectedStudentId && (
        <AdminStudentPaymentsModal
          payment={payments.find((p) => p.id === selectedStudentId)!}
          onClose={() => setSelectedStudentId(null)}
          onUpdate={(updated) =>
            setPayments((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p)),
            )
          }
        />
      )}
    </div>
  );
}
