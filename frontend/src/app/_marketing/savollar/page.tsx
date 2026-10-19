import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CourseFaq from "@/components/course/CourseFaq";

export const metadata: Metadata = {
  title: "Koʻp soʻraladigan savollar",
  description: "Ifora Isaqova platformasi haqida koʻp beriladigan savollar.",
};

const FAQ = [
  {
    question: "Kursga qanday yozilaman?",
    answer:
      "Roʻyxatdan oʻting, kerakli kursni tanlang va \"Sotib olish\" tugmasi orqali toʻlov sahifasiga oʻting. Toʻlovni tasdiqlagach kurs \"Kurslarim\" boʻlimida ochiladi.",
  },
  {
    question: "Toʻlovni qanday amalga oshiraman?",
    answer:
      "Toʻlov sahifasida koʻrsatilgan karta raqamiga oʻtkazma qiling va \"Toʻlov qildim\" tugmasini bosing. Bank orqali tasdiqlangach kursga toʻliq kirish beriladi.",
  },
  {
    question: "Darslarni istalgan vaqtda koʻrish mumkinmi?",
    answer:
      "Ha, barcha video darslar shaxsiy kabinetingizda istalgan vaqtda mavjud boʻladi, oʻzingizga qulay tezlikda oʻrganishingiz mumkin.",
  },
  {
    question: "Kursni tugatgach sertifikat olamanmi?",
    answer:
      "Ha, kursni toʻliq yakunlab, yakuniy loyihani topshirgan barcha talabalarga akademiyaning rasmiy sertifikati beriladi.",
  },
  {
    question: "Parolimni unutsam nima qilaman?",
    answer:
      "Hozircha parolni tiklash funksiyasi ishlab chiqilmoqda. Shu vaqtgacha Aloqa sahifasi orqali murojaat qiling.",
  },
  {
    question: "Savollarim boʻlsa kimga murojaat qilaman?",
    answer:
      "Aloqa sahifasidagi forma yoki +998 90 123 45 67 raqami orqali biz bilan bogʻlanishingiz mumkin.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-14 md:pt-20">
        <div className="container-custom max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Yordam
          </span>
        </div>
        <CourseFaq faq={FAQ} />
      </main>
      <Footer />
    </>
  );
}
