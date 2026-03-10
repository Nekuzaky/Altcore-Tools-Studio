import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Textarea } from "@/components/ui/Textarea";

const sanitizeName = (value: string) => value.replace(/[^a-zA-Z0-9_]/g, "") || "Waypoint";

export const UnityNavmeshPatrolGeneratorPage = () => {
  const [pointsInput, setPointsInput] = useState("Point_A\nPoint_B\nPoint_C");

  const result = useMemo(() => {
    const points = pointsInput.split("\n").map((p) => sanitizeName(p.trim())).filter(Boolean);
    if (points.length < 2) return { ok: false, error: "Add at least 2 waypoint names." } as const;

    const fieldRows = points.map((p) => `    [SerializeField] private Transform ${p};`).join("\n");
    const listRows = points.map((p) => `            ${p},`).join("\n");

    const script = `using System.Collections.Generic;\nusing UnityEngine;\nusing UnityEngine.AI;\n\n[RequireComponent(typeof(NavMeshAgent))]\npublic class PatrolAgent : MonoBehaviour\n{\n${fieldRows}\n\n    private readonly List<Transform> waypoints = new();\n    private NavMeshAgent agent;\n    private int index;\n\n    private void Awake()\n    {\n        agent = GetComponent<NavMeshAgent>();\n        waypoints.AddRange(new[]\n        {\n${listRows}\n        });\n    }\n\n    private void Start()\n    {\n        if (waypoints.Count > 0)\n        {\n            agent.SetDestination(waypoints[0].position);\n        }\n    }\n\n    private void Update()\n    {\n        if (waypoints.Count == 0 || agent.pathPending) return;\n        if (agent.remainingDistance > 0.25f) return;\n\n        index = (index + 1) % waypoints.Count;\n        agent.SetDestination(waypoints[index].position);\n    }\n}`;

    return { ok: true, script, count: points.length } as const;
  }, [pointsInput]);

  return (
    <ToolLayout
      seo={{
        title: "Unity NavMesh Patrol Generator | Altcore Tools Studio",
        description: "Generate a NavMesh patrol controller script from waypoint names.",
        canonicalPath: "/tools/unity-navmesh-patrol-generator"
      }}
      title="Unity NavMesh Patrol Generator"
      description="Generate a patrol script skeleton with waypoint transforms and loop logic."
      category="unity"
      toolSlug="unity-navmesh-patrol-generator"
      helpText="Enter one waypoint field name per line. Then assign transforms in Inspector."
    >
      <Card className="space-y-3">
        <Textarea className="min-h-36" value={pointsInput} onChange={(e) => setPointsInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {result.ok ? (
          <>
            <p className="text-sm text-muted">{result.count} waypoint fields generated.</p>
            <pre className="max-h-[30rem] overflow-auto rounded bg-background p-3 text-xs text-text">{result.script}</pre>
            <CopyButton value={result.script} label="Copy NavMesh patrol script" />
          </>
        ) : (
          <p className="text-sm text-danger">{result.error}</p>
        )}
      </Card>
    </ToolLayout>
  );
};
