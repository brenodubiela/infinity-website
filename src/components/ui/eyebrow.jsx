import { cn } from "@/utils/cn";

export function Eyebrow({ index, children, tone = "light", as: Tag = "p", className }) {
  return (
    <Tag
      className={cn(
        "flex items-center gap-1.5 font-mono text-label uppercase",
        tone === "dark" ? "text-silver" : "text-muted",
        className,
      )}
    >
      {index && (
        <span className={cn(tone === "dark" ? "text-primary-on-dark" : "text-primary")}>{index}</span>
      )}
      {index && (
        <span
          aria-hidden="true"
          className={cn("h-px w-3", tone === "dark" ? "bg-border-dark" : "bg-signature-line")}
        />
      )}
      <span>{children}</span>
    </Tag>
  );
}
