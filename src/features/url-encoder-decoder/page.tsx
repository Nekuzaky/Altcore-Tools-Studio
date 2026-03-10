import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { CopyButton } from "@/components/ui/CopyButton";

export const UrlEncoderDecoderPage = () => {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("https://tools.altcore.fr/?q=discord tools");

  const output = useMemo(() => {
    try {
      return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch {
      return "Invalid input for URL decode.";
    }
  }, [mode, input]);

  return (
    <ToolLayout
      seo={{
        title: "URL Encoder Decoder | Altcore Tools Studio",
        description: "Encode and decode URL text quickly.",
        canonicalPath: "/tools/url-encoder-decoder"
      }}
      title="URL Encoder Decoder"
      description="Convert text to URL-encoded format or decode URL values back to normal text."
      category="utility"
      toolSlug="url-encoder-decoder"
      helpText="Useful for query parameters, redirects and webhook payload values."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Mode</span>
          <Select value={mode} onChange={(event) => setMode(event.target.value)}>
            <option value="encode">Encode</option>
            <option value="decode">Decode</option>
          </Select>
        </label>
        <label className="space-y-2 text-sm text-text/90">
          <span>Input</span>
          <Textarea className="min-h-32" value={input} onChange={(event) => setInput(event.target.value)} />
        </label>
      </Card>
      <Card className="space-y-2">
        <p className="text-sm text-muted">Result</p>
        <Textarea className="min-h-32" value={output} readOnly />
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
