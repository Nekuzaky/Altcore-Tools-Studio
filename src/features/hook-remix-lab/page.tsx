import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";

export const HookRemixLabPage = () => {
  const [base, setBase] = useState("Personne ne parle de cette erreur");
  const remixes = useMemo(() => {
    return [
      `Tu fais peut-être ça sans t'en rendre compte: ${base.toLowerCase()}.`,
      `${base} et ça te coûte plus que tu penses.`,
      `Si tu veux progresser, commence par corriger: ${base.toLowerCase()}.`,
      `90% des gens ratent ça: ${base.toLowerCase()}.`
    ];
  }, [base]);

  return (
    <ToolLayout seo={{ title: "Hook Remix Lab | Altcore Tools Studio", description: "Remix one hook into multiple tonal variants.", canonicalPath: "/tools/hook-remix-lab" }} title="Hook Remix Lab" description="Transforme un hook de base en variantes plus fortes." category="creator" toolSlug="hook-remix-lab" helpText="Teste plusieurs hooks en A/B pour augmenter la rétention.">
      <Card className="space-y-3">
        <Input value={base} onChange={(e) => setBase(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        {remixes.map((item) => (
          <div key={item} className="flex items-center justify-between rounded-md border border-border p-2">
            <span className="text-sm text-text">{item}</span>
            <CopyButton value={item} />
          </div>
        ))}
      </Card>
    </ToolLayout>
  );
};
