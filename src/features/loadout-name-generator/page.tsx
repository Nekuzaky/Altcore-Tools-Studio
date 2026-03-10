import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const archetypes: Record<string, string[]> = {
  assault: ["Rush", "Breaker", "Frontline", "Titan", "Storm"],
  stealth: ["Ghost", "Silence", "Shade", "Needle", "Echo"],
  sniper: ["Longshot", "Zero Recoil", "One Tap", "Deadeye", "Overwatch"]
};

export const LoadoutNameGeneratorPage = () => {
  const [weapon, setWeapon] = useState("M4");
  const [style, setStyle] = useState("assault");
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const parts = archetypes[style] ?? archetypes.assault;
    const base = weapon.trim().toUpperCase() || "AR";
    setResults(parts.map((part, idx) => `${base} ${part} ${idx + 1}`));
  };

  return (
    <ToolLayout
      seo={{
        title: "Loadout Name Generator | Altcore Tools Studio",
        description: "Generate loadout names by weapon and play style.",
        canonicalPath: "/tools/loadout-name-generator"
      }}
      title="Loadout Name Generator"
      description="Generate memorable names for your builds and class presets."
      category="gaming"
      toolSlug="loadout-name-generator"
      helpText="Name your loadouts clearly so teammates can understand your setup fast."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Weapon/Build keyword</span>
            <Input value={weapon} onChange={(event) => setWeapon(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Style</span>
            <Select value={style} onChange={(event) => setStyle(event.target.value)}>
              <option value="assault">Assault</option>
              <option value="stealth">Stealth</option>
              <option value="sniper">Sniper</option>
            </Select>
          </label>
        </div>
        <Button onClick={generate}>Generate names</Button>
      </Card>
      <Card className="space-y-2">
        {results.length ? results.map((name) => (
          <div key={name} className="flex items-center justify-between rounded-md border border-border p-2">
            <span className="text-sm text-text">{name}</span>
            <CopyButton value={name} />
          </div>
        )) : <p className="text-sm text-muted">Generate to see loadout names.</p>}
      </Card>
    </ToolLayout>
  );
};
