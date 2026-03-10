import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";

const randomColor = () => `#${Math.floor(Math.random() * 16777215)
  .toString(16)
  .padStart(6, "0")}`;

export const ColorPaletteGeneratorPage = () => {
  const [seed, setSeed] = useState(0);

  const palette = useMemo(() => {
    void seed;
    return Array.from({ length: 5 }, () => randomColor());
  }, [seed]);

  return (
    <ToolLayout
      seo={{
        title: "Color Palette Generator | Altcore Tools Studio",
        description: "Generate random color palettes and copy values quickly.",
        canonicalPath: "/tools/color-palette-generator"
      }}
      title="Color Palette Generator"
      description="Generate random color palettes for product UI, branding and art direction."
      category="utility"
      toolSlug="color-palette-generator"
      helpText="Generate multiple palettes and keep the most balanced combinations."
    >
      <Card className="space-y-4">
        <button
          type="button"
          onClick={() => setSeed((x) => x + 1)}
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white"
        >
          Generate palette
        </button>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {palette.map((color) => (
            <div key={color} className="space-y-2 rounded-lg border border-border bg-surface p-3">
              <div className="h-16 rounded" style={{ backgroundColor: color }} />
              <p className="font-mono text-xs text-text">{color}</p>
              <CopyButton value={color} />
            </div>
          ))}
        </div>
      </Card>
    </ToolLayout>
  );
};
