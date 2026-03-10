import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { generateYoutubeTitles } from "@/features/youtube-title-generator/generators";

export const YouTubeTitleGeneratorPage = () => {
  const [topic, setTopic] = useState("discord setup");
  const [tone, setTone] = useState("educational");
  const [results, setResults] = useState<string[]>([]);

  const onGenerate = () => setResults(generateYoutubeTitles(topic, tone));

  return (
    <ToolLayout
      seo={{
        title: "YouTube Title Generator | Altcore Tools",
        description: "Generate YouTube title ideas from topic and tone.",
        canonicalPath: "/tools/youtube-title-generator"
      }}
      title="YouTube Title Generator"
      description="Generate simple and punchy title ideas for your next video."
      category="creator"
      toolSlug="youtube-title-generator"
      helpText="Test multiple tones and compare click-through potential in your niche."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Topic</span>
            <Input value={topic} onChange={(event) => setTopic(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Tone</span>
            <Select value={tone} onChange={(event) => setTone(event.target.value)}>
              <option value="educational">Educational</option>
              <option value="hype">Hype</option>
              <option value="storytelling">Storytelling</option>
            </Select>
          </label>
        </div>
        <Button onClick={onGenerate}>Generate titles</Button>
      </Card>

      <Card className="space-y-2">
        {results.length ? (
          results.map((title) => (
            <div key={title} className="flex items-center justify-between rounded-md border border-border p-3">
              <span className="text-sm text-text/90">{title}</span>
              <CopyButton value={title} />
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">Generate to view title suggestions.</p>
        )}
      </Card>
    </ToolLayout>
  );
};

