import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Maxfiylik siyosati",
  description: "Ifora Isaqova platformasining maxfiylik siyosati.",
};

const SECTIONS = [
  {
    title: "1. Qanday maʼlumotlarni yigʻamiz",
    text: "Roʻyxatdan oʻtishda ism, familiya, telefon raqami va (ixtiyoriy) email manzilingizni, shuningdek kurslardagi faoliyatingiz haqidagi maʼlumotlarni yigʻamiz.",
  },
  {
    title: "2. Maʼlumotlardan qanday foydalanamiz",
    text: "Yigʻilgan maʼlumotlar hisobingizni yuritish, kurs jarayonini kuzatish, siz bilan bogʻlanish va xizmat sifatini yaxshilash uchun ishlatiladi.",
  },
  {
    title: "3. Maʼlumotlarning xavfsizligi",
    text: "Parolingiz shifrlangan holda saqlanadi. Toʻlov kartasi maʼlumotlari platformada saqlanmaydi — toʻlovlar toʻgʻridan-toʻgʻri bank orqali amalga oshiriladi.",
  },
  {
    title: "4. Uchinchi tomonlar bilan almashish",
    text: "Sizning shaxsiy maʼlumotlaringiz sizning roziligingizsiz uchinchi tomonlarga sotilmaydi yoki berilmaydi, qonun talab qilgan holatlar bundan mustasno.",
  },
  {
    title: "5. Sizning huquqlaringiz",
    text: "Istalgan vaqtda oʻz maʼlumotlaringizni koʻrish, yangilash yoki oʻchirishni soʻrash huquqiga egasiz — buning uchun Aloqa sahifasi orqali murojaat qiling.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <div className="container-custom max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Hujjat
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Maxfiylik siyosati
          </h1>
          <p className="mt-4 text-sm text-ink-soft">Oxirgi yangilanish: 2026-yil</p>

          <div className="mt-10 flex flex-col gap-8">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-lg font-bold text-ink">
                  {section.title}
                </h2>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
