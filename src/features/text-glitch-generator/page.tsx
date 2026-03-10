import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

const marks = ["?", "?", "?", "?", "?"];

const glitch = (text: string) =>
  text
    .split("")
    .map((char) => `${char}${marks[Math.floor(Math.random() * marks.length)]}`)
    .join("");

export const TextGlitchGeneratorPage = () => {
  const [input, setInput] = useState("Altcore Tools");
  const output = useMemo(() => glitch(input), [input]);

  return (
    <ToolLayout seo={{ title: "Text Glitch Generator | Altcore Tools Studio", description: "Generate glitch-style text variants.", canonicalPath: "/tools/text-glitch-generator" }} title="Text Glitch Generator" description="Transforme un texte simple en style glitch visuel." category="utility" toolSlug="text-glitch-generator" helpText="Le rendu peut varier selon police et plateforme.">
      <Card className="space-y-3">
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <div className="rounded-md border border-border bg-background p-3 text-sm text-text">{output}</div>
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
