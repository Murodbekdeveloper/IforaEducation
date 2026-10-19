import { Medal, Scissors } from "lucide-react";
import { CourseWithDetail } from "@/lib/types";

export default function CourseCertificate({ course }: { course: CourseWithDetail }) {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div
          className="flex flex-col items-center gap-12 rounded-[2.5rem] p-8 sm:p-12 lg:flex-row lg:justify-between"
          style={{
            background: "linear-gradient(150deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
          }}
        >
          <div className="max-w-md text-center lg:text-left">
            <h2 className="font-display text-2xl font-bold text-cream sm:text-3xl">
              Sertifikatli boʻling!
            </h2>
            <p className="mt-3 text-cream/75">
              Kursni toʻliq yakunlab, yakuniy loyihani topshirgan barcha
              talabalarimizga akademiyaning rasmiy sertifikati taqdim etiladi.
            </p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Sertifikat namunasini koʻrish
            </a>
          </div>

          <div className="relative shrink-0">
            <div className="relative w-64 rotate-[-4deg] rounded-2xl border-2 border-gold-light/50 bg-cream p-6 shadow-2xl">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-cream">
                  <Scissors size={14} />
                </span>
                <span className="font-display text-sm font-bold text-ink">Ifora</span>
              </div>

              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-soft">
                Sertifikat
              </p>
              <p className="font-display mt-2 text-lg font-bold leading-snug text-ink">
                {course.title}
              </p>

              <div className="needle-stitch mt-5" />

              <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                Kursni muvaffaqiyatli yakunlagani uchun beriladi
              </p>
              <p className="font-display mt-3 text-sm italic text-brand">Ifora Isaqova</p>
            </div>

            <span className="absolute -right-4 -top-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-brand-dark shadow-xl">
              <Medal size={22} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
