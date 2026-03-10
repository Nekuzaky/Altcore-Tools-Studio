import type { DiscordEmbedInput } from "@/features/discord-embed-builder/schema";

const hexToDecimal = (hex: string) => parseInt(hex.replace("#", ""), 16);

export const toDiscordEmbedJson = (input: DiscordEmbedInput) =>
  JSON.stringify(
    {
      embeds: [
        {
          title: input.title,
          description: input.description,
          color: hexToDecimal(input.color),
          ...(input.author.trim() ? { author: { name: input.author } } : {}),
          ...(input.footer.trim() ? { footer: { text: input.footer } } : {}),
          ...(input.imageUrl.trim() ? { image: { url: input.imageUrl } } : {}),
          ...(input.thumbnailUrl.trim() ? { thumbnail: { url: input.thumbnailUrl } } : {})
        }
      ]
    },
    null,
    2
  );
