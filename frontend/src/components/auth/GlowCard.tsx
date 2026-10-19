"use client";

import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";

export default function GlowCard({
  children,
  maxWidthClassName = "max-w-md",
}: {
  children: ReactNode;
  maxWidthClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;
    ref.current.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative w-full ${maxWidthClassName} overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#1b1210]/90 p-8 backdrop-blur-2xl sm:p-10`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(260px circle at var(--sx, 50%) var(--sy, 0%), rgba(231,200,115,0.12), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-gold-light/20 to-transparent blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-brand-light/25 to-transparent blur-2xl"
      />

      <div className="relative">{children}</div>
    </motion.div>
  );
}
