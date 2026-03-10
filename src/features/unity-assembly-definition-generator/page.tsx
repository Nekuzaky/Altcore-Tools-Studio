import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const sanitize = (value: string) => value.replace(/[^a-zA-Z0-9_.-]/g, "") || "Game.Runtime";

type Platform = "all" | "editor";

export const UnityAssemblyDefinitionGeneratorPage = () => {
  const [assemblyName, setAssemblyName] = useState("Game.Runtime");
  const [rootNamespace, setRootNamespace] = useState("Game");
  const [referencesInput, setReferencesInput] = useState("Unity.TextMeshPro");
  const [platform, setPlatform] = useState<Platform>("all");
  const [autoReferenced, setAutoReferenced] = useState(true);

  const result = useMemo(() => {
    const refs = referencesInput
      .split(",")
      .map((r) => sanitize(r.trim()))
      .filter(Boolean);

    const payload = {
      name: sanitize(assemblyName),
      rootNamespace: sanitize(rootNamespace),
      references: refs,
      includePlatforms: platform === "editor" ? ["Editor"] : [],
      excludePlatforms: [],
      allowUnsafeCode: false,
      overrideReferences: false,
      precompiledReferences: [],
      autoReferenced,
      defineConstraints: [],
      versionDefines: [],
      noEngineReferences: false
    };

    return JSON.stringify(payload, null, 2);
  }, [assemblyName, rootNamespace, referencesInput, platform, autoReferenced]);

  return (
    <ToolLayout
      seo={{
        title: "Unity Assembly Definition Generator | Altcore Tools Studio",
        description: "Generate .asmdef JSON files for Unity projects.",
        canonicalPath: "/tools/unity-assembly-definition-generator"
      }}
      title="Unity Assembly Definition Generator"
      description="Generate clean .asmdef JSON for runtime or editor assemblies."
      category="unity"
      toolSlug="unity-assembly-definition-generator"
      helpText="Copy output into a .asmdef file inside your Unity project folder."
    >
      <Card className="grid gap-3 sm:grid-cols-2">
        <Input value={assemblyName} onChange={(e) => setAssemblyName(e.target.value)} />
        <Input value={rootNamespace} onChange={(e) => setRootNamespace(e.target.value)} />
        <Input value={referencesInput} onChange={(e) => setReferencesInput(e.target.value)} />
        <Select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
          <option value="all">All Platforms</option>
          <option value="editor">Editor Only</option>
        </Select>
        <label className="inline-flex items-center gap-2 text-sm text-text/90">
          <input type="checkbox" checked={autoReferenced} onChange={(e) => setAutoReferenced(e.target.checked)} />
          Auto Referenced
        </label>
      </Card>
      <Card className="space-y-2">
        <pre className="max-h-[30rem] overflow-auto rounded bg-background p-3 text-xs text-text">{result}</pre>
        <CopyButton value={result} label="Copy asmdef JSON" />
      </Card>
    </ToolLayout>
  );
};
