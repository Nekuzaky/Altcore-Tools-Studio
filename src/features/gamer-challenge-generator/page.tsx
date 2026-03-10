import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";

const challenges = [
  "Win avec une seule arme secondaire",
  "No HUD challenge pendant 1 match",
  "Top 3 sans looter la même arme 2 fois",
  "No sprint run",
  "1v1 only loadout"
];

export const GamerChallengeGeneratorPage = () => {
  const [seed, setSeed] = useState(0);
  const challenge = useMemo(() => {
    void seed;
    return challenges[Math.floor(Math.random() * challenges.length)];
  }, [seed]);

  return (
    <ToolLayout seo={{ title: "Gamer Challenge Generator | Altcore Tools Studio", description: "Generate random gaming challenges instantly.", canonicalPath: "/tools/gamer-challenge-generator" }} title="Gamer Challenge Generator" description="Ajoute du fun et du contenu avec des défis aléatoires." category="gaming" toolSlug="gamer-challenge-generator" helpText="Parfait pour streams, shorts et soirées entre potes.">
      <Card className="space-y-3">
        <Button onClick={() => setSeed((v) => v + 1)}>Roll challenge</Button>
        <div className="rounded-md border border-border bg-background p-3 text-sm text-text">{challenge}</div>
        <CopyButton value={challenge} />
      </Card>
    </ToolLayout>
  );
};
