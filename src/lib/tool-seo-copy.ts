import type { ToolConfig } from "@/config/tools";

type ToolSeoCopy = {
  intro: string;
  useCases: string[];
  examples: string[];
  faqs: Array<{ question: string; answer: string }>;
};

const categoryAudience: Record<string, string> = {
  developer: "developers working with APIs, backend payloads, and frontend integrations",
  discord: "Discord server admins, bot builders, and community managers",
  creator: "content creators optimizing publishing workflows and output quality",
  gaming: "players and teams improving profile identity and in-game organization",
  utility: "daily productivity workflows across text, data, and formatting tasks",
  fun: "creative brainstorming and quick experimentation sessions",
  unity: "Unity developers building gameplay systems and tooling pipelines"
};

export const buildToolSeoCopy = (tool: ToolConfig): ToolSeoCopy => {
  const audience = categoryAudience[tool.category] ?? "users";
  const intro = `${tool.name} is a browser-based utility in Altcore Tools Studio designed for ${audience}. It helps you complete repetitive steps faster, keep results consistent, and avoid context switching across multiple apps.`;

  const useCases = [
    `Speed up ${tool.name.toLowerCase()} tasks without leaving your browser.`,
    `Use it as a quick pre-check step before shipping work in production environments.`,
    `Share repeatable outputs with teammates using copy-ready results and standard formats.`
  ];

  const keyword = tool.keywords[0] ?? tool.name.toLowerCase();
  const examples = [
    `Use ${tool.name} during setup and debugging when handling ${keyword}-related data.`,
    `Run quick checks before publishing or sharing final outputs.`,
    `Pair this tool with related ${tool.category} tools to reduce manual errors.`
  ];

  const faqs = [
    {
      question: `Is ${tool.name} free to use?`,
      answer: `Yes. ${tool.name} is available as part of Altcore Tools Studio and can be used directly in your browser.`
    },
    {
      question: `Do I need an account to use ${tool.name}?`,
      answer: `No account is required for core usage. Open the page, enter your input, and generate your result instantly.`
    },
    {
      question: `How accurate are results from ${tool.name}?`,
      answer: `The tool runs deterministic logic in-browser and is designed for practical workflows. Always validate critical production outputs in your own pipeline when needed.`
    }
  ];

  return { intro, useCases, examples, faqs };
};
