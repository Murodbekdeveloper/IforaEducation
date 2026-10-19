"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CourseFaqItem } from "@/lib/types";

function FaqItem({ item }: { item: CourseFaqItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
      >
        <span className="font-medium text-ink">{item.question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CourseFaq({ faq }: { faq: CourseFaqItem[] }) {
  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Koʻp soʻraladigan savollar
        </h2>

        <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {faq.map((item) => (
            <FaqItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
