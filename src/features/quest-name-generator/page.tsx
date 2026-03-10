import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Select } from "@/components/ui/Select";

const questByTone: Record<string, string[]> = {
  epic: ["Le Serment des Cendres", "Le Trône des Échos", "Le Dernier Gardien"],
  dark: ["La Crypte sans Nom", "Le Pacte du Néant", "Le Voile Brisé"],
  mystery: ["Le Signal Perdu", "L'Archive Interdite", "La Clé d'Onyx"]
};

export const QuestNameGeneratorPage = () => {
  const [tone, setTone] = useState("epic");
  const [results, setResults] = useState<string[]>([]);

  return (
    <ToolLayout seo={{ title: "Quest Name Generator | Altcore Tools Studio", description: "Generate original quest names quickly.", canonicalPath: "/tools/quest-name-generator" }} title="Quest Name Generator" description="Noms de quêtes RPG pour campagnes, jeux et univers custom." category="gaming" toolSlug="quest-name-generator" helpText="Combine avec une phrase d'objectif pour renforcer l'immersion.">
      <Card className="space-y-3">
        <Select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="epic">Epic</option>
          <option value="dark">Dark</option>
          <option value="mystery">Mystery</option>
        </Select>
        <Button onClick={() => setResults(questByTone[tone] ?? [])}>Generate quest names</Button>
      </Card>
      <Card className="space-y-2">
        {results.map((item) => (
          <div key={item} className="flex items-center justify-between rounded-md border border-border p-2">
            <span className="text-sm text-text">{item}</span>
            <CopyButton value={item} />
          </div>
        ))}
      </Card>
    </ToolLayout>
  );
};
