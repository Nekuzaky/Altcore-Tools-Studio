export const markdownToDiscord = (value: string): string => {
  return value
    .replace(/^###\s+(.+)$/gm, "**$1**")
    .replace(/^##\s+(.+)$/gm, "**$1**")
    .replace(/^#\s+(.+)$/gm, "**$1**")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/^\d+\.\s+/gm, "- ")
    .trim();
};
