export const PIXEL_SIZE = 16;

export const palette = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#a855f7",
  "#06b6d4"
];

export const createEmptyGrid = (): string[][] =>
  Array.from({ length: PIXEL_SIZE }, () => Array.from({ length: PIXEL_SIZE }, () => "#ffffff"));

export const gridToJson = (grid: string[][]): string => JSON.stringify({ size: PIXEL_SIZE, pixels: grid });
