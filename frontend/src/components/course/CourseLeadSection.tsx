import LeadForm from "./LeadForm";

export default function CourseLeadSection({ courseSlug }: { courseSlug: string }) {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex flex-col items-center gap-10 rounded-3xl bg-cream-soft p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Kurs haqida batafsil maʼlumot olishni istaysizmi?
            </h2>
            <p className="mt-3 text-ink-soft">
              Maʼlumotlaringizni qoldiring, mutaxassislarimiz siz bilan bogʻlanishadi.
            </p>
          </div>
          <LeadForm courseSlug={courseSlug} />
        </div>
      </div>
    </section>
  );
}
