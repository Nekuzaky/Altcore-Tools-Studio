const styleTokens: Record<string, string[]> = {
  survival: ["craft", "mine", "block", "pick", "stone"],
  pvp: ["crit", "clutch", "sword", "combo", "speed"],
  fantasy: ["eld", "rune", "wyrm", "void", "myth"]
};

const sanitize = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9_]/g, "")
    .replace(/\s+/g, "")
    .slice(0, 10);

export const generateMinecraftNames = (keyword: string, style: string, count = 8): string[] => {
  const base = sanitize(keyword) || "Steve";
  const tokens = styleTokens[style] ?? styleTokens.survival;

  return Array.from({ length: count }, (_, idx) => {
    const token = tokens[idx % tokens.length];
    const suffix = `${Math.floor(Math.random() * 90 + 10)}`;
    return `${base}${token}${suffix}`.slice(0, 16);
  });
};
