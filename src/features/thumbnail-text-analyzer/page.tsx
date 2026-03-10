import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { analyzeThumbnailText } from "@/features/thumbnail-text-analyzer/analyzer";

export const ThumbnailTextAnalyzerPage = () => {
  const [text, setText] = useState("I TESTED 10 DISCORD BOTS");
  const analysis = useMemo(() => analyzeThumbnailText(text), [text]);

  return (
    <ToolLayout
      seo={{
        title: "Thumbnail Text Analyzer | Altcore Tools",
        description: "Analyze thumbnail headline length and readability for better impact.",
        canonicalPath: "/tools/thumbnail-text-analyzer"
      }}
      title="Thumbnail Text Analyzer"
      description="Evaluate title size, readability, and caps ratio for thumbnail text."
      category="creator"
      toolSlug="thumbnail-text-analyzer"
      helpText="Short and punchy text usually performs better on small mobile thumbnails."
    >
      <Card className="space-y-3">
        <label className="space-y-2 text-sm text-text/90">
          <span>Thumbnail text</span>
          <Input value={text} onChange={(event) => setText(event.target.value)} />
        </label>
      </Card>

      <Card className="space-y-2">
        <p className="text-sm text-text">Characters: {analysis.characters}</p>
        <p className="text-sm text-text">Words: {analysis.words}</p>
        <p className="text-sm text-text">Uppercase ratio: {(analysis.uppercaseRatio * 100).toFixed(0)}%</p>
        <p className="text-sm text-text">SEO readability score: {analysis.score}/100</p>
        <p className="text-sm text-muted">{analysis.recommendation}</p>
      </Card>
    </ToolLayout>
  );
};
