import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

const parseHex = (value: string) => {
  const clean = value.replace("#", "").trim();
  if (![6, 8].includes(clean.length)) throw new Error("Hex must be 6 or 8 chars.");
  const full = clean.length === 6 ? `${clean}FF` : clean;
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) throw new Error("Invalid hex value.");
  return { r: (n >> 24) & 255, g: (n >> 16) & 255, b: (n >> 8) & 255, a: n & 255 };
};

export const UnityColorConverterPage = () => {
  const [hex, setHex] = useState("#4F9CFF");
  const result = useMemo(() => {
    try {
      const { r, g, b, a } = parseHex(hex);
      return { ok: true, color32: `new Color32(${r}, ${g}, ${b}, ${a})`, color: `new Color(${(r/255).toFixed(3)}f, ${(g/255).toFixed(3)}f, ${(b/255).toFixed(3)}f, ${(a/255).toFixed(3)}f)` } as const;
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Invalid input." } as const;
    }
  }, [hex]);

  return (
    <ToolLayout seo={{ title: "Unity Color Converter | Altcore Tools Studio", description: "Convert HEX to Unity Color snippets.", canonicalPath: "/tools/unity-color-converter" }} title="Unity Color Converter" description="Convert HEX into Unity Color and Color32 C# snippets." category="unity" toolSlug="unity-color-converter" helpText="Supports #RRGGBB and #RRGGBBAA.">
      <Card className="space-y-3"><Input value={hex} onChange={(e) => setHex(e.target.value)} /></Card>
      <Card className="space-y-3">
        {result.ok ? <>
          <div className="rounded border border-border p-3 text-xs text-text">{result.color32}</div>
          <CopyButton value={result.color32} label="Copy Color32" />
          <div className="rounded border border-border p-3 text-xs text-text">{result.color}</div>
          <CopyButton value={result.color} label="Copy Color" />
        </> : <p className="text-sm text-danger">{result.error}</p>}
      </Card>
    </ToolLayout>
  );
};
