import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const snippetForType = (key: string, kind: string, defaultValue: string) => {
  if (kind === "int") return `PlayerPrefs.SetInt("${key}", value);\nint value = PlayerPrefs.GetInt("${key}", ${defaultValue || "0"});`;
  if (kind === "float") return `PlayerPrefs.SetFloat("${key}", value);\nfloat value = PlayerPrefs.GetFloat("${key}", ${defaultValue || "0f"});`;
  return `PlayerPrefs.SetString("${key}", value);\nstring value = PlayerPrefs.GetString("${key}", ${JSON.stringify(defaultValue || "")});`;
};

export const UnityPlayerprefsSnippetGeneratorPage = () => {
  const [key, setKey] = useState("player_level");
  const [kind, setKind] = useState("int");
  const [defaultValue, setDefaultValue] = useState("1");
  const code = useMemo(() => snippetForType(key || "new_key", kind, defaultValue), [key, kind, defaultValue]);

  return (
    <ToolLayout seo={{ title: "Unity PlayerPrefs Snippet Generator | Altcore Tools Studio", description: "Generate typed PlayerPrefs snippets.", canonicalPath: "/tools/unity-playerprefs-snippet-generator" }} title="Unity PlayerPrefs Snippet Generator" description="Create save/load snippets for PlayerPrefs keys." category="unity" toolSlug="unity-playerprefs-snippet-generator" helpText="Use central key constants in production projects.">
      <Card className="space-y-3">
        <Input value={key} onChange={(e) => setKey(e.target.value)} />
        <Select value={kind} onChange={(e) => setKind(e.target.value)}><option value="int">int</option><option value="float">float</option><option value="string">string</option></Select>
        <Input value={defaultValue} onChange={(e) => setDefaultValue(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <pre className="rounded bg-background p-3 text-xs text-text">{code}</pre>
        <CopyButton value={code} label="Copy snippet" />
      </Card>
    </ToolLayout>
  );
};
