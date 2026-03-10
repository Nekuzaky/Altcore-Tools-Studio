const toneTemplates: Record<string, string[]> = {
  educational: ["How to {topic} (Step-by-Step)", "{topic}: Beginner Guide", "Master {topic} Fast"],
  hype: ["{topic} Changed Everything", "You Need to Try {topic}", "The Best {topic} Strategy"],
  storytelling: ["What {topic} Taught Me", "My Journey With {topic}", "The Truth About {topic}"]
};

export const generateYoutubeTitles = (topic: string, tone: string): string[] => {
  const cleanedTopic = topic.trim() || "this method";
  const templates = toneTemplates[tone] ?? toneTemplates.educational;
  return templates.map((template) => template.replace("{topic}", cleanedTopic));
};

