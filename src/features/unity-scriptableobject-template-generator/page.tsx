import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const sanitize = (value: string) => value.replace(/[^a-zA-Z0-9_]/g, "") || "NewData";

type ParsedField = { type: string; name: string; initialValue: string | null };

const parseFields = (input: string): ParsedField[] =>
  input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^(\w+)\s+(\w+)(?:\s*=\s*(.+))?$/);
      if (!match) {
        throw new Error("Field format: <type> <name> = <value> (value optional)");
      }
      return { type: match[1], name: match[2], initialValue: match[3] ?? null };
    });

export const UnityScriptableobjectTemplateGeneratorPage = () => {
  const [classNameInput, setClassNameInput] = useState("WeaponData");
  const [menuName, setMenuName] = useState("Game/Weapon Data");
  const [fieldsInput, setFieldsInput] = useState("string displayName = \"Rifle\"\nint damage = 25\nfloat fireRate = 0.2f");

  const result = useMemo(() => {
    try {
      const className = sanitize(classNameInput);
      const fields = parseFields(fieldsInput);
      const rows = fields
        .map((f) => `    [SerializeField] private ${f.type} ${f.name}${f.initialValue ? ` = ${f.initialValue}` : ""};`)
        .join("\n");
      const props = fields
        .map((f) => `    public ${f.type} ${f.name.charAt(0).toUpperCase()}${f.name.slice(1)} => ${f.name};`)
        .join("\n");

      const script = `using UnityEngine;\n\n[CreateAssetMenu(fileName = \"${className}\", menuName = \"${menuName}\")]\npublic class ${className} : ScriptableObject\n{\n${rows}\n\n${props}\n}`;
      return { ok: true, script } as const;
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : "Invalid field format."
      } as const;
    }
  }, [classNameInput, menuName, fieldsInput]);

  return (
    <ToolLayout
      seo={{
        title: "Unity ScriptableObject Template Generator | Altcore Tools Studio",
        description: "Generate ScriptableObject class templates with serialized fields.",
        canonicalPath: "/tools/unity-scriptableobject-template-generator"
      }}
      title="Unity ScriptableObject Template Generator"
      description="Generate clean ScriptableObject class templates with fields and read-only properties."
      category="unity"
      toolSlug="unity-scriptableobject-template-generator"
      helpText="One field per line. Format: type name = value. Value is optional."
    >
      <Card className="space-y-3">
        <Input value={classNameInput} onChange={(e) => setClassNameInput(e.target.value)} />
        <Input value={menuName} onChange={(e) => setMenuName(e.target.value)} />
        <Textarea className="min-h-36" value={fieldsInput} onChange={(e) => setFieldsInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {result.ok ? (
          <>
            <pre className="max-h-[30rem] overflow-auto rounded bg-background p-3 text-xs text-text">{result.script}</pre>
            <CopyButton value={result.script} label="Copy ScriptableObject template" />
          </>
        ) : (
          <p className="text-sm text-danger">{result.error}</p>
        )}
      </Card>
    </ToolLayout>
  );
};
