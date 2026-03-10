import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "@/app/i18n";
import { themes, useTheme, type Theme } from "@/app/theme";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import logo from "@/assets/logo.svg";

const navItems = [
  { key: "nav.tools", to: "/" as const, type: "route" as const },
  { key: "nav.categories", to: "categories" as const, type: "section" as const },
  { key: "nav.popular", to: "popular" as const, type: "section" as const },
  { key: "nav.new", to: "new" as const, type: "section" as const },
  { key: "nav.about", to: "/about" as const, type: "route" as const }
] as const;

export const Navbar = () => {
  const { t, locale, setLocale } = useI18n();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const quickSearch = () => {
    const value = search.trim();
    navigate(value ? `/all-tools?q=${encodeURIComponent(value)}` : "/all-tools");
    setMobileOpen(false);
  };

  const goToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${id}`);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 py-2">
        <Link to="/" className="inline-flex items-center gap-2">
          <img src={logo} alt="Altcore Tools Studio" className="h-7 w-7" />
          <span className="text-sm font-semibold tracking-wide text-text">Altcore Tools</span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <nav className="flex items-center gap-1 rounded-lg border border-border bg-surface/70 p-1">
            {navItems.map((item) =>
              item.type === "route" ? (
                <NavLink
                  key={item.key}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-1.5 text-sm transition ${
                      isActive ? "bg-brand/15 text-brand" : "text-muted hover:text-text"
                    }`
                  }
                >
                  {t(item.key)}
                </NavLink>
              ) : (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => goToSection(item.to)}
                  className="rounded-md px-3 py-1.5 text-sm text-muted transition hover:text-text"
                >
                  {t(item.key)}
                </button>
              )
            )}
          </nav>

          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm text-muted transition hover:text-text"
            aria-label="Search"
          >
            /?
          </button>

          {searchOpen ? (
            <div className="w-56">
              <SearchInput
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") quickSearch();
                }}
                placeholder={t("ui.search")}
              />
            </div>
          ) : null}

          <Select
            aria-label={t("ui.language")}
            className="h-9 w-[82px]"
            value={locale}
            onChange={(event) => setLocale(event.target.value as "en" | "fr")}
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </Select>

          <Select
            aria-label={t("ui.theme")}
            className="h-9 w-[120px]"
            value={theme}
            onChange={(event) => setTheme(event.target.value as Theme)}
          >
            {themes.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label}
              </option>
            ))}
          </Select>
        </div>

        <button
          type="button"
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          Menu
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border px-4 pb-4 pt-3 lg:hidden">
          <div className="space-y-2">
            {navItems.map((item) =>
              item.type === "route" ? (
                <Link
                  key={item.key}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md border border-border bg-surface px-3 py-2 text-sm text-text"
                >
                  {t(item.key)}
                </Link>
              ) : (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    goToSection(item.to);
                    setMobileOpen(false);
                  }}
                  className="block w-full rounded-md border border-border bg-surface px-3 py-2 text-left text-sm text-text"
                >
                  {t(item.key)}
                </button>
              )
            )}
          </div>

          <div className="mt-3">
            <SearchInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") quickSearch();
              }}
              placeholder={t("ui.search")}
            />
          </div>
        </div>
      ) : null}
    </header>
  );
};
