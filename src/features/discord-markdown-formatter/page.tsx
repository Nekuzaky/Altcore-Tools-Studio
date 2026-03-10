import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const applyStyle = (mode: string, value: string) => {
  switch (mode) {
    case "bold":
      return `**${value}**`;
    case "italic":
      return `*${value}*`;
    case "code":
      return `\`\`\`\n${value}\n\`\`\``;
    case "quote":
      return value
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    case "spoiler":
      return `||${value}||`;
    case "list":
      return value
        .split("\n")
        .filter(Boolean)
        .map((line) => `- ${line}`)
        .join("\n");
    default:
      return value;
  }
};

export const DiscordMarkdownFormatterPage = () => {
  const [mode, setMode] = useState("bold");
  const [input, setInput] = useState("Altcore update notes");
  const [trigger, setTrigger] = useState(0);

  const output = useMemo(() => {
    void trigger;
    return applyStyle(mode, input);
  }, [mode, input, trigger]);

  return (
    <ToolLayout
      seo={{
        title: "Discord Markdown Formatter | Altcore Tools Studio",
        description: "Generate Discord markdown snippets with one click.",
        canonicalPath: "/tools/discord-markdown-formatter"
      }}
      title="Discord Markdown Formatter"
      description="Generate Discord-friendly formatting for bold, quote, spoiler, code block and list text."
      category="discord"
      toolSlug="discord-markdown-formatter"
      helpText="Use line breaks in input to create multi-line quotes and lists."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Format type</span>
          <Select value={mode} onChange={(event) => setMode(event.target.value)}>
            <option value="bold">Bold</option>
            <option value="italic">Italic</option>
            <option value="code">Code Block</option>
            <option value="quote">Quote</option>
            <option value="spoiler">Spoiler</option>
            <option value="list">List</option>
          </Select>
        </label>
        <label className="space-y-2 text-sm text-text/90">
          <span>Input</span>
          <Input value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        <Button onClick={() => setTrigger((x) => x + 1)}>Apply format</Button>
      </Card>
      <Card className="space-y-2">
        <p className="text-sm text-muted">Output</p>
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{output}</pre>
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
