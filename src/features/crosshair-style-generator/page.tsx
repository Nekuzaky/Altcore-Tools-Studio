import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

const styles: Record<string, string> = {
  precision: "Dot fin, lignes courtes, couleur cyan, opacité 100%.",
  tracking: "Crosshair moyen, contour léger, couleur verte, gap réduit.",
  aggressive: "Crosshair compact, couleur rouge, largeur 2, forte visibilité."
};

export const CrosshairStyleGeneratorPage = () => {
  const [mode, setMode] = useState("precision");
  const output = useMemo(() => styles[mode] ?? styles.precision, [mode]);

  return (
    <ToolLayout seo={{ title: "Crosshair Style Generator | Altcore Tools Studio", description: "Generate crosshair style presets by playstyle.", canonicalPath: "/tools/crosshair-style-generator" }} title="Crosshair Style Generator" description="Génère des presets de crosshair selon ton style de jeu." category="gaming" toolSlug="crosshair-style-generator" helpText="Teste chaque style 3 games avant de trancher.">
      <Card className="space-y-3">
        <Select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="precision">Precision</option>
          <option value="tracking">Tracking</option>
          <option value="aggressive">Aggressive</option>
        </Select>
        <div className="rounded-md border border-border bg-background p-3 text-sm text-text">{output}</div>
      </Card>
    </ToolLayout>
  );
};
