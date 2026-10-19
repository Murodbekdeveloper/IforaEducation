import type { Metadata } from "next";
import Link from "next/link";
import { Scissors } from "lucide-react";
import RegisterForm from "@/components/auth/RegisterForm";
import AuthVisual from "@/components/auth/AuthVisual";
import AuthBackdrop from "@/components/auth/AuthBackdrop";

export const metadata: Metadata = {
  title: "Roʻyxatdan oʻtish | Ifora Isaqova",
  description: "Ifora Isaqova tikuvchilik akademiyasida roʻyxatdan oʻting.",
};

export default function RegisterPage() {
  return (
    <div
      data-theme="dark"
      className="relative flex min-h-screen flex-col overflow-hidden px-5 py-6 sm:px-10"
    >
      <AuthBackdrop />

      <Link href="/" className="relative z-10 flex items-center gap-2.5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-media-light shadow-[0_0_20px_-2px_rgba(231,200,115,0.5)]">
          <Scissors size={18} strokeWidth={2.25} />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-xl font-bold tracking-tight text-media-light">
            Ifora
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-media-light/50">
            Tikuvchilik akademiyasi
          </span>
        </span>
      </Link>

      <div className="relative z-10 flex flex-1 items-center justify-center py-10 lg:justify-between lg:gap-14 lg:px-6 xl:px-16">
        <div className="flex w-full justify-center lg:w-auto lg:justify-start">
          <RegisterForm />
        </div>
        <div className="hidden h-[600px] w-full max-w-xl lg:block">
          <AuthVisual />
        </div>
      </div>
    </div>
  );
}
