import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { formatJson, minifyJson } from "@/features/json-formatter/formatter";
import { downloadTextFile } from "@/lib/download";

export const JsonFormatterPage = () => {
  const [input, setInput] = useState('{"hello":"world"}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const run = (mode: "format" | "minify") => {
    try {
      const result = mode === "format" ? formatJson(input) : minifyJson(input);
      setOutput(result);
      setError("");
      setIsValid(true);
    } catch {
      setError("Invalid JSON. Check the input and try again.");
      setIsValid(false);
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setIsValid(true);
      setError("");
    } catch {
      setIsValid(false);
      setError("Invalid JSON. Check brackets, commas and quotes.");
    }
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(null);
  };

  return (
    <ToolLayout
      seo={{
        title: "JSON Formatter | Altcore Tools",
        description: "Format or minify JSON payloads quickly with copy support.",
        canonicalPath: "/tools/json-formatter"
      }}
      title="JSON Formatter"
      description="Paste JSON data, then format, minify, copy, or download the result."
      category="developer"
      toolSlug="json-formatter"
      helpText="This tool runs entirely in your browser. Your JSON is not sent anywhere."
    >
      <Card className="space-y-4">
        <label className="block space-y-2 text-sm text-text/90">
          <span>Input JSON</span>
          <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-44 font-mono" />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => run("format")}>Format</Button>
          <Button variant="secondary" onClick={() => run("minify")}>
            Minify
          </Button>
          <Button variant="secondary" onClick={validate}>
            Validate
          </Button>
          <Button variant="ghost" onClick={clear}>
            Clear
          </Button>
        </div>
        {isValid === true ? <p className="text-sm text-success">Valid JSON.</p> : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </Card>

      <Card className="space-y-4">
        <label className="block space-y-2 text-sm text-text/90">
          <span>Result</span>
          <Textarea readOnly value={output} className="min-h-44 font-mono" />
        </label>
        <div className="flex flex-wrap gap-2">
          <CopyButton value={output} label="Copy result" />
          <Button variant="secondary" onClick={() => downloadTextFile("formatted.json", output)} disabled={!output}>
            Download
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
};

