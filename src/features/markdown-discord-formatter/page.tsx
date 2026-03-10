import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { markdownToDiscord } from "@/features/markdown-discord-formatter/formatter";

const sample = `# Patch 1.2.0

## Added
1. New UI cards
2. Faster loading

Read details: [changelog](https://example.com/changelog)
`;

export const MarkdownDiscordFormatterPage = () => {
  const [input, setInput] = useState(sample);
  const output = useMemo(() => markdownToDiscord(input), [input]);

  return (
    <ToolLayout
      seo={{
        title: "Markdown to Discord Formatter | Altcore Tools",
        description: "Convert markdown text into Discord-friendly format.",
        canonicalPath: "/tools/markdown-discord-formatter"
      }}
      title="Markdown to Discord Formatter"
      description="Paste markdown content and get Discord-friendly formatted text."
      category="text"
      toolSlug="markdown-discord-formatter"
      helpText="Discord does not support full markdown syntax. This formatter normalizes common sections."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-2">
          <p className="text-sm text-muted">Markdown input</p>
          <Textarea className="min-h-72 font-mono text-xs" value={input} onChange={(event) => setInput(event.target.value)} />
        </Card>
        <Card className="space-y-2">
          <p className="text-sm text-muted">Discord output</p>
          <Textarea className="min-h-72 font-mono text-xs" readOnly value={output} />
          <CopyButton value={output} />
        </Card>
      </div>
    </ToolLayout>
  );
};
