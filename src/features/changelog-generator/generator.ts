type Sections = Record<string, string[]>;

const sectionTitle: Record<string, string> = {
  feat: "Features",
  fix: "Fixes",
  docs: "Documentation",
  chore: "Chores",
  refactor: "Refactors",
  test: "Tests",
  other: "Other"
};

export const generateChangelog = (input: string): string => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: Sections = {
    feat: [],
    fix: [],
    docs: [],
    chore: [],
    refactor: [],
    test: [],
    other: []
  };

  for (const line of lines) {
    const match = line.match(/^(\w+)(\(.+\))?:\s+(.+)$/);
    if (!match) {
      sections.other.push(line);
      continue;
    }
    const type = match[1];
    const message = match[3];
    if (sections[type]) {
      sections[type].push(message);
    } else {
      sections.other.push(message);
    }
  }

  const output: string[] = [];
  Object.entries(sections).forEach(([key, entries]) => {
    if (!entries.length) return;
    output.push(`## ${sectionTitle[key]}`);
    entries.forEach((entry) => output.push(`- ${entry}`));
    output.push("");
  });

  return output.join("\n").trim();
};
