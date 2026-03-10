import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const emojis = ["1??", "2??", "3??", "4??", "5??", "6??"];

export const DiscordPollBuilderPage = () => {
  const [question, setQuestion] = useState("Quel format de contenu vous voulez cette semaine ?");
  const [optionsText, setOptionsText] = useState("Guide\nLive setup\nTemplate pack");

  const output = useMemo(() => {
    const options = optionsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 6);

    const lines = options.map((opt, idx) => `${emojis[idx]} ${opt}`);
    return [`?? **${question || "Nouveau sondage"}**`, "", ...lines, "", "Réagissez pour voter."].join("\n");
  }, [question, optionsText]);

  return (
    <ToolLayout
      seo={{
        title: "Discord Poll Builder | Altcore Tools Studio",
        description: "Generate Discord poll messages with emoji vote options.",
        canonicalPath: "/tools/discord-poll-builder"
      }}
      title="Discord Poll Builder"
      description="Build ready-to-send poll text with emoji reactions for Discord communities."
      category="discord"
      toolSlug="discord-poll-builder"
      helpText="Limit to 6 options for clear voting UX in Discord channels."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Question</span>
          <Input value={question} onChange={(event) => setQuestion(event.target.value)} />
        </label>
        <label className="space-y-2 text-sm text-text/90">
          <span>Options (une par ligne)</span>
          <Textarea className="min-h-32" value={optionsText} onChange={(event) => setOptionsText(event.target.value)} />
        </label>
      </Card>
      <Card className="space-y-2">
        <p className="text-sm text-muted">Message prêt à poster</p>
        <Textarea className="min-h-48" readOnly value={output} />
        <CopyButton value={output} label="Copy poll" />
      </Card>
    </ToolLayout>
  );
};
