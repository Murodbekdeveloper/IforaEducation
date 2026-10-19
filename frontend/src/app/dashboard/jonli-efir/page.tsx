import LiveStreamView from "@/components/dashboard/LiveStreamView";
import { getCurrentLiveSession } from "@/lib/api";

export default async function LiveStreamPage() {
  const session = await getCurrentLiveSession();

  return <LiveStreamView initialSession={session} />;
}
