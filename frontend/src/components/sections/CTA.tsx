"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA({
  primaryHref = "#kurslar",
  secondaryHref = "#aloqa",
}: {
  primaryHref?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center sm:px-16"
          style={{
            background: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-cream/5"
          />

          <h2 className="font-display relative mx-auto max-w-2xl text-3xl font-bold text-cream sm:text-4xl">
            Oʻz qoʻli bilan kiyim tikishni bugun boshlang
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-cream/80">
            Birinchi darsga bepul yoziling va Ifora Isaqova jamoasi bilan
            tikuvchilik sirlarini kashf eting.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={primaryHref}
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-brand shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Bepul darsga yozilish
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={secondaryHref}
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Aloqaga chiqish
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
