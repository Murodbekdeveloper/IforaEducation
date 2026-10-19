import { getStudentOverview } from "@/lib/api";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const { profile } = await getStudentOverview();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Profilim</h1>
        <p className="mt-1 text-ink-soft">Shaxsiy maʼlumotlaringizni koʻring va yangilang</p>
      </div>

      <ProfileForm profile={profile} />
    </div>
  );
}
