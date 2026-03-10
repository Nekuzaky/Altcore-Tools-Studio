import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const captionTemplates: Record<string, string[]> = {
  instagram: ["{topic} en 3 points concrets. Tu en penses quoi ?", "J'ai simplifié {topic} pour gagner du temps.", "Si tu bosses sur {topic}, garde ce post."],
  tiktok: ["POV: tu découvres enfin {topic} proprement.", "3 erreurs sur {topic} que je vois tout le temps.", "Tu veux améliorer {topic} ? Lis ça."],
  x: ["Thread rapide sur {topic}: méthodes + erreurs + plan d'action.", "Opinion: {topic} est sous-estimé si tu veux scaler.", "Mini-guide sur {topic} en 5 points."]
};

export const SocialCaptionGeneratorPage = () => {
  const [topic, setTopic] = useState("tes workflows de création");
  const [platform, setPlatform] = useState("instagram");

  const captions = useMemo(() => {
    const templates = captionTemplates[platform] ?? captionTemplates.instagram;
    return templates.map((tpl) => tpl.replace("{topic}", topic.trim() || "ton sujet"));
  }, [topic, platform]);

  return (
    <ToolLayout
      seo={{
        title: "Social Caption Generator | Altcore Tools Studio",
        description: "Generate social post captions by platform and topic.",
        canonicalPath: "/tools/social-caption-generator"
      }}
      title="Social Caption Generator"
      description="Generate cleaner captions for Instagram, TikTok and X posts."
      category="creator"
      toolSlug="social-caption-generator"
      helpText="Ajoute une CTA simple à la fin pour déclencher commentaires ou sauvegardes."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Sujet</span>
            <Input value={topic} onChange={(event) => setTopic(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Plateforme</span>
            <Select value={platform} onChange={(event) => setPlatform(event.target.value)}>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="x">X</option>
            </Select>
          </label>
        </div>
      </Card>
      <Card className="space-y-2">
        {captions.map((caption) => (
          <div key={caption} className="flex items-center justify-between rounded-md border border-border p-2">
            <span className="text-sm text-text">{caption}</span>
            <CopyButton value={caption} />
          </div>
        ))}
      </Card>
    </ToolLayout>
  );
};
