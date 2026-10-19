"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, CircleCheck, Copy, Sparkles } from "lucide-react";
import { formatSom } from "@/lib/format";
import { PaymentInfo } from "@/lib/api";

function formatCardNumber(value: string): string {
  return value.replace(/(.{4})/g, "$1 ").trim();
}

export default function PaymentFlow({
  courseSlug,
  courseTitle,
  price,
  oldPrice,
  discountPercent = 0,
  paymentInfo,
  defaultFullName,
  defaultPhone,
}: {
  courseSlug: string;
  courseTitle: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  paymentInfo: PaymentInfo;
  defaultFullName: string;
  defaultPhone: string;
}) {
  const finalPrice =
    discountPercent > 0
      ? Math.round((price * (100 - discountPercent)) / 100 / 1000) * 1000
      : price;
  const [fullName, setFullName] = useState(defaultFullName);
  const [phone, setPhone] = useState(defaultPhone);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCopy() {
    await navigator.clipboard.writeText(paymentInfo.cardNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, courseSlug }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Buyurtma yuborishda xatolik yuz berdi.");
        setSubmitting(false);
        return;
      }

      setDone(true);
    } catch {
      setError("Serverga ulanib boʻlmadi. Birozdan keyin urinib koʻring.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl bg-cream p-10 text-center shadow-xl">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CircleCheck size={28} />
        </span>
        <h1 className="font-display text-xl font-bold text-ink">
          Arizangiz qabul qilindi!
        </h1>
        <p className="text-sm text-ink-soft">
          Toʻlovingiz tasdiqlangach kurs darhol &ldquo;Kurslarim&rdquo;
          boʻlimida ochiladi. Hozircha kursga oldindan kirish imkoni
          berildi — toʻlovni tasdiqlash uchun operatorimiz siz bilan
          bogʻlanishi mumkin.
        </p>
        <Link
          href="/dashboard/kurslarim"
          className="mt-3 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark"
        >
          Kurslarimga oʻtish
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-border bg-cream p-7">
        <p className="text-sm font-semibold text-ink-soft">Toʻlov summasi</p>
        <div className="mt-1.5 flex items-baseline gap-2">
          {(oldPrice || discountPercent > 0) && (
            <span className="text-sm text-ink-soft line-through">
              {formatSom(oldPrice ?? price)}
            </span>
          )}
          <span className="font-display text-2xl font-bold text-ink">
            {formatSom(finalPrice)}
          </span>
        </div>
        <p className="mt-1 text-xs text-ink-soft">{courseTitle}</p>

        {discountPercent > 0 && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-brand/10 px-3.5 py-2.5 text-xs font-medium text-brand">
            <Sparkles size={14} className="shrink-0" />
            Mukofot dasturi orqali yigʻgan ballaringiz uchun {discountPercent}%
            chegirma qoʻllanildi
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-5 text-cream">
          <p className="text-xs uppercase tracking-wide text-cream/70">
            Toʻlov kartasi
          </p>
          <p className="font-display mt-2 text-xl tracking-[0.15em]">
            {formatCardNumber(paymentInfo.cardNumber)}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-cream/60">
                Karta egasi
              </p>
              <p className="text-sm font-medium">{paymentInfo.cardHolder}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-cream/60">
                Amal qilish
              </p>
              <p className="text-sm font-medium">{paymentInfo.cardExpiry}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand cursor-pointer"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Nusxalandi" : "Karta raqamini nusxalash"}
        </button>

        <p className="mt-4 text-xs leading-relaxed text-ink-soft">
          Yuqoridagi karta raqamiga koʻrsatilgan summani oʻtkazing, soʻng
          oʻng tomondagi formani toʻldirib &ldquo;Toʻlov qildim&rdquo;
          tugmasini bosing.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="h-fit rounded-3xl border border-border bg-cream p-7"
      >
        <h2 className="font-display text-lg font-bold text-ink">
          Toʻlovni tasdiqlash
        </h2>

        <label className="mt-5 block text-sm font-medium text-ink-soft">
          Toʻliq ismingiz
        </label>
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-3 text-sm text-ink outline-none focus:border-brand"
        />

        <label className="mt-4 block text-sm font-medium text-ink-soft">
          Telefon raqam
        </label>
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+998 90 123 45 67"
          className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-3 text-sm text-ink outline-none focus:border-brand"
        />

        {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          {submitting ? "Yuborilmoqda..." : "Toʻlov qildim"}
        </button>
      </form>
    </div>
  );
}
