import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Select } from "@/components/ui/Select";

const pools: Record<string, string[]> = {
  tactical: ["Vanguard", "Sentinel", "Outrider", "Strike", "Protocol"],
  dark: ["Shadow", "Oblivion", "Revenant", "Nocturne", "Void"],
  elite: ["Prime", "Apex", "Dominion", "Legacy", "Phoenix"]
};

export const ClanNameGeneratorPage = () => {
  const [tone, setTone] = useState("tactical");
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const words = pools[tone] ?? pools.tactical;
    setResults(
      Array.from({ length: 8 }, (_, idx) => `${words[idx % words.length]} ${words[(idx + 2) % words.length]}`)
    );
  };

  return (
    <ToolLayout
      seo={{
        title: "Clan Name Generator | Altcore Tools Studio",
        description: "Generate clan and team names by selected tone.",
        canonicalPath: "/tools/clan-name-generator"
      }}
      title="Clan Name Generator"
      description="Generate clean clan names for teams, communities and guilds."
      category="gaming"
      toolSlug="clan-name-generator"
      helpText="Choose a tone and generate several options, then refine manually."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Tone</span>
          <Select value={tone} onChange={(event) => setTone(event.target.value)}>
            <option value="tactical">Tactical</option>
            <option value="dark">Dark</option>
            <option value="elite">Elite</option>
          </Select>
        </label>
        <Button onClick={generate}>Generate clan names</Button>
      </Card>
      <Card className="space-y-2">
        {results.length ? (
          results.map((name) => (
            <div key={name} className="flex items-center justify-between rounded-md border border-border p-2">
              <span className="text-sm text-text">{name}</span>
              <CopyButton value={name} />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">Generate to see name ideas.</p>
        )}
      </Card>
    </ToolLayout>
  );
};
