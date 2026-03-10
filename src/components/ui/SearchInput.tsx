import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = ({ className, ...props }: SearchInputProps) => (
  <div className={cn("relative", className)}>
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">Q</span>
    <input
      className="h-11 w-full rounded-lg border border-border bg-surface pl-8 pr-3 text-sm text-text outline-none transition focus:border-brand"
      {...props}
    />
  </div>
);
