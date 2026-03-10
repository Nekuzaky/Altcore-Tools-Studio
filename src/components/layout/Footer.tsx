import { Link } from "react-router-dom";
import { useI18n } from "@/app/i18n";
import logo from "@/assets/logo.svg";

export const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="mt-16 border-t border-border py-10">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        <div>
          <div className="inline-flex items-center gap-2">
            <img src={logo} alt="Altcore Tools Studio" className="h-6 w-6" />
            <p className="text-sm font-semibold text-text">Altcore Tools Studio</p>
          </div>
          <p className="mt-3 text-sm text-muted">{t("footer.tagline")}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-text">{t("footer.discover")}</p>
          <div className="mt-3 space-y-2 text-sm">
            <Link className="text-muted transition hover:text-text" to="/all-tools">Tools</Link>
            <br />
            <Link className="text-muted transition hover:text-text" to="/#categories">Categories</Link>
            <br />
            <Link className="text-muted transition hover:text-text" to="/#popular">Popular</Link>
            <br />
            <Link className="text-muted transition hover:text-text" to="/#new">New</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-text">{t("footer.resources")}</p>
          <div className="mt-3 space-y-2 text-sm">
            <a className="text-muted transition hover:text-text" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <br />
            <a className="text-muted transition hover:text-text" href="https://github.com/issues" target="_blank" rel="noreferrer">{t("footer.report")}</a>
            <br />
            <Link className="text-muted transition hover:text-text" to="/about">About</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-6xl border-t border-border px-4 pt-4 text-xs text-muted">
        <p>© Altcore Tools Studio</p>
        <p className="mt-1">{t("footer.ecosystem")}</p>
      </div>
    </footer>
  );
};
