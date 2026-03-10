import { useMemo, useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const PomodoroSessionPlannerPage = () => {
  const [tasks, setTasks] = useState("Refacto router\nDesign page tool\nPublish update");
  const [focus, setFocus] = useState(25);
  const [breakMin, setBreakMin] = useState(5);

  const plan = useMemo(() => {
    const list = tasks.split("\n").map((x) => x.trim()).filter(Boolean);
    return list.map((task, idx) => `Session ${idx + 1}: ${focus}m focus on \"${task}\" + ${breakMin}m break`).join("\n");
  }, [tasks, focus, breakMin]);

  return (
    <ToolLayout seo={{ title: "Pomodoro Session Planner | Altcore Tools Studio", description: "Generate pomodoro plans from task lists.", canonicalPath: "/tools/pomodoro-session-planner" }} title="Pomodoro Session Planner" description="Transforme une liste de tâches en plan pomodoro clair." category="utility" toolSlug="pomodoro-session-planner" helpText="Adapte focus/break selon ton niveau d'énergie.">
      <Card className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <Input type="number" value={focus} onChange={(e) => setFocus(Number(e.target.value))} />
          <Input type="number" value={breakMin} onChange={(e) => setBreakMin(Number(e.target.value))} />
        </div>
        <Textarea className="min-h-32" value={tasks} onChange={(e) => setTasks(e.target.value)} />
      </Card>
      <Card className="space-y-2">
        <pre className="whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm text-text">{plan}</pre>
        <CopyButton value={plan} />
      </Card>
    </ToolLayout>
  );
};
