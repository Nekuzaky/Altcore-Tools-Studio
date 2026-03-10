import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

export const ThumbnailBriefGeneratorPage = () => {
  const [topic, setTopic] = useState("Automatiser son serveur Discord");
  const brief = useMemo(() => {
    return [
      `Sujet: ${topic}`,
      "Message visuel: résultat concret en 1 phrase.",
      "Texte thumbnail: 2 à 4 mots maximum.",
      "Sujet principal: visage + élément clé du sujet.",
      "Palette: contraste fort + 1 couleur accent.",
      "CTA implicite: curiosité / promesse claire."
    ].join("\n");
  }, [topic]);

  return (
    <ToolLayout seo={{ title: "Thumbnail Brief Generator | Altcore Tools Studio", description: "Generate thumbnail concept briefs quickly.", canonicalPath: "/tools/thumbnail-brief-generator" }} title="Thumbnail Brief Generator" description="Crée un brief thumbnail rapide avant design." category="creator" toolSlug="thumbnail-brief-generator" helpText="Vise simplicité + contraste + promesse lisible en mobile.">
      <Card className="space-y-3">
        <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{brief}</pre>
        <CopyButton value={brief} />
      </Card>
    </ToolLayout>
  );
};
