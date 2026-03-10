import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const DiscordReactionRoleBuilderPage = () => {
  const [title, setTitle] = useState("Choisis tes rôles");
  const [rows, setRows] = useState("?? Gamer = @Gamer\n?? Art = @Artist\n?? Dev = @Developer");

  const output = useMemo(() => {
    const lines = rows.split("\n").map((line) => line.trim()).filter(Boolean);
    return [`**${title}**`, "Réagis pour recevoir le rôle correspondant:", "", ...lines].join("\n");
  }, [title, rows]);

  return (
    <ToolLayout seo={{ title: "Discord Reaction Role Builder | Altcore Tools Studio", description: "Generate reaction-role messages quickly.", canonicalPath: "/tools/discord-reaction-role-builder" }} title="Discord Reaction Role Builder" description="Crée un message clair pour attribuer des rôles via réactions." category="discord" toolSlug="discord-reaction-role-builder" helpText="Format recommandé: emoji + label + mention du rôle.">
      <Card className="space-y-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea className="min-h-40" value={rows} onChange={(e) => setRows(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <Textarea className="min-h-40" readOnly value={output} />
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
