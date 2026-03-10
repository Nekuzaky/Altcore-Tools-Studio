import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const pools: Record<string, string[]> = {
  youtube: ["YouTubeTips", "CreatorTools", "VideoSEO", "GrowthHacks"],
  instagram: ["InstaGrowth", "ContentCreator", "ReelsTips", "SocialMediaTips"],
  tiktok: ["TikTokTips", "FYP", "ViralVideo", "ContentStrategy"],
  x: ["BuildInPublic", "DevTools", "IndieHackers", "CreatorEconomy"]
};

export const HashtagGeneratorPage = () => {
  const [topic, setTopic] = useState("discord bots");
  const [platform, setPlatform] = useState("youtube");
  const [trigger, setTrigger] = useState(0);

  const tags = useMemo(() => {
    void trigger;
    const base = topic
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.replace(/[^a-zA-Z0-9]/g, ""))
      .filter(Boolean)
      .map((part) => `#${part}`);

    return [...new Set([...(pools[platform] ?? []), ...base.map((x) => x.replace(/^#/, ""))])]
      .slice(0, 15)
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
  }, [topic, platform, trigger]);

  return (
    <ToolLayout
      seo={{
        title: "Hashtag Generator | Altcore Tools Studio",
        description: "Generate platform-specific hashtags based on your topic.",
        canonicalPath: "/tools/hashtag-generator"
      }}
      title="Hashtag Generator"
      description="Generate relevant hashtags for YouTube, TikTok, Instagram and X."
      category="creator"
      toolSlug="hashtag-generator"
      helpText="Use 5 to 12 hashtags for cleaner results, and avoid irrelevant tags."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Topic</span>
            <Input value={topic} onChange={(event) => setTopic(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Platform</span>
            <Select value={platform} onChange={(event) => setPlatform(event.target.value)}>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">TikTok</option>
              <option value="x">X</option>
            </Select>
          </label>
        </div>
        <Button onClick={() => setTrigger((value) => value + 1)}>Generate hashtags</Button>
      </Card>

      <Card className="space-y-3">
        <div className="rounded-md border border-border bg-background p-3 text-sm text-text">
          {tags.join(" ")}
        </div>
        <CopyButton value={tags.join(" ")} label="Copy hashtags" />
      </Card>
    </ToolLayout>
  );
};
