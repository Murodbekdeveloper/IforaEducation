import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Foydalanish shartlari",
  description: "Ifora Isaqova platformasidan foydalanish shartlari.",
};

const SECTIONS = [
  {
    title: "1. Umumiy qoidalar",
    text: "Ushbu shartlar Ifora Isaqova (“Platforma”) veb-saytidan foydalanuvchilar (“Foydalanuvchi”) uchun tartib-qoidalarni belgilaydi. Platformadan foydalanish orqali siz ushbu shartlarga rozilik bildirasiz.",
  },
  {
    title: "2. Roʻyxatdan oʻtish",
    text: "Kurslarga yozilish uchun Foydalanuvchi haqiqiy shaxsiy maʼlumotlarni koʻrsatib roʻyxatdan oʻtishi kerak. Hisob maʼlumotlarining maxfiyligi uchun Foydalanuvchi javobgar hisoblanadi.",
  },
  {
    title: "3. Toʻlov va qaytarish",
    text: "Kurs narxlari sayt boʻyicha koʻrsatilgan. Toʻlov qabul qilingandan soʻng kursga kirish imkoni beriladi. Qaytarish shartlari individual tartibda administratsiya bilan kelishiladi.",
  },
  {
    title: "4. Intellektual mulk",
    text: "Platformadagi barcha video darslar, matnlar va materiallar Ifora Isaqovaga tegishli boʻlib, ularni ruxsatsiz nusxalash yoki tarqatish taqiqlanadi.",
  },
  {
    title: "5. Javobgarlikni cheklash",
    text: "Platforma taqdim etilgan bilimlardan foydalanish natijasida yuzaga kelishi mumkin boʻlgan har qanday moliyaviy yoki boshqa natijalar uchun kafolat bermaydi.",
  },
  {
    title: "6. Shartlarning oʻzgarishi",
    text: "Platforma ushbu shartlarni istalgan vaqtda yangilash huquqini oʻzida saqlab qoladi. Yangilangan shartlar saytda eʼlon qilingan kundan boshlab kuchga kiradi.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <div className="container-custom max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Hujjat
          </span>
          <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Foydalanish shartlari
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
