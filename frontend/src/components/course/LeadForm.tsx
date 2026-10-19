"use client";

import { useState } from "react";
import { AtSign, CircleCheck } from "lucide-react";
import { formatUzPhone, isCompleteUzPhone } from "@/lib/phone";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100/api";

export default function LeadForm({ courseSlug }: { courseSlug: string }) {
  const [phoneDigits, setPhoneDigits] = useState("");
  const [telegram, setTelegram] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const canSubmit = isCompleteUzPhone(phoneDigits) && status !== "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    await fetch(`${API_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: `+998${phoneDigits}`,
        telegramUsername: telegram || undefined,
        courseSlug,
      }),
    }).catch(() => undefined);
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl bg-cream p-8 text-center shadow-xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CircleCheck size={24} />
        </span>
        <p className="font-display text-lg font-bold text-ink">Arizangiz qabul qilindi!</p>
        <p className="text-sm text-ink-soft">
          Tez orada mutaxassislarimiz siz bilan bogʻlanishadi.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl bg-cream p-6 shadow-xl sm:p-7"
    >
      <p className="text-sm font-semibold text-ink">Ariza qoldiring</p>

      <label className="mt-4 block text-xs font-medium text-ink-soft">
        Telefon raqamingiz
      </label>
      <div className="mt-1.5 flex items-stretch overflow-hidden rounded-xl border border-border bg-cream focus-within:border-brand">
        <span className="flex items-center gap-1.5 border-r border-border px-3 text-sm font-medium text-ink">
          🇺🇿 +998
        </span>
        <input
          type="tel"
          inputMode="numeric"
          value={formatUzPhone(phoneDigits)}
          onChange={(e) => setPhoneDigits(e.target.value.replace(/\D/g, ""))}
          placeholder="90 123 45 67"
          className="w-full bg-transparent px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/50"
        />
      </div>

      <label className="mt-3.5 block text-xs font-medium text-ink-soft">
        Telegram username
      </label>
      <div className="mt-1.5 flex items-stretch overflow-hidden rounded-xl border border-border bg-cream focus-within:border-brand">
        <span className="flex items-center border-r border-border px-3 text-ink-soft">
          <AtSign size={15} />
        </span>
        <input
          type="text"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          placeholder="username"
          className="w-full bg-transparent px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/50"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-5 w-full rounded-full bg-brand py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand cursor-pointer"
      >
        {status === "loading" ? "Yuborilmoqda..." : "Ariza qoldirish"}
      </button>
    </form>
  );
}
