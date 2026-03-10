import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

export const UnityObjectPoolPlannerPage = () => {
  const [spawnRateInput, setSpawnRateInput] = useState("8");
  const [lifeTimeInput, setLifeTimeInput] = useState("4");
  const [burstInput, setBurstInput] = useState("0");
  const [safetyInput, setSafetyInput] = useState("1.25");

  const result = useMemo(() => {
    const spawnRate = Number(spawnRateInput);
    const lifeTime = Number(lifeTimeInput);
    const burst = Number(burstInput);
    const safety = Number(safetyInput);

    if ([spawnRate, lifeTime, burst, safety].some((n) => Number.isNaN(n) || n < 0)) {
      return { ok: false, error: "All values must be valid positive numbers." } as const;
    }

    const concurrent = spawnRate * lifeTime + burst;
    const recommended = Math.max(1, Math.ceil(concurrent * Math.max(1, safety)));

    const snippet = `// Recommended initial pool size\nint initialPoolSize = ${recommended};\n\n// Formula\n// (spawnRatePerSec * averageLifetimeSec + burstCount) * safetyFactor`;

    return { ok: true, concurrent: concurrent.toFixed(2), recommended, snippet } as const;
  }, [spawnRateInput, lifeTimeInput, burstInput, safetyInput]);

  return (
    <ToolLayout
      seo={{
        title: "Unity Object Pool Planner | Altcore Tools Studio",
        description: "Estimate object pool size from spawn rate, lifetime and burst usage.",
        canonicalPath: "/tools/unity-object-pool-planner"
      }}
      title="Unity Object Pool Planner"
      description="Estimate a safe initial object pool size for projectiles, FX and spawned entities."
      category="unity"
      toolSlug="unity-object-pool-planner"
      helpText="This gives a baseline. Profile in runtime and tune by scene + platform."
    >
      <Card className="grid gap-3 sm:grid-cols-2">
        <Input value={spawnRateInput} onChange={(e) => setSpawnRateInput(e.target.value)} />
        <Input value={lifeTimeInput} onChange={(e) => setLifeTimeInput(e.target.value)} />
        <Input value={burstInput} onChange={(e) => setBurstInput(e.target.value)} />
        <Input value={safetyInput} onChange={(e) => setSafetyInput(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {result.ok ? (
          <>
            <p className="text-sm text-muted">Estimated concurrent objects: {result.concurrent}</p>
            <p className="text-sm text-text">Recommended pool size: {result.recommended}</p>
            <pre className="rounded bg-background p-3 text-xs text-text">{result.snippet}</pre>
            <CopyButton value={result.snippet} label="Copy pool snippet" />
          </>
        ) : (
          <p className="text-sm text-danger">{result.error}</p>
        )}
      </Card>
    </ToolLayout>
  );
};
