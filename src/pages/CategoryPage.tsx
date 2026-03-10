import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useI18n } from "@/app/i18n";
import { SeoHead } from "@/components/shared/SeoHead";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { SearchInput } from "@/components/ui/SearchInput";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { toolsConfig } from "@/config/tools";
import { filterTools } from "@/lib/search";

export const CategoryPage = () => {
  const { t } = useI18n();
  const { categorySlug } = useParams();
  const [query, setQuery] = useState("");

  const category = useMemo(() => categories.find((item) => item.slug === categorySlug), [categorySlug]);
  const tools = useMemo(() => toolsConfig.filter((tool) => tool.category === categorySlug), [categorySlug]);
  const filteredTools = useMemo(() => filterTools(tools, query, "all"), [tools, query]);
  const otherCategories = useMemo(() => categories.filter((item) => item.slug !== categorySlug).slice(0, 4), [categorySlug]);

  if (!category) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-text">{t("category.notFound")}</h1>
        <p className="text-muted">{t("category.notFoundDesc")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SeoHead
        meta={{
          title: `${category.name} Tools Online | Altcore Tools Studio`,
          description: `${category.description} Explore ${tools.length} ${category.name.toLowerCase()} tools with fast access and related tool discovery.`,
          canonicalPath: `/category/${category.slug}`,
          ogImage: "/og/default-tools.jpg",
          keywords: [category.name, `${category.name} tools`, "online tools", "Altcore Tools Studio"]
        }}
      />
      <header className="rounded-xl border border-border bg-surface/60 p-6">
        <p className="text-xs uppercase tracking-wide text-muted">{t("category.title")}</p>
        <h1 className="mt-2 text-3xl font-semibold text-text">{category.name} Tools</h1>
        <p className="mt-3 max-w-3xl text-muted">{category.description}</p>
        <p className="mt-4 text-sm text-muted">{tools.length} tools available on {siteConfig.name}.</p>
      </header>

      <section className="space-y-3 rounded-xl border border-border bg-surface/50 p-5">
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`${category.name} tools...`}
        />
        <p className="text-sm text-muted">
          {filteredTools.length} matching tools in {category.name}.
        </p>
      </section>

      <ToolGrid tools={filteredTools} emptyTitle="No tools in this category yet" emptyDescription="Try another keyword." />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-text">Explore related categories</h2>
        <div className="flex flex-wrap gap-2">
          {otherCategories.map((item) => (
            <Link
              key={item.slug}
              to={`/category/${item.slug}`}
              className="rounded-full border border-border px-3 py-1 text-sm text-muted transition hover:text-text"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
