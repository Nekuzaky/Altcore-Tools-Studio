import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { generateGamertags } from "@/features/gamertag-generator/generators";

export const GamertagGeneratorPage = () => {
  const [keyword, setKeyword] = useState("shadow");
  const [tone, setTone] = useState("cool");
  const [results, setResults] = useState<string[]>([]);

  const onGenerate = () => setResults(generateGamertags(keyword, tone));

  return (
    <ToolLayout
      seo={{
        title: "Gamertag Generator | Altcore Tools",
        description: "Generate gamertag ideas by keyword and tone in seconds.",
        canonicalPath: "/tools/gamertag-generator",
        ogImage: "/og/gamertag-generator.jpg"
      }}
      title="Gamertag Generator"
      description="Generate gamertags by keyword and tone for your gaming profile."
      category="gaming"
      toolSlug="gamertag-generator"
      helpText="Use one strong keyword for better readability and memorable tags."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Keyword</span>
            <Input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="wolf" />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Tone</span>
            <Select value={tone} onChange={(event) => setTone(event.target.value)}>
              <option value="cool">Cool</option>
              <option value="aggressive">Aggressive</option>
              <option value="funny">Funny</option>
            </Select>
          </label>
        </div>
        <Button onClick={onGenerate}>Generate list</Button>
      </Card>
      <Card className="space-y-2">
        {results.length ? (
          results.map((item) => (
            <div key={item} className="flex items-center justify-between rounded-md border border-border p-2">
              <span className="font-mono text-sm text-text/90">{item}</span>
              <CopyButton value={item} />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">Click generate to view gamertag ideas.</p>
        )}
      </Card>
    </ToolLayout>
  );
};

