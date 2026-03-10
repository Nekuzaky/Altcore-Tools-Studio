import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

const toRadians = (d: number) => (d * Math.PI) / 180;

const eulerToQuaternion = (xDeg: number, yDeg: number, zDeg: number) => {
  const x = toRadians(xDeg) * 0.5;
  const y = toRadians(yDeg) * 0.5;
  const z = toRadians(zDeg) * 0.5;

  const cx = Math.cos(x);
  const sx = Math.sin(x);
  const cy = Math.cos(y);
  const sy = Math.sin(y);
  const cz = Math.cos(z);
  const sz = Math.sin(z);

  return {
    x: sx * cy * cz - cx * sy * sz,
    y: cx * sy * cz + sx * cy * sz,
    z: cx * cy * sz - sx * sy * cz,
    w: cx * cy * cz + sx * sy * sz
  };
};

export const UnityQuaternionEulerHelperPage = () => {
  const [xInput, setXInput] = useState("0");
  const [yInput, setYInput] = useState("90");
  const [zInput, setZInput] = useState("0");

  const result = useMemo(() => {
    const x = Number(xInput);
    const y = Number(yInput);
    const z = Number(zInput);

    if ([x, y, z].some((n) => Number.isNaN(n))) {
      return { ok: false, error: "Euler values must be valid numbers." } as const;
    }

    const q = eulerToQuaternion(x, y, z);
    const snippet = `Quaternion rot = Quaternion.Euler(${x}f, ${y}f, ${z}f);\ntransform.rotation = rot;\n\n// Approx quaternion values\n// x: ${q.x.toFixed(6)}, y: ${q.y.toFixed(6)}, z: ${q.z.toFixed(6)}, w: ${q.w.toFixed(6)}`;

    return { ok: true, snippet } as const;
  }, [xInput, yInput, zInput]);

  return (
    <ToolLayout
      seo={{
        title: "Unity Quaternion Euler Helper | Altcore Tools Studio",
        description: "Convert Euler angles into Quaternion-ready Unity snippets.",
        canonicalPath: "/tools/unity-quaternion-euler-helper"
      }}
      title="Unity Quaternion Euler Helper"
      description="Convert Euler input into Quaternion usage snippets for Unity C#."
      category="unity"
      toolSlug="unity-quaternion-euler-helper"
      helpText="Unity internally uses quaternions, but authoring with Euler is common. This helper gives both forms."
    >
      <Card className="grid gap-3 sm:grid-cols-3">
        <Input value={xInput} onChange={(e) => setXInput(e.target.value)} />
        <Input value={yInput} onChange={(e) => setYInput(e.target.value)} />
        <Input value={zInput} onChange={(e) => setZInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {result.ok ? (
          <>
            <pre className="rounded bg-background p-3 text-xs text-text">{result.snippet}</pre>
            <CopyButton value={result.snippet} label="Copy Quaternion snippet" />
          </>
        ) : (
          <p className="text-sm text-danger">{result.error}</p>
        )}
      </Card>
    </ToolLayout>
  );
};
