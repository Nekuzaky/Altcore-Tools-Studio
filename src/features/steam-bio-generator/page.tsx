import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

const styles: Record<string, string[]> = {
  clean: ["Focused on progression and teamwork.", "Always learning, always improving.", "Chill games, serious plays."],
  funny: ["Aim optional, vibes mandatory.", "If lost, blame ping.", "Main quest: collecting funny clips."],
  competitive: ["Grinding ranked every night.", "Teamplay, comms, and smart decisions.", "Winning with discipline and tempo."]
};

export const SteamBioGeneratorPage = () => {
  const [name, setName] = useState("Altcore");
  const [style, setStyle] = useState("clean");
  const [output, setOutput] = useState("");

  const generate = () => {
    const lines = styles[style] ?? styles.clean;
    setOutput(`?? ${name}\n${lines.join("\n")}`);
  };

  return (
    <ToolLayout
      seo={{
        title: "Steam Bio Generator | Altcore Tools Studio",
        description: "Generate short Steam profile bios by tone.",
        canonicalPath: "/tools/steam-bio-generator"
      }}
      title="Steam Bio Generator"
      description="Create short Steam profile bios with clean tone presets."
      category="gaming"
      toolSlug="steam-bio-generator"
      helpText="Keep bios short for better profile readability."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Profile name</span>
            <Input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Style</span>
            <Select value={style} onChange={(event) => setStyle(event.target.value)}>
              <option value="clean">Clean</option>
              <option value="funny">Funny</option>
              <option value="competitive">Competitive</option>
            </Select>
          </label>
        </div>
        <Button onClick={generate}>Generate bio</Button>
      </Card>
      <Card className="space-y-2">
        <Textarea className="min-h-36" readOnly value={output} />
        <CopyButton value={output} />
      </Card>
    </ToolLayout>
  );
};
