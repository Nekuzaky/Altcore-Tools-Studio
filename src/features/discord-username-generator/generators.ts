const stylePrefixes: Record<string, string[]> = {
  clean: ["neo", "zen", "byte", "astro"],
  edgy: ["void", "shadow", "venom", "grim"],
  gamer: ["frag", "clutch", "pixel", "rage"]
};

export const generateDiscordUsernames = (keyword: string, style: string, count = 8): string[] => {
  const base = keyword.trim().toLowerCase() || "altcore";
  const prefixes = stylePrefixes[style] ?? stylePrefixes.clean;

  return Array.from({ length: count }, (_, index) => {
    const prefix = prefixes[index % prefixes.length];
    const suffix = `${Math.floor(Math.random() * 90 + 10)}`;
    return `${prefix}_${base}${suffix}`;
  });
};

