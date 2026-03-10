import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { generateChangelog } from "@/features/changelog-generator/generator";

const sample = `feat(auth): add oauth callback support
fix(ui): resolve button alignment on mobile
docs(readme): update setup section
chore(ci): cache npm dependencies`;

export const ChangelogGeneratorPage = () => {
  const [commits, setCommits] = useState(sample);
  const changelog = useMemo(() => generateChangelog(commits), [commits]);

  return (
    <ToolLayout
      seo={{
        title: "Changelog Generator | Altcore Tools",
        description: "Generate markdown changelog sections from commit lines.",
        canonicalPath: "/tools/changelog-generator"
      }}
      title="Changelog Generator"
      description="Paste commit lines and generate a clean markdown changelog."
      category="developer"
      toolSlug="changelog-generator"
      helpText="Best results with conventional commit format: type(scope): message"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-2">
          <p className="text-sm text-muted">Commit lines</p>
          <Textarea value={commits} onChange={(event) => setCommits(event.target.value)} className="min-h-72 font-mono text-xs" />
        </Card>
        <Card className="space-y-2">
          <p className="text-sm text-muted">Generated changelog</p>
          <Textarea readOnly value={changelog} className="min-h-72 font-mono text-xs" />
          <CopyButton value={changelog} />
        </Card>
      </div>
    </ToolLayout>
  );
};
