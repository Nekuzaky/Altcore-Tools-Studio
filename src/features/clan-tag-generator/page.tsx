import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Select } from "@/components/ui/Select";

const toneParts: Record<string, string[]> = {
  tactical: ["TR", "OPS", "RG", "VTX", "STRK"],
  dark: ["NX", "VOID", "BLK", "NCTR", "SHDW"],
  clean: ["CORE", "AXIS", "NOVA", "CTRL", "UNIT"]
};

export const ClanTagGeneratorPage = () => {
  const [tone, setTone] = useState("tactical");
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const parts = toneParts[tone] ?? toneParts.tactical;
    setResults(Array.from({ length: 10 }, (_, idx) => `[${parts[idx % parts.length]}]`));
  };

  return (
    <ToolLayout
      seo={{
        title: "Clan Tag Generator | Altcore Tools Studio",
        description: "Generate short clan tags for gaming teams.",
        canonicalPath: "/tools/clan-tag-generator"
      }}
      title="Clan Tag Generator"
      description="Generate short, readable clan tags for teams and squads."
      category="gaming"
      toolSlug="clan-tag-generator"
      helpText="Keep tags short (3-5 chars) for better in-game readability."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Tone</span>
          <Select value={tone} onChange={(event) => setTone(event.target.value)}>
            <option value="tactical">Tactical</option>
            <option value="dark">Dark</option>
            <option value="clean">Clean</option>
          </Select>
        </label>
        <Button onClick={generate}>Generate tags</Button>
      </Card>
      <Card className="space-y-2">
        {results.length ? results.map((tag) => (
          <div key={tag} className="flex items-center justify-between rounded-md border border-border p-2">
            <span className="font-mono text-sm text-text">{tag}</span>
            <CopyButton value={tag} />
          </div>
        )) : <p className="text-sm text-muted">Generate to see tag ideas.</p>}
      </Card>
    </ToolLayout>
  );
};
