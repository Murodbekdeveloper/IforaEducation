import { Course } from "@/lib/types";
import CourseCard from "@/components/sections/CourseCard";

export default function RelatedCourses({
  courses,
  currentSlug,
  category,
}: {
  courses: Course[];
  currentSlug: string;
  category: string;
}) {
  const related = courses
    .filter((c) => c.slug !== currentSlug && c.category === category)
    .slice(0, 4);

  const list = related.length > 0
    ? related
    : courses.filter((c) => c.slug !== currentSlug).slice(0, 4);

  if (list.length === 0) return null;

  return (
    <section className="pb-24">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Oʻxshash kurslar
        </h2>
        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
