import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

const templates: Record<string, string> = {
  informative: `In this video, we break down {{topic}} in a clear and practical way.\n\nWhat you will learn:\n- Core concepts\n- Best practices\n- Common mistakes to avoid\n\nIf this helped, subscribe for more practical guides.`,
  energetic: `Today we dive into {{topic}} with real examples and actionable tips.\n\nWatch until the end for a quick checklist you can apply immediately.\n\nLike, comment, and share your results.`
};

export const YouTubeDescriptionGeneratorPage = () => {
  const [topic, setTopic] = useState("Discord server setup");
  const [tone, setTone] = useState("informative");
  const [output, setOutput] = useState("");

  const generate = () => {
    const base = templates[tone] ?? templates.informative;
    setOutput(base.replace(/{{topic}}/g, topic.trim() || "your topic"));
  };

  return (
    <ToolLayout
      seo={{
        title: "YouTube Description Generator | Altcore Tools Studio",
        description: "Generate YouTube video descriptions from a topic and tone.",
        canonicalPath: "/tools/youtube-description-generator"
      }}
      title="YouTube Description Generator"
      description="Generate a clear video description with structure and CTA."
      category="creator"
      toolSlug="youtube-description-generator"
      helpText="Adapt the generated text to your voice and include useful links."
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
              <option value="informative">Informative</option>
              <option value="energetic">Energetic</option>
            </Select>
          </label>
        </div>
        <Button onClick={generate}>Generate description</Button>
      </Card>

      <Card className="space-y-2">
        <Textarea className="min-h-64" value={output} readOnly />
        <CopyButton value={output} label="Copy description" />
      </Card>
    </ToolLayout>
  );
};
