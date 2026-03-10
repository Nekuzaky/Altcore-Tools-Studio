import { Link } from "react-router-dom";

type Crumb = {
  label: string;
  to?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav className="mb-4 text-sm text-muted">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="hover:text-text">
              {item.label}
            </Link>
          ) : (
            <span className="text-text/90">{item.label}</span>
          )}
          {index < items.length - 1 ? <span>/</span> : null}
        </li>
      ))}
    </ol>
  </nav>
);

