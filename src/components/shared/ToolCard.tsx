import { Link } from "react-router-dom";
import { categories } from "@/config/categories";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { ToolConfig } from "@/config/tools";

type ToolCardProps = {
  tool: ToolConfig;
};

export const ToolCard = ({ tool }: ToolCardProps) => {
  const category = categories.find((item) => item.slug === tool.category);

  return (
    <Link to={tool.route} className="block">
      <Card className="h-full transition duration-200 hover:-translate-y-0.5 hover:border-brand/70 hover:bg-surface/95">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs uppercase tracking-wide text-muted">{category?.name ?? tool.category}</p>
          <div className="flex items-center gap-1">
            {tool.isNew ? <Badge variant="success">New</Badge> : null}
            {tool.popular ? <Badge variant="accent">Popular</Badge> : null}
            {tool.featured ? <Badge>Featured</Badge> : null}
          </div>
        </div>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-text">{tool.name}</h3>
          <span className="text-xs text-muted">[]</span>
        </div>
        <p className="mt-2 text-sm text-muted">{tool.description}</p>
      </Card>
    </Link>
  );
};
