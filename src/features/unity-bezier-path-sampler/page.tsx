import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

type Vec3 = { x: number; y: number; z: number };

const parsePoints = (value: string): Vec3[] =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/[;,\s]+/).map((p) => Number(p));
      if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) {
        throw new Error("Each line must be: x y z");
      }
      return { x: parts[0], y: parts[1], z: parts[2] };
    });

const lerp = (a: Vec3, b: Vec3, t: number): Vec3 => ({
  x: a.x + (b.x - a.x) * t,
  y: a.y + (b.y - a.y) * t,
  z: a.z + (b.z - a.z) * t
});

const cubicBezier = (p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 => {
  const a = lerp(p0, p1, t);
  const b = lerp(p1, p2, t);
  const c = lerp(p2, p3, t);
  const d = lerp(a, b, t);
  const e = lerp(b, c, t);
  return lerp(d, e, t);
};

export const UnityBezierPathSamplerPage = () => {
  const [pointsInput, setPointsInput] = useState("0 0 0\n2 0 0\n2 0 4\n4 0 4");
  const [stepsInput, setStepsInput] = useState("16");

  const result = useMemo(() => {
    try {
      const points = parsePoints(pointsInput);
      if (points.length !== 4) {
        return { ok: false, error: "Provide exactly 4 control points (P0..P3)." } as const;
      }
      const steps = Math.max(2, Math.min(256, Number.parseInt(stepsInput, 10) || 16));
      const sampled = Array.from({ length: steps + 1 }, (_, i) => {
        const t = i / steps;
        return cubicBezier(points[0], points[1], points[2], points[3], t);
      });

      const list = sampled
        .map((p) => `new Vector3(${p.x.toFixed(3)}f, ${p.y.toFixed(3)}f, ${p.z.toFixed(3)}f)`)
        .join(",\n    ");

      const snippet = `var path = new Vector3[]\n{\n    ${list}\n};`;
      return { ok: true, snippet, sampledCount: sampled.length } as const;
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Invalid input."
      } as const;
    }
  }, [pointsInput, stepsInput]);

  return (
    <ToolLayout
      seo={{
        title: "Unity Bezier Path Sampler | Altcore Tools Studio",
        description: "Sample cubic Bezier control points and generate Unity Vector3 paths.",
        canonicalPath: "/tools/unity-bezier-path-sampler"
      }}
      title="Unity Bezier Path Sampler"
      description="Sample a cubic Bezier path and generate copy-ready Vector3 points."
      category="unity"
      toolSlug="unity-bezier-path-sampler"
      helpText="Enter 4 control points (one per line). Format: x y z."
    >
      <Card className="space-y-3">
        <Textarea className="min-h-36" value={pointsInput} onChange={(e) => setPointsInput(e.target.value)} />
        <Input value={stepsInput} onChange={(e) => setStepsInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {result.ok ? (
          <>
            <p className="text-sm text-muted">{result.sampledCount} sampled points generated.</p>
            <pre className="max-h-[30rem] overflow-auto rounded bg-background p-3 text-xs text-text">{result.snippet}</pre>
            <CopyButton value={result.snippet} label="Copy Vector3 path" />
          </>
        ) : (
          <p className="text-sm text-danger">{result.error}</p>
        )}
      </Card>
    </ToolLayout>
  );
};
