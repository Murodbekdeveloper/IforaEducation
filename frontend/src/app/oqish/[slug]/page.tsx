import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CourseLearningView from "@/components/learning/CourseLearningView";
import { getCourseBySlug, getEnrolledCourses } from "@/lib/api";

export async function generateMetadata(
  props: PageProps<"/oqish/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Dars topilmadi | Ifora Isaqova" };
  return { title: `${course.title} — dars | Ifora Isaqova` };
}

export default async function LearningPage(props: PageProps<"/oqish/[slug]">) {
  const { slug } = await props.params;
  const [course, enrolledCourses] = await Promise.all([
    getCourseBySlug(slug),
    getEnrolledCourses(),
  ]);

  if (!course) notFound();

  const enrolled = enrolledCourses.find((c) => c.slug === slug);

  return <CourseLearningView course={course} enrolled={enrolled} />;
}
