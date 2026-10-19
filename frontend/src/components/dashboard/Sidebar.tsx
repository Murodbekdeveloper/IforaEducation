"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BookMarked,
  Calendar,
  LayoutDashboard,
  Radio,
  Scissors,
  Trophy,
  User,
  X,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { StudentProfile } from "@/lib/types";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Jonli efir", href: "/dashboard/jonli-efir", icon: Radio },
  { label: "Dars jadvali", href: "/dashboard/jadval", icon: Calendar },
  { label: "Kurslarim", href: "/dashboard/kurslarim", icon: BookMarked },
  { label: "Natijalarim", href: "/dashboard/natijalarim", icon: Trophy },
  { label: "Xabarnomalar", href: "/dashboard/xabarnomalar", icon: Bell },
  { label: "Profilim", href: "/dashboard/profilim", icon: User },
];

export default function Sidebar({
  mobileOpen,
  onClose,
  profile,
}: {
  mobileOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
}) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            aria-hidden
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col overflow-y-auto border-r border-border/70 bg-cream transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-cream shadow-[0_4px_14px_-4px_rgba(122,46,59,0.5)]">
              <Scissors size={16} strokeWidth={2.25} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-bold text-ink">Ifora</span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-ink-soft">
                Talaba kabineti
              </span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Yopish"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft lg:hidden cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="relative flex flex-1 flex-col gap-1 px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "text-cream" : "text-ink-soft hover:bg-cream-soft hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand to-brand-dark shadow-[0_6px_16px_-6px_rgba(122,46,59,0.55)]"
                  />
                )}
                <Icon size={18} className="relative" />
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/70 px-3 py-4">
          <div className="mb-2 flex items-center gap-2.5 rounded-xl px-3 py-2">
            <span className="font-display flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-gold text-xs font-bold text-ink shadow-sm">
              {profile.avatarInitial}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium text-ink">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="truncate text-[11px] text-ink-soft">Talaba</p>
            </div>
          </div>
          <LogoutButton className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-cream-soft hover:text-brand cursor-pointer" />
        </div>
      </aside>
    </>
  );
}
