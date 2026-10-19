import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Analytics from "@/components/analytics/Analytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Ifora Isaqova | Tikuvchilik ta'lim platformasi";
const description =
  "Ifora Isaqova bilan tikuvchilik va moda dizaynini oʻrganing. 40+ kurs, 25+ tajribali ustozlar, 12 000+ talaba.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Ifora Isaqova",
  },
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Ifora Isaqova",
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("ifora-theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
