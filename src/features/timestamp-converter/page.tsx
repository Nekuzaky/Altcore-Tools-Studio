import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CopyButton } from "@/components/ui/CopyButton";
import { Input } from "@/components/ui/Input";
import { fromDateTime, fromTimestamp, nowTimestamps } from "@/features/timestamp-converter/converter";

export const TimestampConverterPage = () => {
  const [timestampInput, setTimestampInput] = useState("1710000000");
  const [dateInput, setDateInput] = useState("2026-03-10T12:00:00");
  const [error, setError] = useState("");

  const [timestampResult, setTimestampResult] = useState<{ iso: string; local: string; seconds: number; milliseconds: number } | null>(null);
  const [dateResult, setDateResult] = useState<{ iso: string; seconds: number; milliseconds: number } | null>(null);

  const convertTimestamp = () => {
    try {
      setTimestampResult(fromTimestamp(timestampInput));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid timestamp input.");
    }
  };

  const convertDate = () => {
    try {
      setDateResult(fromDateTime(dateInput));
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid date input.");
    }
  };

  const fillNow = () => {
    const now = nowTimestamps();
    setTimestampInput(`${now.seconds}`);
    setDateInput(now.iso.slice(0, 19));
  };

  const clear = () => {
    setTimestampInput("");
    setDateInput("");
    setTimestampResult(null);
    setDateResult(null);
    setError("");
  };

  return (
    <ToolLayout
      seo={{
        title: "Timestamp Converter | Altcore Tools Studio",
        description: "Convert Unix timestamps and readable dates with ISO output.",
        canonicalPath: "/tools/timestamp-converter"
      }}
      title="Timestamp Converter"
      description="Convert Unix timestamps and readable dates in both directions."
      category="developer"
      toolSlug="timestamp-converter"
      helpText="Supports seconds and milliseconds. Use current timestamp for quick debugging."
    >
      <Card className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={fillNow}>Current timestamp</Button>
          <Button variant="ghost" onClick={clear}>Clear</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm text-muted">Unix timestamp {"->"} Date</p>
            <Input value={timestampInput} onChange={(event) => setTimestampInput(event.target.value)} />
            <Button variant="secondary" onClick={convertTimestamp}>Convert timestamp</Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted">Date {"->"} Unix timestamp</p>
            <Input value={dateInput} onChange={(event) => setDateInput(event.target.value)} placeholder="YYYY-MM-DDTHH:mm:ss" />
            <Button variant="secondary" onClick={convertDate}>Convert date</Button>
          </div>
        </div>

        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </Card>

      <Card className="space-y-3">
        <h2 className="text-base font-semibold text-text">Results</h2>
        {timestampResult ? (
          <div className="space-y-2 rounded-md border border-border p-3 text-sm text-text">
            <p>ISO: {timestampResult.iso}</p>
            <p>Local: {timestampResult.local}</p>
            <p>Seconds: {timestampResult.seconds}</p>
            <p>Milliseconds: {timestampResult.milliseconds}</p>
            <CopyButton value={timestampResult.iso} label="Copy ISO" />
          </div>
        ) : null}

        {dateResult ? (
          <div className="space-y-2 rounded-md border border-border p-3 text-sm text-text">
            <p>ISO: {dateResult.iso}</p>
            <p>Seconds: {dateResult.seconds}</p>
            <p>Milliseconds: {dateResult.milliseconds}</p>
            <CopyButton value={`${dateResult.seconds}`} label="Copy Unix (s)" />
          </div>
        ) : null}
      </Card>

      <Card className="space-y-2 text-sm text-muted">
        <h2 className="text-base font-semibold text-text">Example use case</h2>
        <p>Debug API logs by converting raw timestamps into readable date-time formats quickly.</p>
      </Card>
    </ToolLayout>
  );
};
