import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Scissors } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  YoutubeIcon,
} from "@/components/icons/SocialIcons";

const COLUMNS = [
  {
    title: "Platforma",
    links: [
      { label: "Kurslar", href: "/kurslar" },
      { label: "Ustozimiz", href: "/#asoschi" },
      { label: "Fikrlar", href: "/#fikrlar" },
    ],
  },
  {
    title: "Kompaniya",
    links: [
      { label: "Biz haqimizda", href: "/biz-haqimizda" },
      { label: "Blog", href: "/blog" },
      { label: "Aloqa", href: "/aloqa" },
    ],
  },
  {
    title: "Yordam",
    links: [
      { label: "Koʻp beriladigan savollar", href: "/savollar" },
      { label: "Foydalanish shartlari", href: "/foydalanish-shartlari" },
      { label: "Maxfiylik siyosati", href: "/maxfiylik-siyosati" },
    ],
  },
];

const SOCIALS = [
  { Icon: TelegramIcon, href: "#", label: "Telegram" },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: FacebookIcon, href: "#", label: "Facebook" },
  { Icon: YoutubeIcon, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer id="aloqa" className="border-t border-border bg-cream-soft/60 pt-16">
      <div className="container-custom grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-cream">
              <Scissors size={18} strokeWidth={2.25} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold text-ink">Ifora</span>
              <span className="text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                Tikuvchilik akademiyasi
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Ifora Isaqova asos solgan platforma orqali minglab shogirdlar
            tikuvchilik kasbini mustaqil egallamoqda.
          </p>
          <div className="mt-5 flex items-center gap-2.5">
            {SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-soft transition-colors hover:border-brand hover:text-brand"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-ink">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-sm font-semibold text-ink">Aloqa</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-soft">
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-brand" />
              +998 90 123 45 67
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-brand" />
              info@ifora.uz
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
              Toshkent sh., Chilonzor tumani
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={16} className="shrink-0 text-brand" />
              Dush–Shan: 09:00–19:00
            </li>
          </ul>
        </div>
      </div>

      <div className="needle-stitch" />

      <div className="container-custom flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-soft sm:flex-row">
        <p>© {new Date().getFullYear()} Ifora Isaqova. Barcha huquqlar himoyalangan.</p>
        <p>Tikuvchilik ta&apos;lim platformasi</p>
      </div>
    </footer>
  );
}
