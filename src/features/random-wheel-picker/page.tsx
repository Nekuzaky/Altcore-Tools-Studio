import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const RandomWheelPickerPage = () => {
  const [itemsText, setItemsText] = useState("Option A\nOption B\nOption C");
  const [seed, setSeed] = useState(0);

  const items = useMemo(() => itemsText.split("\n").map((i) => i.trim()).filter(Boolean), [itemsText]);
  const selected = useMemo(() => {
    void seed;
    if (!items.length) return "";
    return items[Math.floor(Math.random() * items.length)];
  }, [items, seed]);

  return (
    <ToolLayout seo={{ title: "Random Wheel Picker | Altcore Tools Studio", description: "Pick a random option from your list.", canonicalPath: "/tools/random-wheel-picker" }} title="Random Wheel Picker" description="Choisis aléatoirement une option depuis ta liste." category="utility" toolSlug="random-wheel-picker" helpText="Utile pour décisions rapides, jeux et tirages.">
      <Card className="space-y-3">
        <Input value={items.length ? `${items.length} options` : "0 option"} readOnly />
        <Textarea className="min-h-36" value={itemsText} onChange={(e) => setItemsText(e.target.value)} />
        <Button onClick={() => setSeed((x) => x + 1)} disabled={!items.length}>Spin</Button>
      </Card>
      <Card>
        <p className="text-sm text-muted">Selected</p>
        <p className="mt-1 text-xl font-semibold text-text">{selected || "-"}</p>
      </Card>
    </ToolLayout>
  );
};
