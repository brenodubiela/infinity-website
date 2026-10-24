import { Symbol } from "@/components/ui/logo";
import { cn } from "@/utils/cn";

export function PhotoPlaceholder({ label, caption, className, ratio = "aspect-[4/5]" }) {
  return (
    <figure className={cn("relative", className)}>
      <div
        role="img"
        aria-label={label}
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden rounded-md bg-surface-dark bg-grid-dark",
          ratio,
        )}
      >
        <Symbol tone="light" className="w-1/3 opacity-20" />
        <span className="absolute top-2 left-2 font-mono text-label text-on-dark-muted uppercase">
          Foto
        </span>
        <span aria-hidden="true" className="absolute top-2 right-2 size-1 rounded-full bg-primary-on-dark" />
      </div>
      {caption && (
        <figcaption className="mt-1.5 font-mono text-xs text-muted">
          <span className="text-primary">FIGURA</span> · {caption}
        </figcaption>
      )}
    </figure>
  );
}
