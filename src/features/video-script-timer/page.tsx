import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";

export const VideoScriptTimerPage = () => {
  const [script, setScript] = useState("Bonjour et bienvenue sur la chaîne...");
  const stats = useMemo(() => {
    const words = script.trim() ? script.trim().split(/\s+/).length : 0;
    const slow = words / 110;
    const normal = words / 140;
    const fast = words / 170;
    return { words, slow, normal, fast };
  }, [script]);

  return (
    <ToolLayout seo={{ title: "Video Script Timer | Altcore Tools Studio", description: "Estimate video narration duration from text length.", canonicalPath: "/tools/video-script-timer" }} title="Video Script Timer" description="Estime la durée de voice-over selon le nombre de mots." category="creator" toolSlug="video-script-timer" helpText="Utilise le mode lent si ton script a beaucoup de pauses.">
      <Card className="space-y-2">
        <Textarea className="min-h-56" value={script} onChange={(e) => setScript(e.target.value)} />
      </Card>
      <Card className="space-y-1 text-sm text-text">
        <p>Mots: {stats.words}</p>
        <p>Lecture lente: {stats.slow.toFixed(1)} min</p>
        <p>Lecture normale: {stats.normal.toFixed(1)} min</p>
        <p>Lecture rapide: {stats.fast.toFixed(1)} min</p>
      </Card>
    </ToolLayout>
  );
};
