import { useI18n } from "@/app/i18n";
import { getRelatedTools } from "@/config/tools";
import { ToolGrid } from "@/components/shared/ToolGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";

type RelatedToolsProps = {
  category: string;
  currentToolSlug: string;
};

export const RelatedTools = ({ currentToolSlug }: RelatedToolsProps) => {
  const { t } = useI18n();
  const related = getRelatedTools(currentToolSlug);
  if (!related.length) return null;

  return (
    <section className="mt-10 border-t border-border pt-8">
      <SectionTitle title={t("tool.relatedTitle")} subtitle={t("tool.relatedSub")} />
      <ToolGrid tools={related.slice(0, 3)} />
    </section>
  );
};
