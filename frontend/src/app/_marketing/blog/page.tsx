import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogCoverArt from "@/components/blog/BlogCoverArt";
import { getBlogPosts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Blog",
  description: "Tikuvchilik boʻyicha maslahat va maqolalar.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Blog
            </span>
            <h1 className="font-display mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Maqolalar va maslahatlar
            </h1>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-2xl border border-border bg-cream transition-all hover:-translate-y-1 hover:shadow-[0_20px_35px_-16px_rgba(36,28,26,0.22)]"
              >
                <BlogCoverArt slug={post.slug} coverColor={post.coverColor} />
                <div className="p-6">
                  <p className="font-display text-lg font-bold text-ink">
                    {post.title}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
