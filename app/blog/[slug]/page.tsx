import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { blogPosts, getPost } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.teaser,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[15px] font-bold text-action hover:underline"
      >
        <ArrowLeft size={16} weight="bold" aria-hidden /> Wszystkie artykuły
      </Link>
      <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        {post.title}
      </h1>
      {post.body ? (
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/90">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-card border border-dashed border-ink/15 bg-white p-8">
          <p className="font-display text-lg font-bold text-ink">
            Ten artykuł jest w przygotowaniu
          </p>
          <p className="mt-2 text-muted">{post.teaser}</p>
          <p className="mt-4 text-muted">
            W międzyczasie zajrzyj na stronę{" "}
            <Link href="/urodziny" className="font-semibold text-action hover:underline">
              urodzin
            </Link>{" "}
            albo{" "}
            <Link href="/atrakcje" className="font-semibold text-action hover:underline">
              atrakcji
            </Link>
            .
          </p>
        </div>
      )}
    </article>
  );
}
