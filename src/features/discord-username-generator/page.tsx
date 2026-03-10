import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { generateDiscordUsernames } from "@/features/discord-username-generator/generators";

export const DiscordUsernameGeneratorPage = () => {
  const [style, setStyle] = useState("clean");
  const [keyword, setKeyword] = useState("altcore");
  const [results, setResults] = useState<string[]>([]);

  const onGenerate = () => setResults(generateDiscordUsernames(keyword, style));

  return (
    <ToolLayout
      seo={{
        title: "Discord Username Generator | Altcore Tools",
        description: "Generate Discord usernames by keyword and style in one click.",
        canonicalPath: "/tools/discord-username-generator"
      }}
      title="Discord Username Generator"
      description="Pick a style, enter a keyword, and generate username ideas for Discord."
      category="discord"
      toolSlug="discord-username-generator"
      helpText="Try short keywords for cleaner combinations and better readability."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90">
            <span>Style</span>
            <Select value={style} onChange={(event) => setStyle(event.target.value)}>
              <option value="clean">Clean</option>
              <option value="edgy">Edgy</option>
              <option value="gamer">Gamer</option>
            </Select>
          </label>
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Keyword</span>
            <Input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="dragon" />
          </label>
        </div>
        <Button onClick={onGenerate}>Generate</Button>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-lg font-semibold text-text">Results</h2>
        <div className="space-y-2">
          {results.length ? (
            results.map((result) => (
              <div
                key={result}
                className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2"
              >
                <span className="font-mono text-sm text-text/90">{result}</span>
                <CopyButton value={result} />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">Generate to see username ideas.</p>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

