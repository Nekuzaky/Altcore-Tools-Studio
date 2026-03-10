type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-text">{title}</h2>
    {subtitle ? <p className="mt-2 text-sm text-muted">{subtitle}</p> : null}
  </div>
);

