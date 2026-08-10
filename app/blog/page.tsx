import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { blogPosts } from "@/content/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog: pomysły na urodziny i zabawę z dzieckiem",
  description:
    "Poradniki Łap Chwile: urodziny dla dzieci, weekendy nad Zalewem Zegrzyńskim i pomysły na zabawę pod Warszawą.",
  path: "/blog",
});

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogPage() {
  const published = blogPosts.filter((p) => p.body && p.publishedAt);
  const drafts = blogPosts.filter((p) => !p.body);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Poradnik rodzica"
        lead="Piszemy o tym, na czym znamy się najlepiej: urodzinach, zabawie i rodzinnym czasie nad Zalewem Zegrzyńskim."
      />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {published.length > 0 && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {published.map((post) => (
              <li key={post.slug} className="rounded-card bg-white p-6">
                <p className="text-sm font-semibold text-muted">
                  {formatDate(post.publishedAt!)}
                </p>
                <h2 className="mt-1.5 font-display text-xl font-bold text-ink">
                  <Link href={`/blog/${post.slug}`} className="hover:text-action">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[15px] text-muted">{post.teaser}</p>
              </li>
            ))}
          </ul>
        )}

        {drafts.length > 0 && (
          <div className={published.length > 0 ? "mt-12" : ""}>
            {published.length === 0 && (
              <p className="mb-6 rounded-card bg-white p-6 text-center text-muted">
                Pierwsze artykuły są w przygotowaniu. Oto tematy, nad którymi
                pracujemy:
              </p>
            )}
            <ul className="grid gap-3 sm:grid-cols-2">
              {drafts.map((post) => (
                <li
                  key={post.slug}
                  className="rounded-card border border-dashed border-ink/15 p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-balloon-green">
                    Wkrótce
                  </p>
                  <h2 className="mt-1.5 font-display text-lg font-bold text-ink">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted">{post.teaser}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
