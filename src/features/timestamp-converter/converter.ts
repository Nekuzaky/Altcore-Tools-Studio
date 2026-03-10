export const fromTimestamp = (value: string) => {
  const numeric = Number(value.trim());
  if (Number.isNaN(numeric)) throw new Error("Invalid timestamp value.");
  const millis = numeric > 9999999999 ? numeric : numeric * 1000;
  const date = new Date(millis);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid timestamp value.");

  return {
    iso: date.toISOString(),
    local: date.toLocaleString(),
    seconds: Math.floor(date.getTime() / 1000),
    milliseconds: date.getTime()
  };
};

export const fromDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error("Invalid date value.");
  return {
    iso: date.toISOString(),
    seconds: Math.floor(date.getTime() / 1000),
    milliseconds: date.getTime()
  };
};

export const nowTimestamps = () => {
  const now = new Date();
  return {
    iso: now.toISOString(),
    seconds: Math.floor(now.getTime() / 1000),
    milliseconds: now.getTime()
  };
};
