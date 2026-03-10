import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

export const SpeedrunSplitPlannerPage = () => {
  const [segments, setSegments] = useState("Intro\nBoss 1\nMidgame\nFinal Boss");
  const [targetMinutes, setTargetMinutes] = useState(40);

  const plan = useMemo(() => {
    const parts = segments.split("\n").map((s) => s.trim()).filter(Boolean);
    const per = parts.length ? Math.floor((targetMinutes * 60) / parts.length) : 0;
    return parts.map((name, idx) => `${idx + 1}. ${name} - target ${Math.floor(per / 60)}m ${per % 60}s`);
  }, [segments, targetMinutes]);

  return (
    <ToolLayout seo={{ title: "Speedrun Split Planner | Altcore Tools Studio", description: "Plan speedrun split targets by segment.", canonicalPath: "/tools/speedrun-split-planner" }} title="Speedrun Split Planner" description="Définis un temps cible et obtiens des splits de référence." category="gaming" toolSlug="speedrun-split-planner" helpText="Ajuste chaque split après quelques tentatives réelles.">
      <Card className="space-y-3">
        <Input type="number" min={1} value={targetMinutes} onChange={(e) => setTargetMinutes(Number(e.target.value))} />
        <textarea className="min-h-32 w-full rounded-md border border-border bg-surface p-3 text-sm text-text" value={segments} onChange={(e) => setSegments(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{plan.join("\n")}</pre>
        <CopyButton value={plan.join("\n")} />
      </Card>
    </ToolLayout>
  );
};
