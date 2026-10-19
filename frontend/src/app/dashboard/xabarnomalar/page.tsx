import NotificationsView from "@/components/dashboard/NotificationsView";
import { getNotifications } from "@/lib/api";

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return <NotificationsView notifications={notifications} />;
}
