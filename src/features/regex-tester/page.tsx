import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { regexSnippets } from "@/features/regex-tester/snippets";

export const RegexTesterPage = () => {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState("Contact us at team@altcore.fr or support@example.com");

  const result = useMemo<
    | { ok: true; matches: Array<{ value: string; index: number }> }
    | { ok: false; error: string }
  >(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(text.matchAll(regex)).map((match) => ({
        value: match[0],
        index: match.index ?? 0
      }));
      return { ok: true, matches };
    } catch (err) {
      return { ok: false, error: err instanceof Error ? err.message : "Invalid regex" };
    }
  }, [pattern, flags, text]);

  return (
    <ToolLayout
      seo={{
        title: "Regex Tester | Altcore Tools",
        description: "Test regex patterns quickly with snippets and live match results.",
        canonicalPath: "/tools/regex-tester"
      }}
      title="Regex Tester"
      description="Quickly test regular expressions with flags and preview matched text."
      category="developer"
      toolSlug="regex-tester"
      helpText="Use snippets to start fast, then refine your pattern and flags."
    >
      <Card className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-text/90 md:col-span-2">
            <span>Pattern</span>
            <Input value={pattern} onChange={(event) => setPattern(event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-text/90">
            <span>Flags</span>
            <Input value={flags} onChange={(event) => setFlags(event.target.value)} />
          </label>
        </div>
        <label className="space-y-2 text-sm text-text/90">
          <span>Snippet</span>
          <Select
            defaultValue=""
            onChange={(event) => {
              const found = regexSnippets.find((entry) => entry.label === event.target.value);
              if (found) setPattern(found.pattern);
            }}
          >
            <option value="" disabled>
              Select a snippet
            </option>
            {regexSnippets.map((entry) => (
              <option key={entry.label} value={entry.label}>
                {entry.label}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-2 text-sm text-text/90">
          <span>Text to test</span>
          <Textarea value={text} onChange={(event) => setText(event.target.value)} />
        </label>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-lg font-semibold text-text">Matches</h2>
        {!result.ok ? (
          <p className="text-sm text-danger">{result.error}</p>
        ) : result.matches.length ? (
          result.matches.map((match, idx) => (
            <div key={`${match.value}-${idx}`} className="rounded-md border border-border px-3 py-2">
              <p className="font-mono text-sm text-text">{match.value}</p>
              <p className="text-xs text-muted">index: {match.index}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">No matches found.</p>
        )}
      </Card>
    </ToolLayout>
  );
};
