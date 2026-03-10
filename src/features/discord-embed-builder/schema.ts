import { isValidHexColor, isNonEmptyString } from "@/lib/validators";

export type DiscordEmbedInput = {
  title: string;
  description: string;
  color: string;
  author: string;
  footer: string;
  imageUrl: string;
  thumbnailUrl: string;
};

const isValidUrl = (value: string) => {
  if (!value.trim()) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const validateDiscordEmbed = (payload: DiscordEmbedInput): string[] => {
  const errors: string[] = [];
  if (!isNonEmptyString(payload.title)) errors.push("Title is required.");
  if (!isNonEmptyString(payload.description)) errors.push("Description is required.");
  if (!isValidHexColor(payload.color)) errors.push("Color must be a valid hex value.");
  if (!isValidUrl(payload.imageUrl)) errors.push("Image URL must be valid.");
  if (!isValidUrl(payload.thumbnailUrl)) errors.push("Thumbnail URL must be valid.");
  return errors;
};
