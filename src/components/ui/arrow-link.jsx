import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

export function ArrowLink({ href, children, tone = "light", className, ...props }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1 text-sm font-medium",
        tone === "dark" ? "text-on-dark" : "text-ink",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 transition-transform duration-300 ease-out-expo group-hover/link:scale-x-100",
            tone === "dark" ? "bg-primary-on-dark" : "bg-primary",
          )}
        />
      </span>
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.75}
        className={cn(
          "size-[16px] transition-transform duration-300 ease-out-expo group-hover/link:translate-x-0.5",
          tone === "dark" ? "text-primary-on-dark" : "text-primary",
        )}
      />
    </Link>
  );
}
