import type { ToolConfig } from "@/config/tools";
import { ToolCard } from "@/components/shared/ToolCard";
import { EmptyState } from "@/components/ui/EmptyState";

type ToolGridProps = {
  tools: ToolConfig[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export const ToolGrid = ({
  tools,
  emptyTitle = "No tools found",
  emptyDescription = "New tools will be added soon."
}: ToolGridProps) => {
  if (!tools.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
};

