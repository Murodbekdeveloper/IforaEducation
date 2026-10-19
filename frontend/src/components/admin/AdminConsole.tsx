"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";
import type {
  AdminAccount,
  AdminCompletion,
  AdminOrder,
  AdminOverview,
  AdminStudentPayment,
  AdminUser,
  AuthUser,
} from "@/lib/types";
import AdminDashboardTab from "./tabs/AdminDashboardTab";
import AdminUsersTab from "./tabs/AdminUsersTab";
import AdminPaymentsTab from "./tabs/AdminPaymentsTab";
import AdminAccountsTab from "./tabs/AdminAccountsTab";

type TabKey = "dashboard" | "users" | "payments" | "admins";

const TABS: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Umumiy statistika", icon: LayoutDashboard },
  { key: "users", label: "Foydalanuvchilar", icon: Users },
  { key: "payments", label: "To'lovlar", icon: CreditCard },
  { key: "admins", label: "Admin", icon: ShieldCheck },
];

interface AdminConsoleProps {
  user: AuthUser;
  overview: AdminOverview;
  users: AdminUser[];
  orders: AdminOrder[];
  admins: AdminAccount[];
  completions: AdminCompletion[];
  payments: AdminStudentPayment[];
}

export default function AdminConsole({
  user,
  overview,
  users,
  orders,
  admins,
  completions,
  payments,
}: AdminConsoleProps) {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("dashboard");
  const [loggingOut, setLoggingOut] = useState(false);

  const fullName = useMemo(() => `${user.firstName} ${user.lastName}`.trim(), [user]);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#07080d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-[0_8px_20px_-6px_rgba(99,102,241,0.6)]">
              <ShieldCheck size={20} />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Admin Console</p>
              <p className="text-xs text-slate-500">Ifora Isaqova platformasi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-white">{fullName || "Admin"}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
              {user.avatarInitial}
            </span>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-50 cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 pb-3 sm:px-8">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  active ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="admin-tab-pill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/90 to-violet-600/90 shadow-[0_6px_18px_-4px_rgba(99,102,241,0.6)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={15} className="relative z-10" />
                <span className="relative z-10">{label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {tab === "dashboard" && (
              <AdminDashboardTab
                overview={overview}
                users={users}
                orders={orders}
                completions={completions}
                onNavigate={setTab}
              />
            )}
            {tab === "users" && (
              <AdminUsersTab initialUsers={users} currentUserId={user.id} />
            )}
            {tab === "payments" && (
              <AdminPaymentsTab initialOrders={orders} initialPayments={payments} />
            )}
            {tab === "admins" && (
              <AdminAccountsTab initialAdmins={admins} currentUserId={user.id} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export type { TabKey };
