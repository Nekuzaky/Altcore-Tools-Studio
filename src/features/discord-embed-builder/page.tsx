import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { validateDiscordEmbed } from "@/features/discord-embed-builder/schema";
import { toDiscordEmbedJson } from "@/features/discord-embed-builder/utils";

export const DiscordEmbedBuilderPage = () => {
  const [title, setTitle] = useState("Patch Notes");
  const [description, setDescription] = useState("Version 1.0.4 is now live.");
  const [color, setColor] = useState("#4f9cff");
  const [author, setAuthor] = useState("Altcore Studio");
  const [footer, setFooter] = useState("Build 104");
  const [imageUrl, setImageUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const json = useMemo(
    () => toDiscordEmbedJson({ title, description, color, author, footer, imageUrl, thumbnailUrl }),
    [title, description, color, author, footer, imageUrl, thumbnailUrl]
  );
  const errors = useMemo(
    () => validateDiscordEmbed({ title, description, color, author, footer, imageUrl, thumbnailUrl }),
    [title, description, color, author, footer, imageUrl, thumbnailUrl]
  );

  return (
    <ToolLayout
      seo={{
        title: "Discord Embed Builder | Altcore Tools Studio",
        description: "Create full Discord embed payloads with live preview and JSON export.",
        canonicalPath: "/tools/discord-embed-builder",
        ogImage: "/og/discord-embed-builder.jpg"
      }}
      title="Discord Embed Builder"
      description="Build complete Discord embed JSON with author, footer, image and thumbnail fields."
      category="discord"
      toolSlug="discord-embed-builder"
      helpText="Discord expects color as decimal in JSON. This tool converts your hex input automatically."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <label className="block space-y-2 text-sm text-text/90">
            <span>Title</span>
            <Input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="block space-y-2 text-sm text-text/90">
            <span>Description</span>
            <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm text-text/90">
              <span>Color (hex)</span>
              <Input value={color} onChange={(event) => setColor(event.target.value)} />
            </label>
            <label className="block space-y-2 text-sm text-text/90">
              <span>Author</span>
              <Input value={author} onChange={(event) => setAuthor(event.target.value)} />
            </label>
          </div>
          <label className="block space-y-2 text-sm text-text/90">
            <span>Footer</span>
            <Input value={footer} onChange={(event) => setFooter(event.target.value)} />
          </label>
          <label className="block space-y-2 text-sm text-text/90">
            <span>Image URL</span>
            <Input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://..." />
          </label>
          <label className="block space-y-2 text-sm text-text/90">
            <span>Thumbnail URL</span>
            <Input value={thumbnailUrl} onChange={(event) => setThumbnailUrl(event.target.value)} placeholder="https://..." />
          </label>
          {errors.length ? <p className="text-sm text-danger">{errors[0]}</p> : null}
        </Card>
        <Card className="space-y-4">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted">Live Preview</p>
            <div className="mt-3 rounded-lg border border-border bg-surface p-4">
              <div className="mb-3 h-1 w-full rounded" style={{ backgroundColor: color }} />
              <p className="text-xs text-muted">{author || "Author"}</p>
              <h2 className="mt-1 text-lg font-semibold text-text">{title || "Embed title"}</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm text-text/90">{description || "Embed description"}</p>
              {thumbnailUrl ? <img src={thumbnailUrl} alt="thumbnail" className="mt-3 h-16 w-16 rounded object-cover" /> : null}
              {imageUrl ? <img src={imageUrl} alt="embed" className="mt-3 max-h-40 w-full rounded object-cover" /> : null}
              <p className="mt-3 text-xs text-muted">{footer || "Footer"}</p>
            </div>
          </div>
          <label className="block space-y-2">
            <span className="text-sm text-muted">Generated JSON</span>
            <Textarea readOnly value={json} className="min-h-44 font-mono text-xs" />
          </label>
          <CopyButton value={json} label="Copy JSON" />
        </Card>
      </div>
    </ToolLayout>
  );
};
