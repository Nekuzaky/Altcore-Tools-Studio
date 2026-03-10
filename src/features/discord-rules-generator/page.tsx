import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const baseRules: Record<string, string[]> = {
  friendly: [
    "Respect everyone and keep discussions civil.",
    "No spam, no excessive caps, no disruptive behavior.",
    "Keep content in the right channels.",
    "No hate speech, harassment or personal attacks.",
    "Follow moderator decisions and ask politely if needed."
  ],
  strict: [
    "Zero tolerance for harassment, hate speech and threats.",
    "No NSFW, illegal, or malicious content.",
    "No spam, self-promo, or repeated off-topic posts.",
    "Use channels correctly; repeated misuse may lead to sanctions.",
    "Moderator decisions are final for community safety."
  ]
};

export const DiscordRulesGeneratorPage = () => {
  const [serverName, setServerName] = useState("Altcore Community");
  const [tone, setTone] = useState("friendly");

  const rules = useMemo(() => {
    const list = baseRules[tone] ?? baseRules.friendly;
    return [`?? **${serverName} - Server Rules**`, "", ...list.map((rule, idx) => `${idx + 1}. ${rule}`)].join("\n");
  }, [serverName, tone]);

  return (
    <ToolLayout
      seo={{
        title: "Discord Rules Generator | Altcore Tools Studio",
        description: "Generate Discord server rules with friendly or strict tone.",
        canonicalPath: "/tools/discord-rules-generator"
      }}
      title="Discord Rules Generator"
      description="Create a clean rules block for your Discord server in seconds."
      category="discord"
      toolSlug="discord-rules-generator"
      helpText="Adapt generated rules to your moderation policy and region laws."
    >
      <Card className="space-y-4">
        <label className="space-y-2 text-sm text-text/90">
          <span>Server name</span>
          <Input value={serverName} onChange={(event) => setServerName(event.target.value)} />
        </label>
        <label className="space-y-2 text-sm text-text/90">
          <span>Tone</span>
          <Select value={tone} onChange={(event) => setTone(event.target.value)}>
            <option value="friendly">Friendly</option>
            <option value="strict">Strict</option>
          </Select>
        </label>
      </Card>
      <Card className="space-y-2">
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{rules}</pre>
        <CopyButton value={rules} label="Copy rules" />
      </Card>
    </ToolLayout>
  );
};
