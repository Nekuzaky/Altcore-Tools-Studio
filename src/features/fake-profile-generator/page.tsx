import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";

const firstNames = ["Alex", "Lina", "Noah", "Mila", "Sam", "Nora", "Eli", "Iris"];
const lastNames = ["Martin", "Dubois", "Rivera", "Lopez", "Khan", "Durand", "Smith", "Garcia"];

export const FakeProfileGeneratorPage = () => {
  const [seed, setSeed] = useState(0);
  const profile = useMemo(() => {
    void seed;
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    const username = `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(Math.random() * 90 + 10)}`;
    return `Name: ${first} ${last}\nEmail: ${username}@example.com\nUsername: ${username}`;
  }, [seed]);

  return (
    <ToolLayout seo={{ title: "Fake Profile Generator | Altcore Tools Studio", description: "Generate placeholder user profiles for testing.", canonicalPath: "/tools/fake-profile-generator" }} title="Fake Profile Generator" description="Génère de faux profils pour maquettes et tests UI." category="utility" toolSlug="fake-profile-generator" helpText="Données fictives uniquement, pas pour usage frauduleux.">
      <Card className="space-y-3">
        <Button onClick={() => setSeed((v) => v + 1)}>Generate profile</Button>
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{profile}</pre>
        <CopyButton value={profile} />
      </Card>
    </ToolLayout>
  );
};
