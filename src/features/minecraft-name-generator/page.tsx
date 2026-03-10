import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { generateMinecraftNames } from "@/features/minecraft-name-generator/generator";

export const MinecraftNameGeneratorPage = () => {
  const [keyword, setKeyword] = useState("ender");
  const [style, setStyle] = useState("survival");
  const [results, setResults] = useState<string[]>([]);

  return (
    <ToolLayout
      seo={{
        title: "Minecraft Name Generator | Altcore Tools",
        description: "Generate Minecraft-friendly names with style presets.",
        canonicalPath: "/tools/minecraft-name-generator"
      }}
      title="Minecraft Name Generator"
      description="Generate Minecraft username ideas with a keyword and style."
      category="gaming"
      toolSlug="minecraft-name-generator"
      helpText="Minecraft usernames are up to 16 characters. This generator keeps names within that limit."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Keyword</span>
            <Input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="dragon" />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Style</span>
            <Select value={style} onChange={(event) => setStyle(event.target.value)}>
              <option value="survival">Survival</option>
              <option value="pvp">PVP</option>
              <option value="fantasy">Fantasy</option>
            </Select>
          </label>
        </div>
        <Button onClick={() => setResults(generateMinecraftNames(keyword, style))}>Generate names</Button>
      </Card>

      <Card className="space-y-2">
        {results.length ? (
          results.map((name) => (
            <div key={name} className="flex items-center justify-between rounded-md border border-border p-2">
              <span className="font-mono text-sm text-text">{name}</span>
              <CopyButton value={name} />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">Generate to view Minecraft names.</p>
        )}
      </Card>
    </ToolLayout>
  );
};
