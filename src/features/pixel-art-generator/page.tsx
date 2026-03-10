import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { createEmptyGrid, gridToJson, palette, PIXEL_SIZE } from "@/features/pixel-art-generator/pixel";

export const PixelArtGeneratorPage = () => {
  const [activeColor, setActiveColor] = useState(palette[0]);
  const [grid, setGrid] = useState<string[][]>(() => createEmptyGrid());

  const paint = (x: number, y: number) => {
    setGrid((prev) =>
      prev.map((row, rowIndex) =>
        rowIndex !== y ? row : row.map((cell, cellIndex) => (cellIndex === x ? activeColor : cell))
      )
    );
  };

  const clear = () => setGrid(createEmptyGrid());
  const json = gridToJson(grid);

  return (
    <ToolLayout
      seo={{
        title: "Pixel Art Generator | Altcore Tools",
        description: "Draw simple pixel art on a 16x16 grid and export color data.",
        canonicalPath: "/tools/pixel-art-generator"
      }}
      title="Pixel Art Generator"
      description="Draw quick pixel concepts with a color palette and copy exportable JSON."
      category="design"
      toolSlug="pixel-art-generator"
      helpText="Click a color, then paint cells. Export JSON if you want to reuse the art in scripts."
    >
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {palette.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setActiveColor(color)}
              aria-label={`Select color ${color}`}
              className={`h-8 w-8 rounded border ${activeColor === color ? "border-brand" : "border-border"}`}
              style={{ backgroundColor: color }}
            />
          ))}
          <Button variant="secondary" onClick={clear}>
            Clear
          </Button>
        </div>

        <div
          className="grid w-full max-w-[420px] overflow-hidden rounded border border-border"
          style={{ gridTemplateColumns: `repeat(${PIXEL_SIZE}, minmax(0, 1fr))` }}
        >
          {grid.flatMap((row, y) =>
            row.map((cell, x) => (
              <button
                key={`${x}-${y}`}
                type="button"
                onClick={() => paint(x, y)}
                aria-label={`Pixel ${x},${y}`}
                className="aspect-square border border-black/10"
                style={{ backgroundColor: cell }}
              />
            ))
          )}
        </div>
      </Card>

      <Card className="space-y-2">
        <p className="text-sm text-muted">Export JSON</p>
        <pre className="max-h-64 overflow-auto rounded bg-background p-3 text-xs text-text">{json}</pre>
        <CopyButton value={json} />
      </Card>
    </ToolLayout>
  );
};
