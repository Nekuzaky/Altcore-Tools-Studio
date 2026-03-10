import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

export const UnityLayermaskCalculatorPage = () => {
  const [layersInput, setLayersInput] = useState("0,8,9");

  const result = useMemo(() => {
    const layers = layersInput
      .split(",")
      .map((x) => Number(x.trim()))
      .filter((n) => Number.isInteger(n) && n >= 0 && n <= 31);

    const mask = layers.reduce((acc, layer) => acc | (1 << layer), 0);
    return { layers, mask };
  }, [layersInput]);

  return (
    <ToolLayout seo={{ title: "Unity LayerMask Calculator | Altcore Tools Studio", description: "Compute LayerMask integer values.", canonicalPath: "/tools/unity-layermask-calculator" }} title="Unity LayerMask Calculator" description="Compute LayerMask values from Unity layer indices." category="unity" toolSlug="unity-layermask-calculator" helpText="Enter comma-separated layers between 0 and 31.">
      <Card className="space-y-3">
        <Input value={layersInput} onChange={(e) => setLayersInput(e.target.value)} />
        <p className="text-sm text-muted">Valid layers: {result.layers.join(", ") || "none"}</p>
      </Card>
      <Card className="space-y-2">
        <div className="rounded border border-border p-3 text-sm text-text">Mask int value: {result.mask}</div>
        <CopyButton value={`${result.mask}`} label="Copy mask" />
      </Card>
    </ToolLayout>
  );
};
