import { ToolConfig } from "@/config/tools";

const normalize = (value: string) => value.toLowerCase().trim();

export const filterTools = (tools: ToolConfig[], query: string, category?: string | "all") => {
  const q = normalize(query);

  return tools.filter((tool) => {
    if (category && category !== "all" && tool.category !== category) return false;
    if (!q) return true;

    const searchable = [tool.name, tool.description, ...(tool.keywords ?? []), tool.category]
      .join(" ")
      .toLowerCase();

    return searchable.includes(q);
  });
};
