import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { parseCurl, toAxiosCode, toFetchCode } from "@/features/curl-to-fetch-converter/converter";

const exampleCurl = `curl -X POST "https://api.example.com/users" -H "Content-Type: application/json" -H "Authorization: Bearer token" -d "{\"name\":\"Altcore\"}"`;

export const CurlToFetchConverterPage = () => {
  const [input, setInput] = useState(exampleCurl);
  const [mode, setMode] = useState("fetch");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      const parsed = parseCurl(input);
      setOutput(mode === "fetch" ? toFetchCode(parsed) : toAxiosCode(parsed));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to parse cURL command.");
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
        title: "cURL to Fetch Converter | Altcore Tools Studio",
        description: "Convert cURL commands to fetch() or axios snippets.",
        canonicalPath: "/tools/curl-to-fetch-converter"
      }}
      title="cURL to Fetch Converter"
      description="Convert cURL snippets into modern JavaScript request code quickly."
      category="developer"
      toolSlug="curl-to-fetch-converter"
      helpText="How to use: paste a cURL command, choose fetch or axios, then convert and copy the output."
    >
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={convert}>Convert</Button>
          <Button variant="secondary" onClick={() => setInput(exampleCurl)}>Example input</Button>
          <Button variant="ghost" onClick={clear}>Clear</Button>
          <Select className="w-36" value={mode} onChange={(event) => setMode(event.target.value)}>
            <option value="fetch">fetch</option>
            <option value="axios">axios</option>
          </Select>
        </div>
        <Textarea className="min-h-48 font-mono text-xs" value={input} onChange={(event) => setInput(event.target.value)} />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </Card>

      <Card className="space-y-2">
        <p className="text-sm text-muted">Converted output</p>
        <Textarea className="min-h-64 font-mono text-xs" readOnly value={output} />
        <CopyButton value={output} label="Copy result" />
      </Card>

      <Card className="space-y-2 text-sm text-muted">
        <h2 className="text-base font-semibold text-text">Example use case</h2>
        <p>Move API tests from terminal to frontend code quickly when integrating a new endpoint.</p>
      </Card>
    </ToolLayout>
  );
};
