"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { StudentProfile } from "@/lib/types";
import { formatDate } from "@/lib/format";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function ProfileForm({ profile }: { profile: StudentProfile }) {
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <motion.form
      initial="hidden"
      animate="show"
      variants={container}
      onSubmit={handleSubmit}
      className="relative max-w-xl overflow-hidden rounded-2xl border border-border/70 bg-surface p-6 shadow-[0_1px_2px_rgba(36,28,26,0.04),0_16px_32px_-20px_rgba(36,28,26,0.1)] sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-gradient-to-br from-gold-light/15 to-transparent blur-3xl"
      />

      <motion.div variants={item} className="relative flex items-center gap-4">
        <span className="font-display relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-xl font-bold text-cream shadow-[0_8px_20px_-6px_rgba(122,46,59,0.5)]">
          {profile.avatarInitial}
          <span
            aria-hidden
            className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-br from-gold-light to-gold opacity-60 blur-md"
          />
        </span>
        <div>
          <p className="font-semibold text-ink">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-ink-soft">
            Aʼzo boʻlgan sana: {formatDate(profile.joinedAt)}
          </p>
        </div>
      </motion.div>

      <motion.div variants={item} className="relative mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-ink-soft">Ism</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-soft">Familiya</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-soft">Telefon raqam</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-soft">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </div>
      </motion.div>

      <motion.div variants={item} className="relative mt-7 flex items-center gap-4">
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-full bg-gradient-to-r from-brand to-brand-dark px-6 py-3 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(122,46,59,0.6)] transition-opacity cursor-pointer"
        >
          Saqlash
        </motion.button>
        <AnimatePresence>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex items-center gap-1.5 text-sm font-medium text-brand"
            >
              <CircleCheck size={16} />
              Maʼlumotlar yangilandi
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.form>
  );
}
