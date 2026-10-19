import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseHero from "@/components/course/CourseHero";
import CourseOutcomes from "@/components/course/CourseOutcomes";
import CourseAbout from "@/components/course/CourseAbout";
import CourseFormat from "@/components/course/CourseFormat";
import CourseLeadSection from "@/components/course/CourseLeadSection";
import CourseAudience from "@/components/course/CourseAudience";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import CourseProjects from "@/components/course/CourseProjects";
import CourseCertificate from "@/components/course/CourseCertificate";
import CourseSkills from "@/components/course/CourseSkills";
import CourseInstructor from "@/components/course/CourseInstructor";
import CoursePricing from "@/components/course/CoursePricing";
import CourseFaq from "@/components/course/CourseFaq";
import ReviewForm from "@/components/course/ReviewForm";
import RelatedCourses from "@/components/course/RelatedCourses";
import { getCourseBySlug, getCourses } from "@/lib/api";

export async function generateMetadata(
  props: PageProps<"/kurslar/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Kurs topilmadi | Ifora Isaqova" };
  return {
    title: `${course.title} | Ifora Isaqova`,
    description: course.description,
  };
}

export default async function CoursePage(props: PageProps<"/kurslar/[slug]">) {
  const { slug } = await props.params;
  const [course, allCourses] = await Promise.all([
    getCourseBySlug(slug),
    getCourses(),
  ]);

  if (!course) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <CourseHero course={course} />
        <CourseOutcomes outcomes={course.detail.outcomes} />
        <CourseAbout about={course.detail.about} />
        <CourseFormat format={course.detail.format} />
        <CourseLeadSection courseSlug={course.slug} />
        <CourseAudience audience={course.detail.audience} />
        <CourseCurriculum course={course} />
        <CourseProjects projects={course.detail.projects} />
        <CourseCertificate course={course} />
        <CourseSkills skills={course.detail.skills} tools={course.detail.tools} />
        <CourseInstructor instructor={course.detail.instructor} />
        <CoursePricing course={course} />
        <CourseLeadSection courseSlug={course.slug} />
        <CourseFaq faq={course.detail.faq} />
        <section className="pb-24">
          <div className="container-custom max-w-2xl">
            <ReviewForm courseTitle={course.title} />
          </div>
        </section>
        <RelatedCourses
          courses={allCourses}
          currentSlug={course.slug}
          category={course.category}
        />
      </main>
      <Footer />
    </>
  );
}
