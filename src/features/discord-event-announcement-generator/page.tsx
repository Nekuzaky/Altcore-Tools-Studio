import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const DiscordEventAnnouncementGeneratorPage = () => {
  const [eventName, setEventName] = useState("Soirée Community Games");
  const [date, setDate] = useState("Vendredi 21:00");
  const [details, setDetails] = useState("3 matchs • vocal ouvert • rewards");

  const output = useMemo(() => {
    return [`?? **${eventName}**`, `??? ${date}`, `?? ${details}`, "", "Réagissez ? pour participer."].join("\n");
  }, [eventName, date, details]);

  return (
    <ToolLayout seo={{ title: "Discord Event Announcement Generator | Altcore Tools Studio", description: "Generate event announcements for Discord servers.", canonicalPath: "/tools/discord-event-announcement-generator" }} title="Discord Event Announcement Generator" description="Génère des annonces d'événement prêtes à poster." category="discord" toolSlug="discord-event-announcement-generator" helpText="Combine avec Discord Timestamp Builder pour un rendu horaire local.">
      <Card className="space-y-3">
        <Input value={eventName} onChange={(e) => setEventName(e.target.value)} />
        <Input value={date} onChange={(e) => setDate(e.target.value)} />
        <Textarea className="min-h-28" value={details} onChange={(e) => setDetails(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <Textarea className="min-h-36" readOnly value={output} />
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
