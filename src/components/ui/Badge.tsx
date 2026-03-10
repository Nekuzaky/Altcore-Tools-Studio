import { cn } from "@/lib/cn";

type BadgeProps = {
  children: string;
  variant?: "default" | "accent" | "success";
};

const styles = {
  default: "bg-surface text-muted border-border",
  accent: "bg-brand/15 text-brand border-brand/40",
  success: "bg-success/15 text-success border-success/30"
} as const;

export const Badge = ({ children, variant = "default" }: BadgeProps) => (
  <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", styles[variant])}>
    {children}
  </span>
);
