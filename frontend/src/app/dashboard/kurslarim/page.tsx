import MyCoursesView from "@/components/dashboard/MyCoursesView";
import { getCourses, getEnrolledCourses } from "@/lib/api";

export default async function MyCoursesPage() {
  const [courses, allCourses] = await Promise.all([getEnrolledCourses(), getCourses()]);
  const enrolledSlugs = new Set(courses.map((c) => c.slug));
  const availableCourses = allCourses.filter((c) => !enrolledSlugs.has(c.slug));

  return <MyCoursesView courses={courses} availableCourses={availableCourses} />;
}
