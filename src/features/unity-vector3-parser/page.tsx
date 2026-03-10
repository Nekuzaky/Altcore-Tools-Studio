import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";

const parseVectors = (input: string) =>
  input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/[;,\s]+/).map((p) => Number(p));
      if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) {
        throw new Error("Each line must contain 3 numeric values.");
      }
      return { x: parts[0], y: parts[1], z: parts[2] };
    });

export const UnityVector3ParserPage = () => {
  const [input, setInput] = useState("1 0 0\n0 1 0\n0 0 1");

  const result = useMemo(() => {
    try {
      const vectors = parseVectors(input);
      if (!vectors.length) return { ok: false, error: "Add at least one vector." } as const;

      const center = vectors.reduce(
        (acc, v) => ({ x: acc.x + v.x, y: acc.y + v.y, z: acc.z + v.z }),
        { x: 0, y: 0, z: 0 }
      );
      center.x /= vectors.length;
      center.y /= vectors.length;
      center.z /= vectors.length;

      const snippet = `var points = new Vector3[]\n{\n${vectors
        .map((v) => `    new Vector3(${v.x}f, ${v.y}f, ${v.z}f),`)
        .join("\n")}\n};\n\nVector3 center = new Vector3(${center.x.toFixed(3)}f, ${center.y.toFixed(3)}f, ${center.z.toFixed(3)}f);`;

      return { ok: true, count: vectors.length, snippet } as const;
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Invalid vectors."
      } as const;
    }
  }, [input]);

  return (
    <ToolLayout
      seo={{
        title: "Unity Vector3 Parser | Altcore Tools Studio",
        description: "Parse raw xyz lines into Unity Vector3 arrays and center point.",
        canonicalPath: "/tools/unity-vector3-parser"
      }}
      title="Unity Vector3 Parser"
      description="Convert raw XYZ text into a clean Unity Vector3[] snippet."
      category="unity"
      toolSlug="unity-vector3-parser"
      helpText="Accepted separators: space, comma, semicolon. One vector per line."
    >
      <Card className="space-y-3">
        <Textarea className="min-h-40" value={input} onChange={(e) => setInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {result.ok ? (
          <>
            <p className="text-sm text-muted">{result.count} vectors parsed.</p>
            <pre className="max-h-[30rem] overflow-auto rounded bg-background p-3 text-xs text-text">{result.snippet}</pre>
            <CopyButton value={result.snippet} label="Copy Vector3 snippet" />
          </>
        ) : (
          <p className="text-sm text-danger">{result.error}</p>
        )}
      </Card>
    </ToolLayout>
  );
};
