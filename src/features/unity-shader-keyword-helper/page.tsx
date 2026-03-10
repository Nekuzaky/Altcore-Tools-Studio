import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type KeywordMode = "global" | "material";

const sanitize = (key: string) => key.trim().toUpperCase().replace(/[^A-Z0-9_]/g, "_");

export const UnityShaderKeywordHelperPage = () => {
  const [mode, setMode] = useState<KeywordMode>("material");
  const [keywordsInput, setKeywordsInput] = useState("USE_RIM\nUSE_FOG\nDEBUG_VIEW");

  const result = useMemo(() => {
    const keys = keywordsInput.split("\n").map(sanitize).filter(Boolean);
    if (!keys.length) return { ok: false, error: "Add at least one shader keyword." } as const;

    const declaration = `// In shader\n#pragma multi_compile ${keys.join(" ")}`;

    const control =
      mode === "global"
        ? keys
            .map((k) => `Shader.EnableKeyword("${k}");\n// Shader.DisableKeyword("${k}");`)
            .join("\n\n")
        : keys
            .map((k) => `material.EnableKeyword("${k}");\n// material.DisableKeyword("${k}");`)
            .join("\n\n");

    return {
      ok: true,
      snippet: `${declaration}\n\n// C# control (${mode})\n${control}`
    } as const;
  }, [keywordsInput, mode]);

  return (
    <ToolLayout
      seo={{
        title: "Unity Shader Keyword Helper | Altcore Tools Studio",
        description: "Generate shader keyword declarations and C# enable/disable snippets.",
        canonicalPath: "/tools/unity-shader-keyword-helper"
      }}
      title="Unity Shader Keyword Helper"
      description="Generate clean shader keyword declarations and runtime control snippets."
      category="unity"
      toolSlug="unity-shader-keyword-helper"
      helpText="Prefer material-local keywords unless you explicitly need global shader toggles."
    >
      <Card className="space-y-3">
        <Select value={mode} onChange={(e) => setMode(e.target.value as KeywordMode)}>
          <option value="material">Material Keywords</option>
          <option value="global">Global Keywords</option>
        </Select>
        <Textarea className="min-h-36" value={keywordsInput} onChange={(e) => setKeywordsInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {result.ok ? (
          <>
            <pre className="max-h-[30rem] overflow-auto rounded bg-background p-3 text-xs text-text">{result.snippet}</pre>
            <CopyButton value={result.snippet} label="Copy shader keyword code" />
          </>
        ) : (
          <p className="text-sm text-danger">{result.error}</p>
        )}
      </Card>
    </ToolLayout>
  );
};
