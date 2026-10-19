"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { StudentProfile } from "@/lib/types";

export default function DashboardShell({
  profile,
  unreadCount,
  children,
}: {
  profile: StudentProfile;
  unreadCount: number;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-cream">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-brand), transparent 70%)" }}
        />
        <div
          className="absolute -right-32 top-1/3 h-[26rem] w-[26rem] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-gold), transparent 70%)" }}
        />
      </div>

      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} profile={profile} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          profile={profile}
          unreadCount={unreadCount}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="flex-1 px-5 py-7 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
