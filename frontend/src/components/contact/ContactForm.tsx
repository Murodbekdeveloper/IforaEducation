"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4100/api";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("failed");
      setDone(true);
    } catch {
      setError("Xabar yuborilmadi. Birozdan keyin qayta urinib koʻring.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-cream p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
          <CircleCheck size={24} />
        </span>
        <p className="font-display text-lg font-bold text-ink">
          Xabaringiz yuborildi!
        </p>
        <p className="text-sm text-ink-soft">
          Tez orada siz bilan bogʻlanamiz.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-cream p-7 sm:p-8"
    >
      <label className="block text-sm font-medium text-ink-soft">Ismingiz</label>
      <input
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-3 text-sm text-ink outline-none focus:border-brand"
      />

      <label className="mt-4 block text-sm font-medium text-ink-soft">Email</label>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-3 text-sm text-ink outline-none focus:border-brand"
      />

      <label className="mt-4 block text-sm font-medium text-ink-soft">Xabar</label>
      <textarea
        required
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mt-1.5 w-full resize-none rounded-xl border border-border bg-cream px-3.5 py-3 text-sm text-ink outline-none focus:border-brand"
      />

      {error && <p className="mt-3 text-sm text-terracotta">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-brand py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      >
        {submitting ? "Yuborilmoqda..." : "Xabar yuborish"}
      </button>
    </form>
  );
}
