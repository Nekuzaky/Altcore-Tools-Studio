import { ReactNode, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import type { SeoMeta } from "@/app/seo";
import { SeoHead } from "@/components/shared/SeoHead";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { RelatedTools } from "@/components/shared/RelatedTools";
import { categories } from "@/config/categories";
import { getToolBySlug } from "@/config/tools";
import { trackEvent } from "@/lib/analytics";
import { buildToolSeoCopy } from "@/lib/tool-seo-copy";

type ToolLayoutProps = {
  seo: SeoMeta;
  title: string;
  description: string;
  category: string;
  toolSlug: string;
  children: ReactNode;
  helpText?: string;
};

export const ToolLayout = ({
  seo,
  title,
  description,
  category,
  toolSlug,
  children,
  helpText
}: ToolLayoutProps) => {
  const tool = getToolBySlug(toolSlug);
  const categoryLabel = categories.find((item) => item.slug === category)?.name ?? category;
  const generatedSeo = tool ? buildToolSeoCopy(tool) : null;
  const resolvedSeo = useMemo(() => {
    if (!tool) return seo;

    const baseTitle = `${tool.name} Online | Altcore Tools Studio`;
    const title = tool.title.includes("Online") ? tool.title : baseTitle;

    return {
      ...seo,
      title,
      description: tool.metaDescription ?? seo.description,
      canonicalPath: seo.canonicalPath ?? tool.route,
      keywords: tool.keywords
    };
  }, [seo, tool]);

  useEffect(() => {
    trackEvent({ name: "tool_view", payload: { slug: toolSlug, category } });
  }, [toolSlug, category]);

  return (
    <>
      <SeoHead meta={resolvedSeo} />
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: categoryLabel, to: `/category/${category}` },
          { label: title }
        ]}
      />
      <section className="mx-auto w-full max-w-4xl space-y-6">
        <header className="rounded-xl border border-border bg-surface/60 p-5">
          <Link to={`/category/${category}`} className="text-xs uppercase tracking-wide text-muted hover:text-text">
            {categoryLabel}
          </Link>
          <h1 className="mt-2 text-3xl font-semibold text-text">{title}</h1>
          <p className="mt-3 text-muted">{description}</p>
        </header>

        {generatedSeo ? (
          <section className="space-y-4 rounded-xl border border-border bg-surface/40 p-5">
            <h2 className="text-xl font-semibold text-text">About {tool?.name}</h2>
            <p className="text-sm text-muted">{generatedSeo.intro}</p>

            <h3 className="text-base font-semibold text-text">Use Cases</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
              {generatedSeo.useCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3 className="text-base font-semibold text-text">Examples</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted">
              {generatedSeo.examples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {children}
        {helpText ? (
          <p className="rounded-lg border border-border bg-surface/60 p-4 text-sm text-muted">{helpText}</p>
        ) : null}

        {generatedSeo ? (
          <section className="space-y-4 rounded-xl border border-border bg-surface/40 p-5">
            <h2 className="text-xl font-semibold text-text">FAQ</h2>
            <div className="space-y-3">
              {generatedSeo.faqs.map((faq) => (
                <article key={faq.question} className="space-y-1">
                  <h3 className="text-base font-semibold text-text">{faq.question}</h3>
                  <p className="text-sm text-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <RelatedTools category={category} currentToolSlug={toolSlug} />
      </section>
    </>
  );
};
