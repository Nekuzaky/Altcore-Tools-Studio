import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { useI18n } from "@/app/i18n";
import { SeoHead } from "@/components/shared/SeoHead";
import { CategoryPills } from "@/components/shared/CategoryPills";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { toolsConfig, type ToolConfig } from "@/config/tools";
import { filterTools } from "@/lib/search";

type SortMode = "featured" | "popular" | "newest" | "alpha";
type StateFilter = "all" | "featured" | "popular" | "new";

const sortTools = (tools: ToolConfig[], mode: SortMode): ToolConfig[] => {
  const copied = [...tools];
  if (mode === "alpha") return copied.sort((a, b) => a.name.localeCompare(b.name));
  if (mode === "featured") return copied.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  if (mode === "popular") return copied.sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)));
  return copied.sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
};

export const AllToolsPage = () => {
  const { t } = useI18n();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [stateFilter, setStateFilter] = useState<StateFilter>("all");

  const baseResults = useMemo(() => filterTools(toolsConfig, query, activeCategory), [query, activeCategory]);

  const filteredResults = useMemo(() => {
    const byState =
      stateFilter === "all"
        ? baseResults
        : baseResults.filter((tool) =>
            stateFilter === "featured" ? tool.featured : stateFilter === "popular" ? tool.popular : tool.isNew
          );
    return sortTools(byState, sortMode);
  }, [baseResults, sortMode, stateFilter]);

  const featured = useMemo(() => toolsConfig.filter((tool) => tool.featured).slice(0, 6), []);
  const popular = useMemo(() => toolsConfig.filter((tool) => tool.popular).slice(0, 8), []);
  const fresh = useMemo(() => toolsConfig.filter((tool) => tool.isNew).slice(0, 8), []);

  return (
    <div className="space-y-10">
      <SeoHead
        meta={{
          title: "All Tools Online | Altcore Tools Studio",
          description:
            "Explore every Altcore tool with fast filtering by category, popularity, and freshness. Built for discovery, SEO and retention.",
          canonicalPath: "/all-tools",
          ogImage: "/og/default-tools.jpg",
          keywords: [
            "all tools",
            "developer tools online",
            "discord tools online",
            "unity tools online",
            "Altcore Tools Studio"
          ]
        }}
      />

      <header className="rounded-2xl border border-border bg-surface/60 px-5 py-8 md:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <img src={logo} alt="Altcore Tools Studio" className="mx-auto h-10 w-10" />
          <h1 className="text-3xl font-semibold text-text md:text-4xl">{t("all.title")}</h1>
          <p className="text-muted">{t("all.subtitle")}</p>
          <p className="text-sm text-muted">
            {toolsConfig.length} {t("home.toolsCount")}
          </p>
        </div>
      </header>

      <section className="space-y-4 rounded-xl border border-border bg-surface/50 p-5">
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("ui.search")}
          autoFocus
        />

        <CategoryPills categories={categories} active={activeCategory} onChange={setActiveCategory} />

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-2 text-sm text-muted">
            <span>{t("all.filterState")}</span>
            <select
              value={stateFilter}
              onChange={(event) => setStateFilter(event.target.value as StateFilter)}
              className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text outline-none"
            >
              <option value="all">{t("filter.all")}</option>
              <option value="featured">{t("filter.featured")}</option>
              <option value="popular">{t("filter.popular")}</option>
              <option value="new">{t("filter.new")}</option>
            </select>
          </label>

          <label className="space-y-2 text-sm text-muted">
            <span>{t("all.sort")}</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-text outline-none"
            >
              <option value="featured">{t("sort.featured")}</option>
              <option value="popular">{t("sort.popular")}</option>
              <option value="newest">{t("sort.newest")}</option>
              <option value="alpha">{t("sort.alpha")}</option>
            </select>
          </label>
        </div>
      </section>

      <section>
        <SectionTitle title={t("all.featured")} subtitle="Editorially highlighted tools with strong utility." />
        <ToolGrid tools={featured} />
      </section>

      <section>
        <SectionTitle title={t("all.popular")} subtitle="Most frequently used tools across the platform." />
        <ToolGrid tools={popular} />
      </section>

      <section>
        <SectionTitle title={t("all.new")} subtitle="Fresh tools recently shipped to Altcore Tools Studio." />
        <ToolGrid tools={fresh} emptyTitle="No new tools found" emptyDescription={t("all.tryAnother")} />
      </section>

      <section>
        <SectionTitle title={t("all.index")} subtitle={`${filteredResults.length} tools in the current result set.`} />
        <ToolGrid
          tools={filteredResults}
          emptyTitle={t("all.noResults")}
          emptyDescription={t("all.tryAnother")}
        />
      </section>

      <section>
        <SectionTitle title={t("all.categoryHighlights")} subtitle="Jump into categories and discover focused tool clusters." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = toolsConfig.filter((tool) => tool.category === category.slug).length;
            return (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                <Card className="h-full transition hover:border-brand/70">
                  <h3 className="text-lg font-semibold text-text">{category.name}</h3>
                  <p className="mt-2 text-sm text-muted">{category.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-wide text-muted">{count} tools</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface/40 p-5 text-sm text-muted">
        Altcore Tools Studio keeps this page crawlable and structured for discovery: direct tool links, category links,
        state filters, and semantic section headings for better indexation and navigation.
      </section>
    </div>
  );
};
