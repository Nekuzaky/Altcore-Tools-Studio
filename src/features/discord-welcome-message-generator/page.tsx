import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const DiscordWelcomeMessageGeneratorPage = () => {
  const [server, setServer] = useState("Altcore Studio");
  const [channels, setChannels] = useState("#rules, #announcements, #general");

  const output = useMemo(() => {
    return [`?? Bienvenue sur **${server}** !`, "", `Commence ici: ${channels}`, "Présente-toi et prends tes rôles.", "Bonne session ??"].join("\n");
  }, [server, channels]);

  return (
    <ToolLayout seo={{ title: "Discord Welcome Message Generator | Altcore Tools Studio", description: "Generate onboarding welcome messages for Discord.", canonicalPath: "/tools/discord-welcome-message-generator" }} title="Discord Welcome Message Generator" description="Crée un message d'accueil clair pour onboard les nouveaux membres." category="discord" toolSlug="discord-welcome-message-generator" helpText="Place ce message en haut du salon welcome + pin.">
      <Card className="space-y-3">
        <Input value={server} onChange={(e) => setServer(e.target.value)} />
        <Input value={channels} onChange={(e) => setChannels(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <Textarea className="min-h-32" readOnly value={output} />
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
