import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

export const ContentAngleGeneratorPage = () => {
  const [topic, setTopic] = useState("Créer un tool SaaS");
  const angles = useMemo(() => {
    const t = topic || "ce sujet";
    return [
      `Angle erreur: ce que tout le monde fait mal sur ${t}`,
      `Angle système: framework simple pour réussir ${t}`,
      `Angle comparaison: méthode A vs méthode B sur ${t}`,
      `Angle contrarien: pourquoi l'approche classique de ${t} échoue`
    ];
  }, [topic]);

  return (
    <ToolLayout seo={{ title: "Content Angle Generator | Altcore Tools Studio", description: "Generate fresh angles for one content topic.", canonicalPath: "/tools/content-angle-generator" }} title="Content Angle Generator" description="Trouve de nouveaux angles pour éviter les contenus répétitifs." category="creator" toolSlug="content-angle-generator" helpText="Garde ton sujet, change seulement l'angle éditorial.">
      <Card className="space-y-3">
        <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {angles.map((a) => (
          <div key={a} className="flex items-center justify-between rounded-md border border-border p-2">
            <span className="text-sm text-text">{a}</span>
            <CopyButton value={a} />
          </div>
        ))}
      </Card>
    </ToolLayout>
  );
};
