import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

const base =
  "group/btn relative inline-flex max-w-full shrink-0 items-center justify-center gap-1 rounded-md text-center font-medium text-balance transition-[background-color,color,border-color] duration-200 ease-out-expo sm:whitespace-nowrap disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-hover",
  secondary: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-ink/80 text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:bg-surface-muted",
  light: "bg-white text-ink hover:bg-surface-muted",
  "outline-light": "border border-white/30 text-on-dark hover:border-white hover:bg-white hover:text-ink",
};

const sizes = {
  md: "min-h-6 px-3 py-1 text-base",
  sm: "min-h-5 px-2 py-0.5 text-sm",
};

const arrowTone = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-primary group-hover/btn:text-white",
  ghost: "text-primary",
  light: "text-primary",
  "outline-light": "text-primary-on-dark group-hover/btn:text-primary",
};

function isInternal(href) {
  return href.startsWith("/") || href.startsWith("#");
}

export function buttonClasses({ variant = "primary", size = "md", className } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = true,
  icon: Icon,
  className,
  children,
  ...props
}) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {Icon && <Icon aria-hidden="true" className="size-[20px] shrink-0" strokeWidth={1.75} />}
      <span>{children}</span>
      {arrow && !Icon && (
        <ArrowRight
          aria-hidden="true"
          strokeWidth={1.75}
          className={cn(
            "size-[20px] shrink-0 transition-transform duration-200 ease-out-expo group-hover/btn:translate-x-0.5",
            arrowTone[variant],
          )}
        />
      )}
    </>
  );

  if (href && isInternal(href)) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
