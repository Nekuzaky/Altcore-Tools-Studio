import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const prefixes: Record<string, string[]> = {
  clean: ["chat", "updates", "support", "media", "announcements"],
  gaming: ["lfg", "clips", "scrims", "loadouts", "leaderboard"],
  creator: ["ideas", "scripts", "thumbnails", "collabs", "publishing"]
};

export const DiscordChannelNameGeneratorPage = () => {
  const [keyword, setKeyword] = useState("altcore");
  const [style, setStyle] = useState("clean");
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const base = keyword.trim().toLowerCase().replace(/\s+/g, "-") || "community";
    const items = prefixes[style] ?? prefixes.clean;
    setResults(items.map((item, idx) => `#${base}-${item}-${idx + 1}`));
  };

  return (
    <ToolLayout
      seo={{
        title: "Discord Channel Name Generator | Altcore Tools Studio",
        description: "Generate Discord channel names by keyword and style.",
        canonicalPath: "/tools/discord-channel-name-generator"
      }}
      title="Discord Channel Name Generator"
      description="Generate readable Discord channel names for better server structure."
      category="discord"
      toolSlug="discord-channel-name-generator"
      helpText="Use short channel names for better mobile readability."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Keyword</span>
            <Input value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Style</span>
            <Select value={style} onChange={(event) => setStyle(event.target.value)}>
              <option value="clean">Clean</option>
              <option value="gaming">Gaming</option>
              <option value="creator">Creator</option>
            </Select>
          </label>
        </div>
        <Button onClick={generate}>Generate names</Button>
      </Card>
      <Card className="space-y-2">
        {results.length ? results.map((name) => (
          <div key={name} className="flex items-center justify-between rounded-md border border-border p-2">
            <span className="font-mono text-sm text-text">{name}</span>
            <CopyButton value={name} />
          </div>
        )) : <p className="text-sm text-muted">Generate to see channel name ideas.</p>}
      </Card>
    </ToolLayout>
  );
};
