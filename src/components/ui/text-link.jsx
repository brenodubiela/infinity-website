import Link from "next/link";
import { cn } from "@/utils/cn";

export function TextLink({ href, active = false, className, children, ...props }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative inline-flex h-6 items-center text-sm font-medium transition-colors duration-200",
        "after:absolute after:inset-x-0 after:bottom-1 after:h-[2px] after:origin-left after:scale-x-0 after:bg-[var(--nav-accent,var(--color-primary))] after:transition-transform after:duration-300 after:ease-out-expo",
        "hover:after:scale-x-100 aria-[current=page]:after:scale-x-100",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
