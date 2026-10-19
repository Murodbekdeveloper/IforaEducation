"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Quote } from "lucide-react";
import { Founder as FounderType } from "@/lib/types";
import { formatNumber } from "@/lib/format";

export default function Founder({ founder }: { founder: FounderType }) {
  return (
    <section id="asoschi" className="py-24">
      <div className="container-custom grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div
            className="aspect-[4/5] w-full rounded-[2.5rem] p-1.5"
            style={{
              background: "linear-gradient(160deg, var(--color-gold) 0%, var(--color-brand) 100%)",
            }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-cream-soft">
              <Image
                src="/images/ifora-isaqova.jpg"
                alt={founder.name}
                fill
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent px-6 pb-16 pt-16 text-center">
                <p className="font-display text-2xl font-bold text-cream">{founder.name}</p>
                <p className="mt-1 text-sm text-cream/85">{founder.role}</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 left-1/2 flex w-[85%] -translate-x-1/2 items-center justify-between rounded-2xl bg-cream px-6 py-4 shadow-[0_20px_40px_-16px_rgba(36,28,26,0.3)]">
            <div className="text-center">
              <p className="font-display text-xl font-bold text-ink">
                {founder.experienceYears}+
              </p>
              <p className="text-xs text-ink-soft">Yil tajriba</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center">
              <p className="font-display text-xl font-bold text-ink">
                {formatNumber(founder.studentsGraduated)}+
              </p>
              <p className="text-xs text-ink-soft">Shogird</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Bosh ustoz
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Platforma asoschisi bilan tanishing
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">{founder.bio}</p>

          <div className="mt-6 flex gap-3 rounded-2xl bg-cream-soft p-6">
            <Quote className="shrink-0 text-gold" size={28} />
            <p className="font-display text-lg italic leading-relaxed text-ink">
              {founder.quote}
            </p>
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {founder.achievements.map((achievement) => (
              <li key={achievement} className="flex items-start gap-3 text-sm text-ink-soft">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand" />
                {achievement}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
