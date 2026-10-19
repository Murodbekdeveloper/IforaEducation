"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ChevronDown, Menu, Search, User } from "lucide-react";
import { StudentProfile } from "@/lib/types";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Topbar({
  profile,
  unreadCount,
  onMenuClick,
}: {
  profile: StudentProfile;
  unreadCount: number;
  onMenuClick: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border/70 bg-cream/80 px-5 py-3.5 backdrop-blur-md sm:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Menyu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink lg:hidden cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-cream-soft/60 px-3.5 py-2 text-sm text-ink-soft transition-colors focus-within:border-brand/40 sm:flex">
          <Search size={15} />
          <span>Kurs yoki darsni qidirish...</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <ThemeToggle />
        <Link
          href="/dashboard/xabarnomalar"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-soft hover:text-brand"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-terracotta to-brand text-[10px] font-semibold text-cream"
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-brand"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative">{unreadCount}</span>
            </motion.span>
          )}
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-cream-soft cursor-pointer"
          >
            <span className="font-display flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-sm font-bold text-cream shadow-sm">
              {profile.avatarInitial}
            </span>
            <span className="hidden text-sm font-medium text-ink sm:block">
              {profile.firstName}
            </span>
            <ChevronDown
              size={14}
              className={`text-ink-soft transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div
                  aria-hidden
                  onClick={() => setMenuOpen(false)}
                  className="fixed inset-0 z-10"
                />
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-border/70 bg-cream py-1.5 shadow-xl"
                >
                  <Link
                    href="/dashboard/profilim"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-soft hover:bg-cream-soft hover:text-ink"
                  >
                    <User size={15} />
                    Profilim
                  </Link>
                  <LogoutButton
                    iconSize={15}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-ink-soft hover:bg-cream-soft hover:text-brand cursor-pointer"
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
