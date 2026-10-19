import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Aloqa",
  description: "Ifora Isaqova akademiyasi bilan bogʻlaning.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Aloqa
            </span>
            <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Biz bilan bogʻlaning
            </h1>
            <p className="mt-4 text-ink-soft">
              Savollaringiz bormi? Quyidagi forma orqali yozing yoki
              raqamlarimizga qoʻngʻiroq qiling.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3 rounded-2xl border border-border p-5">
                <Phone size={18} className="mt-0.5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-semibold text-ink">Telefon</p>
                  <p className="text-sm text-ink-soft">+998 90 123 45 67</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border p-5">
                <Mail size={18} className="mt-0.5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-semibold text-ink">Email</p>
                  <p className="text-sm text-ink-soft">info@ifora.uz</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border p-5">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-semibold text-ink">Manzil</p>
                  <p className="text-sm text-ink-soft">
                    Toshkent sh., Chilonzor tumani
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-border p-5">
                <Clock size={18} className="mt-0.5 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-semibold text-ink">Ish vaqti</p>
                  <p className="text-sm text-ink-soft">Dush–Shan: 09:00–19:00</p>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
