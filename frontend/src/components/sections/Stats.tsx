import { Award, BookOpen, GraduationCap, Users } from "lucide-react";
import { Stat } from "@/lib/types";
import CountUp from "@/components/ui/CountUp";

const ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  students: Users,
  mentors: GraduationCap,
  courses: BookOpen,
  satisfaction: Award,
};

export default function Stats({ stats }: { stats: Stat[] }) {
  return (
    <section className="border-y border-border bg-cream-soft/60">
      <div className="container-custom grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = ICONS[stat.id] ?? Award;
          return (
            <div key={stat.id} className="flex flex-col items-center gap-2 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Icon size={22} />
              </span>
              <p className="font-display text-3xl font-bold text-ink sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-ink-soft">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
