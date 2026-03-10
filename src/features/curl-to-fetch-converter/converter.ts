export type CurlParseResult = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
};

const tokenize = (input: string): string[] => {
  const matches = input.match(/(?:[^"]\S*|".+?")+/g) ?? [];
  return matches.map((token) => token.replace(/^"|"$/g, ""));
};

export const parseCurl = (input: string): CurlParseResult => {
  const tokens = tokenize(input.trim());
  if (!tokens.length || tokens[0].toLowerCase() !== "curl") {
    throw new Error("Input must start with curl.");
  }

  let method = "GET";
  let url = "";
  const headers: Record<string, string> = {};
  let body = "";

  for (let i = 1; i < tokens.length; i += 1) {
    const token = tokens[i];
    const next = tokens[i + 1];

    if ((token === "-X" || token === "--request") && next) {
      method = next.toUpperCase();
      i += 1;
      continue;
    }

    if ((token === "-H" || token === "--header") && next) {
      const [key, ...rest] = next.split(":");
      headers[key.trim()] = rest.join(":").trim();
      i += 1;
      continue;
    }

    if ((token === "-d" || token === "--data" || token === "--data-raw") && next) {
      body = next;
      if (method === "GET") method = "POST";
      i += 1;
      continue;
    }

    if (!token.startsWith("-")) {
      url = token;
    }
  }

  if (!url) throw new Error("Could not detect cURL URL.");
  return { url, method, headers, body: body || undefined };
};

export const toFetchCode = (parsed: CurlParseResult): string => {
  const headers = Object.keys(parsed.headers).length
    ? `  headers: ${JSON.stringify(parsed.headers, null, 2).replace(/^/gm, "  ")},\n`
    : "";
  const body = parsed.body ? `  body: ${JSON.stringify(parsed.body)}\n` : "";

  return `fetch(${JSON.stringify(parsed.url)}, {\n  method: "${parsed.method}",\n${headers}${body}})\n  .then((res) => res.json())\n  .then((data) => console.log(data))\n  .catch((err) => console.error(err));`;
};

export const toAxiosCode = (parsed: CurlParseResult): string => {
  const config = {
    method: parsed.method.toLowerCase(),
    url: parsed.url,
    ...(Object.keys(parsed.headers).length ? { headers: parsed.headers } : {}),
    ...(parsed.body ? { data: parsed.body } : {})
  };

  return `import axios from "axios";\n\naxios(${JSON.stringify(config, null, 2)})\n  .then((res) => console.log(res.data))\n  .catch((err) => console.error(err));`;
};
