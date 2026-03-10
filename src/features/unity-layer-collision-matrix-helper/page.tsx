import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";

const parsePairs = (input: string): Array<[number, number]> =>
  input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/[\-:,\s]+/).map((p) => Number(p));
      if (parts.length < 2 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 31)) {
        throw new Error("Each line must be two layer indices between 0 and 31. Example: 8-9");
      }
      return [parts[0], parts[1]] as [number, number];
    });

export const UnityLayerCollisionMatrixHelperPage = () => {
  const [pairsInput, setPairsInput] = useState("8-9\n8-10\n9-11");

  const result = useMemo(() => {
    try {
      const pairs = parsePairs(pairsInput);
      const snippet = pairs
        .map(([a, b]) => `Physics.IgnoreLayerCollision(${a}, ${b}, true);`)
        .join("\n");

      return { ok: true, count: pairs.length, snippet } as const;
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Invalid pair list."
      } as const;
    }
  }, [pairsInput]);

  return (
    <ToolLayout
      seo={{
        title: "Unity Layer Collision Matrix Helper | Altcore Tools Studio",
        description: "Generate Physics.IgnoreLayerCollision snippets from layer pairs.",
        canonicalPath: "/tools/unity-layer-collision-matrix-helper"
      }}
      title="Unity Layer Collision Matrix Helper"
      description="Generate collision-ignore calls from layer index pairs."
      category="unity"
      toolSlug="unity-layer-collision-matrix-helper"
      helpText="Use this to quickly configure runtime collision rules in bootstrap/init scripts."
    >
      <Card className="space-y-3">
        <Textarea className="min-h-36" value={pairsInput} onChange={(e) => setPairsInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {result.ok ? (
          <>
            <p className="text-sm text-muted">{result.count} collision rules generated.</p>
            <pre className="rounded bg-background p-3 text-xs text-text">{result.snippet}</pre>
            <CopyButton value={result.snippet} label="Copy collision matrix snippet" />
          </>
        ) : (
          <p className="text-sm text-danger">{result.error}</p>
        )}
      </Card>
    </ToolLayout>
  );
};
