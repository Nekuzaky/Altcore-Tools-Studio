import { ToolConfig } from "@/config/tools";

type ToolStatsProps = {
  tools: ToolConfig[];
};

export const ToolStats = ({ tools }: ToolStatsProps) => {
  const featured = tools.filter((tool) => tool.featured).length;
  const popular = tools.filter((tool) => tool.popular).length;
  const fresh = tools.filter((tool) => tool.isNew).length;

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-lg border border-border bg-surface p-3">
        <p className="text-xs text-muted">Total tools</p>
        <p className="mt-1 text-xl font-semibold text-text">{tools.length}</p>
      </div>
      <div className="rounded-lg border border-border bg-surface p-3">
        <p className="text-xs text-muted">Popular</p>
        <p className="mt-1 text-xl font-semibold text-text">{popular || featured}</p>
      </div>
      <div className="rounded-lg border border-border bg-surface p-3">
        <p className="text-xs text-muted">New</p>
        <p className="mt-1 text-xl font-semibold text-text">{fresh}</p>
      </div>
    </div>
  );
};
