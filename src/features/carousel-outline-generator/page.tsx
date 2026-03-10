import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

export const CarouselOutlineGeneratorPage = () => {
  const [topic, setTopic] = useState("Optimiser son workflow créateur");
  const outline = useMemo(() => {
    const slides = [
      `Slide 1 - Hook: Pourquoi ${topic} bloque la plupart des créateurs`,
      `Slide 2 - Erreur fréquente sur ${topic}`,
      `Slide 3 - Méthode simple étape 1`,
      `Slide 4 - Méthode simple étape 2`,
      `Slide 5 - Résultat attendu + exemple`,
      `Slide 6 - CTA: Commente ton process actuel`
    ];
    return slides.join("\n");
  }, [topic]);

  return (
    <ToolLayout seo={{ title: "Carousel Outline Generator | Altcore Tools Studio", description: "Generate social carousel slide outlines.", canonicalPath: "/tools/carousel-outline-generator" }} title="Carousel Outline Generator" description="Génère une structure de carrousel claire en 6 slides." category="creator" toolSlug="carousel-outline-generator" helpText="Garde une idée par slide pour maximiser la lecture.">
      <Card className="space-y-3">
        <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{outline}</pre>
        <CopyButton value={outline} />
      </Card>
    </ToolLayout>
  );
};
