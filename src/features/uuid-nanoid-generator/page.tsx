import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { generateNanoIdLike, generateUuid } from "@/features/uuid-nanoid-generator/generator";

export const UuidNanoIdGeneratorPage = () => {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [nanoids, setNanoids] = useState<string[]>([]);

  const run = () => {
    const safeCount = Math.min(25, Math.max(1, count));
    setUuids(Array.from({ length: safeCount }, () => generateUuid()));
    setNanoids(Array.from({ length: safeCount }, () => generateNanoIdLike()));
  };

  return (
    <ToolLayout
      seo={{
        title: "UUID Generator | Altcore Tools Studio",
        description: "Generate UUID v4 values and optional NanoID-like strings.",
        canonicalPath: "/tools/uuid-generator"
      }}
      title="UUID Generator"
      description="Generate one or multiple UUID values quickly."
      category="developer"
      toolSlug="uuid-generator"
      helpText="UUID is the standard format. NanoID-like values are included as optional short IDs."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Count</span>
          <Input type="number" min={1} max={25} value={count} onChange={(event) => setCount(Number(event.target.value))} />
        </label>
        <Button onClick={run}>Generate</Button>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold text-text">UUID v4</h2>
          {uuids.map((id) => (
            <div key={id} className="flex items-center justify-between rounded-md border border-border p-2">
              <span className="font-mono text-xs text-text">{id}</span>
              <CopyButton value={id} />
            </div>
          ))}
        </Card>
        <Card className="space-y-2">
          <h2 className="text-lg font-semibold text-text">NanoID-like</h2>
          {nanoids.map((id) => (
            <div key={id} className="flex items-center justify-between rounded-md border border-border p-2">
              <span className="font-mono text-xs text-text">{id}</span>
              <CopyButton value={id} />
            </div>
          ))}
        </Card>
      </div>
    </ToolLayout>
  );
};
