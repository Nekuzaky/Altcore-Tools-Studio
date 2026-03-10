import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const lower = "abcdefghijkmnopqrstuvwxyz";
const numbers = "23456789";
const symbols = "!@#$%*?";

const generate = (length: number, withSymbols: boolean) => {
  const chars = `${upper}${lower}${numbers}${withSymbols ? symbols : ""}`;
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
};

export const PasswordGeneratorPage = () => {
  const [length, setLength] = useState(16);
  const [withSymbols, setWithSymbols] = useState(true);
  const [nonce, setNonce] = useState(0);

  const password = useMemo(() => generate(Math.max(8, Math.min(64, length)), withSymbols), [length, withSymbols, nonce]);

  return (
    <ToolLayout
      seo={{
        title: "Password Generator | Altcore Tools Studio",
        description: "Generate secure random passwords in your browser.",
        canonicalPath: "/tools/password-generator"
      }}
      title="Password Generator"
      description="Generate strong random passwords with adjustable length and symbols."
      category="utility"
      toolSlug="password-generator"
      helpText="This tool runs locally in your browser and does not store generated passwords."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Length</span>
          <Input type="number" min={8} max={64} value={length} onChange={(event) => setLength(Number(event.target.value))} />
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-text/90">
          <input type="checkbox" checked={withSymbols} onChange={(event) => setWithSymbols(event.target.checked)} />
          Include symbols
        </label>
        <button type="button" onClick={() => setNonce((x) => x + 1)} className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white">
          Regenerate
        </button>
      </Card>
      <Card className="space-y-2">
        <div className="rounded-md border border-border bg-background p-3 font-mono text-sm text-text">{password}</div>
        <CopyButton value={password} />
      </Card>
    </ToolLayout>
  );
};
