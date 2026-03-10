const toneBits: Record<string, string[]> = {
  aggressive: ["rage", "viper", "reaper", "chaos"],
  cool: ["nova", "echo", "drift", "orbit"],
  funny: ["potato", "goose", "bonk", "tofu"]
};

export const generateGamertags = (keyword: string, tone: string, count = 8): string[] => {
  const base = keyword.trim().toLowerCase() || "player";
  const bits = toneBits[tone] ?? toneBits.cool;

  return Array.from({ length: count }, (_, i) => {
    const bit = bits[i % bits.length];
    return `${base}${bit}${Math.floor(Math.random() * 999)}`;
  });
};

