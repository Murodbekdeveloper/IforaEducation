"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton({
  className,
  iconSize = 18,
}: {
  className?: string;
  iconSize?: number;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button onClick={handleLogout} className={className}>
      <LogOut size={iconSize} />
      Tizimdan chiqish
    </button>
  );
}
