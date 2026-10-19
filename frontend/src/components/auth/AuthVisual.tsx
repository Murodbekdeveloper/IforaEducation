"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, Users } from "lucide-react";

export default function AuthVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 150, damping: 22 });
  const sy = useSpring(my, { stiffness: 150, damping: 22 });
  const rotateX = useTransform(sy, [0, 1], [5, -5]);
  const rotateY = useTransform(sx, [0, 1], [-5, 5]);

  const zoom = useSpring(1.07, { stiffness: 120, damping: 20, mass: 0.6 });

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
    zoom.set(1.07);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => zoom.set(1.14)}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1400 }}
      className="relative hidden h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_50px_110px_-30px_rgba(0,0,0,0.75)] lg:block"
    >
      <motion.div style={{ scale: zoom }} className="absolute inset-0">
        <Image
          src="/images/ifora-isaqova.jpg"
          alt=""
          fill
          priority
          quality={95}
          sizes="(min-width: 1024px) 50vw, 0px"
          className="object-cover"
          style={{ objectPosition: "50% 20%" }}
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(175deg, rgba(18,11,10,0.1) 0%, rgba(22,13,13,0.32) 55%, rgba(10,6,6,0.88) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(251,247,241,0.9) 1px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      <span aria-hidden className="absolute left-[14%] top-[18%] h-1.5 w-1.5 rounded-full bg-gold-light opacity-80" />
      <span aria-hidden className="absolute bottom-[32%] right-[12%] h-1.5 w-1.5 rounded-full bg-media-light/70" />

      <div
        style={{ transform: "translateZ(40px)" }}
        className="absolute left-7 top-7 flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 text-media-light backdrop-blur-md"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-light/20 text-gold-light">
          <Users size={16} />
        </div>
        <div className="leading-tight">
          <p className="font-display text-base font-bold">6 000+</p>
          <p className="text-[11px] text-media-light/70">Bitiruvchi</p>
        </div>
      </div>

      <div
        style={{ transform: "translateZ(50px)" }}
        className="absolute right-7 top-24 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.07] px-3.5 py-2.5 text-media-light backdrop-blur-md"
      >
        <Star size={15} className="fill-gold-light text-gold-light" />
        <p className="text-sm font-semibold">4.9 reyting</p>
      </div>

      <div
        style={{ transform: "translateZ(50px)" }}
        className="absolute bottom-7 left-7 right-7 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] p-4 text-media-light backdrop-blur-md"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-light/25 text-sm font-bold text-gold-light">
          I
        </span>
        <div className="leading-snug">
          <p className="font-display text-base font-bold text-media-light">Ifora Isaqova</p>
          <p className="text-[11px] text-media-light/60">
            Platforma asoschisi, tikuvchilik ustasi
          </p>
        </div>
      </div>
    </motion.div>
  );
}
