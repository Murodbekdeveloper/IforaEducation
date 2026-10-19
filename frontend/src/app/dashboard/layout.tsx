import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getNotifications, getStudentOverview } from "@/lib/api";

export const metadata: Metadata = {
  title: "Talaba kabineti | Ifora Isaqova",
};

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const [{ profile }, notifications] = await Promise.all([
    getStudentOverview(),
    getNotifications(),
  ]);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardShell profile={profile} unreadCount={unreadCount}>
      {children}
    </DashboardShell>
  );
}
