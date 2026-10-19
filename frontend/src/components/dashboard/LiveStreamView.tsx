"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hand, Mic, Radio, Send } from "lucide-react";
import { LiveChatMessage, LiveSession, SpeakRequestStatus } from "@/lib/types";
import { adminFetch } from "@/lib/admin-fetch";
import { formatDateTime } from "@/lib/format";

const MESSAGE_POLL_MS = 3000;
const SESSION_POLL_MS = 15000;
const SPEAK_POLL_MS = 5000;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function LiveStreamView({
  initialSession,
}: {
  initialSession: LiveSession | null;
}) {
  const [session, setSession] = useState<LiveSession | null>(initialSession);
  const [messages, setMessages] = useState<LiveChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [speakStatus, setSpeakStatus] = useState<SpeakRequestStatus | null>(null);
  const [requestingSpeak, setRequestingSpeak] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const poll = async () => {
      try {
        const next = (await adminFetch("/live/current")) as LiveSession | null;
        setSession(next);
      } catch {
      }
    };
    const interval = setInterval(poll, SESSION_POLL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    const poll = async () => {
      try {
        const next = (await adminFetch(`/live/${session.id}/messages`)) as LiveChatMessage[];
        if (!cancelled) setMessages(next);
      } catch {
      }
    };
    void poll();
    const interval = setInterval(poll, MESSAGE_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [session?.id]);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;

    const poll = async () => {
      try {
        const res = (await adminFetch(`/live/${session.id}/speak-requests/me`)) as {
          status: SpeakRequestStatus;
        } | null;
        if (!cancelled) setSpeakStatus(res?.status ?? null);
      } catch {
      }
    };
    void poll();
    const interval = setInterval(poll, SPEAK_POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [session?.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!session || draft.trim().length === 0 || sending) return;
    setSending(true);
    try {
      await adminFetch(`/live/${session.id}/messages`, {
        method: "POST",
        body: { message: draft.trim() },
      });
      setDraft("");
      const next = (await adminFetch(`/live/${session.id}/messages`)) as LiveChatMessage[];
      setMessages(next);
    } catch {
    } finally {
      setSending(false);
    }
  }

  async function handleRaiseHand() {
    if (!session || requestingSpeak) return;
    setRequestingSpeak(true);
    try {
      const res = (await adminFetch(`/live/${session.id}/speak-requests`, {
        method: "POST",
      })) as { status: SpeakRequestStatus };
      setSpeakStatus(res.status);
    } catch {
    } finally {
      setRequestingSpeak(false);
    }
  }

  if (!session) {
    return (
      <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col gap-6">
        <motion.div variants={item}>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Jonli efir</h1>
          <p className="mt-1 text-ink-soft">Ustoz bilan jonli darslar va savol-javob sessiyalari</p>
        </motion.div>
        <motion.div
          variants={item}
          className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-cream-soft p-12 text-center"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Radio size={26} />
          </span>
          <p className="font-display text-lg font-bold text-ink">Hozircha rejalashtirilgan efir yoʻq</p>
          <p className="max-w-sm text-sm text-ink-soft">
            Keyingi jonli dars boshlanganda shu sahifada avtomatik koʻrinadi.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  const isLive = session.status === "LIVE";
  const isEnded = session.status === "ENDED";

  return (
    <motion.div initial="hidden" animate="show" variants={container} className="flex flex-col gap-6">
      <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Jonli efir</h1>
          <p className="mt-1 text-ink-soft">Ustoz bilan jonli darslar va savol-javob sessiyalari</p>
        </div>
        {isLive && (
          <span className="flex items-center gap-2 rounded-full bg-gradient-to-r from-terracotta to-brand px-4 py-2 text-xs font-bold uppercase tracking-wide text-cream shadow-[0_8px_20px_-8px_rgba(122,46,59,0.6)]">
            <motion.span
              className="h-2 w-2 rounded-full bg-cream"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Efirda
          </span>
        )}
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-media-dark shadow-[0_20px_50px_-24px_rgba(36,28,26,0.35)]">
            {session.youtubeVideoId ? (
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${session.youtubeVideoId}?autoplay=0`}
                  title={session.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-media-light/70">
                <Radio size={32} />
                <p className="text-sm">Translyatsiya hali ulanmagan</p>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_1px_2px_rgba(36,28,26,0.04)]">
            <p className="font-display text-lg font-bold text-ink">{session.title}</p>
            {session.description && (
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{session.description}</p>
            )}
            <p className="mt-3 text-xs font-medium text-ink-soft">
              {isEnded
                ? `Yakunlandi — ${session.endedAt ? formatDateTime(session.endedAt) : ""}`
                : isLive
                  ? `Boshlandi — ${session.startedAt ? formatDateTime(session.startedAt) : ""}`
                  : `Boshlanish vaqti: ${formatDateTime(session.scheduledAt)}`}
            </p>
          </div>

          {!isEnded && (
            <div className="rounded-2xl border border-border/70 bg-surface p-5 shadow-[0_1px_2px_rgba(36,28,26,0.04)]">
              {speakStatus === "APPROVED" ? (
                <div className="flex items-center gap-3 rounded-xl bg-brand/10 px-4 py-3 text-brand">
                  <Mic size={18} />
                  <p className="text-sm font-semibold">
                    Sizga gapirish uchun ruxsat berildi — mikrofoningizni yoqing.
                  </p>
                </div>
              ) : speakStatus === "PENDING" ? (
                <div className="flex items-center gap-3 rounded-xl bg-gold/10 px-4 py-3 text-gold">
                  <Hand size={18} />
                  <p className="text-sm font-semibold">Soʻrovingiz yuborildi, ustoz javobini kuting...</p>
                </div>
              ) : (
                <button
                  onClick={handleRaiseHand}
                  disabled={requestingSpeak}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark py-3 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(122,46,59,0.6)] transition-opacity disabled:opacity-50 cursor-pointer"
                >
                  <Hand size={16} />
                  Gapirish uchun qoʻl koʻtarish
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex h-[560px] flex-col rounded-2xl border border-border/70 bg-surface shadow-[0_1px_2px_rgba(36,28,26,0.04)]">
          <div className="border-b border-border/70 px-5 py-3.5">
            <p className="font-semibold text-ink">Savol-javob</p>
            <p className="text-xs text-ink-soft">Efir davomida savollaringizni yozing</p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {messages.length === 0 ? (
              <p className="text-sm text-ink-soft">Hozircha xabarlar yoʻq. Birinchi boʻlib savol bering!</p>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <div key={m.id} className="flex items-start gap-2.5">
                    <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-dark text-xs font-bold text-cream">
                      {m.authorInitial}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-ink">{m.authorName}</p>
                      <p className="break-words text-sm text-ink-soft">{m.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>

          {!isEnded && (
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border/70 p-3">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Savolingizni yozing..."
                className="flex-1 rounded-full border border-border bg-cream px-4 py-2.5 text-sm text-ink outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/10"
              />
              <button
                type="submit"
                disabled={draft.trim().length === 0 || sending}
                aria-label="Yuborish"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-cream transition-opacity disabled:opacity-40 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
