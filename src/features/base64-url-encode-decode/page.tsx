import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { decodeBase64, encodeBase64 } from "@/features/base64-url-encode-decode/codec";

export const Base64UrlEncodeDecodePage = () => {
  const [input, setInput] = useState("Altcore Tools");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (action: "encode" | "decode") => {
    setError("");
    try {
      const result = action === "encode" ? encodeBase64(input) : decodeBase64(input);
      setOutput(result);
    } catch {
      setError("Invalid input for this decode operation.");
    }
  };

  return (
    <ToolLayout
      seo={{
        title: "Base64 Encoder Decoder | Altcore Tools Studio",
        description: "Encode and decode text in Base64 format.",
        canonicalPath: "/tools/base64-encoder-decoder"
      }}
      title="Base64 Encoder Decoder"
      description="Encode and decode Base64 content with UTF-8 support."
      category="developer"
      toolSlug="base64-encoder-decoder"
      helpText="Use Base64 for transport and structured payload conversions."
    >
      <Card className="space-y-4">
        <Textarea value={input} onChange={(event) => setInput(event.target.value)} className="min-h-32 font-mono text-xs" />
        <div className="flex gap-2">
          <Button onClick={() => run("encode")}>Encode</Button>
          <Button variant="secondary" onClick={() => run("decode")}>
            Decode
          </Button>
        </div>
      </Card>

      <Card className="space-y-2">
        <p className="text-sm text-muted">Result</p>
        <Textarea readOnly value={output} className="min-h-32 font-mono text-xs" />
        <CopyButton value={output} />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </Card>
    </ToolLayout>
  );
};
