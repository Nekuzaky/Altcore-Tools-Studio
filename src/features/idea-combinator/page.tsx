import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";

const themes = ["Discord", "Gaming", "Creator Economy", "No-code", "Productivity", "AI workflows"];
const audiences = ["débutants", "freelances", "étudiants", "indie hackers", "managers", "designers"];
const formats = ["mini-guide", "challenge 7 jours", "template pack", "newsletter", "tool stack review"];

export const IdeaCombinatorPage = () => {
  const [seed, setSeed] = useState(0);
  const idea = useMemo(() => {
    void seed;
    const t = themes[Math.floor(Math.random() * themes.length)];
    const a = audiences[Math.floor(Math.random() * audiences.length)];
    const f = formats[Math.floor(Math.random() * formats.length)];
    return `${f} sur ${t} pour ${a}`;
  }, [seed]);

  return (
    <ToolLayout seo={{ title: "Idea Combinator | Altcore Tools Studio", description: "Combine random building blocks into original ideas.", canonicalPath: "/tools/idea-combinator" }} title="Idea Combinator" description="Combine thème + audience + format pour générer une idée originale." category="utility" toolSlug="idea-combinator" helpText="Regénère jusqu'à obtenir une combinaison avec potentiel." >
      <Card className="space-y-3">
        <Button onClick={() => setSeed((x) => x + 1)}>Combine idea</Button>
        <div className="rounded-md border border-border bg-background p-3 text-sm text-text">{idea}</div>
        <CopyButton value={idea} />
      </Card>
    </ToolLayout>
  );
};
