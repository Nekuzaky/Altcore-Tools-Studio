import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";

const sanitize = (value: string) => value.replace(/[^a-zA-Z0-9_]/g, "_");

export const UnityTagsEnumGeneratorPage = () => {
  const [input, setInput] = useState("Player\nEnemy\nInteractable\nCheckpoint");

  const code = useMemo(() => {
    const tags = input.split("\n").map((x) => x.trim()).filter(Boolean);
    const enumRows = tags.map((t, i) => `    ${sanitize(t)} = ${i},`).join("\n");
    const constants = tags.map((t) => `    public const string ${sanitize(t)} = \"${t}\";`).join("\n");

    return `public enum GameTag\n{\n${enumRows}\n}\n\npublic static class GameTags\n{\n${constants}\n}`;
  }, [input]);

  return (
    <ToolLayout seo={{ title: "Unity Tags Enum Generator | Altcore Tools Studio", description: "Generate enum/constants from tags list.", canonicalPath: "/tools/unity-tags-enum-generator" }} title="Unity Tags Enum Generator" description="Generate C# enums and constants from your Unity tags." category="unity" toolSlug="unity-tags-enum-generator" helpText="Paste one tag per line to generate typed constants.">
      <Card className="space-y-2">
        <Textarea className="min-h-40" value={input} onChange={(e) => setInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <pre className="max-h-96 overflow-auto rounded bg-background p-3 text-xs text-text">{code}</pre>
        <CopyButton value={code} label="Copy C# code" />
      </Card>
    </ToolLayout>
  );
};
