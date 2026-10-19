import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogCoverArt from "@/components/blog/BlogCoverArt";
import { getBlogPostBySlug } from "@/lib/api";
import { formatDate } from "@/lib/format";

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Maqola topilmadi" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 py-14 md:py-20">
        <article className="container-custom max-w-2xl">
          <BlogCoverArt
            slug={post.slug}
            coverColor={post.coverColor}
            className="h-48 rounded-3xl sm:h-64"
          />
          <p className="mt-6 text-xs text-ink-soft">
            {formatDate(post.publishedAt)}
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-6 leading-relaxed text-ink-soft">{post.content}</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
