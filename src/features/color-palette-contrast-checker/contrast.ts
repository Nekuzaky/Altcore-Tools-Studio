const toRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  const expanded = clean.length === 3 ? clean.split("").map((x) => x + x).join("") : clean;
  const value = parseInt(expanded, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
};

const channel = (c: number) => {
  const normalized = c / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string) => {
  const { r, g, b } = toRgb(hex);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

export const contrastRatio = (foreground: string, background: string) => {
  const a = luminance(foreground);
  const b = luminance(background);
  const brightest = Math.max(a, b);
  const darkest = Math.min(a, b);
  return (brightest + 0.05) / (darkest + 0.05);
};

export const contrastGrade = (ratio: number) => {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Fail";
};
