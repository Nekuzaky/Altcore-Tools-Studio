import { ToolCategory } from "@/config/categories";
import { Badge } from "@/components/ui/Badge";

type CategoryPillsProps = {
  categories: ToolCategory[];
  active: string | "all";
  onChange: (slug: string | "all") => void;
};

export const CategoryPills = ({ categories, active, onChange }: CategoryPillsProps) => (
  <div className="flex flex-wrap gap-2">
    <button type="button" onClick={() => onChange("all")}
      className={`rounded-full border px-3 py-1 text-sm transition ${active === "all" ? "border-brand text-brand" : "border-border text-muted hover:text-text"}`}>
      All
    </button>
    {categories.map((category) => (
      <button
        key={category.slug}
        type="button"
        onClick={() => onChange(category.slug)}
        className={`rounded-full border px-3 py-1 text-sm transition ${active === category.slug ? "border-brand text-brand" : "border-border text-muted hover:text-text"}`}
      >
        {category.name}
      </button>
    ))}
    <Badge variant="default">Instant filter</Badge>
  </div>
);
