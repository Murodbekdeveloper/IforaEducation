import ScheduleView from "@/components/dashboard/ScheduleView";
import { getSchedule } from "@/lib/api";

export default async function SchedulePage() {
  const schedule = await getSchedule();

  return <ScheduleView schedule={schedule} />;
}
