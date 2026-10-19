import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Courses from "@/components/sections/Courses";
import StudentGallery from "@/components/sections/StudentGallery";
import Founder from "@/components/sections/Founder";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { getCourses, getFounder, getStats, getTestimonials } from "@/lib/api";

export default async function Home() {
  const [courses, stats, founder, testimonials] = await Promise.all([
    getCourses(),
    getStats(),
    getFounder(),
    getTestimonials(),
  ]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats stats={stats} />
        <Courses courses={courses} />
        <StudentGallery courses={courses} />
        <Founder founder={founder} />
        <Testimonials testimonials={testimonials} />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
