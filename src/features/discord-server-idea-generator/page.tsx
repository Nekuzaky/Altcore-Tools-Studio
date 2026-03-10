import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";

const niches = ["Indie Dev", "Valorant", "Anime", "Productivité", "Design UI", "Crypto", "Startup"]; 
const formats = ["entraide", "news", "challenge hebdo", "co-working", "feedback", "events"]; 

export const DiscordServerIdeaGeneratorPage = () => {
  const [seed, setSeed] = useState(0);
  const idea = useMemo(() => {
    void seed;
    const niche = niches[Math.floor(Math.random() * niches.length)];
    const format = formats[Math.floor(Math.random() * formats.length)];
    return `Serveur ${niche} orienté ${format} avec onboarding simple + rôles auto.`;
  }, [seed]);

  return (
    <ToolLayout seo={{ title: "Discord Server Idea Generator | Altcore Tools Studio", description: "Generate original Discord server concepts.", canonicalPath: "/tools/discord-server-idea-generator" }} title="Discord Server Idea Generator" description="Génère des concepts de serveurs Discord plus originaux." category="discord" toolSlug="discord-server-idea-generator" helpText="Valide ensuite l'idée avec un mini sondage avant de build le serveur.">
      <Card className="space-y-3">
        <Button onClick={() => setSeed((v) => v + 1)}>Generate idea</Button>
        <div className="rounded-md border border-border bg-background p-3 text-sm text-text">{idea}</div>
        <CopyButton value={idea} />
      </Card>
    </ToolLayout>
  );
};
