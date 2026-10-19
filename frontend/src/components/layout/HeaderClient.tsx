"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Scissors, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import { AuthUser } from "@/lib/types";
import LogoutButton from "@/components/dashboard/LogoutButton";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function HeaderClient({ user }: { user: AuthUser | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_4px_24px_-8px_rgba(36,28,26,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom flex h-[72px] items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-cream shadow-sm">
            <Scissors size={18} strokeWidth={2.25} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-bold tracking-tight text-ink">
              Ifora
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Tikuvchilik akademiyasi
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-brand"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {user ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 transition-colors hover:bg-cream-soft"
            >
              <span className="font-display flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-cream">
                {user.avatarInitial}
              </span>
              <span className="text-sm font-semibold text-ink">
                Kabinetim
              </span>
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:text-brand"
              >
                Kirish
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-cream shadow-[0_8px_20px_-6px_rgba(122,46,59,0.55)] transition-transform hover:scale-[1.03] hover:bg-brand-dark active:scale-[0.98]"
              >
                Ro&apos;yxatdan o&apos;tish
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            aria-label="Menyu"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink cursor-pointer"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-cream lg:hidden"
          >
            <div className="container-custom flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink-soft transition-colors hover:bg-cream-soft hover:text-brand"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="w-full rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-cream"
                    >
                      Kabinetim
                    </Link>
                    <LogoutButton
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-center text-sm font-semibold text-ink cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="w-full rounded-full border border-border px-5 py-3 text-center text-sm font-semibold text-ink"
                    >
                      Kirish
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="w-full rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-cream"
                    >
                      Ro&apos;yxatdan o&apos;tish
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
