type EmptyStateProps = {
  title: string;
  description: string;
};

export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <div className="rounded-xl border border-dashed border-border bg-surface/40 p-8 text-center">
    <h3 className="text-lg font-semibold text-text">{title}</h3>
    <p className="mt-2 text-sm text-muted">{description}</p>
  </div>
);

