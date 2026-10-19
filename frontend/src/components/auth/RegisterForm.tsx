"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Lock, Phone, User } from "lucide-react";
import { formatUzPhone, isCompleteUzPhone } from "@/lib/phone";
import GlowCard from "./GlowCard";

type Step = "info" | "password";

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("info");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const infoComplete =
    firstName.trim().length > 1 && lastName.trim().length > 1 && isCompleteUzPhone(phoneDigits);

  function handleContinue() {
    if (!infoComplete) return;
    setStep("password");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone: phoneDigits,
          password,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Roʻyxatdan oʻtishda xatolik yuz berdi.");
        setSubmitting(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Serverga ulanib boʻlmadi. Birozdan keyin urinib koʻring.");
      setSubmitting(false);
    }
  }

  return (
    <GlowCard>
      <div className="relative mb-7 flex items-center gap-1.5">
        <motion.span
          layout
          className="h-1.5 rounded-full bg-gold-light"
          animate={{ width: step === "info" ? 28 : 14 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          layout
          className="h-1.5 rounded-full"
          animate={{
            width: step === "password" ? 28 : 14,
            backgroundColor: step === "password" ? "var(--color-gold-light)" : "rgba(255,255,255,0.15)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === "info" ? (
          <motion.div
            key="info"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative"
          >
            <motion.h1
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              animate="show"
              className="font-display text-2xl font-bold text-media-light"
            >
              Roʻyxatdan oʻting
            </motion.h1>

            <motion.div
              custom={0.08}
              variants={fieldVariants}
              initial="hidden"
              animate="show"
              className="mt-7 grid grid-cols-2 gap-3"
            >
              <div>
                <label className="block text-sm font-medium text-media-light/60">Ism</label>
                <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border border-white/15 bg-white/5 transition-all focus-within:border-gold-light/60 focus-within:shadow-[0_0_0_4px_rgba(231,200,115,0.12)]">
                  <span className="flex items-center pl-3 text-gold-light">
                    <User size={14} />
                  </span>
                  <input
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Mohira"
                    className="w-full bg-transparent px-2.5 py-3 text-sm text-media-light outline-none placeholder:text-media-light/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-media-light/60">Familiya</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Yusupova"
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-media-light outline-none transition-all placeholder:text-media-light/30 focus:border-gold-light/60 focus:shadow-[0_0_0_4px_rgba(231,200,115,0.12)]"
                />
              </div>
            </motion.div>

            <motion.label
              custom={0.14}
              variants={fieldVariants}
              initial="hidden"
              animate="show"
              className="mt-4 block text-sm font-medium text-media-light/60"
            >
              Telefon raqam
            </motion.label>
            <motion.div
              custom={0.18}
              variants={fieldVariants}
              initial="hidden"
              animate="show"
              className="mt-2 flex items-stretch overflow-hidden rounded-xl border border-white/15 bg-white/5 transition-all focus-within:border-gold-light/60 focus-within:shadow-[0_0_0_4px_rgba(231,200,115,0.12)]"
            >
              <span className="flex items-center gap-1.5 border-r border-white/10 px-3.5 text-sm font-medium text-media-light/80">
                <Phone size={14} className="text-gold-light" /> +998
              </span>
              <input
                type="tel"
                inputMode="numeric"
                value={formatUzPhone(phoneDigits)}
                onChange={(e) => setPhoneDigits(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleContinue();
                }}
                placeholder="90 123 45 67"
                className="w-full bg-transparent px-3.5 py-3 text-sm text-media-light outline-none placeholder:text-media-light/30"
              />
            </motion.div>

            <motion.button
              custom={0.24}
              variants={fieldVariants}
              initial="hidden"
              animate="show"
              onClick={handleContinue}
              disabled={!infoComplete}
              whileHover={infoComplete ? { scale: 1.015 } : undefined}
              whileTap={infoComplete ? { scale: 0.98 } : undefined}
              className="group relative mt-6 w-full overflow-hidden rounded-full bg-gradient-to-r from-brand-light via-brand to-brand-dark py-3.5 text-sm font-semibold text-media-light shadow-[0_8px_30px_-8px_rgba(122,46,59,0.7)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">Davom etish</span>
            </motion.button>

            <motion.p
              custom={0.3}
              variants={fieldVariants}
              initial="hidden"
              animate="show"
              className="mt-5 text-center text-sm text-media-light/60"
            >
              Hisobingiz bormi?{" "}
              <Link href="/login" className="font-semibold text-gold-light hover:underline">
                Kirish
              </Link>
            </motion.p>
          </motion.div>
        ) : (
          <motion.form
            key="password"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setStep("info")}
              className="mb-5 -ml-1 flex items-center gap-1.5 text-sm text-media-light/50 transition-colors hover:text-gold-light cursor-pointer"
            >
              <ArrowLeft size={15} />
              {firstName} {lastName}
            </button>

            <h1 className="font-display text-2xl font-bold text-media-light">Parol yarating</h1>

            <label className="mt-7 block text-sm font-medium text-media-light/60">Parol</label>
            <div className="mt-2 flex items-stretch overflow-hidden rounded-xl border border-white/15 bg-white/5 transition-all focus-within:border-gold-light/60 focus-within:shadow-[0_0_0_4px_rgba(231,200,115,0.12)]">
              <span className="flex items-center pl-3.5 text-gold-light">
                <Lock size={14} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kamida 6 ta belgi"
                className="w-full bg-transparent px-3.5 py-3 text-sm text-media-light outline-none placeholder:text-media-light/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                className="flex items-center px-3.5 text-media-light/50 transition-colors hover:text-gold-light cursor-pointer"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-sm text-terracotta"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={password.length < 6 || submitting}
              whileHover={password.length >= 6 && !submitting ? { scale: 1.015 } : undefined}
              whileTap={password.length >= 6 && !submitting ? { scale: 0.98 } : undefined}
              className="group relative mt-6 w-full overflow-hidden rounded-full bg-gradient-to-r from-brand-light via-brand to-brand-dark py-3.5 text-sm font-semibold text-media-light shadow-[0_8px_30px_-8px_rgba(122,46,59,0.7)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              />
              <span className="relative">{submitting ? "Yuborilmoqda..." : "Roʻyxatdan oʻtish"}</span>
            </motion.button>

            <p className="mt-5 text-center text-xs text-media-light/45">
              Roʻyxatdan oʻtish orqali siz foydalanish shartlariga rozilik bildirasiz.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </GlowCard>
  );
}
