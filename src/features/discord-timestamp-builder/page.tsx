import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { timestampStyles, toDiscordTimestampTag, toUnixTimestamp } from "@/features/discord-timestamp-builder/utils";

const now = new Date();
const defaultDate = now.toISOString().slice(0, 10);
const defaultTime = `${`${now.getHours()}`.padStart(2, "0")}:${`${now.getMinutes()}`.padStart(2, "0")}`;

export const DiscordTimestampBuilderPage = () => {
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState(defaultTime);
  const [style, setStyle] = useState("R");

  const unix = useMemo(() => toUnixTimestamp(date, time), [date, time]);
  const primaryTag = useMemo(() => toDiscordTimestampTag(unix, style), [unix, style]);

  return (
    <ToolLayout
      seo={{
        title: "Discord Timestamp Builder | Altcore Tools",
        description: "Generate Discord timestamp tags in all style formats.",
        canonicalPath: "/tools/discord-timestamp-builder"
      }}
      title="Discord Timestamp Builder"
      description="Pick a date and time, then copy Discord tags like <t:...:R> instantly."
      category="discord"
      toolSlug="discord-timestamp-builder"
      helpText="Discord renders these tags based on each user's local timezone."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90">
            <span>Date</span>
            <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Time</span>
            <Input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Style</span>
            <Select value={style} onChange={(event) => setStyle(event.target.value)}>
              {timestampStyles.map((entry) => (
                <option key={entry.code} value={entry.code}>
                  {entry.code} - {entry.label}
                </option>
              ))}
            </Select>
          </label>
        </div>
        <div className="rounded-md border border-border bg-background p-3 font-mono text-sm text-text">
          {primaryTag}
        </div>
        <CopyButton value={primaryTag} label="Copy tag" />
      </Card>

      <Card className="space-y-2">
        <h2 className="text-lg font-semibold text-text">All formats</h2>
        {timestampStyles.map((entry) => {
          const tag = toDiscordTimestampTag(unix, entry.code);
          return (
            <div key={entry.code} className="flex items-center justify-between rounded-md border border-border p-2">
              <div>
                <p className="text-sm text-text">{entry.label}</p>
                <p className="font-mono text-xs text-muted">{tag}</p>
              </div>
              <CopyButton value={tag} />
            </div>
          );
        })}
      </Card>
    </ToolLayout>
  );
};
