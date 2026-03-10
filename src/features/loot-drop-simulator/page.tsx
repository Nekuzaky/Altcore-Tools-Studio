import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export const LootDropSimulatorPage = () => {
  const [rate, setRate] = useState(2);
  const [tries, setTries] = useState(100);
  const [seed, setSeed] = useState(0);

  const result = useMemo(() => {
    void seed;
    let drops = 0;
    for (let i = 0; i < tries; i += 1) {
      if (Math.random() * 100 < rate) drops += 1;
    }
    return drops;
  }, [rate, tries, seed]);

  return (
    <ToolLayout seo={{ title: "Loot Drop Simulator | Altcore Tools Studio", description: "Simulate loot drop rates locally.", canonicalPath: "/tools/loot-drop-simulator" }} title="Loot Drop Simulator" description="Teste des probabilités de drop pour visualiser l'impact de la RNG." category="gaming" toolSlug="loot-drop-simulator" helpText="Cette simulation est aléatoire et indicative, pas prédictive.">
      <Card className="space-y-3">
        <Input type="number" min={0.1} max={100} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        <Input type="number" min={1} max={100000} value={tries} onChange={(e) => setTries(Number(e.target.value))} />
        <Button onClick={() => setSeed((v) => v + 1)}>Run simulation</Button>
      </Card>
      <Card>
        <p className="text-sm text-text">Résultat: {result} drops sur {tries} essais ({((result / Math.max(tries,1))*100).toFixed(2)}%).</p>
      </Card>
    </ToolLayout>
  );
};
