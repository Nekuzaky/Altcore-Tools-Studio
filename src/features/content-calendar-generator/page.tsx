import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const formats: Record<string, string[]> = {
  short: ["Short vidéo", "Thread", "Story", "Post carrousel", "Live 20min", "Q&A", "Recap"],
  long: ["Vidéo tuto", "Case study", "Review", "Behind the scenes", "Interview", "AMA", "Newsletter"]
};

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export const ContentCalendarGeneratorPage = () => {
  const [niche, setNiche] = useState("Productivité créateur");
  const [mode, setMode] = useState("short");

  const calendar = useMemo(() => {
    const pool = formats[mode] ?? formats.short;
    return weekDays.map((day, idx) => `${day}: ${pool[idx % pool.length]} - ${niche}`);
  }, [niche, mode]);

  return (
    <ToolLayout
      seo={{
        title: "Content Calendar Generator | Altcore Tools Studio",
        description: "Generate a weekly content calendar by niche and format.",
        canonicalPath: "/tools/content-calendar-generator"
      }}
      title="Content Calendar Generator"
      description="Generate a simple weekly content plan for creator consistency."
      category="creator"
      toolSlug="content-calendar-generator"
      helpText="Garde un format principal puis varie les angles pour éviter la répétition."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Niche</span>
            <Input value={niche} onChange={(event) => setNiche(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Format dominant</span>
            <Select value={mode} onChange={(event) => setMode(event.target.value)}>
              <option value="short">Short-form</option>
              <option value="long">Long-form</option>
            </Select>
          </label>
        </div>
      </Card>
      <Card className="space-y-2">
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{calendar.join("\n")}</pre>
        <CopyButton value={calendar.join("\n")} label="Copy calendar" />
      </Card>
    </ToolLayout>
  );
};
