import Link from "next/link";
import { cn } from "@/utils/cn";

const shell =
  "group/card relative flex h-full flex-col overflow-hidden rounded-md border bg-canvas transition-[border-color,transform] duration-300 ease-out-expo";

export function Card({ href, className, children, tone = "light", ...props }) {
  const classes = cn(
    shell,
    tone === "dark"
      ? "border-border-dark bg-surface-dark hover:border-white/30"
      : "border-border hover:border-ink/40",
    href && "hover:-translate-y-0.5",
    className,
  );
  const accent = (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-x-0 top-0 z-10 h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out-expo group-hover/card:scale-x-100 group-focus-visible/card:scale-x-100",
        tone === "dark" ? "bg-primary-on-dark" : "bg-primary",
      )}
    />
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {accent}
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} {...props}>
      {accent}
      {children}
    </div>
  );
}
