import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";

const MAX = 2000;

const splitDiscordMessage = (input: string) => {
  const chunks: string[] = [];
  let remaining = input;
  while (remaining.length > MAX) {
    let idx = remaining.lastIndexOf("\n", MAX);
    if (idx < 300) idx = MAX;
    chunks.push(remaining.slice(0, idx).trim());
    remaining = remaining.slice(idx).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks;
};

export const DiscordMessageSplitterPage = () => {
  const [input, setInput] = useState("Colle un long message ici...");
  const chunks = useMemo(() => splitDiscordMessage(input), [input]);

  return (
    <ToolLayout seo={{ title: "Discord Message Splitter | Altcore Tools Studio", description: "Split long text into Discord-safe message chunks.", canonicalPath: "/tools/discord-message-splitter" }} title="Discord Message Splitter" description="Découpe automatiquement les longs textes en blocs de 2000 caractères pour Discord." category="discord" toolSlug="discord-message-splitter" helpText="Idéal pour annonces longues, guides et changelogs.">
      <Card className="space-y-2">
        <Textarea className="min-h-52" value={input} onChange={(e) => setInput(e.target.value)} />
        <p className="text-xs text-muted">{input.length} caractères • {chunks.length} messages</p>
      </Card>
      <div className="space-y-3">
        {chunks.map((chunk, i) => (
          <Card key={i} className="space-y-2">
            <p className="text-sm text-muted">Message {i + 1}</p>
            <Textarea className="min-h-32" readOnly value={chunk} />
            <CopyButton value={chunk} label="Copy chunk" />
          </Card>
        ))}
      </div>
    </ToolLayout>
  );
};
