export type ThumbnailAnalysis = {
  characters: number;
  words: number;
  uppercaseRatio: number;
  score: number;
  recommendation: string;
};

export const analyzeThumbnailText = (value: string): ThumbnailAnalysis => {
  const trimmed = value.trim();
  const characters = trimmed.length;
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const uppercase = trimmed.replace(/[^A-Z]/g, "").length;
  const uppercaseRatio = characters ? uppercase / characters : 0;

  let score = 100;
  if (characters > 38) score -= 30;
  if (words > 8) score -= 20;
  if (uppercaseRatio > 0.45) score -= 15;
  if (characters < 6) score -= 10;

  const recommendation =
    characters > 38
      ? "Text is long. Keep thumbnail headline under ~38 chars."
      : uppercaseRatio > 0.45
        ? "Too much uppercase. Reduce caps for readability."
        : "Good baseline for thumbnail readability.";

  return { characters, words, uppercaseRatio, score: Math.max(0, score), recommendation };
};
