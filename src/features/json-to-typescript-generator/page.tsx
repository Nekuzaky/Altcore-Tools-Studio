import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { jsonToTypescript } from "@/features/json-to-typescript-generator/generator";

const sample = `{
  "id": 42,
  "name": "Altcore",
  "active": true,
  "profile": {
    "country": "FR",
    "roles": ["admin", "editor"]
  }
}`;

export const JsonToTypescriptGeneratorPage = () => {
  const [input, setInput] = useState(sample);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const generate = () => {
    try {
      setOutput(jsonToTypescript(input));
      setError("");
    } catch {
      setError("Invalid JSON input. Please check your syntax.");
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolLayout
      seo={{
        title: "JSON to TypeScript Generator | Altcore Tools Studio",
        description: "Generate TypeScript interfaces from JSON with nested support.",
        canonicalPath: "/tools/json-to-typescript-generator"
      }}
      title="JSON to TypeScript Generator"
      description="Convert JSON payloads into reusable TypeScript interfaces quickly."
      category="developer"
      toolSlug="json-to-typescript-generator"
      helpText="How to use: paste JSON, click generate, and copy the output interfaces into your project."
    >
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={generate}>Generate interfaces</Button>
          <Button variant="secondary" onClick={() => setInput(sample)}>Example input</Button>
          <Button variant="ghost" onClick={clear}>Clear</Button>
        </div>
        <Textarea className="min-h-60 font-mono text-xs" value={input} onChange={(event) => setInput(event.target.value)} />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </Card>

      <Card className="space-y-2">
        <p className="text-sm text-muted">Generated TypeScript</p>
        <Textarea className="min-h-64 font-mono text-xs" readOnly value={output} />
        <CopyButton value={output} label="Copy result" />
      </Card>

      <Card className="space-y-2 text-sm text-muted">
        <h2 className="text-base font-semibold text-text">Example use case</h2>
        <p>Use generated interfaces to type API responses and reduce runtime bugs in React + TypeScript code.</p>
      </Card>
    </ToolLayout>
  );
};
