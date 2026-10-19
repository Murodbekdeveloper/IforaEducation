import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PaymentFlow from "@/components/payment/PaymentFlow";
import { getCourseBySlug, getPaymentInfo, getRewards } from "@/lib/api";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Toʻlov | Ifora Isaqova",
};

export default async function PaymentPage(
  props: PageProps<"/kurslar/[slug]/tolov">,
) {
  const { slug } = await props.params;
  const [course, paymentInfo, user] = await Promise.all([
    getCourseBySlug(slug),
    getPaymentInfo(),
    getCurrentUser(),
  ]);

  if (!course) notFound();

  const rewards = user ? await getRewards() : null;

  return (
    <>
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Toʻlov
            </span>
            <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
              {course.title}
            </h1>
          </div>

          {user ? (
            <PaymentFlow
              courseSlug={course.slug}
              courseTitle={course.title}
              price={course.price}
              oldPrice={course.oldPrice}
              discountPercent={rewards?.discountPercent ?? 0}
              paymentInfo={paymentInfo}
              defaultFullName={`${user.firstName} ${user.lastName}`}
              defaultPhone={user.phone}
            />
          ) : (
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-border bg-cream p-10 text-center">
              <p className="text-ink-soft">
                Kursni sotib olish uchun avval hisobingizga kiring yoki
                roʻyxatdan oʻting.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  Kirish
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-dark"
                >
                  Roʻyxatdan oʻtish
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
