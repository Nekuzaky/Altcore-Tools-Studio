import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { copyToClipboard } from "@/lib/clipboard";

type CopyButtonProps = {
  value: string;
  label?: string;
};

export const CopyButton = ({ value, label = "Copy" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyToClipboard(value);
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Button type="button" variant="secondary" onClick={onCopy}>
      {copied ? "Copied" : label}
    </Button>
  );
};

