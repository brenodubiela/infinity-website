import { InView } from "@/components/ui/in-view";
import { cn } from "@/utils/cn";

export function FigureFrame({ number, caption, tone = "light", className, children }) {
  const dark = tone === "dark";

  return (
    <figure
      className={cn(
        "rounded-md border p-2 sm:p-3",
        dark ? "border-border-dark bg-surface-dark" : "border-border bg-canvas",
        className,
      )}
    >
      <InView className="data-[inview=false]:[--play:paused]">{children}</InView>
      {caption && (
        <figcaption
          className={cn(
            "mt-2 border-t pt-1.5 font-mono text-xs uppercase",
            dark ? "border-border-dark text-on-dark-muted" : "border-border text-muted",
          )}
        >
          {number && <span className={dark ? "text-primary-on-dark" : "text-primary"}>FIGURA {number} · </span>}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
