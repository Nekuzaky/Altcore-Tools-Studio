export const regexSnippets = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,}" },
  { label: "URL", pattern: "https?:\\/\\/[^\\s/$.?#].[^\\s]*" },
  { label: "Hex Color", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b" },
  { label: "Discord Tag", pattern: "<t:\\d{1,}:?[a-zA-Z]?>" },
  { label: "UUID v4", pattern: "[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}" }
];
