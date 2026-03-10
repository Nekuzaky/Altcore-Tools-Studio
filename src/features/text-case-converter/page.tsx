import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const toTitleCase = (value: string) =>
  value
    .toLowerCase()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const TextCaseConverterPage = () => {
  const [input, setInput] = useState("altcore tools studio");
  const [mode, setMode] = useState("upper");

  const output = useMemo(() => {
    switch (mode) {
      case "lower":
        return input.toLowerCase();
      case "title":
        return toTitleCase(input);
      case "sentence":
        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      default:
        return input.toUpperCase();
    }
  }, [input, mode]);

  return (
    <ToolLayout
      seo={{
        title: "Text Case Converter | Altcore Tools Studio",
        description: "Convert text between uppercase, lowercase, title and sentence case.",
        canonicalPath: "/tools/text-case-converter"
      }}
      title="Text Case Converter"
      description="Transform text case quickly for docs, UI labels and content drafts."
      category="utility"
      toolSlug="text-case-converter"
      helpText="Useful for quick formatting passes before publishing content."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Input</span>
          <Input value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
        <label className="space-y-2 text-sm text-text/90">
          <span>Case</span>
          <Select value={mode} onChange={(event) => setMode(event.target.value)}>
            <option value="upper">UPPERCASE</option>
            <option value="lower">lowercase</option>
            <option value="title">Title Case</option>
            <option value="sentence">Sentence case</option>
          </Select>
        </label>
      </Card>
      <Card className="space-y-2">
        <p className="text-sm text-muted">Output</p>
        <div className="rounded-md border border-border bg-background p-3 text-text">{output}</div>
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
