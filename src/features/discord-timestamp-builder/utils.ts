export const timestampStyles = [
  { code: "t", label: "Short Time" },
  { code: "T", label: "Long Time" },
  { code: "d", label: "Short Date" },
  { code: "D", label: "Long Date" },
  { code: "f", label: "Short Date/Time" },
  { code: "F", label: "Long Date/Time" },
  { code: "R", label: "Relative Time" }
] as const;

export const toUnixTimestamp = (date: string, time: string): number => {
  const value = new Date(`${date}T${time}:00`);
  return Math.floor(value.getTime() / 1000);
};

export const toDiscordTimestampTag = (unix: number, style: string) => `<t:${unix}:${style}>`;
