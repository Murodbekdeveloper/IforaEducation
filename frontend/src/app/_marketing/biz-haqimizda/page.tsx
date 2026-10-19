import type { Metadata } from "next";
import Image from "next/image";
import { Award, NotebookPen, Sparkles, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import { getFounder, getStats } from "@/lib/api";
import { formatNumber } from "@/lib/format";

const VALUES = [
  {
    icon: NotebookPen,
    title: "Amaliy ta'lim",
    description:
      "Har bir dars nazariyadan koʻra amaliyotga yoʻnaltirilgan — birinchi haftadanoq qoʻlingizga qaychi va ignani olasiz.",
  },
  {
    icon: Users,
    title: "Individual yondashuv",
    description:
      "Kichik guruhlar va shaxsiy fikr-mulohaza orqali har bir shogirdning oʻz sur'atida oʻrganishi taʼminlanadi.",
  },
  {
    icon: Sparkles,
    title: "Real loyihalar",
    description:
      "Mashq uchun emas, balki kiyish uchun tikasiz — har bir kurs oxirida tayyor, kiyishga yaroqli buyum bilan chiqasiz.",
  },
  {
    icon: Award,
    title: "Rasmiy sertifikat",
    description:
      "Kursni yakunlagach, kasbiy faoliyatingizda va portfolioingizda ishlatishingiz mumkin boʻlgan sertifikat olasiz.",
  },
];

const TIMELINE = [
  {
    year: "2011",
    title: "Kasbiy yoʻl boshlandi",
    description:
      "Ifora Isaqova tikuvchilik sohasida mustaqil faoliyatini boshladi va birinchi shaxsiy atelyesini ochdi.",
  },
  {
    year: "2019",
    title: "Milliy moda haftaligi gʻolibi",
    description:
      "Milliy uslubdagi zamonaviy kolleksiyasi bilan respublika miqyosidagi tanlovda gʻolib boʻldi.",
  },
  {
    year: "2021",
    title: "Onlayn taʼlim boshlandi",
    description:
      "Yillar davomida toʻplangan tajriba onlayn kurslar shakliga oʻtkazildi — endi istalgan hududdan oʻrganish mumkin boʻldi.",
  },
  {
    year: "Bugun",
    title: "O'zbekistondagi yetakchi platforma",
    description:
      "Minglab shogird, oʻnlab kurs yoʻnalishi va real ish topgan bitiruvchilar bilan akademiya oʻsishda davom etmoqda.",
  },
];

export const metadata: Metadata = {
  title: "Biz haqimizda",
  description:
    "Ifora Isaqova tikuvchilik akademiyasi haqida — bizning maqsadimiz va yoʻlimiz.",
};

export default async function AboutPage() {
  const [founder, stats] = await Promise.all([getFounder(), getStats()]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="pt-14 pb-16 md:pt-20">
          <div className="container-custom max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Biz haqimizda
            </span>
            <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Har bir shogird — mustaqil kasb egasi
            </h1>
            <p className="mt-5 leading-relaxed text-ink-soft">
              Ifora Isaqova akademiyasi — Oʻzbekistonda tikuvchilik kasbini
              amaliy, tushunarli va natijaga yoʻnaltirilgan tarzda
              oʻrgatuvchi onlayn platforma. Bizning maqsadimiz — har bir
              shogirdni noldan boshlab mustaqil ishlaydigan, oʻz
              buyurtmalarini qabul qila oladigan tikuvchiga aylantirish.
            </p>
          </div>
        </section>

        <section className="pb-16">
          <div className="container-custom grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <p className="font-display text-3xl font-bold text-ink">
                  {formatNumber(stat.value)}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-24">
          <div className="container-custom grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full ring-4 ring-gold/40">
              <Image
                src="/images/ifora-isaqova.jpg"
                alt={founder.name}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {founder.name}
              </h2>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand">
                {founder.role}
              </p>
              <p className="mt-4 leading-relaxed text-ink-soft">
                {founder.bio}
              </p>
              <p className="font-display mt-5 text-lg italic text-ink">
                &ldquo;{founder.quote}&rdquo;
              </p>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Qadriyatlarimiz
              </span>
              <h2 className="font-display mt-3 text-2xl font-bold text-ink sm:text-3xl">
                Nega aynan bizni tanlashadi
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-cream p-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <value.icon size={20} />
                  </span>
                  <p className="font-display mt-4 font-bold text-ink">{value.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream-soft py-24">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Tariximiz
              </span>
              <h2 className="font-display mt-3 text-2xl font-bold text-ink sm:text-3xl">
                Bizning yoʻlimiz
              </h2>
            </div>

            <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-8">
              {TIMELINE.map((item, index) => (
                <div key={item.year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-xs font-bold text-cream">
                      {item.year}
                    </span>
                    {index < TIMELINE.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="font-display font-bold text-ink">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA primaryHref="/kurslar" secondaryHref="/aloqa" />
      </main>
      <Footer />
    </>
  );
}
