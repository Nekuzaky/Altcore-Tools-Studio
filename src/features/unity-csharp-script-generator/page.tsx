import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

export const UnityCsharpScriptGeneratorPage = () => {
  const [className, setClassName] = useState("PlayerController");
  const [includeUpdate, setIncludeUpdate] = useState(true);
  const [includeFixedUpdate, setIncludeFixedUpdate] = useState(false);

  const script = useMemo(() => {
    const safeClass = className.replace(/[^a-zA-Z0-9_]/g, "") || "NewScript";
    return `using UnityEngine;\n\npublic class ${safeClass} : MonoBehaviour\n{\n    [SerializeField] private float speed = 5f;\n\n    private void Awake()\n    {\n        // Cache references\n    }\n\n    private void Start()\n    {\n        // Init\n    }\n${includeUpdate ? `\n    private void Update()\n    {\n        // Frame logic\n    }\n` : ""}${includeFixedUpdate ? `\n    private void FixedUpdate()\n    {\n        // Physics logic\n    }\n` : ""}}\n`;
  }, [className, includeUpdate, includeFixedUpdate]);

  return (
    <ToolLayout seo={{ title: "Unity C# Script Generator | Altcore Tools Studio", description: "Generate MonoBehaviour templates quickly.", canonicalPath: "/tools/unity-csharp-script-generator" }} title="Unity C# Script Generator" description="Generate clean MonoBehaviour starter scripts." category="unity" toolSlug="unity-csharp-script-generator" helpText="Set class name, choose methods, then copy your script.">
      <Card className="space-y-3">
        <Input value={className} onChange={(e) => setClassName(e.target.value)} />
        <label className="inline-flex items-center gap-2 text-sm text-text/90"><input type="checkbox" checked={includeUpdate} onChange={(e) => setIncludeUpdate(e.target.checked)} /> Include Update()</label>
        <label className="inline-flex items-center gap-2 text-sm text-text/90"><input type="checkbox" checked={includeFixedUpdate} onChange={(e) => setIncludeFixedUpdate(e.target.checked)} /> Include FixedUpdate()</label>
      </Card>
      <Card className="space-y-2">
        <pre className="max-h-96 overflow-auto rounded bg-background p-3 text-xs text-text">{script}</pre>
        <CopyButton value={script} label="Copy script" />
      </Card>
    </ToolLayout>
  );
};
