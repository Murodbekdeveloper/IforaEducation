"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Ribbon,
  Ruler,
  Sparkles,
  Users,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-24 md:pt-20 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 85% 8%, rgba(201,162,39,0.16) 0%, rgba(201,162,39,0) 70%), radial-gradient(55% 45% at 8% 18%, rgba(122,46,59,0.14) 0%, rgba(122,46,59,0) 70%)",
        }}
      />

      <div className="container-custom grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-cream-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
            <Sparkles size={14} />
            Oʻzbekistondagi 1-raqamli tikuvchilik akademiyasi
          </span>

          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
            Ifora Isaqova bilan{" "}
            <span className="text-gradient-gold">tikuvchilik</span> kasbini
            noldan mukammal darajada oʻrganing
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Amaliy darslar, tajribali ustozlar va real loyihalar orqali
            oʻz atelyeingizni ochish yoki mustaqil tikuvchi boʻlishga
            tayyorlanadigan davlat sertifikatlangan kurslar.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#kurslar"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-cream shadow-[0_14px_30px_-10px_rgba(122,46,59,0.6)] transition-transform hover:scale-[1.03] hover:bg-brand-dark active:scale-[0.98]"
            >
              Kursni tanlash
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-cream px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand cursor-pointer">
              <PlayCircle size={18} />
              Platforma haqida
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-border pt-6">
            <div>
              <p className="font-display text-2xl font-bold text-ink">12 400+</p>
              <p className="text-sm text-ink-soft">Bitirgan talabalar</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-bold text-ink">4.9/5</p>
              <p className="text-sm text-ink-soft">Oʻrtacha baho</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <p className="font-display text-2xl font-bold text-ink">40+</p>
              <p className="text-sm text-ink-soft">Kurs yoʻnalishi</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto flex aspect-[5/4.4] w-full max-w-md items-center justify-center"
        >
          <div
            aria-hidden
            className="absolute inset-4 rounded-[2.5rem]"
            style={{
              background:
                "linear-gradient(160deg, var(--color-cream-soft) 0%, var(--color-cream) 100%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 26, rotate: 18 }}
            animate={{ opacity: 1, y: 0, rotate: 10 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="absolute left-2 top-2 w-[40%] rounded-2xl bg-cream p-2.5 pb-4 shadow-xl sm:left-4"
          >
            <span
              aria-hidden
              className="absolute -top-2.5 left-1/2 h-5 w-12 -translate-x-1/2 -rotate-3 bg-gold/50"
            />
            <div
              className="flex aspect-square items-center justify-center rounded-xl"
              style={{
                background:
                  "linear-gradient(150deg, var(--color-terracotta) 0%, var(--color-gold) 100%)",
              }}
            >
              <Users size={30} className="text-cream" />
            </div>
            <p className="font-display mt-2.5 text-center text-xs italic leading-snug text-ink-soft">
              6 000+ shogird
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26, rotate: -20 }}
            animate={{ opacity: 1, y: 0, rotate: -12 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="absolute bottom-3 right-1 w-[38%] rounded-2xl bg-cream p-2.5 pb-4 shadow-xl sm:right-3"
          >
            <span
              aria-hidden
              className="absolute -top-2.5 left-1/2 h-5 w-12 -translate-x-1/2 rotate-2 bg-gold/50"
            />
            <div
              className="flex aspect-square items-center justify-center rounded-xl"
              style={{
                background:
                  "linear-gradient(150deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
              }}
            >
              <Ribbon size={30} className="text-cream" />
            </div>
            <p className="font-display mt-2.5 text-center text-xs italic leading-snug text-ink-soft">
              15 yil tajriba
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22, rotate: -7 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 w-[54%] rounded-2xl bg-cream p-3 pb-5 shadow-2xl"
          >
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-gold/60 shadow-sm"
            />
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex aspect-[4/5] flex-col items-center justify-end overflow-hidden rounded-xl text-center"
            >
              <Image
                src="/images/ifora-isaqova.jpg"
                alt="Ifora Isaqova"
                fill
                sizes="260px"
                className="object-cover"
                priority
              />
              <div className="relative w-full bg-gradient-to-t from-ink/90 via-ink/25 to-transparent px-4 pb-3 pt-10">
                <p className="font-display text-lg font-bold text-cream">
                  Ifora Isaqova
                </p>
                <p className="text-xs text-cream/80">Asoschi &amp; bosh ustoz</p>
              </div>
            </motion.div>
            <p className="font-display mt-3 text-center text-sm italic text-ink-soft">
              Tikuvchilik akademiyasi
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
            className="absolute -bottom-6 left-[16%] z-20 flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-full bg-gold text-brand-dark shadow-xl"
          >
            <Ruler size={15} />
            <p className="text-sm font-bold leading-none">40+</p>
            <p className="text-[9px] leading-none">yoʻnalish</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
