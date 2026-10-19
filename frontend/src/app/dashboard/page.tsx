import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { getEnrolledCourses, getNotifications, getStudentOverview } from "@/lib/api";

export default async function DashboardPage() {
  const [overview, courses, notifications] = await Promise.all([
    getStudentOverview(),
    getEnrolledCourses(),
    getNotifications(),
  ]);

  return (
    <DashboardOverview overview={overview} courses={courses} notifications={notifications} />
  );
}
