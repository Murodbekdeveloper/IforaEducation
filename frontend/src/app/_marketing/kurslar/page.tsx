import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseCatalog from "@/components/course-catalog/CourseCatalog";
import { getCourses } from "@/lib/api";

export const metadata: Metadata = {
  title: "Barcha kurslar | Ifora Isaqova",
  description:
    "Ifora Isaqova akademiyasidagi barcha tikuvchilik kurslarini koʻring va oʻzingizga mos yoʻnalishni tanlang.",
};

export default async function CoursesCatalogPage() {
  const courses = await getCourses();

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-14 pb-8 md:pt-20">
          <div className="container-custom text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Kurslar
            </span>
            <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Barcha kurslarimiz
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              Boshlangʻichdan professional darajagacha — sizga mos tikuvchilik
              yoʻnalishini tanlang va bugunoq oʻrganishni boshlang.
            </p>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-custom">
            <CourseCatalog courses={courses} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
