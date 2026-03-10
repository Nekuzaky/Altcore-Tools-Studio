import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const hookTemplates: Record<string, string[]> = {
  educational: [
    "Si tu fais {topic}, tu fais probablement cette erreur.",
    "En 30 secondes, voici comment améliorer {topic}.",
    "La méthode la plus simple pour réussir {topic}."
  ],
  dramatic: [
    "J'ai testé {topic} pendant 7 jours, le résultat est fou.",
    "Personne ne te dit ça sur {topic}.",
    "La vérité sur {topic} en 3 points."
  ],
  challenge: [
    "Je tente {topic} avec une seule contrainte.",
    "Peux-tu battre ce résultat sur {topic} ?",
    "J'ai 24h pour réussir {topic}."
  ]
};

export const VideoHookGeneratorPage = () => {
  const [topic, setTopic] = useState("tes miniatures YouTube");
  const [tone, setTone] = useState("educational");
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    const templates = hookTemplates[tone] ?? hookTemplates.educational;
    setResults(templates.map((tpl) => tpl.replace("{topic}", topic.trim() || "ton sujet")));
  };

  return (
    <ToolLayout
      seo={{
        title: "Video Hook Generator | Altcore Tools Studio",
        description: "Generate strong video opening hooks by topic and tone.",
        canonicalPath: "/tools/video-hook-generator"
      }}
      title="Video Hook Generator"
      description="Generate strong first-line hooks for short and long video formats."
      category="creator"
      toolSlug="video-hook-generator"
      helpText="Teste plusieurs hooks et garde celui qui ouvre une boucle de curiosité."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Sujet</span>
            <Input value={topic} onChange={(event) => setTopic(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Tonalité</span>
            <Select value={tone} onChange={(event) => setTone(event.target.value)}>
              <option value="educational">Educational</option>
              <option value="dramatic">Dramatic</option>
              <option value="challenge">Challenge</option>
            </Select>
          </label>
        </div>
        <Button onClick={generate}>Generate hooks</Button>
      </Card>
      <Card className="space-y-2">
        {results.length ? results.map((hook) => (
          <div key={hook} className="flex items-center justify-between rounded-md border border-border p-2">
            <span className="text-sm text-text">{hook}</span>
            <CopyButton value={hook} />
          </div>
        )) : <p className="text-sm text-muted">Generate to see hook ideas.</p>}
      </Card>
    </ToolLayout>
  );
};
