import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminConsole from "@/components/admin/AdminConsole";
import { getCurrentUser } from "@/lib/session";
import {
  getAdminAdmins,
  getAdminCompletions,
  getAdminOrders,
  getAdminOverview,
  getAdminPayments,
  getAdminUsers,
} from "@/lib/api";
import type { AdminOverview } from "@/lib/types";

const EMPTY_OVERVIEW: AdminOverview = {
  studentsCount: 0,
  adminsCount: 0,
  ordersConfirmed: 0,
  ordersPending: 0,
  revenueTotal: 0,
  leadsUncontacted: 0,
  messagesUnread: 0,
  testimonialsPending: 0,
  coursesCount: 0,
  liveSessionsLive: 0,
};

export const metadata: Metadata = {
  title: "Admin Console | Ifora Isaqova",
};

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return <AdminLoginForm />;
  }

  const [overview, users, orders, admins, completions, payments] =
    await Promise.all([
      getAdminOverview(),
      getAdminUsers(),
      getAdminOrders(),
      getAdminAdmins(),
      getAdminCompletions(),
      getAdminPayments(),
    ]);

  return (
    <AdminConsole
      user={user}
      overview={overview ?? EMPTY_OVERVIEW}
      users={users ?? []}
      orders={orders ?? []}
      admins={admins ?? []}
      completions={completions ?? []}
      payments={payments ?? []}
    />
  );
}
