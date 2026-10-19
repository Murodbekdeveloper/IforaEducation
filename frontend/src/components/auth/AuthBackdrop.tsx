"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AuthBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function handleMove(e: PointerEvent) {
      el!.style.setProperty("--spot-x", `${e.clientX}px`);
      el!.style.setProperty("--spot-y", `${e.clientY}px`);
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#120b0a]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(640px circle at var(--spot-x, 50%) var(--spot-y, 20%), rgba(231,200,115,0.10), transparent 72%)",
        }}
      />

      <motion.div
        className="absolute -left-24 -top-40 h-[36rem] w-[36rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(122,46,59,0.65), transparent 70%)" }}
        animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(201,162,39,0.4), transparent 70%)" }}
        animate={{ x: [0, -55, 0], y: [0, 35, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[-12rem] left-1/4 h-[30rem] w-[30rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(181,70,47,0.45), transparent 70%)" }}
        animate={{ x: [0, 45, 0], y: [0, -35, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-10 right-1/4 h-[22rem] w-[22rem] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(156,74,87,0.4), transparent 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,247,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,247,241,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
        <filter id="auth-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#auth-grain)" />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(10,6,6,0.65) 100%)",
        }}
      />
    </div>
  );
}
