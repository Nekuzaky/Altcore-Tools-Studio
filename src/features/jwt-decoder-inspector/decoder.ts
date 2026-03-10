export type JwtDecoded = {
  header: Record<string, unknown> | null;
  payload: Record<string, unknown> | null;
  signature: string;
};

const fromBase64Url = (value: string): string => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(padded);
};

const tryJson = (value: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const decodeJwt = (token: string): JwtDecoded | null => {
  const parts = token.trim().split(".");
  if (parts.length < 2) return null;
  const [header, payload, signature = ""] = parts;
  try {
    return {
      header: tryJson(fromBase64Url(header)),
      payload: tryJson(fromBase64Url(payload)),
      signature
    };
  } catch {
    return null;
  }
};
