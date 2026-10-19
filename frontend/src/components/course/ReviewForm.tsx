"use client";

import { useState } from "react";
import { CircleCheck, Star } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100/api";

export default function ReviewForm({ courseTitle }: { courseTitle: string }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, course: courseTitle, rating, text }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
    } catch {
      setError("Sharh yuborilmadi. Birozdan keyin qayta urinib koʻring.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-2.5 rounded-3xl border border-border bg-cream-soft p-8 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CircleCheck size={22} />
        </span>
        <p className="font-semibold text-ink">Sharhingiz uchun rahmat!</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-cream-soft p-6 sm:p-8"
    >
      <p className="font-semibold text-ink">Bu kurs haqida fikr qoldiring</p>

      <div className="mt-4 flex items-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const value = i + 1;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              aria-label={`${value} yulduz`}
              className="cursor-pointer text-gold"
            >
              <Star size={22} fill={value <= rating ? "currentColor" : "none"} strokeWidth={1.5} />
            </button>
          );
        })}
      </div>

      <label className="mt-4 block text-sm font-medium text-ink-soft">Ismingiz</label>
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-3 text-sm text-ink outline-none focus:border-brand"
      />

      <label className="mt-4 block text-sm font-medium text-ink-soft">Fikringiz</label>
      <textarea
        required
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-1.5 w-full resize-none rounded-xl border border-border bg-cream px-3.5 py-3 text-sm text-ink outline-none focus:border-brand"
      />

      {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      >
        {submitting ? "Yuborilmoqda..." : "Sharh qoldirish"}
      </button>
    </form>
  );
}
