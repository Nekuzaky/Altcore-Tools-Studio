import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/app/i18n";
import { SeoHead } from "@/components/shared/SeoHead";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { Card } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionTitle } from "@/components/ui/SectionTitle";
import logo from "@/assets/logo.svg";
import { categories } from "@/config/categories";
import { siteConfig } from "@/config/site";
import { toolsConfig } from "@/config/tools";
import { filterTools } from "@/lib/search";

export const HomePage = () => {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  const featured = useMemo(() => toolsConfig.filter((tool) => tool.featured).slice(0, 6), []);
  const popular = useMemo(() => toolsConfig.filter((tool) => tool.popular), []);
  const fresh = useMemo(() => toolsConfig.filter((tool) => tool.isNew), []);
  const liveResults = useMemo(() => filterTools(toolsConfig, query, "all"), [query]);

  return (
    <div className="space-y-14">
      <SeoHead
        meta={{
          title: siteConfig.defaultTitle,
          description: siteConfig.defaultDescription,
          canonicalPath: "/",
          ogImage: "/og/default-tools.jpg"
        }}
      />

      <section className="rounded-2xl border border-border bg-surface/60 px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
          <img src={logo} alt="Altcore Tools Studio" className="h-12 w-12" />
          <h1 className="text-4xl font-semibold tracking-tight text-text md:text-5xl">{t("home.title")}</h1>
          <p className="max-w-2xl text-base text-muted md:text-lg">{t("home.subtitle")}</p>
          <div className="w-full max-w-2xl">
            <SearchInput
              aria-label={t("ui.search")}
              placeholder={t("ui.search")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <p className="text-sm text-muted">{toolsConfig.length} {t("home.toolsCount")}</p>
        </div>
      </section>

      {query ? (
        <section>
          <SectionTitle title="Search Results" subtitle="Filtered instantly by name, category and keywords." />
          <ToolGrid tools={liveResults} emptyTitle={t("all.noResults")} emptyDescription={t("all.tryAnother")} />
        </section>
      ) : null}

      <section id="featured">
        <SectionTitle title={t("home.featured")} subtitle="Top picks to get started quickly." />
        <ToolGrid tools={featured} />
      </section>

      <section id="popular">
        <SectionTitle title={t("home.popular")} subtitle="Most used tools right now." />
        <ToolGrid tools={popular} />
      </section>

      <section id="new">
        <SectionTitle title={t("home.new")} subtitle="Fresh additions to the platform." />
        <ToolGrid tools={fresh} emptyTitle="No new tools found" emptyDescription="New releases will appear here." />
      </section>

      <section id="categories">
        <SectionTitle title={t("home.categories")} subtitle="Browse all tool categories." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = toolsConfig.filter((tool) => tool.category === category.slug).length;
            return (
              <Link key={category.slug} to={`/category/${category.slug}`}>
                <Card className="h-full transition duration-200 hover:-translate-y-0.5 hover:border-brand/70">
                  <h3 className="text-lg font-semibold text-text">{category.name}</h3>
                  <p className="mt-2 text-sm text-muted">{category.description}</p>
                  <p className="mt-4 text-xs uppercase tracking-wide text-muted">{count} tools</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle title={t("home.why")} subtitle="Built for practical daily workflows." />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { title: "Fast", desc: "Quick actions, no friction." },
            { title: "Private", desc: "Most tools run in-browser." },
            { title: "Useful", desc: "Focused on real tasks." },
            { title: "Free", desc: "Accessible to everyone." }
          ].map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-text">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface/50 p-6 text-center">
        <p className="text-lg font-medium text-text">{t("home.cta")}</p>
        <Link className="mt-2 inline-block text-sm text-brand hover:underline" to="/all-tools">
          {t("home.cta")} {"->"}
        </Link>
      </section>
    </div>
  );
};
