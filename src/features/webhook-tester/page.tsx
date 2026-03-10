import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type ResponseState = {
  status: number;
  body: string;
  headers: string;
} | null;

export const WebhookTesterPage = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("POST");
  const [payload, setPayload] = useState('{\n  "content": "Hello from Altcore Tools"\n}');
  const [headersInput, setHeadersInput] = useState('{\n  "Content-Type": "application/json"\n}');
  const [response, setResponse] = useState<ResponseState>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setError("");
    setLoading(true);
    setResponse(null);

    try {
      const parsedHeaders = JSON.parse(headersInput) as Record<string, string>;
      const parsedBody = payload.trim() ? JSON.parse(payload) : {};

      const res = await fetch(url, {
        method,
        headers: parsedHeaders,
        body: method === "GET" ? undefined : JSON.stringify(parsedBody)
      });

      const text = await res.text();
      const headers = JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2);
      setResponse({ status: res.status, body: text, headers });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send webhook request.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      seo={{
        title: "Webhook Tester | Altcore Tools",
        description: "Send webhook payloads and inspect response status, headers, and body.",
        canonicalPath: "/tools/webhook-tester"
      }}
      title="Webhook Tester"
      description="Test webhook endpoints with custom JSON payload and headers."
      category="developer"
      toolSlug="webhook-tester"
      helpText="Some endpoints block browser requests due to CORS. Use a proxy for strict APIs."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Webhook URL</span>
          <Input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/webhook" />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-text/90">
            <span>Method</span>
            <Select value={method} onChange={(event) => setMethod(event.target.value)}>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="PATCH">PATCH</option>
              <option value="GET">GET</option>
            </Select>
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Headers (JSON)</span>
            <Textarea className="min-h-24 font-mono text-xs" value={headersInput} onChange={(event) => setHeadersInput(event.target.value)} />
          </label>
        </div>
        <label className="space-y-2 text-sm text-text/90">
          <span>Payload (JSON)</span>
          <Textarea className="min-h-40 font-mono text-xs" value={payload} onChange={(event) => setPayload(event.target.value)} />
        </label>
        <Button onClick={send} disabled={loading || !url}>
          {loading ? "Sending..." : "Send request"}
        </Button>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </Card>

      <Card className="space-y-3">
        <h2 className="text-lg font-semibold text-text">Response</h2>
        {!response ? (
          <p className="text-sm text-muted">No response yet.</p>
        ) : (
          <>
            <p className="text-sm text-text">Status: {response.status}</p>
            <label className="space-y-2">
              <span className="text-sm text-muted">Headers</span>
              <Textarea readOnly className="min-h-24 font-mono text-xs" value={response.headers} />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-muted">Body</span>
              <Textarea readOnly className="min-h-40 font-mono text-xs" value={response.body} />
            </label>
            <CopyButton value={response.body} label="Copy body" />
          </>
        )}
      </Card>
    </ToolLayout>
  );
};
