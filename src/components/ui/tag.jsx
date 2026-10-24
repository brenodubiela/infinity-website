import { cn } from "@/utils/cn";

export function Tag({ tone = "light", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex h-4 items-center rounded-sm border px-1 font-mono text-xs whitespace-nowrap",
        tone === "dark" ? "border-border-dark text-silver" : "border-border bg-canvas text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
