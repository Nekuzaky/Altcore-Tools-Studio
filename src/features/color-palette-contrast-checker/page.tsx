import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { contrastGrade, contrastRatio } from "@/features/color-palette-contrast-checker/contrast";

export const ColorPaletteContrastCheckerPage = () => {
  const [foreground, setForeground] = useState("#ffffff");
  const [background, setBackground] = useState("#111214");

  const ratio = useMemo(() => contrastRatio(foreground, background), [foreground, background]);
  const grade = useMemo(() => contrastGrade(ratio), [ratio]);

  return (
    <ToolLayout
      seo={{
        title: "Color Contrast Checker | Altcore Tools Studio",
        description: "Check color contrast ratio and AA/AAA accessibility level.",
        canonicalPath: "/tools/color-palette-contrast-checker"
      }}
      title="Color Palette Contrast Checker"
      description="Compare text and background colors with WCAG contrast levels."
      category="utility"
      toolSlug="color-palette-contrast-checker"
      helpText="AA target is 4.5:1 for regular text. AAA target is 7:1."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-text/90">
            <span>Foreground</span>
            <Input value={foreground} onChange={(event) => setForeground(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Background</span>
            <Input value={background} onChange={(event) => setBackground(event.target.value)} />
          </label>
        </div>
      </Card>

      <Card className="space-y-3">
        <div
          className="rounded-md border border-border px-4 py-8 text-center text-2xl font-semibold"
          style={{ color: foreground, backgroundColor: background }}
        >
          Altcore Contrast Preview
        </div>
        <p className="text-sm text-text">
          Contrast ratio: {ratio.toFixed(2)}:1 - <span className="font-semibold">{grade}</span>
        </p>
      </Card>
    </ToolLayout>
  );
};
