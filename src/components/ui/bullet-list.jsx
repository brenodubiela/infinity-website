import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/utils/cn";

export function BulletList({ items, numbered = false, tone = "light", className, itemClassName }) {
  const dark = tone === "dark";

  return (
    <ul className={cn("divide-y", dark ? "divide-border-dark" : "divide-border", className)}>
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item}
          delay={Math.min(i * 0.06, 0.4)}
          className={cn("flex gap-2 py-2 first:pt-0 last:pb-0", itemClassName)}
        >
          {numbered ? (
            <span
              aria-hidden="true"
              className={cn(
                "mt-0.5 w-3 shrink-0 font-mono text-xs",
                dark ? "text-primary-on-dark" : "text-primary",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : (
            <span
              aria-hidden="true"
              className={cn("mt-1.5 h-[2px] w-1.5 shrink-0", dark ? "bg-primary-on-dark" : "bg-primary")}
            />
          )}
          <span className={cn("text-base", dark ? "text-on-dark" : "text-ink")}>{item}</span>
        </Reveal>
      ))}
    </ul>
  );
}
