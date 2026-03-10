import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

type Preset = "ease-in-out" | "ease-in" | "ease-out" | "linear" | "pulse";

const buildCurve = (preset: Preset, duration: number, peak: number) => {
  if (preset === "linear") {
    return `new AnimationCurve(new Keyframe(0f, 0f), new Keyframe(${duration}f, 1f))`;
  }
  if (preset === "ease-in") {
    return `new AnimationCurve(\n    new Keyframe(0f, 0f, 0f, 0.25f),\n    new Keyframe(${duration}f, 1f, 1.2f, 0f)\n)`;
  }
  if (preset === "ease-out") {
    return `new AnimationCurve(\n    new Keyframe(0f, 0f, 0f, 1.2f),\n    new Keyframe(${duration}f, 1f, 0.25f, 0f)\n)`;
  }
  if (preset === "pulse") {
    const half = Number((duration / 2).toFixed(3));
    return `new AnimationCurve(\n    new Keyframe(0f, 0f),\n    new Keyframe(${half}f, ${peak}f),\n    new Keyframe(${duration}f, 0f)\n)`;
  }

  return `new AnimationCurve(\n    new Keyframe(0f, 0f),\n    new Keyframe(${duration * 0.5}f, 0.5f),\n    new Keyframe(${duration}f, 1f)\n)`;
};

export const UnityAnimationcurvePresetGeneratorPage = () => {
  const [preset, setPreset] = useState<Preset>("ease-in-out");
  const [durationInput, setDurationInput] = useState("1");
  const [peakInput, setPeakInput] = useState("1.2");

  const code = useMemo(() => {
    const duration = Math.max(0.01, Number(durationInput) || 1);
    const peak = Math.max(0.01, Number(peakInput) || 1.2);
    const curve = buildCurve(preset, duration, peak);
    return `AnimationCurve curve = ${curve};\n\n// Example usage\nfloat value = curve.Evaluate(time);`;
  }, [preset, durationInput, peakInput]);

  return (
    <ToolLayout
      seo={{
        title: "Unity AnimationCurve Preset Generator | Altcore Tools Studio",
        description: "Generate reusable AnimationCurve presets for Unity scripts.",
        canonicalPath: "/tools/unity-animationcurve-preset-generator"
      }}
      title="Unity AnimationCurve Preset Generator"
      description="Generate copy-ready AnimationCurve presets for movement, UI and FX timing."
      category="unity"
      toolSlug="unity-animationcurve-preset-generator"
      helpText="Use these presets as a base, then tune tangents in the Unity inspector if needed."
    >
      <Card className="grid gap-3 sm:grid-cols-3">
        <Select value={preset} onChange={(e) => setPreset(e.target.value as Preset)}>
          <option value="ease-in-out">Ease In Out</option>
          <option value="ease-in">Ease In</option>
          <option value="ease-out">Ease Out</option>
          <option value="linear">Linear</option>
          <option value="pulse">Pulse</option>
        </Select>
        <Input value={durationInput} onChange={(e) => setDurationInput(e.target.value)} />
        <Input value={peakInput} onChange={(e) => setPeakInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <pre className="max-h-[30rem] overflow-auto rounded bg-background p-3 text-xs text-text">{code}</pre>
        <CopyButton value={code} label="Copy AnimationCurve code" />
      </Card>
    </ToolLayout>
  );
};
