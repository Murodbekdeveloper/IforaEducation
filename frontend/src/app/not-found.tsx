import Link from "next/link";
import { Scissors } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
          <Scissors size={28} />
        </span>
        <p className="font-display text-6xl font-bold text-ink">404</p>
        <h1 className="font-display text-2xl font-bold text-ink">
          Sahifa topilmadi
        </h1>
        <p className="max-w-sm text-ink-soft">
          Siz izlagan sahifa mavjud emas yoki koʻchirilgan boʻlishi mumkin.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark"
        >
          Bosh sahifaga qaytish
        </Link>
      </main>
      <Footer />
    </>
  );
}
