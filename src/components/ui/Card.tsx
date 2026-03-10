import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn("rounded-xl border border-border bg-surface/80 p-5 shadow-soft", className)}
    {...props}
  />
);

