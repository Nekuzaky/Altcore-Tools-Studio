type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

type InterfaceMap = Record<string, string[]>;

const toPascalCase = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join("") || "Root";

const resolveType = (value: JsonValue, name: string, interfaces: InterfaceMap): string => {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (!value.length) return "unknown[]";
    const first = value[0] as JsonValue;
    return `${resolveType(first, `${name}Item`, interfaces)}[]`;
  }

  if (typeof value === "object") {
    const ifaceName = toPascalCase(name);
    if (!interfaces[ifaceName]) {
      const fields = Object.entries(value).map(([key, fieldValue]) => {
        const fieldType = resolveType(fieldValue as JsonValue, `${ifaceName}${toPascalCase(key)}`, interfaces);
        return `  ${JSON.stringify(key)}: ${fieldType};`;
      });
      interfaces[ifaceName] = fields;
    }
    return ifaceName;
  }

  return typeof value;
};

export const jsonToTypescript = (input: string): string => {
  const parsed = JSON.parse(input) as JsonValue;
  const interfaces: InterfaceMap = {};
  const rootType = resolveType(parsed, "Root", interfaces);

  const blocks = Object.entries(interfaces).map(([name, fields]) => `export interface ${name} {\n${fields.join("\n")}\n}`);

  if (!interfaces.Root) {
    blocks.push(`export type Root = ${rootType};`);
  }

  return blocks.join("\n\n").trim();
};
