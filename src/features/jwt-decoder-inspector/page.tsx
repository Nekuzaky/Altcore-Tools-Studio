import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";
import { decodeJwt } from "@/features/jwt-decoder-inspector/decoder";

export const JwtDecoderInspectorPage = () => {
  const [token, setToken] = useState("");
  const decoded = useMemo(() => decodeJwt(token), [token]);

  return (
    <ToolLayout
      seo={{
        title: "JWT Decoder Inspector | Altcore Tools",
        description: "Inspect JWT header and payload locally without sending data.",
        canonicalPath: "/tools/jwt-decoder-inspector"
      }}
      title="JWT Decoder Inspector"
      description="Paste a JWT token and inspect decoded header and payload instantly."
      category="security"
      toolSlug="jwt-decoder-inspector"
      helpText="Local only: decoding happens in your browser and does not verify token signature."
    >
      <Card className="space-y-2">
        <p className="text-sm text-muted">JWT token</p>
        <Textarea value={token} onChange={(event) => setToken(event.target.value)} className="min-h-32 font-mono text-xs" />
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-2">
          <p className="text-sm text-muted">Header</p>
          <Textarea
            readOnly
            value={decoded?.header ? JSON.stringify(decoded.header, null, 2) : ""}
            className="min-h-60 font-mono text-xs"
          />
          <CopyButton value={decoded?.header ? JSON.stringify(decoded.header, null, 2) : ""} />
        </Card>
        <Card className="space-y-2">
          <p className="text-sm text-muted">Payload</p>
          <Textarea
            readOnly
            value={decoded?.payload ? JSON.stringify(decoded.payload, null, 2) : ""}
            className="min-h-60 font-mono text-xs"
          />
          <CopyButton value={decoded?.payload ? JSON.stringify(decoded.payload, null, 2) : ""} />
        </Card>
      </div>

      <Card>
        <p className="text-sm text-muted">
          Signature length: <span className="text-text">{decoded?.signature.length ?? 0}</span>
        </p>
      </Card>
    </ToolLayout>
  );
};
