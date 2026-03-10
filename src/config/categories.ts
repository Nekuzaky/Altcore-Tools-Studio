export type ToolCategory = {
  slug: string;
  name: string;
  description: string;
};

export const categories: ToolCategory[] = [
  {
    slug: "developer",
    name: "Developer",
    description: "JSON, regex, encoding, auth and productivity tools for engineers."
  },
  {
    slug: "discord",
    name: "Discord",
    description: "Build embeds, timestamps, usernames and formatted Discord content."
  },
  {
    slug: "creator",
    name: "Creator",
    description: "Generate better titles, descriptions and social content quickly."
  },
  {
    slug: "gaming",
    name: "Gaming",
    description: "Name generators and identity tools for gamer profiles and teams."
  },
  {
    slug: "utility",
    name: "Utility",
    description: "Daily text, password, lorem and color helpers for fast workflows."
  },
  {
    slug: "fun",
    name: "Fun",
    description: "Playful generators and creative mini-tools for quick experiments."
  },
  {
    slug: "unity",
    name: "Unity",
    description: "Practical tools and generators for Unity C# workflows."
  }
];
