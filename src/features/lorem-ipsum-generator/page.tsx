import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

const sentence = "Lorem ipsum dolor sit amet consectetur adipiscing elit";

export const LoremIpsumGeneratorPage = () => {
  const [paragraphs, setParagraphs] = useState(3);

  const output = useMemo(
    () => Array.from({ length: Math.max(1, Math.min(12, paragraphs)) }, () => `${sentence}. ${sentence}.`).join("\n\n"),
    [paragraphs]
  );

  return (
    <ToolLayout
      seo={{
        title: "Lorem Ipsum Generator | Altcore Tools Studio",
        description: "Generate placeholder paragraphs quickly.",
        canonicalPath: "/tools/lorem-ipsum-generator"
      }}
      title="Lorem Ipsum Generator"
      description="Generate placeholder text blocks for layouts and prototypes."
      category="utility"
      toolSlug="lorem-ipsum-generator"
      helpText="Use small paragraph counts for cleaner mockups."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Paragraphs</span>
          <Input type="number" min={1} max={12} value={paragraphs} onChange={(event) => setParagraphs(Number(event.target.value))} />
        </label>
      </Card>
      <Card className="space-y-2">
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{output}</pre>
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
